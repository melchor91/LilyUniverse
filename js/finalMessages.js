import * as THREE from "three";
import { scene } from "./main.js";

const messages = [];

export function createFinalMessages() {

const frases = [

    ["Eres mi lugar favorito", "en el universo."],

    ["Contigo, cualquier distancia", "parece pequeña."],

    ["Cada estrella me recuerda", "un motivo para sonreír."],

    ["Tu sonrisa ilumina más", "que cualquier galaxia."],

    ["Gracias por existir."],

    ["Ojalá este viaje te recuerde", "lo especial que eres."],

    ["Siempre habrá un lugar", "para ti en mi corazón. ❤️"]

];

    frases.forEach((texto) => {

        const canvas = document.createElement("canvas");

        canvas.width = 1024;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#ffffff";
        ctx.font = "43px Georgia";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowColor = "#ffd6f5";
        ctx.shadowBlur = 19;

        if (Array.isArray(texto)) {

    if (texto.length === 1) {

        ctx.fillText(texto[0], 512, 128);

    } else {

        ctx.fillText(texto[0], 512, 100);

        ctx.fillText(texto[1], 512, 160);

    }

} else {

    ctx.fillText(texto, 512, 128);

}

        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.SpriteMaterial({

            map: texture,
            transparent: true,
            opacity: 0

        });

        const sprite = new THREE.Sprite(material);

        sprite.scale.set(42, 11, 1);

        sprite.visible = false;

        scene.add(sprite);

        messages.push(sprite);

    });

}

export function showFinalMessages(x, y, z){

   const positions = [

    { x: 0,  y: 19 },    // arriba

    { x: -28, y: 10 },   // arriba izquierda
    { x: 28,  y: 10 },   // arriba derecha

    { x: -30, y: -6 },   // centro izquierda
    { x: 30,  y: -6 },   // centro derecha

    { x: -16, y: -24 },  // abajo izquierda
    { x: 16,  y: -24 }   // abajo derecha

];

    messages.forEach((message, index)=>{

        setTimeout(()=>{

            message.position.set(

                x + positions[index].x,

                y + positions[index].y,

                z

            );

       message.visible = true;

message.material.opacity = 0;

let opacity = 0;

const fade = setInterval(() => {

    opacity += 0.02;

    message.material.opacity = opacity;

    if (opacity >= 1) {

        message.material.opacity = 1;

        clearInterval(fade);

    }

}, 30);
        }, index * 2200);

    });

}

//=====================================
// OCULTAR FRASES
//=====================================

export function hideFinalMessages(){

    let opacity = 1;

    const fade = setInterval(() => {

        opacity -= 0.015;

        messages.forEach(message => {

            message.material.opacity = opacity;

        });

        if(opacity <= 0){

            clearInterval(fade);

            messages.forEach(message => {

                message.visible = false;

            });

        }

    },30);

}