export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-6">
          <div
            className="absolute inset-0 border border-gold/30 rounded-full"
            style={{ animation: "pulse-gold 2s ease-in-out infinite" }}
          />
          <div
            className="absolute inset-2 border border-gold/20 rounded-full"
            style={{ animation: "pulse-gold 2s ease-in-out infinite 0.3s" }}
          />
          <div
            className="absolute inset-4 border border-gold/10 rounded-full"
            style={{ animation: "pulse-gold 2s ease-in-out infinite 0.6s" }}
          />
        </div>
        <span className="overline text-stone/50 text-[10px]">Loading</span>
      </div>
    </div>
  );
}
