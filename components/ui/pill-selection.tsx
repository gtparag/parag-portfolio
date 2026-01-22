"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox, useSphere, usePlane } from "@react-three/cannon";
import * as THREE from "three";

interface PillSelectionProps {
  onSelect: (choice: "red" | "blue") => void;
}

// Simple car with direct velocity control
function Car({
  onPositionUpdate,
  carRef,
}: {
  onPositionUpdate: (pos: THREE.Vector3) => void;
  carRef: React.MutableRefObject<THREE.Vector3>;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const yRotation = useRef(0);

  const [, api] = useBox(
    () => ({
      mass: 20,
      position: [0, 0.5, 0],
      args: [1.4, 0.6, 2.4],
      angularFactor: [0, 1, 0], // Only allow Y rotation
      linearDamping: 0.9,
      angularDamping: 0.99,
      allowSleep: false,
      fixedRotation: false,
    }),
    meshRef
  );

  const controls = useRef({ forward: false, backward: false, left: false, right: false });
  const position = useRef([0, 0.5, 0]);

  // Subscribe to position
  useEffect(() => {
    const unsubPos = api.position.subscribe((p) => (position.current = p));
    return () => unsubPos();
  }, [api]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          controls.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          controls.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          controls.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          controls.current.right = true;
          break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          controls.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          controls.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          controls.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          controls.current.right = false;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Movement using velocity
  useFrame((_, delta) => {
    const { forward, backward, left, right } = controls.current;

    // Turning
    const turnSpeed = 2.5;
    if (left) yRotation.current += turnSpeed * delta;
    if (right) yRotation.current -= turnSpeed * delta;

    // Set rotation directly on the mesh (visual) and sync physics
    if (meshRef.current) {
      meshRef.current.rotation.y = yRotation.current;
    }
    api.quaternion.set(0, Math.sin(yRotation.current / 2), 0, Math.cos(yRotation.current / 2));

    // Calculate velocity based on rotation
    const speed = 12;
    let vx = 0;
    let vz = 0;

    if (forward) {
      vx = -Math.sin(yRotation.current) * speed;
      vz = -Math.cos(yRotation.current) * speed;
    }
    if (backward) {
      vx = Math.sin(yRotation.current) * speed * 0.5;
      vz = Math.cos(yRotation.current) * speed * 0.5;
    }

    // Set velocity directly
    if (forward || backward) {
      api.velocity.set(vx, 0, vz);
    }

    // Update position ref for camera
    const pos = new THREE.Vector3(position.current[0], position.current[1], position.current[2]);
    carRef.current.copy(pos);
    onPositionUpdate(pos);
  });

  return (
    <group ref={meshRef}>
      {/* Car body */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.4, 0.5, 2.4]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Rounded front/back */}
      <mesh position={[0, 0.1, 1.1]} castShadow>
        <sphereGeometry args={[0.5, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, -1.1]} rotation={[Math.PI, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.55, -0.2]} castShadow>
        <boxGeometry args={[1.2, 0.45, 1.4]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Windows */}
      <mesh position={[0, 0.55, 0.45]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[1.1, 0.4, 0.05]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.8} />
      </mesh>

      {/* Wheels */}
      {[
        [-0.7, -0.15, 0.8],
        [0.7, -0.15, 0.8],
        [-0.7, -0.15, -0.8],
        [0.7, -0.15, -0.8],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </mesh>
      ))}

      {/* Headlights */}
      <mesh position={[-0.45, 0.1, 1.2]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.45, 0.1, 1.2]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// Camera following car from isometric view
function FollowCamera({ target }: { target: React.MutableRefObject<THREE.Vector3> }) {
  const { camera } = useThree();
  const smoothPos = useRef(new THREE.Vector3(0, 25, -20));

  useFrame(() => {
    // Isometric-style camera offset
    const offset = new THREE.Vector3(0, 22, -18);
    const targetPos = target.current.clone().add(offset);

    // Smooth follow
    smoothPos.current.lerp(targetPos, 0.08);
    camera.position.copy(smoothPos.current);
    camera.lookAt(target.current.x, 0, target.current.z);
  });

  return null;
}

// Ground
function Ground() {
  const [ref] = usePlane(
    () => ({
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.1, 0],
      type: "Static",
    }),
    useRef<THREE.Mesh>(null)
  );

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#4ade80" />
    </mesh>
  );
}

// Bumpable colored block
function Block({
  position,
  size = [1.5, 1.5, 1.5],
  color,
}: {
  position: [number, number, number];
  size?: [number, number, number];
  color: string;
}) {
  const [ref] = useBox(
    () => ({
      mass: 8,
      position: [position[0], position[1] + size[1] / 2, position[2]],
      args: size,
    }),
    useRef<THREE.Mesh>(null)
  );

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

// Bumpable sphere/ball
function Ball({
  position,
  radius = 0.8,
  color,
}: {
  position: [number, number, number];
  radius?: number;
  color: string;
}) {
  const [ref] = useSphere(
    () => ({
      mass: 5,
      position: [position[0], position[1] + radius, position[2]],
      args: [radius],
    }),
    useRef<THREE.Mesh>(null)
  );

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.3} />
    </mesh>
  );
}

// Static tree/decoration
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#166534" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.8, 0]} castShadow>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Static collision boundary for tree
function TreeCollider({ position }: { position: [number, number, number] }) {
  const [ref] = useBox(
    () => ({
      type: "Static",
      position: [position[0], 1.5, position[2]],
      args: [1, 3, 1],
    }),
    useRef<THREE.Mesh>(null)
  );
  return <mesh ref={ref} visible={false} />;
}

// Garage door with trigger zone
function GarageDoor({
  position,
  rotation = 0,
  color,
  label,
  carRef,
  onEnter,
}: {
  position: [number, number, number];
  rotation?: number;
  color: "red" | "blue";
  label: string;
  carRef: React.MutableRefObject<THREE.Vector3>;
  onEnter: () => void;
}) {
  const doorColor = color === "red" ? "#dc2626" : "#2563eb";
  const frameColor = color === "red" ? "#991b1b" : "#1e40af";
  const entered = useRef(false);

  // Check distance to car for trigger
  useFrame(() => {
    if (entered.current) return;
    const doorPos = new THREE.Vector3(position[0], 0, position[2]);
    const dist = carRef.current.distanceTo(doorPos);
    if (dist < 4) {
      entered.current = true;
      onEnter();
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Door frame */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[6, 5.5, 0.8]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Door surface */}
      <mesh position={[0, 2.5, 0.45]}>
        <boxGeometry args={[5, 4.8, 0.2]} />
        <meshStandardMaterial color={doorColor} emissive={doorColor} emissiveIntensity={0.4} />
      </mesh>

      {/* Door lines */}
      {[1.2, 2.4, 3.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0.6]}>
          <boxGeometry args={[4.8, 0.08, 0.08]} />
          <meshStandardMaterial color={frameColor} />
        </mesh>
      ))}

      {/* Glow area on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 3]}>
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial color={doorColor} transparent opacity={0.3} emissive={doorColor} emissiveIntensity={0.5} />
      </mesh>

      {/* Label sign */}
      <mesh position={[0, 5.5, 0]}>
        <boxGeometry args={[5, 1, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
}

// 3D Text (simple block letters)
function BlockText({ text, position, color }: { text: string; position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      {text.split("").map((char, i) => (
        <mesh key={i} position={[i * 1.2 - (text.length * 1.2) / 2 + 0.6, 0.5, 0]} castShadow>
          <boxGeometry args={[1, 1, 0.5]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Main game scene
function GameScene({
  onFinish,
  gameStarted,
}: {
  onFinish: (choice: "red" | "blue") => void;
  gameStarted: boolean;
}) {
  const carPosition = useRef(new THREE.Vector3(0, 0.5, 0));

  const handlePositionUpdate = (pos: THREE.Vector3) => {
    carPosition.current.copy(pos);
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[30, 50, 20]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={150}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <hemisphereLight args={["#87ceeb", "#4ade80", 0.5]} />

      {/* Sky */}
      <color attach="background" args={["#87ceeb"]} />
      <fog attach="fog" args={["#87ceeb", 60, 150]} />

      {/* Ground */}
      <Ground />

      {/* Path/road areas - darker grass patches */}
      {[
        [0, 0],
        [10, 5],
        [20, 0],
        [-10, 5],
        [-20, 10],
        [15, 20],
        [-15, 25],
        [0, 30],
        [25, 15],
        [-25, 5],
      ].map((pos, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[pos[0], 0.01, pos[1]]}>
          <circleGeometry args={[8, 32]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      ))}

      {/* Scattered bumpable blocks */}
      <Block position={[-8, 0, 8]} color="#f97316" />
      <Block position={[8, 0, 6]} color="#8b5cf6" />
      <Block position={[-5, 0, -8]} color="#ec4899" />
      <Block position={[10, 0, -5]} color="#06b6d4" />
      <Block position={[-15, 0, 12]} color="#eab308" />
      <Block position={[15, 0, 10]} color="#14b8a6" />
      <Block position={[0, 0, 15]} size={[2, 2, 2]} color="#f43f5e" />
      <Block position={[-12, 0, 20]} color="#a855f7" />
      <Block position={[12, 0, 22]} color="#3b82f6" />

      {/* Scattered balls */}
      <Ball position={[-3, 0, 5]} color="#fbbf24" radius={0.7} />
      <Ball position={[5, 0, -3]} color="#f472b6" radius={0.6} />
      <Ball position={[-10, 0, 0]} color="#34d399" radius={0.8} />
      <Ball position={[18, 0, 8]} color="#60a5fa" radius={0.9} />
      <Ball position={[-8, 0, 25]} color="#c084fc" radius={0.7} />
      <Ball position={[5, 0, 18]} color="#fb923c" radius={0.6} />

      {/* Trees around the edges */}
      {[
        [-25, -20], [-20, -25], [-30, 0], [-28, 15], [-25, 30],
        [25, -20], [30, -10], [28, 10], [25, 25], [30, 35],
        [-15, -22], [0, -25], [15, -22],
        [-20, 35], [0, 38], [20, 35],
      ].map((pos, i) => (
        <group key={i}>
          <Tree position={[pos[0], 0, pos[1]]} />
          <TreeCollider position={[pos[0], 0, pos[1]]} />
        </group>
      ))}

      {/* Garage doors placed in the world */}
      <GarageDoor
        position={[-18, 0, 30]}
        rotation={0.3}
        color="red"
        label="THE REAL ME"
        carRef={carPosition}
        onEnter={() => onFinish("red")}
      />
      <GarageDoor
        position={[18, 0, 28]}
        rotation={-0.3}
        color="blue"
        label="PROFESSIONAL"
        carRef={carPosition}
        onEnter={() => onFinish("blue")}
      />

      {/* Welcome text blocks on ground */}
      <BlockText text="WELCOME" position={[0, 0, -10]} color="#1e40af" />
      <BlockText text="EXPLORE" position={[0, 0, -6]} color="#166534" />

      {/* Arrow markers pointing to doors */}
      <mesh rotation={[-Math.PI / 2, 0, 0.5]} position={[-10, 0.02, 20]}>
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, -0.5]} position={[10, 0.02, 20]}>
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* Car and camera */}
      {gameStarted && (
        <>
          <Car onPositionUpdate={handlePositionUpdate} carRef={carPosition} />
          <FollowCamera target={carPosition} />
        </>
      )}
    </>
  );
}

export function PillSelection({ onSelect }: PillSelectionProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selectedDoor, setSelectedDoor] = useState<"red" | "blue" | null>(null);

  const handleFinish = (choice: "red" | "blue") => {
    if (finished) return;
    setFinished(true);
    setSelectedDoor(choice);
    setTimeout(() => onSelect(choice), 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Canvas shadows camera={{ position: [0, 25, -20], fov: 50 }}>
        <Physics gravity={[0, -40, 0]} broadphase="SAP" allowSleep={false}>
          <GameScene onFinish={handleFinish} gameStarted={gameStarted} />
        </Physics>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Title */}
        <motion.div
          className="absolute top-6 left-0 right-0 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {!gameStarted && (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-2">
                CHOOSE YOUR PATH
              </h1>
              <p className="text-white/80 text-lg">
                Drive around and explore! Find the door that calls to you.
              </p>
            </>
          )}
          {gameStarted && !finished && (
            <p className="text-white/90 text-sm bg-black/30 inline-block px-4 py-2 rounded-full">
              WASD / Arrow Keys to drive • Explore the world • Drive into a door to choose
            </p>
          )}
        </motion.div>

        {/* Start button */}
        <AnimatePresence>
          {!gameStarted && !finished && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className="px-12 py-6 bg-white hover:bg-gray-100 text-gray-900 font-bold text-2xl rounded-2xl shadow-2xl transition-colors"
                onClick={() => setGameStarted(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START DRIVING
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direction hints */}
        {gameStarted && !finished && (
          <>
            <div className="absolute bottom-6 left-6 text-white font-bold text-lg drop-shadow-lg bg-red-600/80 px-4 py-2 rounded-lg">
              ← THE REAL ME
            </div>
            <div className="absolute bottom-6 right-6 text-white font-bold text-lg drop-shadow-lg bg-blue-600/80 px-4 py-2 rounded-lg">
              PROFESSIONAL →
            </div>
          </>
        )}

        {/* Finish overlay */}
        <AnimatePresence>
          {finished && selectedDoor && (
            <motion.div
              className={`absolute inset-0 flex items-center justify-center ${
                selectedDoor === "red" ? "bg-red-600/90" : "bg-blue-600/90"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="text-center text-white"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <p className="text-5xl md:text-7xl font-bold mb-4">
                  {selectedDoor === "red" ? "THE REAL ME" : "PROFESSIONAL"}
                </p>
                <p className="text-xl opacity-80">Loading your experience...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile controls */}
        {gameStarted && !finished && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden pointer-events-auto">
            <button
              className="w-16 h-16 bg-white/80 active:bg-white rounded-full text-2xl font-bold shadow-lg"
              onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "w" }))}
              onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "w" }))}
            >
              ▲
            </button>
            <div className="flex gap-2">
              <button
                className="w-16 h-16 bg-white/80 active:bg-white rounded-full text-2xl font-bold shadow-lg"
                onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }))}
                onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "a" }))}
              >
                ◀
              </button>
              <button
                className="w-16 h-16 bg-white/80 active:bg-white rounded-full text-2xl font-bold shadow-lg"
                onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }))}
                onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "s" }))}
              >
                ▼
              </button>
              <button
                className="w-16 h-16 bg-white/80 active:bg-white rounded-full text-2xl font-bold shadow-lg"
                onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "d" }))}
                onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "d" }))}
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
