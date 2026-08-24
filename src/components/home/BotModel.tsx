"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import * as THREE from "three";

function centerAndScale(object: THREE.Object3D, targetSize: number) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = targetSize / maxDim;
  object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  object.scale.setScalar(scale);
}

function ObjModel({ modelPath, objFile, pngFile, modelScale }: { modelPath: string; objFile: string; pngFile: string; modelScale: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const texture = useLoader(THREE.TextureLoader, `${modelPath}/${pngFile}`);
  const obj = useLoader(OBJLoader, `${modelPath}/${objFile}`);

  const clonedObj = useMemo(() => {
    const clone = obj.clone(true);
    const clonedTexture = texture.clone();
    clonedTexture.flipY = false;
    clonedTexture.colorSpace = THREE.SRGBColorSpace;
    clonedTexture.needsUpdate = true;

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: clonedTexture,
          emissiveMap: clonedTexture,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.65,
          metalness: 0.1,
          roughness: 0.7,
        });
      }
    });

    centerAndScale(clone, modelScale);
    return clone;
  }, [obj, texture, modelScale]);

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

function GlbModel({ modelPath, glbFile, modelScale }: { modelPath: string; glbFile: string; modelScale: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(
    `${modelPath}/${glbFile}`,
    undefined,
    undefined,
    (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );

  // Clone the scene so each bot gets its own independent copy.
  // useGLTF returns a shared/cached scene - without cloning, only one
  // component can own it at a time in the Three.js scene graph.
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone();
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.map) {
          mat.map = mat.map.clone();
          mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.emissiveMap = mat.map;
          mat.emissive = new THREE.Color(0xffffff);
          mat.emissiveIntensity = 0.65;
          mat.metalness = 0.1;
          mat.roughness = 0.7;
          mat.needsUpdate = true;
        }
      }
    });
    centerAndScale(clone, modelScale);
    return clone;
  }, [scene, modelScale]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
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
  modelScale = 2.25,
  fov = 35,
  className = "relative mx-auto aspect-square w-full max-w-[320px]",
}: {
  modelPath: string;
  objFile?: string;
  pngFile?: string;
  glbFile?: string;
  color: string;
  modelScale?: number;
  fov?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} />
        <pointLight position={[0, -2, 0]} intensity={0.3} color={color} />
        <Suspense fallback={<LoadingFallback color={color} />}>
          {glbFile ? (
            <GlbModel modelPath={modelPath} glbFile={glbFile} modelScale={modelScale} />
          ) : objFile && pngFile ? (
            <ObjModel modelPath={modelPath} objFile={objFile} pngFile={pngFile} modelScale={modelScale} />
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
