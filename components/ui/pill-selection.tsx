"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox, useSphere, usePlane } from "@react-three/cannon";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

interface PillSelectionProps {
  onSelect: (choice: "red" | "blue") => void;
}

// Toy-like truck - cute and stylized like Bruno Simon's
function Truck({
  onPositionUpdate,
  carRef,
}: {
  onPositionUpdate: (pos: THREE.Vector3) => void;
  carRef: React.MutableRefObject<THREE.Vector3>;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const yRotation = useRef(0);
  const wheelRefs = useRef<THREE.Mesh[]>([]);

  const [, api] = useBox(
    () => ({
      mass: 20,
      position: [0, 0.6, 0],
      args: [1.4, 0.8, 2.2],
      angularFactor: [0, 1, 0],
      linearDamping: 0.9,
      angularDamping: 0.99,
      allowSleep: false,
    }),
    meshRef
  );

  const controls = useRef({ forward: false, backward: false, left: false, right: false });
  const position = useRef([0, 0.6, 0]);

  useEffect(() => {
    const unsubPos = api.position.subscribe((p) => (position.current = p));
    return () => unsubPos();
  }, [api]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": case "ArrowUp": controls.current.forward = true; break;
        case "KeyS": case "ArrowDown": controls.current.backward = true; break;
        case "KeyA": case "ArrowLeft": controls.current.left = true; break;
        case "KeyD": case "ArrowRight": controls.current.right = true; break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": case "ArrowUp": controls.current.forward = false; break;
        case "KeyS": case "ArrowDown": controls.current.backward = false; break;
        case "KeyA": case "ArrowLeft": controls.current.left = false; break;
        case "KeyD": case "ArrowRight": controls.current.right = false; break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const { forward, backward, left, right } = controls.current;
    const turnSpeed = 3;
    if (left) yRotation.current += turnSpeed * delta;
    if (right) yRotation.current -= turnSpeed * delta;

    if (meshRef.current) meshRef.current.rotation.y = yRotation.current;
    api.quaternion.set(0, Math.sin(yRotation.current / 2), 0, Math.cos(yRotation.current / 2));

    const speed = 14;
    let vx = 0, vz = 0;
    if (forward) { vx = -Math.sin(yRotation.current) * speed; vz = -Math.cos(yRotation.current) * speed; }
    if (backward) { vx = Math.sin(yRotation.current) * speed * 0.5; vz = Math.cos(yRotation.current) * speed * 0.5; }
    if (forward || backward) api.velocity.set(vx, 0, vz);

    // Animate wheels
    const wheelSpeed = (forward ? 1 : backward ? -0.5 : 0) * 10 * delta;
    wheelRefs.current.forEach(wheel => {
      if (wheel) wheel.rotation.x += wheelSpeed;
    });

    const pos = new THREE.Vector3(position.current[0], position.current[1], position.current[2]);
    carRef.current.copy(pos);
    onPositionUpdate(pos);
  });

  // Vibrant toy colors
  const bodyColor = "#ff6b6b";
  const bodyColorDark = "#e55555";
  const accentColor = "#ffd93d";
  const wheelColor = "#2d3436";
  const rimColor = "#dfe6e9";

  return (
    <group ref={meshRef}>
      {/* Main body - rounded look using multiple parts */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.3, 0.5, 2]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Body top curve simulation */}
      <mesh position={[0, 0.35, 0.3]} castShadow>
        <boxGeometry args={[1.2, 0.15, 1.2]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Hood - front */}
      <mesh position={[0, 0.25, 0.75]} castShadow>
        <boxGeometry args={[1.1, 0.35, 0.5]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Hood rounded top */}
      <mesh position={[0, 0.45, 0.75]} castShadow>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.55, -0.2]} castShadow>
        <boxGeometry args={[1.1, 0.5, 0.9]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Cabin roof - rounded */}
      <mesh position={[0, 0.8, -0.2]} castShadow>
        <boxGeometry args={[1.0, 0.12, 0.8]} />
        <meshStandardMaterial color={bodyColorDark} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.6, 0.22]} rotation={[-0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 0.4, 0.08]} />
        <meshStandardMaterial color="#74b9ff" transparent opacity={0.7} />
      </mesh>

      {/* Side windows */}
      {[-0.56, 0.56].map((x, i) => (
        <mesh key={i} position={[x, 0.55, -0.2]} castShadow>
          <boxGeometry args={[0.05, 0.35, 0.6]} />
          <meshStandardMaterial color="#74b9ff" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Rear section */}
      <mesh position={[0, 0.15, -0.85]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.4]} />
        <meshStandardMaterial color={bodyColorDark} />
      </mesh>

      {/* Headlights - big and cute */}
      {[-0.4, 0.4].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.2, 1.02]} castShadow>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Grille - simple cute style */}
      <mesh position={[0, 0.05, 1.01]} castShadow>
        <boxGeometry args={[0.5, 0.25, 0.05]} />
        <meshStandardMaterial color="#636e72" />
      </mesh>

      {/* Taillights */}
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, 0.2, -1.03]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#d63031" emissive="#d63031" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Bumpers */}
      <mesh position={[0, -0.1, 1.05]} castShadow>
        <boxGeometry args={[1.1, 0.18, 0.12]} />
        <meshStandardMaterial color="#636e72" />
      </mesh>
      <mesh position={[0, -0.1, -1.05]} castShadow>
        <boxGeometry args={[1.1, 0.18, 0.12]} />
        <meshStandardMaterial color="#636e72" />
      </mesh>

      {/* Wheels - chunky toy style */}
      {[
        { pos: [-0.7, -0.15, 0.65], idx: 0 },
        { pos: [0.7, -0.15, 0.65], idx: 1 },
        { pos: [-0.7, -0.15, -0.6], idx: 2 },
        { pos: [0.7, -0.15, -0.6], idx: 3 },
      ].map(({ pos, idx }) => (
        <group key={idx} position={pos as [number, number, number]}>
          {/* Tire - chunky */}
          <mesh
            rotation={[0, 0, Math.PI / 2]}
            castShadow
            ref={(el) => { if (el) wheelRefs.current[idx] = el; }}
          >
            <cylinderGeometry args={[0.35, 0.35, 0.28, 16]} />
            <meshStandardMaterial color={wheelColor} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.3, 12]} />
            <meshStandardMaterial color={rimColor} />
          </mesh>
          {/* Hub cap */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[pos[0] > 0 ? 0.15 : -0.15, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 8]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>
        </group>
      ))}

      {/* Fenders - rounded */}
      {[-0.65, 0.65].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.05, 0.65]} castShadow>
            <boxGeometry args={[0.15, 0.3, 0.5]} />
            <meshStandardMaterial color={bodyColorDark} />
          </mesh>
          <mesh position={[x, 0.05, -0.6]} castShadow>
            <boxGeometry args={[0.15, 0.3, 0.5]} />
            <meshStandardMaterial color={bodyColorDark} />
          </mesh>
        </group>
      ))}

      {/* Antenna - cute detail */}
      <mesh position={[0.3, 1.1, -0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      <mesh position={[0.3, 1.35, -0.3]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#d63031" />
      </mesh>
    </group>
  );
}

// Camera following car - isometric-ish view
function FollowCamera({ target }: { target: React.MutableRefObject<THREE.Vector3> }) {
  const { camera } = useThree();
  const smoothPos = useRef(new THREE.Vector3(0, 18, -14));

  useFrame(() => {
    const offset = new THREE.Vector3(0, 15, -12);
    const targetPos = target.current.clone().add(offset);
    smoothPos.current.lerp(targetPos, 0.08);
    camera.position.copy(smoothPos.current);
    camera.lookAt(target.current.x, 0, target.current.z + 3);
  });

  return null;
}

// Ground - stylized cartoon terrain
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
    <>
      {/* Main ground - soft warm sand color */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#dfe6e9" />
      </mesh>

      {/* Central plaza - slightly different tone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]} receiveShadow>
        <circleGeometry args={[18, 32]} />
        <meshStandardMaterial color="#ffeaa7" />
      </mesh>

      {/* Path from plaza to doors */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0.01, 22]} receiveShadow>
        <planeGeometry args={[5, 20]} />
        <meshStandardMaterial color="#fab1a0" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.01, 22]} receiveShadow>
        <planeGeometry args={[5, 20]} />
        <meshStandardMaterial color="#74b9ff" />
      </mesh>

      {/* Grass patches - multiple circular areas */}
      {[
        [-25, 0], [25, 0], [-20, 25], [20, -20], [0, -25], [-30, -15], [30, 15],
        [-15, 30], [15, -30], [35, -5], [-35, 5]
      ].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, z]} receiveShadow>
          <circleGeometry args={[8 + Math.random() * 4, 24]} />
          <meshStandardMaterial color="#55efc4" />
        </mesh>
      ))}
    </>
  );
}

// Simple stylized grass tufts
function GrassTuft({ position }: { position: [number, number, number] }) {
  const color = useMemo(() => {
    const colors = ["#00b894", "#00cec9", "#55efc4"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <group position={position}>
      {/* Simple cone grass blades */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 0.1 + Math.random() * 0.15;
        const height = 0.3 + Math.random() * 0.3;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * dist, height / 2, Math.sin(angle) * dist]}
            rotation={[(Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3]}
          >
            <coneGeometry args={[0.06, height, 4]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
        );
      })}
    </group>
  );
}

// Cartoon puffball tree - like Bruno Simon's style
function FluffyTree({ position, color = "green", scale = 1 }: { position: [number, number, number]; color?: string; scale?: number }) {
  const foliageColors: Record<string, string> = {
    green: "#00b894",
    lightgreen: "#55efc4",
    pink: "#fd79a8",
    orange: "#e17055",
    yellow: "#fdcb6e",
    purple: "#a29bfe",
  };

  const mainColor = foliageColors[color] || foliageColors.green;

  // Create distinct puffball clusters
  const foliageParts = useMemo(() => {
    const parts = [];
    // Large main puffs
    const clusters = [
      { pos: [0, 2.8, 0], size: 1.5 },
      { pos: [0.9, 2.4, 0.6], size: 1.1 },
      { pos: [-0.8, 2.5, 0.5], size: 1.0 },
      { pos: [0.5, 3.3, -0.4], size: 0.95 },
      { pos: [-0.6, 3.1, -0.5], size: 0.9 },
      { pos: [0.2, 3.6, 0.3], size: 0.85 },
      { pos: [-0.3, 2.2, 0.8], size: 0.8 },
      { pos: [0.7, 2.9, -0.6], size: 0.75 },
    ];
    for (const cluster of clusters) {
      parts.push({
        position: cluster.pos as [number, number, number],
        size: cluster.size,
      });
    }
    return parts;
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Trunk - tapered and slightly curved look */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.3, 1.8, 8]} />
        <meshStandardMaterial color="#b97a57" />
      </mesh>
      {/* Trunk detail */}
      <mesh position={[0.08, 0.5, 0.08]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.5, 6]} />
        <meshStandardMaterial color="#a0694b" />
      </mesh>

      {/* Puffball foliage - soft shaded spheres */}
      {foliageParts.map((part, i) => (
        <mesh key={i} position={part.position} castShadow>
          <sphereGeometry args={[part.size, 12, 12]} />
          <meshStandardMaterial color={mainColor} flatShading />
        </mesh>
      ))}
    </group>
  );
}

// Small bush/shrub
function Bush({ position, color = "#00b894" }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0.35, 0.3, 0.2]} castShadow>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[-0.3, 0.35, -0.15]} castShadow>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  );
}

// Tree collider
function TreeCollider({ position }: { position: [number, number, number] }) {
  const [ref] = useBox(
    () => ({ type: "Static", position: [position[0], 1.5, position[2]], args: [1, 3, 1] }),
    useRef<THREE.Mesh>(null)
  );
  return <mesh ref={ref} visible={false} />;
}

// Single physics-enabled 3D letter block
function PhysicsLetter({ letter, position, color, size = 2 }: {
  letter: string;
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const fontUrl = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_bold.typeface.json";
  const depth = size * 0.5;
  const boxWidth = size * 0.9;
  const boxHeight = size * 1.1;

  const [ref, api] = useBox(
    () => ({
      mass: 5,
      position: [position[0], position[1] + boxHeight / 2 + 0.1, position[2]],
      args: [boxWidth, boxHeight, depth],
      linearDamping: 0.3,
      angularDamping: 0.3,
    }),
    useRef<THREE.Group>(null)
  );

  return (
    <group ref={ref}>
      {/* Invisible collision box for debugging - remove in production */}
      {/* <mesh>
        <boxGeometry args={[boxWidth, boxHeight, depth]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh> */}

      {/* 3D Letter - offset to align with physics box center */}
      <group position={[-boxWidth / 2, -boxHeight / 2, -depth / 2]}>
        <Text3D
          font={fontUrl}
          size={size}
          height={depth}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.02}
          bevelSegments={2}
          castShadow
        >
          {letter}
          <meshStandardMaterial color={color} />
        </Text3D>
      </group>
    </group>
  );
}

// 3D Text - extruded block letters with physics
function NameText3D({ position }: { position: [number, number, number] }) {
  const colors1 = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#a29bfe"];
  const colors2 = ["#fd79a8", "#00b894", "#e17055", "#0984e3", "#6c5ce7", "#00cec9", "#fdcb6e", "#e84393", "#74b9ff", "#55efc4"];

  const letterSpacing = 2.2;
  const letterSpacing2 = 1.6;

  return (
    <group position={position}>
      {/* PARAG - first line */}
      {"PARAG".split("").map((char, i) => (
        <PhysicsLetter
          key={`p-${i}`}
          letter={char}
          position={[(i - 2) * letterSpacing, 0, 0]}
          color={colors1[i]}
          size={2}
        />
      ))}

      {/* AMBILDHUKE - second line */}
      {"AMBILDHUKE".split("").map((char, i) => (
        <PhysicsLetter
          key={`a-${i}`}
          letter={char}
          position={[(i - 4.5) * letterSpacing2, 0, 4]}
          color={colors2[i]}
          size={1.5}
        />
      ))}
    </group>
  );
}

// Bowling pin - fun bumpable object
function BowlingPin({ position }: { position: [number, number, number] }) {
  const [ref] = useBox(
    () => ({ mass: 2, position: [position[0], position[1] + 0.6, position[2]], args: [0.3, 1.2, 0.3] }),
    useRef<THREE.Group>(null)
  );

  return (
    <group ref={ref}>
      {/* Body */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 12]} />
        <meshStandardMaterial color="#ffeaa7" />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.18, 0.3, 12]} />
        <meshStandardMaterial color="#ffeaa7" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#ffeaa7" />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.21, 0.21, 0.15, 12]} />
        <meshStandardMaterial color="#d63031" />
      </mesh>
    </group>
  );
}

// Rock obstacle
function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const [ref] = useSphere(
    () => ({ mass: 50, position: [position[0], position[1] + 0.4 * scale, position[2]], args: [0.5 * scale] }),
    useRef<THREE.Mesh>(null)
  );

  const color = useMemo(() => {
    const colors = ["#636e72", "#b2bec3", "#dfe6e9"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <mesh ref={ref} castShadow scale={scale}>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

// Balloon - decorative
function Balloon({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      {/* String */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 3, 6]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      {/* Balloon */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 2.65, 0]} castShadow>
        <coneGeometry args={[0.15, 0.2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// Bumpable crate - colorful toy style
function Crate({ position, color = "#fdcb6e" }: { position: [number, number, number]; color?: string }) {
  const [ref] = useBox(
    () => ({ mass: 8, position: [position[0], position[1] + 0.5, position[2]], args: [0.9, 0.9, 0.9] }),
    useRef<THREE.Mesh>(null)
  );

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

// Portal door - colorful and inviting
function PortalDoor({ position, rotation = 0, color, carRef, onEnter, label }: {
  position: [number, number, number]; rotation?: number; color: "red" | "blue";
  carRef: React.MutableRefObject<THREE.Vector3>; onEnter: () => void; label: string;
}) {
  const mainColor = color === "red" ? "#ff6b6b" : "#74b9ff";
  const darkColor = color === "red" ? "#d63031" : "#0984e3";
  const entered = useRef(false);

  useFrame(() => {
    if (entered.current) return;
    const dist = carRef.current.distanceTo(new THREE.Vector3(position[0], 0, position[2]));
    if (dist < 4) { entered.current = true; onEnter(); }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Archway frame */}
      <mesh position={[-2.2, 2, 0]} castShadow>
        <boxGeometry args={[0.8, 4.5, 1]} />
        <meshStandardMaterial color={darkColor} />
      </mesh>
      <mesh position={[2.2, 2, 0]} castShadow>
        <boxGeometry args={[0.8, 4.5, 1]} />
        <meshStandardMaterial color={darkColor} />
      </mesh>
      <mesh position={[0, 4.5, 0]} castShadow>
        <boxGeometry args={[5.2, 1, 1]} />
        <meshStandardMaterial color={darkColor} />
      </mesh>

      {/* Arch top */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <cylinderGeometry args={[1.8, 1.8, 1, 16, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color={darkColor} />
      </mesh>

      {/* Portal glow */}
      <mesh position={[0, 2, 0.3]}>
        <planeGeometry args={[3.6, 4]} />
        <meshStandardMaterial color={mainColor} emissive={mainColor} emissiveIntensity={0.8} transparent opacity={0.9} />
      </mesh>

      {/* Portal particles/stars */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 3, 1 + Math.random() * 2.5, 0.4]}>
          <sphereGeometry args={[0.08 + Math.random() * 0.08, 6, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Ground glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 2]}>
        <circleGeometry args={[3.5, 24]} />
        <meshStandardMaterial color={mainColor} transparent opacity={0.4} emissive={mainColor} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Main scene
function GameScene({ onFinish, gameStarted }: { onFinish: (choice: "red" | "blue") => void; gameStarted: boolean }) {
  const carPosition = useRef(new THREE.Vector3(0, 0.6, 0));

  // Grass tufts scattered in grass patches
  const grassTufts = useMemo(() => {
    const tufts: [number, number, number][] = [];
    const patchCenters = [
      [-25, 0], [25, 0], [-20, 25], [20, -20], [0, -25], [-30, -15], [30, 15],
      [-15, 30], [15, -30], [35, -5], [-35, 5]
    ];
    for (const [cx, cz] of patchCenters) {
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 6;
        tufts.push([cx + Math.cos(angle) * dist, 0, cz + Math.sin(angle) * dist]);
      }
    }
    return tufts;
  }, []);

  return (
    <>
      {/* Bright cheerful lighting */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[30, 60, 20]}
        intensity={1.2}
        color="#ffeaa7"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={150}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <hemisphereLight args={["#74b9ff", "#55efc4", 0.3]} />

      {/* Bright sky */}
      <color attach="background" args={["#81ecec"]} />
      <fog attach="fog" args={["#81ecec", 60, 150]} />

      <Ground />

      {/* Grass tufts */}
      {grassTufts.map((pos, i) => (
        <GrassTuft key={i} position={pos} />
      ))}

      {/* Trees - colorful variety */}
      {[
        { pos: [-22, -20], color: "green", scale: 1.2 },
        { pos: [-30, 5], color: "pink", scale: 1 },
        { pos: [-25, 25], color: "orange", scale: 1.1 },
        { pos: [25, -22], color: "lightgreen", scale: 1 },
        { pos: [30, 8], color: "pink", scale: 1.3 },
        { pos: [28, 22], color: "yellow", scale: 0.9 },
        { pos: [-18, -32], color: "purple", scale: 1 },
        { pos: [12, -28], color: "green", scale: 1.1 },
        { pos: [-28, 35], color: "orange", scale: 1.2 },
        { pos: [35, -12], color: "pink", scale: 0.9 },
        { pos: [-35, -8], color: "lightgreen", scale: 1 },
        { pos: [40, 18], color: "green", scale: 1.1 },
      ].map((tree, i) => (
        <group key={i}>
          <FluffyTree position={[tree.pos[0], 0, tree.pos[1]]} color={tree.color} scale={tree.scale} />
          <TreeCollider position={[tree.pos[0], 0, tree.pos[1]]} />
        </group>
      ))}

      {/* Bushes */}
      {[
        [-15, 8], [14, 6], [-8, -15], [10, -12], [-18, 18], [16, 16],
      ].map(([x, z], i) => (
        <Bush key={i} position={[x, 0, z]} color={["#00b894", "#55efc4", "#00cec9"][i % 3]} />
      ))}

      {/* Name text - center stage */}
      <NameText3D position={[0, 0, -10]} />

      {/* Colorful crates to bump */}
      <Crate position={[-6, 0, 8]} color="#ff6b6b" />
      <Crate position={[7, 0, 6]} color="#74b9ff" />
      <Crate position={[-5, 0, -3]} color="#ffd93d" />
      <Crate position={[6, 0, -2]} color="#6bcb77" />
      <Crate position={[0, 0, 12]} color="#a29bfe" />

      {/* Bowling pins - fun to knock over */}
      {[
        [-3, 15], [-2.5, 16], [-3.5, 16], [-2, 17], [-3, 17], [-4, 17],
        [3, 15], [3.5, 16], [2.5, 16], [4, 17], [3, 17], [2, 17],
      ].map(([x, z], i) => (
        <BowlingPin key={i} position={[x, 0, z]} />
      ))}

      {/* Rocks */}
      <Rock position={[-12, 0, -5]} scale={1.2} />
      <Rock position={[11, 0, -6]} scale={0.9} />
      <Rock position={[-14, 0, 12]} scale={1} />
      <Rock position={[13, 0, 10]} scale={1.1} />

      {/* Balloons - decorative */}
      <Balloon position={[-10, 0, 28]} color="#ff6b6b" />
      <Balloon position={[-8, 0, 30]} color="#ffd93d" />
      <Balloon position={[8, 0, 28]} color="#74b9ff" />
      <Balloon position={[10, 0, 30]} color="#6bcb77" />

      {/* Portal doors */}
      <PortalDoor position={[-12, 0, 35]} rotation={0.15} color="red" carRef={carPosition} onEnter={() => onFinish("red")} label="THE REAL ME" />
      <PortalDoor position={[12, 0, 35]} rotation={-0.15} color="blue" carRef={carPosition} onEnter={() => onFinish("blue")} label="PROFESSIONAL" />

      {/* Car */}
      {gameStarted && (
        <>
          <Truck onPositionUpdate={(pos) => carPosition.current.copy(pos)} carRef={carPosition} />
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
    <motion.div className="fixed inset-0 z-[9999] bg-black overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Canvas shadows camera={{ position: [0, 18, -14], fov: 55 }}>
        <Physics gravity={[0, -40, 0]} broadphase="SAP" allowSleep={false}>
          <GameScene onFinish={handleFinish} gameStarted={gameStarted} />
        </Physics>
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-6 left-0 right-0 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {!gameStarted && (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 drop-shadow-lg mb-2">CHOOSE YOUR PATH</h1>
              <p className="text-gray-600 text-lg">Drive around and explore!</p>
            </>
          )}
          {gameStarted && !finished && (
            <p className="text-gray-700 text-sm bg-white/50 inline-block px-4 py-2 rounded-full">
              WASD / Arrow Keys to drive • Drive into a door to choose
            </p>
          )}
        </motion.div>

        <AnimatePresence>
          {!gameStarted && !finished && (
            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.button
                className="px-12 py-6 bg-white hover:bg-gray-100 text-gray-900 font-bold text-2xl rounded-2xl shadow-2xl"
                onClick={() => setGameStarted(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START DRIVING
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {gameStarted && !finished && (
          <>
            <div className="absolute bottom-6 left-6 text-white font-bold text-lg drop-shadow-lg bg-red-600/80 px-4 py-2 rounded-lg">← THE REAL ME</div>
            <div className="absolute bottom-6 right-6 text-white font-bold text-lg drop-shadow-lg bg-blue-600/80 px-4 py-2 rounded-lg">PROFESSIONAL →</div>
          </>
        )}

        <AnimatePresence>
          {finished && selectedDoor && (
            <motion.div className={`absolute inset-0 flex items-center justify-center ${selectedDoor === "red" ? "bg-red-600/90" : "bg-blue-600/90"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div className="text-center text-white" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <p className="text-5xl md:text-7xl font-bold mb-4">{selectedDoor === "red" ? "THE REAL ME" : "PROFESSIONAL"}</p>
                <p className="text-xl opacity-80">Loading...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {gameStarted && !finished && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden pointer-events-auto">
            <button className="w-16 h-16 bg-white/80 rounded-full text-2xl font-bold shadow-lg" onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyW" }))} onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyW" }))}>▲</button>
            <div className="flex gap-2">
              <button className="w-16 h-16 bg-white/80 rounded-full text-2xl font-bold shadow-lg" onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyA" }))} onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyA" }))}>◀</button>
              <button className="w-16 h-16 bg-white/80 rounded-full text-2xl font-bold shadow-lg" onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyS" }))} onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyS" }))}>▼</button>
              <button className="w-16 h-16 bg-white/80 rounded-full text-2xl font-bold shadow-lg" onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyD" }))} onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyD" }))}>▶</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
