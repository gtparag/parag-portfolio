"use client";

import { useState, useEffect, useCallback } from "react";

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\アァカサタナハマヤャラワ0123456789";

export function useTextScramble(text: string, scrambleOnMount = false) {
  const [displayText, setDisplayText] = useState(scrambleOnMount ? "" : text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (scrambleOnMount) {
      const timeout = setTimeout(scramble, 100);
      return () => clearTimeout(timeout);
    }
  }, [scrambleOnMount, scramble]);

  return { displayText, scramble, isScrambling };
}
