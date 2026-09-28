// Organic photo frames as SVG clip paths in objectBoundingBox units, so they
// scale with whatever box they clip. Use via `[clip-path:url(#hero-blob)]`.
// The shapes keep their corners generous where the animals sit in the photos.
export function BlobClipPaths() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        {/* Wavy rounded rectangle — hero photo */}
        <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
          <path d="M0.08,0.1 C0.2,0 0.45,0.03 0.62,0.02 C0.8,0 0.95,0.02 0.985,0.14 C1,0.3 0.99,0.55 0.99,0.72 C0.99,0.9 0.94,0.99 0.8,0.99 C0.6,1 0.4,0.97 0.22,0.985 C0.08,1 0.01,0.93 0.01,0.78 C0,0.6 0.03,0.45 0.015,0.3 C0,0.18 0.02,0.13 0.08,0.1 Z" />
        </clipPath>
        {/* Soft egg-shaped oval — about photo and its halo */}
        <clipPath id="soft-blob" clipPathUnits="objectBoundingBox">
          <path d="M0.48,0.03 C0.8,-0.01 1,0.12 0.995,0.45 C0.99,0.75 0.84,0.98 0.55,0.99 C0.27,1 0.02,0.87 0.01,0.58 C0,0.28 0.2,0.06 0.48,0.03 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
