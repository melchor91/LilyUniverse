import * as THREE from "three";
import { scene } from "./main.js";

let lily;

export function createLily(){

    const canvas = document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    ctx.shadowColor = "#a749fe";
    ctx.shadowBlur = 50;

    ctx.fillStyle = "#c39bfc"
    ctx.font = " italic 145px 'Great Vibes'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("Lily",512,256);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({

        map:texture,

        transparent:true,

        opacity:0

    });

    lily = new THREE.Sprite(material);

    lily.scale.set(69,36,1);

    lily.visible = false;

    scene.add(lily);

}

export function showLily(x, y, z){

    if(!lily) return;

    lily.position.set(x, y, z);

    lily.visible = true;

    lily.material.opacity = 0;

    let opacity = 0;

    const fade = setInterval(() => {

        opacity += 0.03;

        lily.material.opacity = opacity;

        if(opacity >= 1){

            lily.material.opacity = 1;

            clearInterval(fade);

        }

    }, 30);

}

//=====================================
// OCULTAR LILY
//=====================================

export function hideLily(){

    if(!lily) return;

    let opacity = 1;

    const fade = setInterval(() => {

        opacity -= 0.015;

        lily.material.opacity = Math.max(opacity, 0);

        if(opacity <= 0){

            clearInterval(fade);

            lily.visible = false;

        }

    },30);

}