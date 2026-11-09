import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CharacterItem } from '../types';
import { STAGES } from '../data/characters';
import { sounds } from '../utils/audio';
import { RotateCw } from 'lucide-react';

interface ThreeCanvasProps {
  character: CharacterItem & { robloxConfig?: any };
  stageId?: string;
  isCompact?: boolean;
  autoSpinSeconds?: number; // e.g. 5 seconds for intro
}

/**
 * High-res procedural Roblox Face Decal onto 2D canvas
 */
function createRobloxFaceTexture(char: CharacterItem & { robloxConfig?: any }): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const skinTone = char.robloxConfig?.skinTone || char.skinColor || '#ffd599';
  const faceType = char.robloxConfig?.faceType || 'smile';

  // Base head color
  ctx.fillStyle = skinTone;
  ctx.fillRect(0, 0, 512, 512);

  if (faceType === 'mask' || char.id === 'spider-hero') {
    // Spider-Man mask
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 8;
    for (let x = 64; x < 512; x += 96) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 64; y < 512; y += 96) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    const drawSpiderEye = (cx: number, cy: number, flip: boolean) => {
      ctx.save();
      ctx.translate(cx, cy);
      if (flip) ctx.scale(-1, 1);
      ctx.beginPath();
      ctx.moveTo(-90, -40);
      ctx.quadraticCurveTo(0, -90, 80, -10);
      ctx.quadraticCurveTo(90, 60, -30, 80);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 18;
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();
      ctx.restore();
    };

    drawSpiderEye(160, 240, false);
    drawSpiderEye(352, 240, true);

  } else if (faceType === 'cyborg' || char.id === 'iron-hero' || char.id === 'cyber-titan') {
    ctx.fillStyle = char.primaryColor;
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(96, 210, 320, 64);
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#0284c7';
    ctx.strokeRect(96, 210, 320, 64);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(120, 225, 272, 14);

  } else if (faceType === 'bat' || char.id === 'dark-knight') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 320);

    ctx.fillStyle = skinTone;
    ctx.beginPath();
    ctx.moveTo(130, 320);
    ctx.lineTo(256, 300);
    ctx.lineTo(382, 320);
    ctx.lineTo(340, 470);
    ctx.lineTo(172, 470);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(140, 220);
    ctx.lineTo(210, 200);
    ctx.lineTo(200, 240);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(372, 220);
    ctx.lineTo(302, 200);
    ctx.lineTo(312, 240);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 8;
    ctx.strokeStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(210, 420);
    ctx.lineTo(302, 420);
    ctx.stroke();

  } else {
    // Eyebrows
    ctx.strokeStyle = char.hairColor || '#0f172a';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';

    if (faceType === 'smirk') {
      ctx.beginPath();
      ctx.moveTo(140, 160);
      ctx.quadraticCurveTo(180, 140, 220, 165);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(290, 175);
      ctx.quadraticCurveTo(330, 170, 370, 195);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(140, 170);
      ctx.quadraticCurveTo(180, 150, 220, 175);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(292, 175);
      ctx.quadraticCurveTo(332, 150, 372, 170);
      ctx.stroke();
    }

    // Classic Roblox Eyes
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(180, 230, 26, 36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(332, 230, 26, 36, 0, 0, Math.PI * 2);
    ctx.fill();

    // Catchlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(172, 220, 9, 0, Math.PI * 2);
    ctx.arc(324, 220, 9, 0, Math.PI * 2);
    ctx.fill();

    // Beard (Messi, Salah, Pharaoh)
    if (char.robloxConfig?.hasBeard) {
      ctx.fillStyle = char.hairColor || '#451a03';
      ctx.beginPath();
      ctx.arc(256, 350, 80, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.lineWidth = 14;
      ctx.strokeStyle = char.hairColor || '#451a03';
      ctx.stroke();
    }

    // Roblox Smile
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0f172a';
    ctx.lineCap = 'round';

    if (faceType === 'smirk') {
      ctx.beginPath();
      ctx.moveTo(210, 360);
      ctx.quadraticCurveTo(270, 385, 340, 345);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(256, 310, 65, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates procedural Roblox Torso Jersey Decal with crisp stripes & jersey number
 */
function createRobloxTorsoTexture(
  primaryColor: string,
  secondaryColor: string,
  jerseyNumber: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, 512, 512);

  // Stripes
  ctx.fillStyle = secondaryColor;
  ctx.fillRect(96, 0, 80, 512);
  ctx.fillRect(336, 0, 80, 512);

  // Collar
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(170, 0);
  ctx.lineTo(256, 90);
  ctx.lineTo(342, 0);
  ctx.closePath();
  ctx.fill();

  // Crest
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(140, 140, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#0f172a';
  ctx.stroke();

  // Number
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 170px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(jerseyNumber || '10', 256, 310);

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 8;
  ctx.strokeText(jerseyNumber || '10', 256, 310);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  character,
  stageId = 'stadium',
  isCompact = false,
  autoSpinSeconds
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activeEmote, setActiveEmote] = useState<'idle' | 'wave'>('idle');

  const emoteStateRef = useRef({
    activeEmote: 'idle' as 'idle' | 'wave',
    isAutoRotate: true
  });

  useEffect(() => {
    emoteStateRef.current.activeEmote = activeEmote;
    emoteStateRef.current.isAutoRotate = isAutoRotate;
  }, [activeEmote, isAutoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const scene = new THREE.Scene();
    const currentStage = STAGES.find((s) => s.id === stageId) || STAGES[0];
    scene.background = new THREE.Color(isCompact ? 0xffffff : currentStage.fogColor);
    if (!isCompact) {
      scene.fog = new THREE.FogExp2(currentStage.fogColor, 0.035);
    }

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.7, 4.3);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.3);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 7, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Platform
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const baseplateGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.22, 32);
    const baseplateMat = new THREE.MeshStandardMaterial({
      color: isCompact ? 0xf1f5f9 : currentStage.groundColor,
      roughness: 0.35,
      metalness: 0.05
    });
    const baseplateMesh = new THREE.Mesh(baseplateGeo, baseplateMat);
    baseplateMesh.position.y = -0.11;
    baseplateMesh.receiveShadow = true;
    stageGroup.add(baseplateMesh);

    // Contact shadow
    const shadowGeo = new THREE.PlaneGeometry(2.1, 2.1);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.3,
      depthWrite: false
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.002;
    stageGroup.add(contactShadow);

    // ROBLOX AVATAR
    const robloxGroup = new THREE.Group();
    scene.add(robloxGroup);

    const primaryColor = character.primaryColor;
    const secondaryColor = character.secondaryColor;
    const skinTone = character.robloxConfig?.skinTone || character.skinColor || '#ffd599';

    const skinMat = new THREE.MeshStandardMaterial({ color: skinTone, roughness: 0.3 });
    const hairMat = new THREE.MeshStandardMaterial({ color: character.hairColor, roughness: 0.4 });
    const shortsMat = new THREE.MeshStandardMaterial({ color: secondaryColor, roughness: 0.4 });
    const bootsMat = new THREE.MeshStandardMaterial({ color: character.accentColor, roughness: 0.25 });

    // Torso (Roblox 2:2:1 Beveled Block)
    const torsoTexture = createRobloxTorsoTexture(primaryColor, secondaryColor, character.jerseyNumber || '10');
    const torsoFrontMat = new THREE.MeshStandardMaterial({ map: torsoTexture, roughness: 0.35 });
    const torsoSideMat = new THREE.MeshStandardMaterial({ color: primaryColor, roughness: 0.4 });

    const torsoMaterials = [torsoSideMat, torsoSideMat, torsoSideMat, torsoSideMat, torsoFrontMat, torsoSideMat];
    const torsoMesh = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.96, 0.46), torsoMaterials);
    torsoMesh.position.y = 1.05;
    torsoMesh.castShadow = !isSoftwareGl;
    robloxGroup.add(torsoMesh);

    // Head Pivot & Neck Stud
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 1.55, 0);
    robloxGroup.add(headPivot);

    const faceTexture = createRobloxFaceTexture(character);
    const faceFrontMat = new THREE.MeshStandardMaterial({ map: faceTexture, roughness: 0.28 });
    const headMaterials = [skinMat, skinMat, skinMat, skinMat, faceFrontMat, skinMat];

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.58, 0.58), headMaterials);
    headMesh.position.y = 0.3;
    headMesh.castShadow = !isSoftwareGl;
    headPivot.add(headMesh);

    // Iconic Roblox Head Stud
    const studMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16), skinMat);
    studMesh.position.y = 0.64;
    headPivot.add(studMesh);

    // Realistic Player & Hero Hairstyles in Roblox R15 style
    const hairType = character.robloxConfig?.hairType || 'swept';

    if (hairType === 'viking-long') {
      // Haaland Blonde Viking Long Ponytail / Locks
      const hairCap = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.22, 0.62), hairMat);
      hairCap.position.y = 0.54;
      headPivot.add(hairCap);

      const ponytail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.65, 8), hairMat);
      ponytail.position.set(0, 0.35, -0.34);
      ponytail.rotation.x = 0.25;
      headPivot.add(ponytail);

    } else if (hairType === 'buzz-bald') {
      // Mohamed Salah New Shaved Buzz / Bald Fade + Full Beard (No big hair!)
      const buzzFade = new THREE.Mesh(new THREE.BoxGeometry(0.59, 0.05, 0.59), hairMat);
      buzzFade.position.y = 0.53;
      headPivot.add(buzzFade);

    } else if (hairType === 'cr7-undercut') {
      // CR7 Slicked-back Undercut with Gelled Quiff
      const baseFade = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.16, 0.62), hairMat);
      baseFade.position.y = 0.52;
      headPivot.add(baseFade);

      const quiff = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.45), hairMat);
      quiff.position.set(0, 0.62, 0.05);
      quiff.rotation.x = -0.2;
      headPivot.add(quiff);

    } else if (hairType === 'messi-fringe') {
      // Messi Layered Side-Parted Fringe
      const baseCap = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.18, 0.62), hairMat);
      baseCap.position.y = 0.53;
      headPivot.add(baseCap);

      const messyFringe = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.15), hairMat);
      messyFringe.position.set(0.04, 0.49, 0.3);
      messyFringe.rotation.z = -0.15;
      headPivot.add(messyFringe);

    } else if (hairType === 'straw-hat') {
      // Luffy Straw Hat with Red Ribbon
      const strawMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
      const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.3 });

      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.04, 24), strawMat);
      brim.position.y = 0.58;
      headPivot.add(brim);

      const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.08, 20), ribbonMat);
      ribbon.position.y = 0.64;
      headPivot.add(ribbon);

      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.18, 20), strawMat);
      crown.position.y = 0.73;
      headPivot.add(crown);

    } else if (hairType === 'high-top') {
      // Bellingham High-Top Fade
      const highTop = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.3, 0.58), hairMat);
      highTop.position.y = 0.62;
      headPivot.add(highTop);

    } else if (hairType === 'saiyan-huge') {
      // Goku Golden Spikes
      const saiyanHairGroup = new THREE.Group();
      saiyanHairGroup.position.set(0, 0.58, 0);
      const spikes = [
        { h: 0.65, r: 0.18, x: 0, y: 0.2, z: -0.1, rx: -0.3, rz: 0 },
        { h: 0.55, r: 0.15, x: 0.22, y: 0.15, z: 0, rx: -0.2, rz: -0.4 },
        { h: 0.55, r: 0.15, x: -0.22, y: 0.15, z: 0, rx: -0.2, rz: 0.4 },
        { h: 0.45, r: 0.14, x: 0.18, y: 0.05, z: 0.15, rx: 0.2, rz: -0.3 },
        { h: 0.45, r: 0.14, x: -0.18, y: 0.05, z: 0.15, rx: 0.2, rz: 0.3 }
      ];
      spikes.forEach((sp) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(sp.r, sp.h, 7), hairMat);
        cone.position.set(sp.x, sp.y, sp.z);
        cone.rotation.x = sp.rx;
        cone.rotation.z = sp.rz;
        saiyanHairGroup.add(cone);
      });
      headPivot.add(saiyanHairGroup);

    } else if (hairType === 'ninja-headband') {
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.14, 0.62), new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }));
      band.position.y = 0.42;
      headPivot.add(band);

      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.04), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 }));
      plate.position.set(0, 0.42, 0.32);
      headPivot.add(plate);

      const ninjaSpikes = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.45, 8), hairMat);
      ninjaSpikes.position.set(0, 0.65, -0.05);
      headPivot.add(ninjaSpikes);

    } else if (hairType === 'cowl') {
      const earL = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 4), hairMat);
      earL.position.set(-0.25, 0.68, 0);
      earL.rotation.z = 0.2;
      const earR = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 4), hairMat);
      earR.position.set(0.25, 0.68, 0);
      earR.rotation.z = -0.2;
      headPivot.add(earL, earR);

    } else {
      const hairCap = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.2, 0.62), hairMat);
      hairCap.position.y = 0.54;
      headPivot.add(hairCap);
      const fringe = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.12, 0.12), hairMat);
      fringe.position.set(0, 0.5, 0.29);
      headPivot.add(fringe);
    }

    // Arms
    const armGeo = new THREE.BoxGeometry(0.38, 0.92, 0.38);

    const armRPivot = new THREE.Group();
    armRPivot.position.set(0.64, 1.45, 0);
    robloxGroup.add(armRPivot);
    const armR = new THREE.Mesh(armGeo, torsoSideMat);
    armR.position.set(0, -0.42, 0);
    armR.castShadow = !isSoftwareGl;
    armRPivot.add(armR);

    const armLPivot = new THREE.Group();
    armLPivot.position.set(-0.64, 1.45, 0);
    robloxGroup.add(armLPivot);
    const armL = new THREE.Mesh(armGeo, torsoSideMat);
    armL.position.set(0, -0.42, 0);
    armL.castShadow = !isSoftwareGl;
    armLPivot.add(armL);

    // Captain's Armband (for Ballon d'Or heroes and team captains)
    if (character.hasBallonDor || character.jerseyNumber === '10' || character.jerseyNumber === '7' || character.jerseyNumber === '9') {
      const armbandMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        roughness: 0.3,
        metalness: 0.4
      });
      const armband = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.4), armbandMat);
      armband.position.set(0, -0.22, 0);
      armLPivot.add(armband);
    }

    // Legs
    const legGeo = new THREE.BoxGeometry(0.38, 0.92, 0.42);

    const legRPivot = new THREE.Group();
    legRPivot.position.set(0.22, 0.95, 0);
    robloxGroup.add(legRPivot);
    const legR = new THREE.Mesh(legGeo, shortsMat);
    legR.position.set(0, -0.46, 0);
    legR.castShadow = !isSoftwareGl;
    legRPivot.add(legR);

    const cleatR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.46), bootsMat);
    cleatR.position.set(0, -0.86, 0.02);
    legRPivot.add(cleatR);

    const legLPivot = new THREE.Group();
    legLPivot.position.set(-0.22, 0.95, 0);
    robloxGroup.add(legLPivot);
    const legL = new THREE.Mesh(legGeo, shortsMat);
    legL.position.set(0, -0.46, 0);
    legL.castShadow = !isSoftwareGl;
    legLPivot.add(legL);

    const cleatL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.46), bootsMat);
    cleatL.position.set(0, -0.86, 0.02);
    legLPivot.add(cleatL);

    // Soccer Ball
    let soccerBall: THREE.Mesh | null = null;
    if (character.hasSoccerBall) {
      soccerBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 })
      );
      soccerBall.position.set(0.5, 0.22, 0.45);
      soccerBall.castShadow = !isSoftwareGl;
      robloxGroup.add(soccerBall);
    }

    // 3D Ballon d'Or Golden Trophy (Realistic Nero Marquina Marble base + Raw Pyrite rock mount + Gold Seamed Ball)
    let ballonDorGroup: THREE.Group | null = null;
    let ballonDorBall: THREE.Mesh | null = null;
    if (character.hasBallonDor) {
      ballonDorGroup = new THREE.Group();

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.98,
        roughness: 0.12,
        envMapIntensity: 2.5
      });

      const seamMat = new THREE.MeshBasicMaterial({
        color: 0x92400e,
        wireframe: true
      });

      const marbleMat = new THREE.MeshStandardMaterial({
        color: 0x09090b,
        roughness: 0.15,
        metalness: 0.2
      });

      const pyriteMat = new THREE.MeshStandardMaterial({
        color: 0xc49b38,
        roughness: 0.4,
        metalness: 0.8,
        flatShading: true
      });

      // 1. Trophy Base pedestal: Nero Marquina Black Marble Octagonal base
      const trophyBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.16, 0.12, 8),
        marbleMat
      );
      trophyBase.position.y = 0.06;
      trophyBase.castShadow = !isSoftwareGl;
      ballonDorGroup.add(trophyBase);

      // 2. Gold Engraved Plaque plate on front
      const goldPlaque = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.045, 0.02),
        goldMat
      );
      goldPlaque.position.set(0, 0.06, 0.145);
      ballonDorGroup.add(goldPlaque);

      // 3. Raw Mineral Pyrite Rock Mount
      const pyriteRock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.11, 1),
        pyriteMat
      );
      pyriteRock.position.y = 0.17;
      pyriteRock.scale.set(1.2, 0.8, 1.1);
      pyriteRock.castShadow = !isSoftwareGl;
      ballonDorGroup.add(pyriteRock);

      // 4. The Golden Ballon d'Or Football (Faceted & engraved soccer ball in pure gold)
      ballonDorBall = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.24, 3),
        goldMat
      );
      ballonDorBall.position.y = 0.4;
      ballonDorBall.castShadow = !isSoftwareGl;
      ballonDorGroup.add(ballonDorBall);

      // Overlaid soccer ball pentagon/hexagon seam lines
      const ballonDorSeams = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.241, 1),
        seamMat
      );
      ballonDorSeams.position.y = 0.4;
      ballonDorGroup.add(ballonDorSeams);

      // Golden Trophy Radiant Light Glow
      const goldPointLight = new THREE.PointLight(0xffe066, 3, 3);
      goldPointLight.position.set(0, 0.42, 0.15);
      ballonDorGroup.add(goldPointLight);

      // Attach Ballon d'Or directly to left arm/hand
      ballonDorGroup.position.set(0, -0.85, 0.22);
      armLPivot.add(ballonDorGroup);

      // Posed arm to proudly hold the Ballon d'Or trophy forward
      armLPivot.rotation.x = -0.55;
      armLPivot.rotation.z = 0.25;
    }

    // Interactive Drag
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      prevMouseX = clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - prevMouseX;
      prevMouseX = clientX;
      targetRotationY += deltaX * 0.012;
      emoteStateRef.current.isAutoRotate = false;
      setIsAutoRotate(false);
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotation
      if (emoteStateRef.current.isAutoRotate) {
        // If autoSpinSeconds given, spin faster for the showcase
        const spinSpeed = autoSpinSeconds ? (Math.PI * 2) / autoSpinSeconds : 0.5;
        targetRotationY += delta * spinSpeed;
      }
      robloxGroup.rotation.y = THREE.MathUtils.damp(
        robloxGroup.rotation.y,
        targetRotationY,
        8,
        delta
      );

      const mode = emoteStateRef.current.activeEmote;

      if (mode === 'idle') {
        const bob = Math.sin(elapsed * 3) * 0.02;
        torsoMesh.position.y = 1.05 + bob;
        headPivot.position.y = 1.55 + bob;

        armRPivot.rotation.x = Math.sin(elapsed * 2.5) * 0.08;
        armRPivot.rotation.z = -0.15;

        if (character.hasBallonDor) {
          // Proud Ballon d'Or trophy pose
          armLPivot.rotation.x = -0.55 + Math.sin(elapsed * 2) * 0.03;
          armLPivot.rotation.z = 0.25;
        } else {
          armLPivot.rotation.x = -Math.sin(elapsed * 2.5) * 0.08;
          armLPivot.rotation.z = 0.15;
        }

        legRPivot.rotation.x = 0;
        legLPivot.rotation.x = 0;

        if (soccerBall) {
          soccerBall.position.y = 0.22 + Math.sin(elapsed * 3) * 0.02;
          soccerBall.rotation.x += delta * 0.5;
        }

        if (ballonDorBall) {
          ballonDorBall.rotation.y += delta * 0.9;
        }
      } else if (mode === 'wave') {
        // Friendly Roblox Hand Wave
        armRPivot.rotation.x = -2.6;
        armRPivot.rotation.z = -0.3 + Math.sin(elapsed * 8) * 0.35;
        armLPivot.rotation.x = 0;
        armLPivot.rotation.z = 0.15;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      scene.clear();
      renderer.dispose();
      if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, [character, stageId, isCompact, autoSpinSeconds]);

  return (
    <div
      className={`relative w-full ${
        isCompact ? 'h-[280px] sm:h-[320px]' : 'h-[460px] md:h-[530px]'
      } bg-white rounded-3xl overflow-hidden border-2 border-neutral-900 shadow-[0_8px_0_0_#171717] select-none`}
    >
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Header Badge */}
      {!isCompact && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-neutral-900 text-white font-extrabold text-xs uppercase rounded-lg">
              {character.tier}
            </span>
            <span className="px-3 py-1 bg-amber-400 text-neutral-900 font-black text-xs border border-neutral-900 rounded-lg">
              ROBLOX EDITION
            </span>
          </div>
          <h2 className="text-2xl font-black text-neutral-900 drop-shadow-sm">
            {character.name}
          </h2>
          <p className="text-xs font-bold text-neutral-600">
            {character.title}
          </p>
        </div>
      )}

      {/* Clean Emotes Dock (NO cheer siu!) */}
      {!isCompact && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-md">
          <div className="bg-white border-2 border-neutral-900 rounded-2xl shadow-[0_6px_0_0_#171717] p-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sounds.playKeyClick();
                  setIsAutoRotate(!isAutoRotate);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg border border-neutral-900 flex items-center gap-1 cursor-pointer ${
                  isAutoRotate ? 'bg-amber-300 text-neutral-900' : 'bg-neutral-100'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
                <span>360° {isAutoRotate ? 'On' : 'Off'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playKeyClick();
                  setActiveEmote('idle');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg border border-neutral-900 cursor-pointer ${
                  activeEmote === 'idle' ? 'bg-neutral-900 text-white' : 'bg-neutral-100'
                }`}
              >
                Stance
              </button>

              <button
                onClick={() => {
                  sounds.playKeyClick();
                  setActiveEmote('wave');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg border border-neutral-900 cursor-pointer ${
                  activeEmote === 'wave' ? 'bg-amber-400 text-neutral-900 font-black' : 'bg-neutral-100'
                }`}
              >
                Wave 👋
              </button>
            </div>

            <div className="text-[10px] font-bold text-neutral-500 hidden sm:block pr-2">
              Drag to spin
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
