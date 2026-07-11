import * as THREE from "three";
import { scene } from "./main.js";

const loader = new THREE.TextureLoader();

const starTexture = loader.load(
    import.meta.env.BASE_URL + "textures/star.png"
);

let starField;

//=====================================
// CREAR UNIVERSO
//=====================================

export function createUniverse() {

    const STAR_COUNT = 50000;

    const geometry =
        new THREE.BufferGeometry();

    const positions = [];
    const colors = [];

    for (let i = 0; i < STAR_COUNT; i++) {

        positions.push(

            (Math.random() - 0.5) * 1800,

            (Math.random() - 0.5) * 1800,

            -Math.random() * 5000

        );

        const r = Math.random();

        if (r < 0.80) {

            colors.push(1,1,1);

        }

        else if (r < 0.95) {

            colors.push(
                0.72,
                0.85,
                1
            );

        }

        else {

            colors.push(
                1,
                0.92,
                0.65
            );

        }

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

    map: starTexture,

    size: 4.5,

    transparent: true,

    alphaTest: 0.01,

    vertexColors: true,

    depthWrite: false,

    sizeAttenuation: true,

    blending: THREE.AdditiveBlending

});

    starField =
        new THREE.Points(

            geometry,

            material

        );

    scene.add(starField);

}