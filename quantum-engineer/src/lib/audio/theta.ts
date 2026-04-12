// Theta audio engine.
//
// Generates, entirely in the browser via Web Audio API:
//
//  1. Binaural theta beats. Two sine oscillators, one per ear, separated
//     by a target theta frequency (4–8 Hz). When listened to through
//     headphones, the brain perceives the difference tone and tends to
//     entrain toward that frequency. This is the mechanism the Monroe
//     Institute's Gateway Process uses.
//
//  2. A soft low-pad ambient drone. Multiple slightly detuned oscillators
//     run through a low-pass filter and a slow LFO on the gain, so the
//     drone swells gently in and out. Works on speakers and headphones.
//
//  3. A monaural amplitude modulation at the theta frequency, mixed in at
//     a low level so the theta entrainment still works without headphones
//     (amplitude modulation doesn't require stereo the way binaural does).
//
// All three layers are generated live. No audio files. Zero bytes of
// download. Works offline once the page has loaded.

export type ThetaConfig = {
  baseFrequency: number; // Hz, carrier for the binaural beats (e.g. 200)
  beatFrequency: number; // Hz, target theta frequency (4–8)
  binauralGain: number; // 0..1
  droneGain: number; // 0..1
  fadeSeconds: number;
  // Bilateral stimulation — alternating left/right click tones at a
  // slow pace (default ~1 Hz). Based on EMDR bilateral stimulation
  // research showing this activates the amygdala and facilitates
  // trauma processing. Set bilateralGain to 0 to disable.
  bilateralGain: number; // 0..1
  bilateralRate: number; // Hz, how fast the alternation is (0.5–2)
};

const DEFAULT_CONFIG: ThetaConfig = {
  baseFrequency: 200,
  beatFrequency: 6,
  binauralGain: 0.08,
  droneGain: 0.045,
  fadeSeconds: 2.5,
  bilateralGain: 0,
  bilateralRate: 1,
};

export class ThetaAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private running = false;
  private stopFns: Array<() => void> = [];

  constructor(private config: Partial<ThetaConfig> = {}) {}

  get isRunning() {
    return this.running;
  }

  private resolvedConfig(): ThetaConfig {
    return { ...DEFAULT_CONFIG, ...this.config };
  }

  async start() {
    if (this.running) return;
    if (typeof window === "undefined") return;
    const Ctor =
      (window.AudioContext as typeof AudioContext | undefined) ??
      ((window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext as typeof AudioContext | undefined);
    if (!Ctor) return;

    const ctx = new Ctor();
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        /* ignore autoplay blocks */
      }
    }

    const cfg = this.resolvedConfig();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const merger = ctx.createChannelMerger(2);
    merger.connect(master);

    // --- 1. Binaural beats ---
    // Left ear: baseFrequency
    // Right ear: baseFrequency + beatFrequency
    const leftOsc = ctx.createOscillator();
    leftOsc.type = "sine";
    leftOsc.frequency.value = cfg.baseFrequency;
    const leftGain = ctx.createGain();
    leftGain.gain.value = cfg.binauralGain;
    leftOsc.connect(leftGain);
    leftGain.connect(merger, 0, 0);
    leftOsc.start();

    const rightOsc = ctx.createOscillator();
    rightOsc.type = "sine";
    rightOsc.frequency.value = cfg.baseFrequency + cfg.beatFrequency;
    const rightGain = ctx.createGain();
    rightGain.gain.value = cfg.binauralGain;
    rightOsc.connect(rightGain);
    rightGain.connect(merger, 0, 1);
    rightOsc.start();

    // --- 2. Ambient drone pad ---
    const droneBus = ctx.createGain();
    droneBus.gain.value = cfg.droneGain;
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = "lowpass";
    droneFilter.frequency.value = 420;
    droneFilter.Q.value = 0.8;
    droneBus.connect(droneFilter);
    droneFilter.connect(master);

    // Three detuned oscillators at a low pitch for warmth.
    const droneFreqs = [
      cfg.baseFrequency / 2, // octave below
      cfg.baseFrequency / 2 + 1.5,
      cfg.baseFrequency / 2 - 1.5,
    ];
    const droneOscs = droneFreqs.map((freq) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freq;
      o.connect(droneBus);
      o.start();
      return o;
    });

    // Slow LFO on the drone bus for a gentle swell (~0.08 Hz, 12-second cycle).
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = cfg.droneGain * 0.6;
    lfo.connect(lfoGain);
    lfoGain.connect(droneBus.gain);
    lfo.start();

    // --- 3. Monaural theta amplitude modulation ---
    // A quiet low-frequency oscillator driving the overall master so the
    // brain gets theta rhythm cues even on speakers.
    const thetaMod = ctx.createOscillator();
    thetaMod.type = "sine";
    thetaMod.frequency.value = cfg.beatFrequency;
    const thetaModDepth = ctx.createGain();
    thetaModDepth.gain.value = 0.04;
    thetaMod.connect(thetaModDepth);
    thetaModDepth.connect(master.gain);
    thetaMod.start();

    // --- 4. Bilateral stimulation (EMDR-adjacent) ---
    // Alternating left/right soft click tones. Research shows
    // bilateral audio stimulation activates the amygdala and
    // decreases dorsolateral prefrontal activation — the state
    // needed for trauma processing. Only active when
    // bilateralGain > 0.
    if (cfg.bilateralGain > 0) {
      // Gentle click tone oscillator.
      const bilateralOsc = ctx.createOscillator();
      bilateralOsc.type = "sine";
      bilateralOsc.frequency.value = 800; // soft click pitch
      const bilateralEnv = ctx.createGain();
      bilateralEnv.gain.value = 0;

      // Panner that swings left → right on a slow LFO.
      const panner = ctx.createStereoPanner();
      const panLfo = ctx.createOscillator();
      panLfo.type = "sine";
      panLfo.frequency.value = cfg.bilateralRate;
      panLfo.connect(panner.pan);
      panLfo.start();

      // Pulse the envelope at the bilateral rate so we hear
      // distinct left-right clicks, not a continuous tone.
      const pulseRate = cfg.bilateralRate * 2;
      const pulser = ctx.createOscillator();
      pulser.type = "square";
      pulser.frequency.value = pulseRate;
      const pulserGain = ctx.createGain();
      pulserGain.gain.value = cfg.bilateralGain;
      pulser.connect(pulserGain);
      pulserGain.connect(bilateralEnv.gain);
      pulser.start();

      bilateralOsc.connect(bilateralEnv);
      bilateralEnv.connect(panner);
      panner.connect(master);
      bilateralOsc.start();

      this.stopFns.push(
        () => { try { bilateralOsc.stop(); } catch {} },
        () => { try { panLfo.stop(); } catch {} },
        () => { try { pulser.stop(); } catch {} },
      );
    }

    // Fade master in
    master.gain.linearRampToValueAtTime(
      1,
      ctx.currentTime + cfg.fadeSeconds,
    );

    this.ctx = ctx;
    this.masterGain = master;
    this.running = true;

    this.stopFns = [
      () => {
        try {
          leftOsc.stop();
        } catch {}
      },
      () => {
        try {
          rightOsc.stop();
        } catch {}
      },
      ...droneOscs.map((o) => () => {
        try {
          o.stop();
        } catch {}
      }),
      () => {
        try {
          lfo.stop();
        } catch {}
      },
      () => {
        try {
          thetaMod.stop();
        } catch {}
      },
    ];
  }

  async stop() {
    if (!this.running || !this.ctx || !this.masterGain) return;
    const cfg = this.resolvedConfig();
    const ctx = this.ctx;
    const master = this.masterGain;

    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(
      0,
      ctx.currentTime + cfg.fadeSeconds,
    );

    await new Promise((r) => setTimeout(r, cfg.fadeSeconds * 1000 + 100));

    this.stopFns.forEach((fn) => fn());
    this.stopFns = [];
    try {
      await ctx.close();
    } catch {
      /* ignore */
    }

    this.ctx = null;
    this.masterGain = null;
    this.running = false;
  }
}
