"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypingText } from "./typing-text";

interface MatrixIntroProps {
  onComplete: () => void;
}

export function MatrixIntro({ onComplete }: MatrixIntroProps) {
  const [stage, setStage] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 1 second
    const skipTimeout = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(skipTimeout);
  }, []);

  const stages = [
    { text: "Wake up, Neo...", delay: 500 },
    { text: "The Matrix has you...", delay: 2500 },
    { text: "Follow the white rabbit.", delay: 5000 },
    { text: "Knock, knock, Neo.", delay: 7500 },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    stages.forEach((s, index) => {
      const timer = setTimeout(() => {
        setStage(index + 1);
      }, s.delay);
      timers.push(timer);
    });

    // Complete after all stages
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 10000);
    timers.push(completeTimer);

    return () => timers.forEach((t) => clearTimeout(t));
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <AnimatePresence mode="wait">
          {stage >= 1 && stage <= 4 && (
            <motion.div
              key={stage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--matrix-green)] text-xl md:text-2xl text-glow"
            >
              <TypingText
                text={stages[stage - 1].text}
                speed={80}
                showCursor={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute bottom-8 right-8 text-[var(--matrix-green-dim)] text-sm hover:text-[var(--matrix-green)] transition-colors"
          >
            [Press any key or click to skip]
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
