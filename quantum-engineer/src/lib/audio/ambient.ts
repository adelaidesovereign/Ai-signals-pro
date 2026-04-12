// Ambient soundscape generator.
//
// Everything is synthesized live in the browser via Web Audio API.
// No audio files, no downloads, no bandwidth. Works offline once the
// page has loaded.
//
// Three flavours of ambient sound, each stackable with the theta
// binaural beats and the soft voice for a full immersive soundscape:
//
//   1. Rain      — white noise through a gentle low-pass filter with
//                  slow amplitude modulation for the softness of
//                  steady rain hitting leaves.
//
//   2. Ocean     — brown noise through a band-pass filter with a
//                  slow low-frequency oscillator on the filter's
//                  frequency, producing a believable shh… shhh…
//                  wave cadence.
//
//   3. Forest    — pink noise through a high-pass filter plus a
//                  second pink-noise layer panned wide, creating
//                  a distant quiet forest ambience.
//
// Plus solfeggio frequency tones (396, 528, 639, 963 Hz) that can
// be layered in at a low volume for the users who want the
// specific frequency work.

export type AmbientKind =
  | "none"
  | "rain"
  | "ocean"
  | "forest";

export type SolfeggioFrequency = 396 | 528 | 639 | 963;

export type AmbientConfig = {
  kind: AmbientKind;
  volume: number; // 0..1
  solfeggio?: SolfeggioFrequency;
  solfeggioVolume?: number; // 0..1
  fadeSeconds: number;
};

const DEFAULT_CONFIG: AmbientConfig = {
  kind: "none",
  volume: 0.22,
  solfeggioVolume: 0.03,
  fadeSeconds: 3,
};

// White noise buffer — used as source for rain.
function makeNoiseBuffer(ctx: AudioContext, duration = 2): AudioBuffer {
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(2, sr * duration, sr);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buf;
}

// Brown noise (1/f^2 spectrum) — used for ocean.
function makeBrownNoiseBuffer(ctx: AudioContext, duration = 4): AudioBuffer {
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(2, sr * duration, sr);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  }
  return buf;
}

// Pink noise (1/f spectrum) — used for forest.
function makePinkNoiseBuffer(ctx: AudioContext, duration = 4): AudioBuffer {
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(2, sr * duration, sr);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    // Voss-McCartney approximation for pink noise.
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  }
  return buf;
}

export class AmbientAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private stopFns: Array<() => void> = [];
  private running = false;

  constructor(private config: Partial<AmbientConfig> = {}) {}

  get isRunning() {
    return this.running;
  }

  private resolvedConfig(): AmbientConfig {
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

    // --- Ambient bed ---
    if (cfg.kind === "rain") {
      this.setupRain(ctx, master, cfg);
    } else if (cfg.kind === "ocean") {
      this.setupOcean(ctx, master, cfg);
    } else if (cfg.kind === "forest") {
      this.setupForest(ctx, master, cfg);
    }

    // --- Solfeggio tone ---
    if (cfg.solfeggio) {
      this.setupSolfeggio(ctx, master, cfg);
    }

    // Fade master in.
    master.gain.linearRampToValueAtTime(
      cfg.volume,
      ctx.currentTime + cfg.fadeSeconds,
    );

    this.ctx = ctx;
    this.masterGain = master;
    this.running = true;
  }

  private setupRain(
    ctx: AudioContext,
    master: GainNode,
    cfg: AmbientConfig,
  ) {
    const buf = makeNoiseBuffer(ctx, 3);
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1800;
    lowpass.Q.value = 0.6;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "highpass";
    bandpass.frequency.value = 200;

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.35;

    // Slow amplitude modulation so the rain breathes.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.13;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain);
    lfoGain.connect(rainGain.gain);
    lfo.start();

    source.connect(lowpass);
    lowpass.connect(bandpass);
    bandpass.connect(rainGain);
    rainGain.connect(master);
    source.start();

    this.stopFns.push(
      () => {
        try {
          source.stop();
        } catch {}
      },
      () => {
        try {
          lfo.stop();
        } catch {}
      },
    );
  }

  private setupOcean(
    ctx: AudioContext,
    master: GainNode,
    cfg: AmbientConfig,
  ) {
    const buf = makeBrownNoiseBuffer(ctx, 4);
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 600;
    bandpass.Q.value = 0.8;

    // Slow LFO on the bandpass frequency produces the wave cadence.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain);
    lfoGain.connect(bandpass.frequency);
    lfo.start();

    const oceanGain = ctx.createGain();
    oceanGain.gain.value = 0.45;

    source.connect(bandpass);
    bandpass.connect(oceanGain);
    oceanGain.connect(master);
    source.start();

    this.stopFns.push(
      () => {
        try {
          source.stop();
        } catch {}
      },
      () => {
        try {
          lfo.stop();
        } catch {}
      },
    );
  }

  private setupForest(
    ctx: AudioContext,
    master: GainNode,
    cfg: AmbientConfig,
  ) {
    const buf = makePinkNoiseBuffer(ctx, 4);
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.loop = true;

    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 500;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 4500;

    const forestGain = ctx.createGain();
    forestGain.gain.value = 0.3;

    // Gentle amplitude wobble for a living forest feel.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.11;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.07;
    lfo.connect(lfoGain);
    lfoGain.connect(forestGain.gain);
    lfo.start();

    source.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(forestGain);
    forestGain.connect(master);
    source.start();

    this.stopFns.push(
      () => {
        try {
          source.stop();
        } catch {}
      },
      () => {
        try {
          lfo.stop();
        } catch {}
      },
    );
  }

  private setupSolfeggio(
    ctx: AudioContext,
    master: GainNode,
    cfg: AmbientConfig,
  ) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = cfg.solfeggio as number;

    // Very subtle chorus with a slight detuned copy.
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = (cfg.solfeggio as number) + 0.6;

    const solfGain = ctx.createGain();
    solfGain.gain.value = cfg.solfeggioVolume ?? 0.03;

    const solfFilter = ctx.createBiquadFilter();
    solfFilter.type = "lowpass";
    solfFilter.frequency.value = 2000;
    solfFilter.Q.value = 0.5;

    osc.connect(solfFilter);
    osc2.connect(solfFilter);
    solfFilter.connect(solfGain);
    solfGain.connect(master);
    osc.start();
    osc2.start();

    this.stopFns.push(
      () => {
        try {
          osc.stop();
        } catch {}
      },
      () => {
        try {
          osc2.stop();
        } catch {}
      },
    );
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
