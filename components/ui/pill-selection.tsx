"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatrixRain } from "@/components/ui/matrix-rain";

interface PillSelectionProps {
  onSelect: (choice: "red" | "blue") => void;
}

interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  horizontalSpeed: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "cone" | "barrier";
}

interface Door {
  x: number;
  y: number;
  width: number;
  height: number;
  color: "red" | "blue";
  label: string;
}

export function PillSelection({ onSelect }: PillSelectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"intro" | "playing" | "finished">("intro");
  const [selectedDoor, setSelectedDoor] = useState<"red" | "blue" | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const gameLoopRef = useRef<number>();
  const carRef = useRef<Car>({
    x: 0,
    y: 0,
    width: 40,
    height: 70,
    speed: 4,
    horizontalSpeed: 5,
  });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const doorsRef = useRef<Door[]>([]);

  // Initialize game
  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    // Position car at bottom center
    carRef.current = {
      x: width / 2 - 20,
      y: height - 120,
      width: 40,
      height: 70,
      speed: 4,
      horizontalSpeed: 5,
    };

    // Create doors at the top
    const doorWidth = 120;
    const doorHeight = 100;
    const doorY = 30;
    const gap = 100;

    doorsRef.current = [
      {
        x: width / 2 - doorWidth - gap / 2,
        y: doorY,
        width: doorWidth,
        height: doorHeight,
        color: "red",
        label: "THE REAL ME",
      },
      {
        x: width / 2 + gap / 2,
        y: doorY,
        width: doorWidth,
        height: doorHeight,
        color: "blue",
        label: "PROFESSIONAL",
      },
    ];

    // Create obstacles (cones and barriers)
    obstaclesRef.current = [
      // Row 1
      { x: width / 2 - 15, y: height - 250, width: 30, height: 30, type: "cone" },
      // Row 2
      { x: width / 2 - 120, y: height - 350, width: 30, height: 30, type: "cone" },
      { x: width / 2 + 90, y: height - 350, width: 30, height: 30, type: "cone" },
      // Row 3 - barrier in middle forcing choice
      { x: width / 2 - 40, y: height - 480, width: 80, height: 20, type: "barrier" },
      // Row 4
      { x: width / 2 - 180, y: height - 550, width: 30, height: 30, type: "cone" },
      { x: width / 2 + 150, y: height - 550, width: 30, height: 30, type: "cone" },
      // Final barrier to separate lanes
      { x: width / 2 - 20, y: height - 700, width: 40, height: 150, type: "barrier" },
    ];
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
      if (e.key === " " && gameState === "intro") {
        setGameState("playing");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = Math.min(600, window.innerWidth - 40);
      canvas.height = Math.min(800, window.innerHeight - 100);
      initGame();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [initGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = () => {
      const car = carRef.current;
      const obstacles = obstaclesRef.current;
      const doors = doorsRef.current;

      // Update car position based on keys
      if (keysPressed.current.has("arrowleft") || keysPressed.current.has("a")) {
        car.x -= car.horizontalSpeed;
      }
      if (keysPressed.current.has("arrowright") || keysPressed.current.has("d")) {
        car.x += car.horizontalSpeed;
      }

      // Auto-move forward
      car.y -= car.speed;

      // Keep car in bounds
      car.x = Math.max(20, Math.min(canvas.width - car.width - 20, car.x));

      // Check collision with obstacles
      for (const obs of obstacles) {
        if (
          car.x < obs.x + obs.width &&
          car.x + car.width > obs.x &&
          car.y < obs.y + obs.height &&
          car.y + car.height > obs.y
        ) {
          // Push car back/around obstacle
          if (obs.type === "barrier") {
            car.y = obs.y + obs.height + 5;
          } else {
            // Bounce off cone
            if (car.x + car.width / 2 < obs.x + obs.width / 2) {
              car.x = obs.x - car.width - 5;
            } else {
              car.x = obs.x + obs.width + 5;
            }
          }
        }
      }

      // Check if car reached a door
      for (const door of doors) {
        if (
          car.x + car.width / 2 > door.x &&
          car.x + car.width / 2 < door.x + door.width &&
          car.y < door.y + door.height
        ) {
          setSelectedDoor(door.color);
          setGameState("finished");
          return;
        }
      }

      // Clear and draw
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw road
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(20, 0, canvas.width - 40, canvas.height);

      // Draw road lines
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.setLineDash([30, 20]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height);
      ctx.lineTo(canvas.width / 2, canvas.height - 400);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw lane divider at top
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 180);
      ctx.lineTo(canvas.width / 2, canvas.height - 500);
      ctx.stroke();

      // Draw doors
      for (const door of doors) {
        // Door frame
        ctx.fillStyle = door.color === "red" ? "#2d0a0a" : "#0a0a2d";
        ctx.fillRect(door.x - 10, door.y - 10, door.width + 20, door.height + 20);

        // Door glow
        const gradient = ctx.createRadialGradient(
          door.x + door.width / 2,
          door.y + door.height / 2,
          0,
          door.x + door.width / 2,
          door.y + door.height / 2,
          door.width
        );
        gradient.addColorStop(0, door.color === "red" ? "rgba(220, 38, 38, 0.4)" : "rgba(37, 99, 235, 0.4)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(door.x - 50, door.y - 50, door.width + 100, door.height + 100);

        // Door surface
        ctx.fillStyle = door.color === "red" ? "#dc2626" : "#2563eb";
        ctx.fillRect(door.x, door.y, door.width, door.height);

        // Door details (garage door lines)
        ctx.strokeStyle = door.color === "red" ? "#991b1b" : "#1d4ed8";
        ctx.lineWidth = 2;
        for (let i = 1; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(door.x, door.y + (door.height / 4) * i);
          ctx.lineTo(door.x + door.width, door.y + (door.height / 4) * i);
          ctx.stroke();
        }

        // Door label
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.fillText(door.label, door.x + door.width / 2, door.y + door.height + 30);
      }

      // Draw obstacles
      for (const obs of obstacles) {
        if (obs.type === "cone") {
          // Traffic cone
          ctx.fillStyle = "#f97316";
          ctx.beginPath();
          ctx.moveTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.lineTo(obs.x, obs.y + obs.height);
          ctx.closePath();
          ctx.fill();
          // White stripe
          ctx.fillStyle = "#fff";
          ctx.fillRect(obs.x + obs.width / 4, obs.y + obs.height / 2, obs.width / 2, 4);
        } else {
          // Barrier
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          // Stripes
          ctx.fillStyle = "#000";
          for (let i = 0; i < obs.width; i += 20) {
            ctx.fillRect(obs.x + i, obs.y, 10, obs.height);
          }
        }
      }

      // Draw car
      // Car body
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.roundRect(car.x, car.y, car.width, car.height, 8);
      ctx.fill();

      // Car windshield
      ctx.fillStyle = "#065f46";
      ctx.fillRect(car.x + 5, car.y + 10, car.width - 10, 20);

      // Car headlights
      ctx.fillStyle = "#fef3c7";
      ctx.fillRect(car.x + 5, car.y, 8, 6);
      ctx.fillRect(car.x + car.width - 13, car.y, 8, 6);

      // Car taillights
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(car.x + 3, car.y + car.height - 8, 10, 6);
      ctx.fillRect(car.x + car.width - 13, car.y + car.height - 8, 10, 6);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState]);

  // Handle finish
  useEffect(() => {
    if (gameState === "finished" && selectedDoor) {
      const timer = setTimeout(() => {
        onSelect(selectedDoor);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState, selectedDoor, onSelect]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Matrix Rain Background */}
      <MatrixRain className="!opacity-30" />

      {/* Game Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.h1
          className="text-2xl md:text-3xl font-mono text-white mb-4 tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CHOOSE YOUR DESTINATION
        </motion.h1>

        {/* Instructions */}
        <AnimatePresence>
          {gameState === "intro" && (
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-gray-400 font-mono text-sm mb-2">
                Use <span className="text-white">← →</span> or <span className="text-white">A D</span> to steer
              </p>
              <p className="text-gray-500 font-mono text-xs">
                Drive into a door to choose your experience
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="rounded-lg border border-gray-800"
            style={{ maxWidth: "100%", maxHeight: "70vh" }}
          />

          {/* Start overlay */}
          <AnimatePresence>
            {gameState === "intro" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.button
                  className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-mono text-xl rounded-lg transition-colors"
                  onClick={() => setGameState("playing")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  START DRIVING
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Finish overlay */}
          <AnimatePresence>
            {gameState === "finished" && selectedDoor && (
              <motion.div
                className={`absolute inset-0 flex items-center justify-center rounded-lg ${
                  selectedDoor === "red"
                    ? "bg-red-600/80"
                    : "bg-blue-600/80"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-white font-mono text-2xl mb-2">
                    {selectedDoor === "red" ? "THE REAL ME" : "PROFESSIONAL"}
                  </p>
                  <p className="text-white/70 font-mono text-sm">Loading...</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile controls */}
        <div className="flex gap-4 mt-4 md:hidden">
          <button
            className="px-8 py-4 bg-gray-800 active:bg-gray-700 text-white font-mono text-xl rounded-lg"
            onTouchStart={() => keysPressed.current.add("arrowleft")}
            onTouchEnd={() => keysPressed.current.delete("arrowleft")}
          >
            ← LEFT
          </button>
          <button
            className="px-8 py-4 bg-gray-800 active:bg-gray-700 text-white font-mono text-xl rounded-lg"
            onTouchStart={() => keysPressed.current.add("arrowright")}
            onTouchEnd={() => keysPressed.current.delete("arrowright")}
          >
            RIGHT →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
