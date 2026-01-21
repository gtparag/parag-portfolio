"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatrixRain } from "@/components/ui/matrix-rain";

type DoorChoice = "red" | "blue" | null;

interface PillSelectionProps {
  onSelect: (choice: "red" | "blue") => void;
}

export function PillSelection({ onSelect }: PillSelectionProps) {
  const [hoveredDoor, setHoveredDoor] = useState<DoorChoice>(null);
  const [selectedDoor, setSelectedDoor] = useState<DoorChoice>(null);
  const [animationPhase, setAnimationPhase] = useState<
    "idle" | "door-opening" | "light-flood" | "transition"
  >("idle");

  const handleDoorClick = (door: "red" | "blue") => {
    if (animationPhase !== "idle") return;

    setSelectedDoor(door);
    setAnimationPhase("door-opening");

    // Sequence the animation phases
    setTimeout(() => setAnimationPhase("light-flood"), 800);
    setTimeout(() => setAnimationPhase("transition"), 1600);
    setTimeout(() => onSelect(door), 2400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Matrix Rain Background */}
      <MatrixRain className="!opacity-60" />

      {/* Dark gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Main Scene Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">

        {/* Title Text */}
        <AnimatePresence>
          {animationPhase === "idle" && (
            <motion.div
              className="absolute top-16 md:top-24 text-center z-30 px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-4xl font-mono text-white mb-4 tracking-wider">
                CHOOSE YOUR PATH
              </h1>
              <p className="text-gray-400 text-sm md:text-base font-mono max-w-xl mx-auto">
                This is your last chance. After this, there is no turning back.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Doors Container */}
        <div className="flex items-center justify-center gap-8 md:gap-20 lg:gap-32 mt-8">
          {/* Red Door */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <Door
              color="red"
              label="RED DOOR"
              sublabel="See how deep the rabbit hole goes"
              isHovered={hoveredDoor === "red"}
              isSelected={selectedDoor === "red"}
              isOpening={selectedDoor === "red" && (animationPhase === "door-opening" || animationPhase === "light-flood")}
              onHover={(hovered) => setHoveredDoor(hovered ? "red" : null)}
              onClick={() => handleDoorClick("red")}
              disabled={animationPhase !== "idle"}
            />
          </motion.div>

          {/* Blue Door */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <Door
              color="blue"
              label="BLUE DOOR"
              sublabel="Wake up and believe whatever you want"
              isHovered={hoveredDoor === "blue"}
              isSelected={selectedDoor === "blue"}
              isOpening={selectedDoor === "blue" && (animationPhase === "door-opening" || animationPhase === "light-flood")}
              onHover={(hovered) => setHoveredDoor(hovered ? "blue" : null)}
              onClick={() => handleDoorClick("blue")}
              disabled={animationPhase !== "idle"}
            />
          </motion.div>
        </div>

        {/* Bottom hint text */}
        <AnimatePresence>
          {animationPhase === "idle" && (
            <motion.p
              className="absolute bottom-12 text-gray-600 text-xs md:text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Click a door to enter
            </motion.p>
          )}
        </AnimatePresence>

        {/* Full screen transition overlay */}
        <AnimatePresence>
          {animationPhase === "transition" && selectedDoor && (
            <motion.div
              className={`absolute inset-0 z-50 ${
                selectedDoor === "red"
                  ? "bg-gradient-to-br from-red-600 via-red-700 to-black"
                  : "bg-gradient-to-br from-blue-600 via-blue-700 to-black"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Door Component - Cinematic Style
function Door({
  color,
  label,
  sublabel,
  isHovered,
  isSelected,
  isOpening,
  onHover,
  onClick,
  disabled,
}: {
  color: "red" | "blue";
  label: string;
  sublabel: string;
  isHovered: boolean;
  isSelected: boolean;
  isOpening: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  disabled: boolean;
}) {
  const isRed = color === "red";

  // Colors
  const frameColor = isRed ? "#1a0a0a" : "#0a0a1a";
  const doorColor = isRed ? "#2d0a0a" : "#0a0a2d";
  const glowColor = isRed ? "rgba(220, 38, 38, 0.6)" : "rgba(37, 99, 235, 0.6)";
  const lightColor = isRed ? "#fca5a5" : "#93c5fd";
  const accentColor = isRed ? "#dc2626" : "#2563eb";
  const textColor = isRed ? "text-red-500" : "text-blue-500";

  return (
    <motion.button
      className="relative cursor-pointer group focus:outline-none"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
      disabled={disabled}
      animate={{
        scale: isHovered && !isOpening ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-4 md:-inset-6 rounded-lg blur-2xl"
        style={{ backgroundColor: glowColor }}
        animate={{
          opacity: isHovered || isSelected ? 0.8 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Door Container */}
      <div className="relative">
        {/* Door Frame */}
        <div
          className="relative w-36 h-56 md:w-48 md:h-72 lg:w-56 lg:h-80 rounded-t-xl overflow-hidden"
          style={{
            backgroundColor: frameColor,
            boxShadow: isHovered || isSelected
              ? `0 0 60px ${glowColor}, inset 0 0 30px rgba(0,0,0,0.8)`
              : `inset 0 0 30px rgba(0,0,0,0.8)`,
          }}
        >
          {/* Door Surface */}
          <div
            className="absolute inset-2 md:inset-3 rounded-t-lg transition-all duration-300"
            style={{
              backgroundColor: doorColor,
              border: `2px solid ${isHovered || isSelected ? accentColor : '#333'}`,
            }}
          >
            {/* Door Panels */}
            <div className="absolute inset-3 md:inset-4 grid grid-rows-3 gap-2 md:gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded border transition-colors duration-300"
                  style={{
                    borderColor: isHovered || isSelected ? accentColor : '#444',
                    backgroundColor: isHovered || isSelected
                      ? `${accentColor}10`
                      : 'transparent',
                  }}
                />
              ))}
            </div>

            {/* Door Handle */}
            <div
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-2 md:w-3 h-6 md:h-8 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isHovered || isSelected ? lightColor : '#666',
                boxShadow: isHovered || isSelected
                  ? `0 0 15px ${glowColor}`
                  : 'none',
              }}
            />

            {/* Keyhole */}
            <div
              className="absolute right-3 md:right-4 top-1/2 translate-y-4 md:translate-y-6 w-1 h-3 md:h-4 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: isHovered || isSelected ? accentColor : '#555',
              }}
            />
          </div>

          {/* Light coming through when opening */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: lightColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0.8, 1] }}
                transition={{ duration: 1.2, ease: "easeIn" }}
              />
            )}
          </AnimatePresence>

          {/* Light rays when opening */}
          <AnimatePresence>
            {isOpening && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 md:w-4"
                    style={{
                      height: '200%',
                      backgroundColor: lightColor,
                      transformOrigin: "center center",
                      rotate: `${(i - 3) * 12}deg`,
                      filter: "blur(8px)",
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: [0, 0.4, 0.7] }}
                    transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Floor reflection */}
        <div
          className="w-full h-4 md:h-6 rounded-b-lg opacity-50"
          style={{
            background: `linear-gradient(to bottom, ${frameColor}, transparent)`,
          }}
        />

        {/* Label */}
        <motion.div
          className="mt-4 md:mt-6 text-center"
          animate={{
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <p className={`text-lg md:text-xl font-mono font-bold tracking-widest ${textColor}`}>
            {label}
          </p>
          <p className="text-gray-500 text-xs md:text-sm font-mono mt-1 max-w-32 md:max-w-40 mx-auto">
            {sublabel}
          </p>
        </motion.div>
      </div>
    </motion.button>
  );
}

