import { motion } from "framer-motion";
import Flower from "./Flower";

// Deterministic layout for a pleasant, non-overlapping scatter of flowers.
const LAYOUT = [
  { left: "6%", top: "14%", size: 60 },
  { left: "18%", top: "62%", size: 84 },
  { left: "4%", top: "80%", size: 52 },
  { left: "28%", top: "10%", size: 46 },
  { left: "38%", top: "78%", size: 66 },
  { left: "50%", top: "6%", size: 58 },
  { left: "62%", top: "80%", size: 48 },
  { left: "72%", top: "12%", size: 70 },
  { left: "84%", top: "60%", size: 80 },
  { left: "92%", top: "16%", size: 50 },
  { left: "94%", top: "82%", size: 58 },
  { left: "10%", top: "40%", size: 40 },
  { left: "86%", top: "38%", size: 42 },
  { left: "45%", top: "42%", size: 36 },
];

export default function FlowerField({ active }) {
  return (
    <div className="flower-field" aria-hidden="true">
      {LAYOUT.map((f, i) => (
        <motion.div
          key={i}
          className="flower-field-item"
          style={{ left: f.left, top: f.top }}
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.12 * i, duration: 0.5, ease: "easeOut" }}
        >
          <Flower
            size={f.size}
            swayDuration={3.5 + (i % 4) * 0.6}
            swayDelay={i * 0.15}
          />
        </motion.div>
      ))}
    </div>
  );
}
