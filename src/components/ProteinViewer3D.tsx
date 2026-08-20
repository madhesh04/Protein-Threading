import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProteinViewer3DProps {
  foldType?: 'tim_barrel' | 'alpha_bundle' | 'beta_sandwich' | 'rossmann_fold' | 'membrane_bundle';
  colorTheme?: 'cyan' | 'magenta' | 'amber_fit' | 'coral_unfit' | 'lime_predicted' | 'hydrophobicity';
  showThreadingFlow?: boolean;
  height?: number | string;
  autoRotate?: boolean;
  interactive?: boolean;
  wireframeOnly?: boolean;
}

export const ProteinViewer3D: React.FC<ProteinViewer3DProps> = ({
  foldType = 'tim_barrel',
  colorTheme = 'cyan',
  showThreadingFlow = true,
  height = 360,
  autoRotate = true,
  interactive = true,
  wireframeOnly = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(autoRotate);
  const [renderMode, setRenderMode] = useState<'ribbon' | 'atoms' | 'scaffold'>('ribbon');
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const proteinGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const heightPx = typeof height === 'number' ? height : container.clientHeight || 360;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(0, 5, 26);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.5);
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 1.2);
    dirLight2.position.set(-15, -10, -15);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Build Protein Geometry
    const proteinGroup = new THREE.Group();
    proteinGroupRef.current = proteinGroup;
    scene.add(proteinGroup);

    const generateBackboneCurves = (type: string): THREE.CurvePath<THREE.Vector3>[] => {
      const paths: THREE.CurvePath<THREE.Vector3>[] = [];

      if (type === 'alpha_bundle') {
        // 4 antiparallel helices
        const radius = 3.2;
        for (let h = 0; h < 4; h++) {
          const angle = (h * Math.PI) / 2 + Math.PI / 4;
          const x0 = Math.cos(angle) * radius;
          const z0 = Math.sin(angle) * radius;
          const dir = h % 2 === 0 ? 1 : -1;
          const points: THREE.Vector3[] = [];
          const turns = 4.5;
          const totalPoints = 60;
          for (let p = 0; p <= totalPoints; p++) {
            const t = (p / totalPoints) * 2 - 1; // -1 to 1
            const y = t * 6 * dir;
            const helixAngle = t * Math.PI * 2 * turns;
            const hr = 0.9;
            points.push(new THREE.Vector3(x0 + Math.cos(helixAngle) * hr, y, z0 + Math.sin(helixAngle) * hr));
          }
          const curve = new THREE.CatmullRomCurve3(points);
          const path = new THREE.CurvePath<THREE.Vector3>();
          path.add(curve);
          paths.push(path);
        }
      } else if (type === 'beta_sandwich') {
        // 2 opposing sheets with 4 strands each
        for (let sheet = 0; sheet < 2; sheet++) {
          const zOffset = sheet === 0 ? 2.2 : -2.2;
          for (let strand = 0; strand < 4; strand++) {
            const x = (strand - 1.5) * 2.2;
            const dir = strand % 2 === 0 ? 1 : -1;
            const points: THREE.Vector3[] = [];
            for (let i = 0; i <= 20; i++) {
              const t = (i / 20) * 2 - 1;
              const y = t * 5.5 * dir;
              const pleat = Math.sin(t * Math.PI * 6) * 0.4;
              points.push(new THREE.Vector3(x, y, zOffset + pleat));
            }
            const curve = new THREE.CatmullRomCurve3(points);
            const path = new THREE.CurvePath<THREE.Vector3>();
            path.add(curve);
            paths.push(path);
          }
        }
      } else if (type === 'rossmann_fold') {
        // Mixed beta sheet core + flanking helices
        for (let s = 0; s < 5; s++) {
          const x = (s - 2) * 1.8;
          const points: THREE.Vector3[] = [];
          for (let i = 0; i <= 20; i++) {
            const t = (i / 20) * 2 - 1;
            points.push(new THREE.Vector3(x, t * 4.5, Math.sin(t * Math.PI * 4) * 0.35));
          }
          const curve = new THREE.CatmullRomCurve3(points);
          const path = new THREE.CurvePath<THREE.Vector3>();
          path.add(curve);
          paths.push(path);
        }
        // Flanking helices
        [-4, 4].forEach((xOffset, idx) => {
          const points: THREE.Vector3[] = [];
          for (let p = 0; p <= 40; p++) {
            const t = (p / 40) * 2 - 1;
            const y = t * 4.5 * (idx === 0 ? 1 : -1);
            const angle = t * Math.PI * 6;
            points.push(new THREE.Vector3(xOffset + Math.cos(angle) * 0.8, y, (idx === 0 ? 2 : -2) + Math.sin(angle) * 0.8));
          }
          const curve = new THREE.CatmullRomCurve3(points);
          const path = new THREE.CurvePath<THREE.Vector3>();
          path.add(curve);
          paths.push(path);
        });
      } else if (type === 'membrane_bundle') {
        // 7 transmembrane helices
        const radius = 4.2;
        for (let h = 0; h < 7; h++) {
          const angle = (h * Math.PI * 2) / 7;
          const x0 = Math.cos(angle) * radius;
          const z0 = Math.sin(angle) * radius;
          const dir = h % 2 === 0 ? 1 : -1;
          const points: THREE.Vector3[] = [];
          for (let p = 0; p <= 50; p++) {
            const t = (p / 50) * 2 - 1;
            const y = t * 6.5 * dir;
            const helixAngle = t * Math.PI * 7;
            points.push(new THREE.Vector3(x0 + Math.cos(helixAngle) * 0.85, y, z0 + Math.sin(helixAngle) * 0.85));
          }
          const curve = new THREE.CatmullRomCurve3(points);
          const path = new THREE.CurvePath<THREE.Vector3>();
          path.add(curve);
          paths.push(path);
        }
      } else {
        // Default TIM Barrel (8 beta inner + 8 alpha outer)
        const innerR = 3.0;
        const outerR = 5.6;
        for (let s = 0; s < 8; s++) {
          const angle = (s * Math.PI * 2) / 8;
          const x0 = Math.cos(angle) * innerR;
          const z0 = Math.sin(angle) * innerR;
          // Inner parallel strand
          const pointsStrand: THREE.Vector3[] = [];
          for (let i = 0; i <= 20; i++) {
            const t = (i / 20) * 2 - 1;
            const y = t * 4.2;
            const twist = t * 0.3;
            pointsStrand.push(new THREE.Vector3(Math.cos(angle + twist) * innerR, y, Math.sin(angle + twist) * innerR));
          }
          const curveStrand = new THREE.CatmullRomCurve3(pointsStrand);
          const pathStrand = new THREE.CurvePath<THREE.Vector3>();
          pathStrand.add(curveStrand);
          paths.push(pathStrand);

          // Outer antiparallel helix
          const helixAngle0 = angle + Math.PI / 8;
          const xH = Math.cos(helixAngle0) * outerR;
          const zH = Math.sin(helixAngle0) * outerR;
          const pointsHelix: THREE.Vector3[] = [];
          for (let p = 0; p <= 35; p++) {
            const t = (p / 35) * 2 - 1;
            const y = -t * 4.6; // antiparallel
            const hr = 0.75;
            const hRot = t * Math.PI * 5;
            pointsHelix.push(new THREE.Vector3(xH + Math.cos(hRot) * hr, y, zH + Math.sin(hRot) * hr));
          }
          const curveHelix = new THREE.CatmullRomCurve3(pointsHelix);
          const pathHelix = new THREE.CurvePath<THREE.Vector3>();
          pathHelix.add(curveHelix);
          paths.push(pathHelix);
        }
      }
      return paths;
    };

    const getColorHex = (theme: string): number => {
      switch (theme) {
        case 'magenta':
          return 0xf43f5e;
        case 'amber_fit':
          return 0xf59e0b;
        case 'coral_unfit':
          return 0xef4444;
        case 'lime_predicted':
          return 0x84cc16;
        case 'hydrophobicity':
          return 0xd97706;
        case 'cyan':
        default:
          return 0x06b6d4;
      }
    };

    const baseColor = getColorHex(colorTheme);

    // Build Ribbons & Atom Nodes
    const paths = generateBackboneCurves(foldType);
    const atomSpheres: THREE.Vector3[] = [];

    paths.forEach((path, idx) => {
      // Tube Geometry
      const tubeGeo = new THREE.TubeGeometry(path.curves[0], 48, wireframeOnly ? 0.12 : 0.42, 8, false);
      const isCore = idx % 2 === 0;
      let meshColor = baseColor;

      if (colorTheme === 'hydrophobicity') {
        meshColor = isCore ? 0xf59e0b : 0x06b6d4; // Amber core vs Cyan surface
      }

      const material = new THREE.MeshStandardMaterial({
        color: meshColor,
        roughness: 0.25,
        metalness: 0.4,
        wireframe: wireframeOnly || renderMode === 'scaffold',
        emissive: meshColor,
        emissiveIntensity: colorTheme === 'lime_predicted' ? 0.35 : 0.15,
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, material);
      proteinGroup.add(tubeMesh);

      // Collect sample points for atom representation
      const points = path.getPoints(14);
      points.forEach((pt) => atomSpheres.push(pt));
    });

    // Atom Spheres / Bead Nodes
    if (renderMode === 'atoms') {
      const sphereGeo = new THREE.SphereGeometry(0.5, 12, 12);
      atomSpheres.forEach((pos, i) => {
        const sphereMat = new THREE.MeshStandardMaterial({
          color: i % 3 === 0 ? 0xf43f5e : i % 3 === 1 ? 0x06b6d4 : 0xfbbf24,
          roughness: 0.3,
          metalness: 0.6,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.copy(pos);
        proteinGroup.add(sphere);
      });
    }

    // Threading flowing particle stream
    if (showThreadingFlow) {
      const particleCount = 75;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const theta = (i / particleCount) * Math.PI * 8;
        const r = 2.5 + Math.sin(i * 0.4) * 2;
        positions[i * 3] = Math.cos(theta) * r;
        positions[i * 3 + 1] = (i / particleCount) * 14 - 7;
        positions[i * 3 + 2] = Math.sin(theta) * r;

        // Colors
        if (i % 3 === 0) {
          colors[i * 3] = 0.96; colors[i * 3 + 1] = 0.25; colors[i * 3 + 2] = 0.37; // Magenta
        } else if (i % 3 === 1) {
          colors[i * 3] = 0.02; colors[i * 3 + 1] = 0.71; colors[i * 3 + 2] = 0.83; // Cyan
        } else {
          colors[i * 3] = 0.96; colors[i * 3 + 1] = 0.62; colors[i * 3 + 2] = 0.04; // Amber
        }
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.65,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      particlesRef.current = particleSystem;
      proteinGroup.add(particleSystem);
    }

    // Mouse Interaction (Orbiting)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      proteinGroup.rotation.y += deltaX * 0.01;
      proteinGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        proteinGroup.rotation.y += 0.007;
        proteinGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15;
      }

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 1] += 0.04;
          if (positions[i * 3 + 1] > 7) {
            positions[i * 3 + 1] = -7;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = typeof height === 'number' ? height : container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [foldType, colorTheme, showThreadingFlow, height, isRotating, renderMode, interactive, wireframeOnly]);

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-[#0c0822]/80 border border-slate-800/80 shadow-2xl backdrop-blur-md">
      <div
        ref={containerRef}
        style={{ height }}
        className="w-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating Control Overlay */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/70 border border-slate-700/60 rounded-xl p-1 backdrop-blur-md z-10">
        <button
          onClick={() => setIsRotating(!isRotating)}
          title={isRotating ? 'Pause Rotation' : 'Resume Rotation'}
          className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
            isRotating ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          {isRotating ? '⟳ Orbiting' : '❚❚ Paused'}
        </button>

        <div className="h-3.5 w-px bg-slate-800" />

        <button
          onClick={() => setRenderMode(renderMode === 'ribbon' ? 'atoms' : renderMode === 'atoms' ? 'scaffold' : 'ribbon')}
          title="Toggle Rendering Style"
          className="px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800/60 rounded-lg hover:bg-slate-700/60 transition-all capitalize"
        >
          {renderMode}
        </button>
      </div>

      <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400/80 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800/60 pointer-events-none backdrop-blur-sm">
        Click & drag to rotate 3D fold
      </div>
    </div>
  );
};
