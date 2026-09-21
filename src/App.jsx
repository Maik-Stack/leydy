import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Flower from "./components/Flower";
import FlowerField from "./components/FlowerField";
import Petals from "./components/Petals";
import "./App.css";

const STAGES = {
  INTRO: "intro",
  FIELD: "field",
  MESSAGE: "message",
};

export default function App() {
  const [stage, setStage] = useState(STAGES.INTRO);

  // Once the field has bloomed, let the message settle in on its own.
  useEffect(() => {
    if (stage !== STAGES.FIELD) return;
    const toMessage = setTimeout(() => setStage(STAGES.MESSAGE), 3800);
    return () => clearTimeout(toMessage);
  }, [stage]);

  const revealFlowers = () => {
    setStage((current) => (current === STAGES.INTRO ? STAGES.FIELD : current));
  };

  return (
    <div className={`stage stage-${stage}`}>
      <Petals />

      <FlowerField active={stage !== STAGES.INTRO} />

      <AnimatePresence>
        {stage === STAGES.INTRO && (
          <motion.div
            className="intro-flower"
            role="button"
            tabIndex={0}
            aria-label="Toca para ver tu sorpresa"
            onClick={revealFlowers}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") revealFlowers();
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flower size={140} sway swayDuration={3} />
            </motion.div>
            <motion.p
              className="intro-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1] }}
              transition={{ delay: 1, duration: 2.4, repeat: Infinity }}
            >
              toca la flor para ver tu sorpresa
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === STAGES.MESSAGE && (
          <motion.div
            className="message-card"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="message-heart"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              💛
            </motion.span>

            <motion.p
              className="message-lead"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Para la mujer más hermosa
            </motion.p>

            <motion.h1
              className="message-name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
            >
              Leydy Yulieth
              <br />
              Colorado Martínez
            </motion.h1>

            <motion.div
              className="message-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.7, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
