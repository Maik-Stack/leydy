import { motion } from "framer-motion";

const petalVariants = {
  hidden: { scale: 0, rotate: -30, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.25 + i * 0.06,
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

/**
 * A single animated flower. `bloom` controls whether the entrance
 * animation should play (used to stagger many flowers across a field).
 */
export default function Flower({
  size = 90,
  petalColor = "#ffd34d",
  centerColor = "#e8871e",
  sway = true,
  swayDuration = 4,
  swayDelay = 0,
  style,
  className,
}) {
  return (
    <motion.div
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        transformOrigin: "50% 90%",
        ...style,
      }}
      animate={
        sway
          ? {
              rotate: [-6, 6, -6],
              y: [0, -6, 0],
            }
          : undefined
      }
      transition={
        sway
          ? {
              duration: swayDuration,
              delay: swayDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
    >
      <motion.svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        initial="hidden"
        animate="visible"
        style={{ overflow: "visible" }}
      >
        <g transform="translate(50 50)">
          {PETAL_ANGLES.map((angle, i) => (
            // The angle placement must live on a plain <g>, not on the
            // motion element itself — framer-motion drives its own
            // rotate/scale via an inline CSS transform, which would
            // otherwise overwrite this static SVG transform attribute
            // and collapse every petal onto the same spot.
            <g key={angle} transform={`rotate(${angle})`}>
              <motion.ellipse
                custom={i}
                variants={petalVariants}
                cx="0"
                cy="-22"
                rx="13"
                ry="22"
                fill={petalColor}
                style={{ transformOrigin: "0px 0px" }}
              />
            </g>
          ))}
          <motion.circle
            r="12"
            fill={centerColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
          />
        </g>
      </motion.svg>
    </motion.div>
  );
}
