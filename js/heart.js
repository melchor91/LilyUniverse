import * as THREE from "three";
import { scene } from "./main.js";
import { showLily } from "./finalText.js";
import { showFinalMessages } from "./finalMessages.js";

const loader = new THREE.TextureLoader();

const starTexture = loader.load(
    "/textures/star.png"
);

let heartGroup;
let heartStars = [];

//=====================================
// CREAR CORAZÓN
//=====================================

export function createHeart(x, y, z) {
    if (heartGroup){
        scene.remove(heartGroup);
    }

    heartGroup = new THREE.Group();
    heartGroup.position.set (x, y, z);
    heartStars = [];

    const material = new THREE.SpriteMaterial({

        map: starTexture,

        color: 0xffffff,

        transparent: true,

        depthWrite: false,

        blending: THREE.AdditiveBlending

    });

    for (let t = 0; t < Math.PI * 2; t += 0.08) {

        const x = 16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        const star = new THREE.Sprite(material);

        const scale = 1.9 + Math.random() * 1.0;

        star.scale.set(
            scale,
            scale,
            scale
        );

        star.position.set(
            x * 1.8,
            y * 1.8,
            0
        );

        star.visible = false;

        heartStars.push(star);

        heartGroup.add(star);

    }

    heartGroup.visible = false;

    scene.add(heartGroup);

}

//=====================================
// MOSTRAR CORAZÓN
//=====================================

export function showHeart() {

    if (heartGroup) {

        heartGroup.visible = true;

    }

}


//=====================================
// FORMAR CORAZÓN
//=====================================

export function animateHeart() {

    if (!heartGroup) return;

    heartGroup.visible = true;

  heartStars.forEach((star, index) => {

    setTimeout(() => {

        star.visible = true;

        if (index === heartStars.length - 1) {

            setTimeout(() => {

                showLily(

                    heartGroup.position.x,

                    heartGroup.position.y,

                    heartGroup.position.z + 1

                );

                setTimeout(() => {

    showFinalMessages(

        heartGroup.position.x,

        heartGroup.position.y,

        heartGroup.position.z + 2

    );

}, 1200);

            }, 1000);

        }

    }, index * 40);

});
}

//=====================================
// OCULTAR CORAZÓN
//=====================================

export function hideHeart(){

    if(!heartGroup) return;

    let opacity = 1;

    const fade = setInterval(() => {

        opacity -= 0.015;

        heartGroup.children.forEach(star => {

            star.material.opacity = opacity;

        });

        if(opacity <= 0){

            clearInterval(fade);

            heartGroup.visible = false;

        }

    },30);

}