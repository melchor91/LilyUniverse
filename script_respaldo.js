/*import * as THREE from "three";

//=====================================================
// PROYECTO LILY
//=====================================================

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010104);

//=====================================================
// CÁMARA
//=====================================================

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    6000
);

camera.position.set(0, 0, 20);

//=====================================================
// RENDERER
//=====================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

//=====================================================
// RELOJ
//=====================================================

const clock = new THREE.Clock();

//=====================================================
// CARGADOR DE TEXTURAS
//=====================================================

const loader = new THREE.TextureLoader();

const starTexture = loader.load("assets/textures/star.png");
const sunTexture = loader.load("assets/textures/sun.png");
const earthTexture = loader.load("assets/textures/earth.png");
const moonTexture = loader.load("assets/textures/moon.png");
const saturnTexture = loader.load("assets/textures/saturn.png");
const saturnRingTexture = loader.load("assets/textures/saturn_ring.png");

//=====================================================
// OBJETOS GLOBALES
//=====================================================

let starField;

let sun;
let sunHalo;

let earth;
let atmosphere;

let moon;

let saturn;
let saturnRing;

//=====================================================
// ESCENAS
//=====================================================

const SCENES = {

    INTRO: 0,

    STARS: 1,

    SUN: 2,

    EARTH: 3,

    MOON: 4,

    SATURN: 5,

    HEART: 6,

    END: 7

};

let currentScene = SCENES.INTRO;
let sceneStartTime = 0;

//=====================================================
// UNIVERSO
//=====================================================

const STAR_COUNT = 50000;

const starGeometry = new THREE.BufferGeometry();

const positions = new Float32Array(STAR_COUNT * 3);
const colors = new Float32Array(STAR_COUNT * 3);

for (let i = 0; i < STAR_COUNT; i++) {

    positions[i * 3] = (Math.random() - 0.5) * 1800;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1800;
    positions[i * 3 + 2] = -Math.random() * 5000;

    const r = Math.random();

    if (r < 0.80) {

        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;

    } else if (r < 0.95) {

        colors[i * 3] = 0.72;
        colors[i * 3 + 1] = 0.85;
        colors[i * 3 + 2] = 1;

    } else {

        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.92;
        colors[i * 3 + 2] = 0.65;

    }

}

starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

starGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
);

const starMaterial = new THREE.PointsMaterial({

    map: starTexture,

    size: 3,

    transparent: true,

    vertexColors: true,

    depthWrite: false,

    alphaTest: 0.01,

    blending: THREE.AdditiveBlending,

    sizeAttenuation: true

});

starField = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(starField);

//=====================================================
// NEBULOSA
//=====================================================

const nebulaGeometry = new THREE.SphereGeometry(
    2600,
    64,
    64
);

const nebulaMaterial = new THREE.MeshBasicMaterial({

    color: 0x1b2448,

    transparent: true,

    opacity: 0.05,

    side: THREE.BackSide

});

const nebula = new THREE.Mesh(
    nebulaGeometry,
    nebulaMaterial
);

scene.add(nebula);

//=====================================================
// SOL
//=====================================================

const sunGeometry = new THREE.SphereGeometry(
    90,
    96,
    96
);

const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
});

sun = new THREE.Mesh(
    sunGeometry,
    sunMaterial
);

sun.position.set(
    -260,
    120,
    -1500
);

scene.add(sun);

//=====================================================
// HALO DEL SOL
//=====================================================

const haloGeometry = new THREE.SphereGeometry(
    118,
    96,
    96
);

const haloMaterial = new THREE.MeshBasicMaterial({

    color: 0xffb347,

    transparent: true,

    opacity: 0.16,

    blending: THREE.AdditiveBlending,

    side: THREE.BackSide

});

sunHalo = new THREE.Mesh(
    haloGeometry,
    haloMaterial
);

sunHalo.position.copy(sun.position);

scene.add(sunHalo);

//=====================================================
// LUCES
//=====================================================

const sunLight = new THREE.DirectionalLight(
    0xffffff,
    4
);

sunLight.position.copy(sun.position);

scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(
    0x8090aa,
    0.35
);

scene.add(ambientLight);

//=====================================================
// ANIMACIÓN
//=====================================================

function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Halo respirando

    const pulse =
        1 + Math.sin(time * 1.5) * 0.02;

    sunHalo.scale.set(
        pulse,
        pulse,
        pulse
    );

    // Parpadeo de estrellas

    starMaterial.opacity =
        0.92 + Math.sin(time * 2) * 0.05;

    renderer.render(
        scene,
        camera
    );

}

animate();

//=====================================================
// RESIZE
//=====================================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

//=====================================================
// TIERRA
//=====================================================

const earthGeometry = new THREE.SphereGeometry(
    15,
    96,
    96
);

const earthMaterial = new THREE.MeshStandardMaterial({

    map: earthTexture,

    roughness: 1,

    metalness: 0.05

});

earth = new THREE.Mesh(
    earthGeometry,
    earthMaterial
);

// La Tierra estará esperando a la cámara
earth.position.set(
    70,
    5,
    -900
);

scene.add(earth);

//=====================================================
// ATMÓSFERA
//=====================================================

const atmosphereGeometry = new THREE.SphereGeometry(
    15.8,
    96,
    96
);

const atmosphereMaterial = new THREE.MeshBasicMaterial({

    color: 0x66d8ff,

    transparent: true,

    opacity: 0.20,

    blending: THREE.AdditiveBlending,

    side: THREE.BackSide

});

atmosphere = new THREE.Mesh(
    atmosphereGeometry,
    atmosphereMaterial
);

atmosphere.position.copy(
    earth.position
);

scene.add(atmosphere);*/