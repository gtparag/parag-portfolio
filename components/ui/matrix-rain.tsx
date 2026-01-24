"use client";

import { useEffect, useRef, useState } from "react";

interface MatrixRainProps {
  className?: string;
}

export function MatrixRain({ className }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: NodeJS.Timeout;
    let animationId: number;

    // Set canvas size with debounce
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 100);
    };

    // Initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters (katakana + numbers + symbols)
    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";
    const charArray = chars.split("");

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);

    // Array to track y position of each column
    let drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let lastTime = 0;
    const frameInterval = 33; // ~30fps

    // Drawing function with requestAnimationFrame
    const draw = (timestamp: number) => {
      // Throttle to ~30fps for performance
      if (timestamp - lastTime < frameInterval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      // Recalculate columns if canvas resized
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns !== columns) {
        columns = newColumns;
        drops = [];
        for (let i = 0; i < columns; i++) {
          drops[i] = Math.random() * -100;
        }
      }

      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = "#00FF41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Brighter character at the head of the stream
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#FFFFFF";
        } else {
          ctx.fillStyle = `rgba(0, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 50) + 16}, ${Math.random() * 0.5 + 0.5})`;
        }

        ctx.fillText(char, x, y);

        // Reset drop when it falls off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    // Start animation
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [prefersReducedMotion]);

  // Show static background for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className={`fixed inset-0 z-0 pointer-events-none bg-black ${className || ""}`}
        style={{ opacity: 0.4 }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className || ""}`}
      style={{ opacity: 0.4 }}
    />
  );
}
