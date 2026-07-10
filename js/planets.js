// planets.js

import * as THREE from "three";
import { scene } from "./main.js";

const loader = new THREE.TextureLoader();

const sunTexture = loader.load("../assets/textures/sun.png");
const earthTexture = loader.load("../assets/textures/earth.png");
const moonTexture = loader.load("../assets/textures/moon.png");
const saturnTexture = loader.load("../assets/textures/saturn.png");
const saturnRingTexture = loader.load("../assets/textures/saturn_ring.png");

export let sun;
export let sunHalo;

export let earth;
export let atmosphere;

export let moon;

export let saturn;
export let saturnRing;

//==================================================
// CREAR PLANETAS
//==================================================

export function createPlanets() {

    //==========================
    // SOL
    //==========================

    const sunGeometry = new THREE.SphereGeometry(
        60,
        96,
        96
    );

    const sunMaterial =
        new THREE.MeshBasicMaterial({

        map: sunTexture

    });

    sun = new THREE.Mesh(
        sunGeometry,
        sunMaterial
    );

    sun.position.set(
        90,
        60,
        -1300
    );

    scene.add(sun);

    //==========================
    // HALO
    //==========================

    const haloGeometry =
        new THREE.SphereGeometry(
            64,
            85,
            96
        );

    const haloMaterial =
        new THREE.MeshBasicMaterial({

        color:0xffb347,

        transparent:true,

        opacity:0.16,

        blending:THREE.AdditiveBlending,

        side:THREE.BackSide

    });

    sunHalo = new THREE.Mesh(

        haloGeometry,

        haloMaterial

    );

    sunHalo.position.copy(
        sun.position
    );

    scene.add(sunHalo);

    //==========================
    // LUZ
    //==========================

    const sunLight =
        new THREE.DirectionalLight(

        0xffffff,

        5

    );

    sunLight.position.copy(
        sun.position
    );

    scene.add(sunLight);

    const ambient =
        new THREE.AmbientLight(

        0x8090aa,

        0.70

    );

    scene.add(ambient);

    //==========================
    // TIERRA
    //==========================

    const earthGeometry =
        new THREE.SphereGeometry(
            62,
            96,
            96
        );

    const earthMaterial =
        new THREE.MeshStandardMaterial({

        map:earthTexture,

        roughness:1,

        metalness:0.05

    });

    earth = new THREE.Mesh(

        earthGeometry,

        earthMaterial

    );

    earth.position.set(

        90,

        -20,

        -2000

    );

    scene.add(earth);

    //==========================
    // ATMÓSFERA
    //==========================

    const atmosphereGeometry =
        new THREE.SphereGeometry(
            64,
            96,
            96
        );

    const atmosphereMaterial =
        new THREE.MeshBasicMaterial({

        color:0x66d8ff,

        transparent:true,

        opacity:0.20,

        blending:THREE.AdditiveBlending,

        side:THREE.BackSide

    });

    atmosphere = new THREE.Mesh(

        atmosphereGeometry,

        atmosphereMaterial

    );

    atmosphere.position.copy(
        earth.position
    );

    scene.add(atmosphere);

    //==========================
    // LUNA
    //==========================

    const moonGeometry =
        new THREE.SphereGeometry(
            30,
            96,
            96
        );

    const moonMaterial =
        new THREE.MeshStandardMaterial({

        map:moonTexture,

        roughness:1

    });

    moon = new THREE.Mesh(

        moonGeometry,

        moonMaterial

    );

    moon.position.set(

        90,

        80,

        -3000

    );

    scene.add(moon);

    //==========================
    // SATURNO
    //==========================

    const saturnGeometry =
        new THREE.SphereGeometry(
            78,
            96,
            96
        );

    const saturnMaterial =
        new THREE.MeshStandardMaterial({

        map:saturnTexture,

        roughness: 0.55,
        metalness: 0.02

    });

    saturn = new THREE.Mesh(

        saturnGeometry,

        saturnMaterial

    );

    saturn.position.set(

        120,

        -40,

        -3900

    );

    scene.add(saturn);

    //==========================
    // ANILLOS
    //==========================

    const ringGeometry =
        new THREE.RingGeometry(

        100,

        150,

        256

    );

    const ringMaterial =
        new THREE.MeshBasicMaterial({

        map:saturnRingTexture,

        transparent:true,

        side:THREE.DoubleSide,

        depthWrite:false

    });

    saturnRing = new THREE.Mesh(

        ringGeometry,

        ringMaterial

    );

    saturnRing.rotation.x =
        THREE.MathUtils.degToRad(70);

    saturnRing.rotation.z =
        THREE.MathUtils.degToRad(25);

    saturnRing.position.copy(
        saturn.position
    );

    scene.add(saturnRing);

}

//==================================================
// ACTUALIZAR PLANETAS
//==================================================

export function updatePlanets(time){

    if(sun){

        sun.rotation.y += 0.0008;

    }

    if(sunHalo){

        const pulse =
            1 + Math.sin(time*1.5)*0.02;

        sunHalo.scale.set(
            pulse,
            pulse,
            pulse
        );

    }

    if(earth){

        earth.rotation.y += 0.0012;

    }

    if(atmosphere){

        atmosphere.rotation.y += 0.0015;
        atmosphere.position.copy(
            earth.position
        );

    }

    if(moon){

        moon.rotation.y += 0.0008;

    }

    if(saturn){

        saturn.rotation.y += 0.0007;

    }

    if(saturnRing){

        saturnRing.position.copy(
            saturn.position
        );

        saturnRing.rotation.z += 0.0002;

    }

}