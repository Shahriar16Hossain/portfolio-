"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { sound } from "@/lib/audio";
import { Play, SkipForward, Volume2, VolumeX, Compass, Navigation, Eye } from "lucide-react";

interface Bangladesh2050CinematicProps {
  onComplete: () => void;
}

export function Bangladesh2050Cinematic({ onComplete }: Bangladesh2050CinematicProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoPiloting, setIsAutoPiloting] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [hudStats, setHudStats] = useState({
    altitude: 15400,
    speed: 380,
    distanceToTarget: 2200,
    phase: "HIGH ORBIT RECON"
  });

  // Target scroll state for smooth lerping
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const autoPilotTimerRef = useRef<number | null>(null);

  const handleSkip = useCallback(() => {
    sound.playWarpEntry();
    onComplete();
  }, [onComplete]);

  // Handle keyboard shortcuts (ESC to skip, Space to toggle autopilot)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoPiloting((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animFrameId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04060d);
    scene.fog = new THREE.FogExp2(0x060b18, 0.00085);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 8000);
    camera.position.set(0, 1600, 2400);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Resize Handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0x1a263d, 1.4);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x00f2fe, 1.8);
    moonLight.position.set(500, 1800, 1000);
    scene.add(moonLight);

    const cityGlowLight = new THREE.PointLight(0x10b981, 2.5, 3000);
    cityGlowLight.position.set(0, 300, 0);
    scene.add(cityGlowLight);

    // ==========================================
    // PROCEDURAL TEXTURES GENERATION (Zero External Assets)
    // ==========================================

    // Skyscraper Window Texture
    const createBuildingTexture = (primaryColor: string, secondaryColor: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 256;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#070c18";
      ctx.fillRect(0, 0, 128, 256);

      // Grid of futuristic glowing windows
      for (let y = 8; y < 248; y += 14) {
        for (let x = 8; x < 120; x += 12) {
          const rand = Math.random();
          if (rand > 0.45) {
            ctx.fillStyle = rand > 0.85 ? primaryColor : secondaryColor;
            ctx.fillRect(x, y, 7, 9);
          }
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const cyanBuildingTex = createBuildingTexture("#00f2fe", "#0284c7");
    const emeraldBuildingTex = createBuildingTexture("#10b981", "#059669");
    const amberBuildingTex = createBuildingTexture("#f59e0b", "#d97706");
    const violetBuildingTex = createBuildingTexture("#a855f7", "#7c3aed");

    // Holographic Billboard Texture Generator
    const createBillboardTexture = (text: string, sub: string, color: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "rgba(4, 8, 20, 0.85)";
      ctx.fillRect(0, 0, 512, 256);

      // Neon Frame
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.strokeRect(8, 8, 496, 240);

      // Neon Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText(text, 256, 120);

      ctx.fillStyle = color;
      ctx.font = "bold 20px monospace";
      ctx.fillText(sub, 256, 165);

      // Scanlines
      ctx.strokeStyle = "rgba(0,0,0,0.4)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 256; i += 6) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      return new THREE.CanvasTexture(canvas);
    };

    // ==========================================
    // PROCEDURAL BANGLADESH 2050 METROPOLIS
    // ==========================================

    // Ground Plane with Cyber Grid
    const groundGeo = new THREE.PlaneGeometry(6000, 6000, 60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x050811,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: true
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // River / Quantum Waterway (Padma / Buriganga 2050)
    const riverGeo = new THREE.PlaneGeometry(800, 6000);
    const riverMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.35,
      wireframe: false
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(-600, 2, 0);
    scene.add(river);

    // City Skyscraper Cluster (140 Buildings)
    const buildingMaterials = [
      new THREE.MeshStandardMaterial({ map: cyanBuildingTex, roughness: 0.3, metalness: 0.7 }),
      new THREE.MeshStandardMaterial({ map: emeraldBuildingTex, roughness: 0.3, metalness: 0.7 }),
      new THREE.MeshStandardMaterial({ map: amberBuildingTex, roughness: 0.3, metalness: 0.7 }),
      new THREE.MeshStandardMaterial({ map: violetBuildingTex, roughness: 0.3, metalness: 0.7 })
    ];

    const buildingsGroup = new THREE.Group();
    scene.add(buildingsGroup);

    const cityRadius = 2400;
    const towerCount = 130;

    for (let i = 0; i < towerCount; i++) {
      // Keep center clear for target Tower 50 and camera dive corridor
      const angle = Math.random() * Math.PI * 2;
      const dist = 160 + Math.random() * (cityRadius - 160);
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      // Don't build right in front of camera path
      if (Math.abs(x) < 80 && z > -100 && z < 700) continue;

      const width = 60 + Math.random() * 80;
      const depth = 60 + Math.random() * 80;
      const height = 180 + Math.random() * 600;

      const mat = buildingMaterials[Math.floor(Math.random() * buildingMaterials.length)];
      const geo = new THREE.BoxGeometry(width, height, depth);
      const bMesh = new THREE.Mesh(geo, mat);
      bMesh.position.set(x, height / 2, z);
      buildingsGroup.add(bMesh);

      // Neon rooftop antenna spires
      if (Math.random() > 0.4) {
        const spireGeo = new THREE.CylinderGeometry(1, 2, 60 + Math.random() * 80);
        const spireMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.position.set(x, height + 30, z);
        buildingsGroup.add(spire);

        // Blinking beacon light
        const beaconGeo = new THREE.SphereGeometry(3, 8, 8);
        const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff0044 });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(x, height + 60, z);
        buildingsGroup.add(beacon);
      }
    }

    // Holographic Floating Billboards
    const billboard1Tex = createBillboardTexture("NEO-DHAKA 2050", "SMART REPUBLIC // ADVANCED METROPOLIS", "#00f2fe");
    const billboard2Tex = createBillboardTexture("SHAHRIAR DESIGN LAB", "TOWER 50 // 50TH FL STUDIO", "#10b981");
    const billboard3Tex = createBillboardTexture("PADMA QUANTUM SKYWAY", "AUTONOMOUS AIR CORRIDOR 07", "#a855f7");

    const bbGeo = new THREE.PlaneGeometry(180, 90);
    const bb1 = new THREE.Mesh(bbGeo, new THREE.MeshBasicMaterial({ map: billboard1Tex, side: THREE.DoubleSide, transparent: true }));
    bb1.position.set(160, 420, 400);
    bb1.rotation.y = -Math.PI / 4;
    scene.add(bb1);

    const bb2 = new THREE.Mesh(bbGeo, new THREE.MeshBasicMaterial({ map: billboard2Tex, side: THREE.DoubleSide, transparent: true }));
    bb2.position.set(-180, 520, 200);
    bb2.rotation.y = Math.PI / 5;
    scene.add(bb2);

    const bb3 = new THREE.Mesh(bbGeo, new THREE.MeshBasicMaterial({ map: billboard3Tex, side: THREE.DoubleSide, transparent: true }));
    bb3.position.set(240, 320, -100);
    scene.add(bb3);

    // ==========================================
    // FLYING SKY-CARS & AERIAL TRAFFIC LANES
    // ==========================================
    interface FlyingCar {
      mesh: THREE.Group;
      speed: number;
      radius: number;
      angle: number;
      y: number;
    }

    const flyingCars: FlyingCar[] = [];
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    for (let i = 0; i < 35; i++) {
      const car = new THREE.Group();

      // Cyber speeder body
      const bodyGeo = new THREE.BoxGeometry(10, 3.5, 22);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      car.add(body);

      // Headlights (cyan)
      const headMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
      const headGeo = new THREE.BoxGeometry(2, 1, 1);
      const h1 = new THREE.Mesh(headGeo, headMat);
      h1.position.set(-3.5, 0, -11);
      const h2 = new THREE.Mesh(headGeo, headMat);
      h2.position.set(3.5, 0, -11);
      car.add(h1);
      car.add(h2);

      // Tail lights & neon light trails (red/amber)
      const tailMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
      const tailGeo = new THREE.BoxGeometry(3, 1, 1);
      const t1 = new THREE.Mesh(tailGeo, tailMat);
      t1.position.set(0, 0, 11);
      car.add(t1);

      // Light trail ribbon behind car
      const trailGeo = new THREE.BoxGeometry(1.5, 0.8, 30);
      const trailMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.6 });
      const trail = new THREE.Mesh(trailGeo, trailMat);
      trail.position.set(0, 0, 26);
      car.add(trail);

      const radius = 250 + Math.random() * 900;
      const altitude = 240 + Math.random() * 450;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.003 + Math.random() * 0.005;

      car.position.set(Math.cos(angle) * radius, altitude, Math.sin(angle) * radius);
      carGroup.add(car);

      flyingCars.push({ mesh: car, speed, radius, angle, y: altitude });
    }

    // ==========================================
    // THE TARGET: TOWER 50 & 50TH FLOOR STUDIO
    // ==========================================
    const tower50Group = new THREE.Group();
    scene.add(tower50Group);

    // Tower 50 Main Skyscraper Body (Height: 650)
    const towerGeo = new THREE.BoxGeometry(110, 650, 110);
    const towerMat = new THREE.MeshStandardMaterial({
      map: emeraldBuildingTex,
      roughness: 0.2,
      metalness: 0.85
    });
    const towerMesh = new THREE.Mesh(towerGeo, towerMat);
    towerMesh.position.set(0, 325, 0);
    tower50Group.add(towerMesh);

    // Neon structural ribs
    const ribGeo = new THREE.BoxGeometry(114, 650, 2);
    const ribMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const rib1 = new THREE.Mesh(ribGeo, ribMat);
    rib1.position.set(0, 325, 56);
    tower50Group.add(rib1);

    // 50th Floor Window Pod (y = 500)
    // The Room Geometry: Cutout Studio Pod inside the tower at y = 500
    const roomWidth = 90;
    const roomHeight = 35;
    const roomDepth = 80;

    const roomGroup = new THREE.Group();
    roomGroup.position.set(0, 500, 15);
    tower50Group.add(roomGroup);

    // Room Walls & Floor
    const roomMat = new THREE.MeshStandardMaterial({ color: 0x070b16, roughness: 0.7 });
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0b1120, roughness: 0.2, metalness: 0.8 });

    // Studio Floor
    const studioFloor = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, 1, roomDepth), floorMat);
    studioFloor.position.set(0, -roomHeight / 2, 0);
    roomGroup.add(studioFloor);

    // Studio Ceiling with neon light strips
    const studioCeil = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, 1, roomDepth), roomMat);
    studioCeil.position.set(0, roomHeight / 2, 0);
    roomGroup.add(studioCeil);

    const ceilStripMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const ceilStrip = new THREE.Mesh(new THREE.BoxGeometry(roomWidth - 20, 0.5, 4), ceilStripMat);
    ceilStrip.position.set(0, roomHeight / 2 - 1, 0);
    roomGroup.add(ceilStrip);

    // Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, roomHeight, 1), roomMat);
    backWall.position.set(0, 0, -roomDepth / 2);
    roomGroup.add(backWall);

    // Left & Right Walls
    const sideWallGeo = new THREE.BoxGeometry(1, roomHeight, roomDepth);
    const leftWall = new THREE.Mesh(sideWallGeo, roomMat);
    leftWall.position.set(-roomWidth / 2, 0, 0);
    roomGroup.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeo, roomMat);
    rightWall.position.set(roomWidth / 2, 0, 0);
    roomGroup.add(rightWall);

    // Floor-to-Ceiling Front Window Glass (Facing the approaching drone)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5
    });
    const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomHeight), glassMat);
    windowGlass.position.set(0, 0, roomDepth / 2);
    roomGroup.add(windowGlass);

    // Neon Frame around 50th floor window
    const frameGeo = new THREE.BoxGeometry(roomWidth + 4, 3, 3);
    const frameMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const fTop = new THREE.Mesh(frameGeo, frameMat);
    fTop.position.set(0, roomHeight / 2 + 1, roomDepth / 2 + 1);
    roomGroup.add(fTop);

    const fBot = new THREE.Mesh(frameGeo, frameMat);
    fBot.position.set(0, -roomHeight / 2 - 1, roomDepth / 2 + 1);
    roomGroup.add(fBot);

    // Outside Window Sign: "SHAHRIAR // 50TH FL STUDIO"
    const signCanvas = document.createElement("canvas");
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sCtx = signCanvas.getContext("2d")!;
    sCtx.fillStyle = "rgba(0,0,0,0.8)";
    sCtx.fillRect(0, 0, 512, 128);
    sCtx.fillStyle = "#00f2fe";
    sCtx.font = "bold 32px monospace";
    sCtx.textAlign = "center";
    sCtx.fillText("SHAHRIAR HOSSAIN", 256, 50);
    sCtx.fillStyle = "#10b981";
    sCtx.font = "bold 20px monospace";
    sCtx.fillText("CREATIVE TECHNOLOGIST // FL 50", 256, 90);
    const signTex = new THREE.CanvasTexture(signCanvas);

    const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(50, 12), new THREE.MeshBasicMaterial({ map: signTex, transparent: true }));
    signMesh.position.set(0, roomHeight / 2 + 8, roomDepth / 2 + 2);
    roomGroup.add(signMesh);

    // Inside the Studio: Workstation Desk
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.8 });
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(45, 1.8, 24), deskMat);
    deskTop.position.set(0, -4, -6);
    roomGroup.add(deskTop);

    // Curved Designer Workstation Monitor (Ultra-Wide Curved Display)
    // Create canvas texture simulating SHAHRIAR.OS boot screen
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 512;
    const scCtx = screenCanvas.getContext("2d")!;

    const renderScreenTexture = () => {
      scCtx.fillStyle = "#07090e";
      scCtx.fillRect(0, 0, 1024, 512);

      // Top bar
      scCtx.fillStyle = "rgba(15, 23, 42, 0.9)";
      scCtx.fillRect(0, 0, 1024, 40);
      scCtx.fillStyle = "#00f2fe";
      scCtx.font = "bold 18px monospace";
      scCtx.fillText("SHAHRIAR.OS v4.2 // WORKSTATION", 24, 26);
      scCtx.fillStyle = "#10b981";
      scCtx.fillText("STATUS: ACTIVE // 2050 AD", 800, 26);

      // Window 1: Case Studies Explorer
      scCtx.strokeStyle = "#00f2fe";
      scCtx.lineWidth = 2;
      scCtx.strokeRect(50, 70, 520, 360);
      scCtx.fillStyle = "rgba(15, 23, 42, 0.75)";
      scCtx.fillRect(50, 70, 520, 360);
      scCtx.fillStyle = "#00f2fe";
      scCtx.font = "bold 16px monospace";
      scCtx.fillText("CASE STUDIES & SYSTEMS ARCHITECTURE", 70, 100);
      scCtx.fillStyle = "#ffffff";
      scCtx.font = "14px monospace";
      scCtx.fillText("• Aether Multi-Platform Design System (+54% vel)", 70, 140);
      scCtx.fillText("• NeuroFlow Multimodal AI Canvas", 70, 180);
      scCtx.fillText("• Vortex Spatial OS (VisionOS / WebXR)", 70, 220);
      scCtx.fillText("• Chronos 3D Audio-Reactive Synthesizer", 70, 260);

      // Window 2: Terminal Shell
      scCtx.strokeStyle = "#10b981";
      scCtx.strokeRect(600, 70, 380, 360);
      scCtx.fillStyle = "rgba(4, 8, 20, 0.9)";
      scCtx.fillRect(600, 70, 380, 360);
      scCtx.fillStyle = "#10b981";
      scCtx.font = "bold 14px monospace";
      scCtx.fillText("shahriar@nexus-os:~$ neofetch", 620, 100);
      scCtx.fillStyle = "#38bdf8";
      scCtx.font = "12px monospace";
      scCtx.fillText("OS: SHAHRIAR.OS v4.2 x86_64", 620, 130);
      scCtx.fillText("Role: Product Designer & Creative Technologist", 620, 160);
      scCtx.fillText("Uptime: 99.9% High Impact Focus", 620, 190);
      scCtx.fillText("shahriar@nexus-os:~$ sudo hire-me", 620, 240);
      scCtx.fillStyle = "#f59e0b";
      scCtx.fillText(">> SYSTEM READY FOR COLLABORATION <<", 620, 280);

      // Bottom Dock
      scCtx.fillStyle = "rgba(15, 23, 42, 0.95)";
      scCtx.strokeStyle = "rgba(0, 242, 254, 0.5)";
      scCtx.lineWidth = 2;
      scCtx.roundRect?.(280, 455, 464, 46, 14);
      scCtx.stroke();
      scCtx.fill();
    };
    renderScreenTexture();

    const monitorScreenTex = new THREE.CanvasTexture(screenCanvas);
    const monitorGeo = new THREE.PlaneGeometry(28, 14);
    const monitorMat = new THREE.MeshBasicMaterial({ map: monitorScreenTex, side: THREE.DoubleSide });
    const monitorScreen = new THREE.Mesh(monitorGeo, monitorMat);
    monitorScreen.position.set(0, 3.5, -9);
    roomGroup.add(monitorScreen);

    // Glowing screen backlight glow
    const monitorGlow = new THREE.PointLight(0x00f2fe, 3, 40);
    monitorGlow.position.set(0, 3.5, -5);
    roomGroup.add(monitorGlow);

    // Ergonomic Chair & Designer Silhouette (Shahriar working at PC)
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.8 });
    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(10, 16, 2), chairMat);
    chairBack.position.set(0, 1, 2);
    roomGroup.add(chairBack);

    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 10), chairMat);
    chairSeat.position.set(0, -7, -2);
    roomGroup.add(chairSeat);

    // Designer Silhouette (Head + Torso)
    const personMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(3.5, 16, 16), personMat);
    head.position.set(0, 6, 2);
    roomGroup.add(head);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(8, 10, 5), personMat);
    torso.position.set(0, -1, 1);
    roomGroup.add(torso);

    // Ambient Hologram floating in corner of room
    const holoRingGeo = new THREE.TorusGeometry(6, 0.4, 16, 64);
    const holoRingMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
    const holoRing = new THREE.Mesh(holoRingGeo, holoRingMat);
    holoRing.position.set(32, 2, -15);
    holoRing.rotation.x = Math.PI / 3;
    roomGroup.add(holoRing);

    // High Altitude Clouds Layer (camera punches through this at start)
    const cloudGeo = new THREE.BufferGeometry();
    const cloudCount = 1400;
    const cloudPos = new Float32Array(cloudCount * 3);
    for (let i = 0; i < cloudCount * 3; i += 3) {
      cloudPos[i] = (Math.random() - 0.5) * 3600;
      cloudPos[i + 1] = 1100 + Math.random() * 600;
      cloudPos[i + 2] = (Math.random() - 0.5) * 3600;
    }
    cloudGeo.setAttribute("position", new THREE.BufferAttribute(cloudPos, 3));
    const cloudMat = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 40,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const clouds = new THREE.Points(cloudGeo, cloudMat);
    scene.add(clouds);

    // ==========================================
    // CAMERA TRAJECTORY INTERPOLATION
    // ==========================================

    // Waypoints along the 3D cinematic descent
    const p0 = new THREE.Vector3(0, 1750, 2400); // 0.00: High Eagle-Eye Orbit
    const p1 = new THREE.Vector3(120, 1150, 1600); // 0.25: Cloud Break
    const p2 = new THREE.Vector3(-60, 680, 950); // 0.50: Skyscraper Canyon Dive
    const p3 = new THREE.Vector3(20, 525, 380); // 0.70: Approaching Tower 50 Window
    const p4 = new THREE.Vector3(0, 503, 110); // 0.85: Penetrating Window into Studio
    const p5 = new THREE.Vector3(0, 501.5, 30); // 0.94: Dolly past chair
    const p6 = new THREE.Vector3(0, 503.5, 6.2); // 1.00: Zoom into monitor center

    // Camera LookAt Targets
    const t0 = new THREE.Vector3(0, 450, 0); // High view looking at city center
    const t1 = new THREE.Vector3(0, 480, 0); // Looking toward Tower 50
    const t2 = new THREE.Vector3(0, 500, 15); // Looking at 50th floor window
    const t3 = new THREE.Vector3(0, 503.5, 6); // Looking directly at monitor screen

    let hasPlayedDiveSound = false;
    let hasPlayedLockSound = false;
    let hasPlayedWarpSound = false;

    // RENDER LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth progress lerp
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.08;
      const progress = currentProgressRef.current;
      setScrollProgress(progress);

      // Sound triggers along flythrough
      if (progress > 0.25 && !hasPlayedDiveSound) {
        sound.playDiveWhoosh();
        hasPlayedDiveSound = true;
      }
      if (progress > 0.65 && !hasPlayedLockSound) {
        sound.playLockTarget();
        hasPlayedLockSound = true;
      }
      if (progress > 0.985 && !hasPlayedWarpSound) {
        sound.playWarpEntry();
        hasPlayedWarpSound = true;
        // Trigger completion into OS!
        setTimeout(() => {
          onComplete();
        }, 300);
      }

      // Update Flying Cars
      flyingCars.forEach((fc) => {
        fc.angle += fc.speed;
        fc.mesh.position.x = Math.cos(fc.angle) * fc.radius;
        fc.mesh.position.z = Math.sin(fc.angle) * fc.radius;
        fc.mesh.rotation.y = -fc.angle + Math.PI / 2;
      });

      // Animate Holograms
      holoRing.rotation.z += 0.015;
      holoRing.rotation.y += 0.008;

      // Animate Clouds gently
      clouds.rotation.y = elapsedTime * 0.005;

      // Calculate camera position along spline curve based on progress
      const currentPos = new THREE.Vector3();
      const currentLookAt = new THREE.Vector3();

      if (progress < 0.25) {
        const localT = progress / 0.25;
        currentPos.lerpVectors(p0, p1, localT);
        currentLookAt.lerpVectors(t0, t1, localT);
        setHudStats({
          altitude: Math.round(15400 - localT * 7000),
          speed: Math.round(380 + localT * 120),
          distanceToTarget: Math.round(2400 - localT * 800),
          phase: "01. ORBITAL EAGLE-EYE // DESCENT"
        });
      } else if (progress < 0.55) {
        const localT = (progress - 0.25) / 0.3;
        currentPos.lerpVectors(p1, p2, localT);
        currentLookAt.lerpVectors(t1, t2, localT);
        setHudStats({
          altitude: Math.round(8400 - localT * 6000),
          speed: Math.round(500 + Math.sin(localT * Math.PI) * 150),
          distanceToTarget: Math.round(1600 - localT * 700),
          phase: "02. CANYON FLIGHT // SKYWAY DIVE"
        });
      } else if (progress < 0.78) {
        const localT = (progress - 0.55) / 0.23;
        currentPos.lerpVectors(p2, p3, localT);
        currentLookAt.lerpVectors(t2, t2, localT);
        setHudStats({
          altitude: Math.round(2400 - localT * 1800),
          speed: Math.round(420 - localT * 220),
          distanceToTarget: Math.round(900 - localT * 600),
          phase: "03. TARGET LOCKED // TOWER 50"
        });
      } else if (progress < 0.92) {
        const localT = (progress - 0.78) / 0.14;
        currentPos.lerpVectors(p3, p4, localT);
        currentLookAt.lerpVectors(t2, t3, localT);
        setHudStats({
          altitude: 500,
          speed: Math.round(200 - localT * 120),
          distanceToTarget: Math.round(300 - localT * 250),
          phase: "04. ENTERING STUDIO // 50TH FL"
        });
      } else {
        const localT = (progress - 0.92) / 0.08;
        currentPos.lerpVectors(p4, p6, localT);
        currentLookAt.copy(t3);
        setHudStats({
          altitude: 500,
          speed: 40,
          distanceToTarget: Math.max(0, Math.round(50 - localT * 50)),
          phase: "05. SYNAPSE LINK // ENTERING MONITOR"
        });
      }

      // Add slight organic drone drift
      const droneWobbleX = Math.sin(elapsedTime * 2) * (1 - progress) * 3;
      const droneWobbleY = Math.cos(elapsedTime * 2.5) * (1 - progress) * 2;
      camera.position.set(currentPos.x + droneWobbleX, currentPos.y + droneWobbleY, currentPos.z);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // Scroll Wheel & Touch Handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0006;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 0.0012;
      touchStartY = touchY;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
    };
  }, [onComplete]);

  // Auto-Pilot loop
  useEffect(() => {
    if (isAutoPiloting) {
      sound.playNotification();
      const interval = window.setInterval(() => {
        targetProgressRef.current = Math.min(1, targetProgressRef.current + 0.0035);
        if (targetProgressRef.current >= 0.99) {
          setIsAutoPiloting(false);
          clearInterval(interval);
        }
      }, 16);
      autoPilotTimerRef.current = interval;
    } else {
      if (autoPilotTimerRef.current) {
        clearInterval(autoPilotTimerRef.current);
      }
    }
    return () => {
      if (autoPilotTimerRef.current) {
        clearInterval(autoPilotTimerRef.current);
      }
    };
  }, [isAutoPiloting]);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950 select-none font-mono text-slate-100">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-ns-resize" />

      {/* Cyber Drone HUD Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 px-4 md:px-8 flex items-center justify-between border-b border-cyan-500/20 bg-slate-950/60 backdrop-blur-md pointer-events-auto">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Navigation className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="font-bold tracking-wider text-xs md:text-sm">DRONE RECON BD-2050</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-[11px] text-slate-400 hidden sm:block">
            LOCATION: <span className="text-cyan-300 font-bold">NEO-BANGLADESH // SECTOR 07</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5 text-xs">
          {/* Auto-Pilot Button */}
          <button
            onClick={() => setIsAutoPiloting(!isAutoPiloting)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-mono transition-all ${
              isAutoPiloting
                ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]"
                : "bg-slate-900/80 text-cyan-300 border-cyan-500/40 hover:bg-slate-800"
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isAutoPiloting ? "fill-slate-950" : ""}`} />
            <span>{isAutoPiloting ? "AUTO-PILOT: ACTIVE" : "AUTO-PILOT"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Skip Directly to OS */}
          <button
            onClick={handleSkip}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-850 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <span>Skip to OS</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Crosshair & Locking Box (Active around Tower 50) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {scrollProgress > 0.45 && scrollProgress < 0.88 && (
          <div className="relative w-48 h-48 md:w-64 md:h-64 border border-cyan-400/40 rounded-lg animate-pulse flex flex-col justify-between p-2">
            <div className="flex justify-between text-[10px] text-cyan-400 font-mono">
              <span>[TARGET LOCK]</span>
              <span>FL 50</span>
            </div>
            <div className="text-center text-[11px] text-emerald-400 font-bold bg-slate-950/70 py-1 rounded border border-emerald-500/30">
              SHAHRIAR WORKSTATION
            </div>
            <div className="flex justify-between text-[10px] text-cyan-400 font-mono">
              <span>DIST: {hudStats.distanceToTarget}M</span>
              <span>BEARING: 042°</span>
            </div>
          </div>
        )}
      </div>

      {/* Left Telemetry HUD */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-3 pointer-events-none text-xs">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-500/30 backdrop-blur-md space-y-1.5 w-44">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">FLIGHT TELEMETRY</div>
          <div className="flex justify-between">
            <span className="text-slate-400">ALTITUDE:</span>
            <span className="text-cyan-400 font-bold">{hudStats.altitude} M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">AIRSPEED:</span>
            <span className="text-purple-400 font-bold">{hudStats.speed} KM/H</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">TARGET:</span>
            <span className="text-emerald-400 font-bold">{hudStats.distanceToTarget} M</span>
          </div>
        </div>

        {/* Pitch Ladder Indicator */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[10px] text-slate-400 text-center font-mono">
          <div>SURVEILLANCE MODE: 2050 AD</div>
          <div className="text-emerald-400 font-bold mt-1">ADVANCED BANGLADESH</div>
        </div>
      </div>

      {/* Right Flight Phase Milestones HUD */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-2 pointer-events-none text-xs w-52">
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 backdrop-blur-md space-y-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">DESCENT VECTOR</div>
          {[
            { id: "01", label: "Eagle-Eye Orbit", range: [0, 0.25] },
            { id: "02", label: "Canyon Skyway Dive", range: [0.25, 0.55] },
            { id: "03", label: "Tower 50 Target Lock", range: [0.55, 0.78] },
            { id: "04", label: "50th Floor Window Entry", range: [0.78, 0.92] },
            { id: "05", label: "Shahriar's Screen Zoom", range: [0.92, 1.0] }
          ].map((m) => {
            const isCurrent = scrollProgress >= m.range[0] && scrollProgress <= m.range[1];
            return (
              <div
                key={m.id}
                className={`flex items-center space-x-2 text-[11px] p-1.5 rounded transition-all ${
                  isCurrent ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold" : "text-slate-500"
                }`}
              >
                <span>{m.id}</span>
                <span className="truncate">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Center Progress & Scroll Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-lg pointer-events-auto">
        <div className="p-3 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-cyan-500/40 shadow-2xl flex flex-col items-center text-center space-y-2">
          <div className="flex items-center justify-between w-full text-xs font-mono px-1">
            <span className="text-cyan-400 font-bold">{hudStats.phase}</span>
            <span className="text-slate-400">{Math.round(scrollProgress * 100)}%</span>
          </div>

          {/* Glowing Scroll Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 rounded-full transition-all duration-100 shadow-[0_0_12px_#00f2fe]"
              style={{ width: `${Math.min(100, Math.max(2, scrollProgress * 100))}%` }}
            />
          </div>

          {/* Interactive Prompt */}
          <p className="text-[11px] text-slate-300 font-mono animate-pulse">
            Scroll down or click <span className="text-cyan-400 font-bold">&quot;Auto-Pilot&quot;</span> to dive into Bangladesh 2050
          </p>
        </div>
      </div>

      {/* Hyper-Zoom Screen Flash Effect when entering monitor (progress > 0.96) */}
      {scrollProgress > 0.95 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-cyan-400"
          style={{ opacity: (scrollProgress - 0.95) * 18 }}
        />
      )}
    </div>
  );
}

