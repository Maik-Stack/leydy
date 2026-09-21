const PETAL_COUNT = 16;

// Deterministic pseudo-random layout so it doesn't reshuffle on re-render.
const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const seed = i * 37.5;
  return {
    left: (seed % 100),
    size: 10 + ((seed * 1.3) % 14),
    duration: 10 + ((seed * 0.7) % 10),
    delay: (seed * 0.21) % 10,
    drift: ((seed % 7) - 3) * 8,
    spin: 180 + ((seed * 3) % 360),
    color: i % 3 === 0 ? "#ffd34d" : i % 3 === 1 ? "#fff2b8" : "#ffe27a",
  };
});

export default function Petals() {
  return (
    <div className="petals-layer" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
            "--spin": `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}
