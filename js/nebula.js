import { camera } from "./main.js";
import * as THREE from "three";
import { scene } from "./main.js";

const loader = new THREE.TextureLoader();

const nebulaTexture = loader.load(
    import.meta.env.BASE_URL + "textures/nebula.png"
);

export let nebula;

//=====================================
// CREAR NEBULOSA
//=====================================

export function createNebula(){

    const material = new THREE.SpriteMaterial({

        map: nebulaTexture,

        transparent: true,

        opacity: 0.12,

        depthWrite: false,

        depthTest: true,

        blending: THREE.NormalBlending

    });

    nebula = new THREE.Sprite(material);

    nebula.position.set(

          0,

         120,

         -3500

    );

    nebula.scale.set(

        9000,

        6000,

        1

    );

    scene.add(nebula);

}

//=====================================
// ACTUALIZAR
//=====================================

export function updateNebula(time){

    if(!nebula) return;

    nebula.position.z = camera.position.z - 5000;

    nebula.position.x = camera.position.x * 0.10;

    nebula.position.y = camera.position.y * 0.10;

    nebula.material.rotation =
        Math.sin(time * 0.01) * 0.01;

    nebula.material.opacity =
        0.12 + Math.sin(time * 0.05) * 0.02;

}