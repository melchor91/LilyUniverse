import * as THREE from "three";
import { scene } from "./main.js";

let endingSprite;

//=====================================
// CREAR MENSAJE FINAL
//=====================================

export function createEnding(texto){

    if(endingSprite){

        scene.remove(endingSprite);

    }

    const canvas = document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,1024,512);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.shadowColor = "#b062e0";
    ctx.shadowBlur = 35;

    ctx.fillStyle = "#ffffff";

 if(texto === "Fin del viaje."){

    ctx.font = "90px Great Vibes";

    ctx.fillText("💜",512,380);

}

    ctx.font = "72px Georgia";

    const lineas = texto.split("\n");

    lineas.forEach((linea,index)=>{

        ctx.fillText(

            linea,

            512,

            200 + index * 80

        );

    });

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({

        map:texture,

        transparent:true,

        opacity:0

    });

    endingSprite = new THREE.Sprite(material);

    endingSprite.scale.set(85,42,1);

    endingSprite.visible = false;

    scene.add(endingSprite);

}

//=====================================
// MOSTRAR
//=====================================

export function showEnding(x,y,z){

    if(!endingSprite) return;

    endingSprite.position.set(x,y,z);

    endingSprite.visible = true;

    endingSprite.material.opacity = 0;

    let opacity = 0;

    const fade = setInterval(()=>{

        opacity += 0.02;

        endingSprite.material.opacity = opacity;

        if(opacity >= 1){

            endingSprite.material.opacity = 1;

            clearInterval(fade);

        }

    },30);

}

//=====================================
// OCULTAR
//=====================================

export function hideEnding(){

    if(!endingSprite) return;

    let opacity = 1;

    const fade = setInterval(()=>{

        opacity -= 0.02;

        endingSprite.material.opacity = opacity;

        if(opacity <= 0){

            endingSprite.material.opacity = 0;

            endingSprite.visible = false;

            clearInterval(fade);

        }

    },30);

}