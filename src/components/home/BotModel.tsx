"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import * as THREE from "three";

function centerAndScale(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2.5 / maxDim;
  object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  object.scale.setScalar(scale);
}

function ObjModel({ modelPath, objFile, pngFile }: { modelPath: string; objFile: string; pngFile: string }) {
  const groupRef = useRef<THREE.Group>(null);

  const texture = useLoader(THREE.TextureLoader, `${modelPath}/${pngFile}`);
  const obj = useLoader(OBJLoader, `${modelPath}/${objFile}`);

  const clonedObj = useMemo(() => {
    const clone = obj.clone(true);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.2,
          roughness: 0.6,
        });
      }
    });

    centerAndScale(clone);
    return clone;
  }, [obj, texture]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedObj} />
    </group>
  );
}

function GlbModel({ modelPath, glbFile }: { modelPath: string; glbFile: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(
    `${modelPath}/${glbFile}`,
    undefined,
    undefined,
    (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );

  // One-time setup: fix texture color space and center/scale.
  // Mutates the cached scene in place; safe because only one component uses it.
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial | undefined;
        if (mat && "map" in mat && mat.map) {
          mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.needsUpdate = true;
        }
      }
    });
    centerAndScale(scene);
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export function BotModel({
  modelPath,
  objFile,
  pngFile,
  glbFile,
  color,
}: {
  modelPath: string;
  objFile?: string;
  pngFile?: string;
  glbFile?: string;
  color: string;
}) {
  return (
    <div className="relative aspect-square w-full max-w-[320px] mx-auto">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 40 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} />
        <pointLight position={[0, -2, 0]} intensity={0.3} color={color} />
        <Suspense fallback={<LoadingFallback color={color} />}>
          {glbFile ? (
            <GlbModel modelPath={modelPath} glbFile={glbFile} />
          ) : objFile && pngFile ? (
            <ObjModel modelPath={modelPath} objFile={objFile} pngFile={pngFile} />
          ) : null}
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
