// RobotViewer.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function RobotModel() {
  const { scene } = useGLTF("/models/cute_robot_companion.glb");
  return <primitive object={scene} scale={1.2} />;
}

export default function RobotViewer() {
  return (
    <div className="w-full h-[400px] sm:h-[500px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <RobotModel />
        </Suspense>
        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
}
