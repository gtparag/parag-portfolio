"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";

interface PillSelectionProps {
  onSelect: (choice: "red" | "blue") => void;
}

// Car component
function Car({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  const carRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (carRef.current) {
      carRef.current.rotation.y = rotation;
    }
  }, [rotation]);

  return (
    <group ref={carRef} position={position}>
      {/* Car body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 0.6, 4]} />
        <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Car cabin */}
      <mesh position={[0, 0.9, -0.3]}>
        <boxGeometry args={[1.6, 0.5, 2]} />
        <meshStandardMaterial color="#065f46" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.9, 0.8]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.5, 0.4, 0.1]} />
        <meshStandardMaterial color="#88ccff" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Wheels */}
      {[[-0.9, 0.2, 1.3], [0.9, 0.2, 1.3], [-0.9, 0.2, -1.3], [0.9, 0.2, -1.3]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Headlights */}
      <mesh position={[-0.6, 0.4, 2]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.6, 0.4, 2]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={0.5} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.6, 0.4, -2]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.6, 0.4, -2]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Traffic cone
function Cone({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      {/* White stripe */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.22, 0.25, 0.15, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Barrier
function Barrier({ position, width = 3 }: { position: [number, number, number]; width?: number }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[width, 0.8, 0.3]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {/* Stripes */}
      {Array.from({ length: Math.floor(width / 0.8) }).map((_, i) => (
        <mesh key={i} position={[-width/2 + 0.4 + i * 0.8, 0.4, 0.16]}>
          <boxGeometry args={[0.4, 0.8, 0.02]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}
    </group>
  );
}

// Garage door
function GarageDoor({
  position,
  color,
  label,
  isHighlighted
}: {
  position: [number, number, number];
  color: "red" | "blue";
  label: string;
  isHighlighted: boolean;
}) {
  const doorColor = color === "red" ? "#dc2626" : "#2563eb";
  const frameColor = color === "red" ? "#7f1d1d" : "#1e3a8a";
  const glowIntensity = isHighlighted ? 0.8 : 0.3;

  return (
    <group position={position}>
      {/* Door frame */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[5, 5, 0.5]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Door surface */}
      <mesh position={[0, 2.5, 0.3]}>
        <boxGeometry args={[4, 4.5, 0.2]} />
        <meshStandardMaterial
          color={doorColor}
          emissive={doorColor}
          emissiveIntensity={glowIntensity}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Door lines */}
      {[1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, i * 1.1, 0.45]}>
          <boxGeometry args={[3.8, 0.05, 0.05]} />
          <meshStandardMaterial color={frameColor} />
        </mesh>
      ))}

      {/* Ground glow */}
      <mesh position={[0, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial
          color={doorColor}
          transparent
          opacity={isHighlighted ? 0.4 : 0.2}
          emissive={doorColor}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 5.5, 0]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Ground/Road
function Ground() {
  return (
    <group>
      {/* Main road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 80]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Road edges */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0.01, 0]}>
        <planeGeometry args={[0.3, 80]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.01, 0]}>
        <planeGeometry args={[0.3, 80]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Center dashed line */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -30 + i * 4]}>
          <planeGeometry args={[0.2, 2]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Grass on sides */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-15, -0.01, 0]}>
        <planeGeometry args={[10, 80]} />
        <meshStandardMaterial color="#1a3a1a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, -0.01, 0]}>
        <planeGeometry args={[10, 80]} />
        <meshStandardMaterial color="#1a3a1a" />
      </mesh>
    </group>
  );
}

// Game logic component
function Game({
  onFinish,
  gameState,
  setGameState
}: {
  onFinish: (choice: "red" | "blue") => void;
  gameState: "intro" | "playing" | "finished";
  setGameState: (state: "intro" | "playing" | "finished") => void;
}) {
  const carPosition = useRef<[number, number, number]>([0, 0, -30]);
  const carRotation = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());
  const [carState, setCarState] = useState({ pos: [0, 0, -30] as [number, number, number], rot: 0 });
  const [highlightedDoor, setHighlightedDoor] = useState<"red" | "blue" | null>(null);
  const { camera } = useThree();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
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
  }, []);

  // Update camera to follow car
  useEffect(() => {
    if (gameState === "playing") {
      camera.position.set(carState.pos[0], 8, carState.pos[2] - 12);
      camera.lookAt(carState.pos[0], 0, carState.pos[2] + 5);
    }
  }, [carState, gameState, camera]);

  // Game loop
  useFrame((_, delta) => {
    if (gameState !== "playing") return;

    const speed = 15 * delta;
    const turnSpeed = 2 * delta;
    const pos = carPosition.current;
    let rot = carRotation.current;

    // Forward movement
    pos[2] += speed;

    // Steering
    if (keysPressed.current.has("arrowleft") || keysPressed.current.has("a")) {
      pos[0] -= speed * 0.8;
      rot = Math.min(rot + turnSpeed, 0.3);
    } else if (keysPressed.current.has("arrowright") || keysPressed.current.has("d")) {
      pos[0] += speed * 0.8;
      rot = Math.max(rot - turnSpeed, -0.3);
    } else {
      rot *= 0.9; // Return to center
    }

    // Keep on road
    pos[0] = Math.max(-8, Math.min(8, pos[0]));

    // Check for obstacles collision (simple)
    const obstacles = [
      { x: 0, z: -20, r: 1 },
      { x: -4, z: -10, r: 1 },
      { x: 4, z: -10, r: 1 },
      { x: 0, z: 5, r: 2 },
      { x: -5, z: 15, r: 1 },
      { x: 5, z: 15, r: 1 },
    ];

    for (const obs of obstacles) {
      const dx = pos[0] - obs.x;
      const dz = pos[2] - obs.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < obs.r + 1) {
        // Push away
        const angle = Math.atan2(dx, dz);
        pos[0] = obs.x + Math.sin(angle) * (obs.r + 1.2);
      }
    }

    // Check for door entry
    const doorZ = 35;
    if (pos[2] > doorZ - 3) {
      // Near doors - check which side
      if (pos[0] < -1) {
        setHighlightedDoor("red");
        if (pos[2] > doorZ) {
          setGameState("finished");
          onFinish("red");
        }
      } else if (pos[0] > 1) {
        setHighlightedDoor("blue");
        if (pos[2] > doorZ) {
          setGameState("finished");
          onFinish("blue");
        }
      } else {
        // In the middle - push to a side
        pos[0] = pos[0] < 0 ? pos[0] - 0.1 : pos[0] + 0.1;
      }
    } else {
      setHighlightedDoor(null);
    }

    carRotation.current = rot;
    carPosition.current = pos;
    setCarState({ pos: [...pos] as [number, number, number], rot });
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <pointLight position={[-5, 10, 35]} intensity={0.5} color="#dc2626" />
      <pointLight position={[5, 10, 35]} intensity={0.5} color="#2563eb" />

      {/* Environment */}
      <fog attach="fog" args={["#000000", 30, 80]} />
      <color attach="background" args={["#0a0a0a"]} />

      {/* Ground */}
      <Ground />

      {/* Garage doors */}
      <GarageDoor
        position={[-5, 0, 35]}
        color="red"
        label="THE REAL ME"
        isHighlighted={highlightedDoor === "red"}
      />
      <GarageDoor
        position={[5, 0, 35]}
        color="blue"
        label="PROFESSIONAL"
        isHighlighted={highlightedDoor === "blue"}
      />

      {/* Divider between doors */}
      <Barrier position={[0, 0, 30]} width={2} />
      <mesh position={[0, 2, 33]}>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Obstacles */}
      <Cone position={[0, 0, -20]} />
      <Cone position={[-4, 0, -10]} />
      <Cone position={[4, 0, -10]} />
      <Barrier position={[0, 0, 5]} width={4} />
      <Cone position={[-5, 0, 15]} />
      <Cone position={[5, 0, 15]} />
      <Cone position={[-7, 0, 25]} />
      <Cone position={[7, 0, 25]} />

      {/* Car */}
      <Car position={carState.pos} rotation={carState.rot} />

      {/* Camera controls for drag - disabled during gameplay for smoother experience */}
      {gameState !== "playing" && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={50}
          target={[0, 0, 0]}
        />
      )}
    </>
  );
}

export function PillSelection({ onSelect }: PillSelectionProps) {
  const [gameState, setGameState] = useState<"intro" | "playing" | "finished">("intro");
  const [selectedDoor, setSelectedDoor] = useState<"red" | "blue" | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());

  const handleFinish = (choice: "red" | "blue") => {
    setSelectedDoor(choice);
    setTimeout(() => onSelect(choice), 1500);
  };

  // Mobile controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
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
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 15, -45]} fov={60} />
        <Game
          onFinish={handleFinish}
          gameState={gameState}
          setGameState={setGameState}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Title */}
        <motion.div
          className="absolute top-8 left-0 right-0 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-4xl font-mono text-white tracking-wider drop-shadow-lg">
            CHOOSE YOUR DESTINATION
          </h1>
          {gameState === "intro" && (
            <p className="text-gray-400 font-mono text-sm mt-2">
              Drag to look around • Click START to drive
            </p>
          )}
          {gameState === "playing" && (
            <p className="text-gray-400 font-mono text-sm mt-2">
              Use ← → or A D to steer
            </p>
          )}
        </motion.div>

        {/* Start button */}
        <AnimatePresence>
          {gameState === "intro" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className="px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-mono text-2xl rounded-xl transition-colors shadow-2xl"
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
              className={`absolute inset-0 flex items-center justify-center ${
                selectedDoor === "red"
                  ? "bg-red-600/70"
                  : "bg-blue-600/70"
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
                <p className="text-white font-mono text-4xl mb-4">
                  {selectedDoor === "red" ? "THE REAL ME" : "PROFESSIONAL"}
                </p>
                <p className="text-white/70 font-mono text-lg">Loading...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 md:hidden pointer-events-auto">
          {gameState === "playing" && (
            <>
              <button
                className="px-8 py-6 bg-gray-800/80 active:bg-gray-700 text-white font-mono text-xl rounded-xl"
                onTouchStart={() => {
                  const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
                  window.dispatchEvent(event);
                }}
                onTouchEnd={() => {
                  const event = new KeyboardEvent("keyup", { key: "ArrowLeft" });
                  window.dispatchEvent(event);
                }}
              >
                ← LEFT
              </button>
              <button
                className="px-8 py-6 bg-gray-800/80 active:bg-gray-700 text-white font-mono text-xl rounded-xl"
                onTouchStart={() => {
                  const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
                  window.dispatchEvent(event);
                }}
                onTouchEnd={() => {
                  const event = new KeyboardEvent("keyup", { key: "ArrowRight" });
                  window.dispatchEvent(event);
                }}
              >
                RIGHT →
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
