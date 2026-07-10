import * as THREE from "three";
import { scene } from "./main.js";

export let galaxy;

export function createGalaxy() {

    const starCount = 18000;

    const branches = 3;

    const radius = 260;

    const spin = 4.5;

    const randomness = 18;

    const positions = [];
    const colors = [];

    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < starCount; i++) {

        const r = Math.random() * radius;

        const branchAngle =
            (i % branches) / branches * Math.PI * 2;

        const spinAngle = r * spin * 0.02;

        const randomX =
            (Math.random() - 0.5) * randomness;

        const randomY =
            (Math.random() - 0.5) * randomness * 0.25;

        const randomZ =
            (Math.random() - 0.5) * randomness;

        const x =
            Math.cos(branchAngle + spinAngle) * r + randomX;

        const y =
            randomY;

        const z =
            Math.sin(branchAngle + spinAngle) * r + randomZ;

        positions.push(x, y, z);

        const t = r / radius;

        colors.push(

            1 - t * 0.3,

            0.55 - t * 0.25,

            1

        );

    }

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            positions,

            3

        )

    );

    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(

            colors,

            3

        )

    );

    const material = new THREE.PointsMaterial({

        size:2.2,

        vertexColors:true,

        transparent:true,

        opacity:0.95,

        depthWrite:false,

        blending:THREE.AdditiveBlending

    });

    galaxy = new THREE.Points(

        geometry,

        material

    );

    galaxy.position.set(

        -340,

        250,

        -6200

    );

    galaxy.rotation.x =

        THREE.MathUtils.degToRad(25);

    scene.add(galaxy);

}

export function updateGalaxy(){

    if(!galaxy) return;

    galaxy.rotation.y += 0.00015;

}