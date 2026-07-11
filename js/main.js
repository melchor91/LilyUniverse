import * as THREE from "three";

import { createUniverse } from "./universe.js";

import {
    createPlanets,
    updatePlanets
} from "./planets.js";

import {
    updateCamera,
    stopCamera
} from "./camara.js";

import {
    updateEffects,
    endJourneyEffects
} from "./effects.js";

import {
    createHeart,
    animateHeart
} from "./heart.js";

import {
    startScenes,
    updateScenes,
    getCurrentScene
} from "./scenes.js";

import {
    createGalaxy,
    updateGalaxy
} from "./galaxy.js";

import {
    createNebula,
    updateNebula
} from "./nebula.js";

import{
    createMessages,
    updateMessages
}from "./messages.js";

import {
    createLily,
    showLily
} from "./finalText.js";

import {
    createFinalMessages,
    showFinalMessages
} from "./finalMessages.js";

import {
    hideHeart
} from "./heart.js";

import {
    hideLily
} from "./finalText.js";

import {
    hideFinalMessages
} from "./finalMessages.js";

import {
    createEnding,
    showEnding,
    hideEnding
} from "./ending.js";

//=====================================
// MÚSICA
//=====================================

const music = new Audio("/audio/music.mp3");

music.loop = false;
music.volume = 0.15;

//=====================================
// ESCENA
//=====================================

export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x010104);


//=====================================
// CÁMARA
//=====================================

export const camera = new THREE.PerspectiveCamera(

    50,

    window.innerWidth / window.innerHeight,

    0.1,

    6000

);

camera.position.set(0,0,20);

//=====================================
// RENDERER
//=====================================

export const renderer = new THREE.WebGLRenderer({

    canvas:document.querySelector("#scene"),

    antialias:true

});

renderer.setPixelRatio(

    Math.min(window.devicePixelRatio,2)

);

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

//=====================================
// RELOJ
//=====================================

const clock = new THREE.Clock();

//=====================================
// CREAR ESCENA
//=====================================

createUniverse();

createPlanets();

createNebula();

//createGalaxy();

createMessages();

createLily();

createFinalMessages();

createEnding("");

//createHeart();

startScenes();


let started = false;
let finalStarted = false;

//=====================================
// LOOP
//=====================================
function animate(){

    requestAnimationFrame(animate);

    const delta =
    clock.getDelta();

    const time =
    clock.getElapsedTime();

    if (started){

    updateCamera(time);

    updatePlanets(time);

    //updateGalaxy ();


    updateEffects(delta);

    updateScenes(time);
if (camera.position.z <= -3900 && !finalStarted) {

    finalStarted = true;

    console.log("Inicia escena final");

    setTimeout(() => {

        stopCamera();

        console.log("Creando corazón");

        createHeart(

            camera.position.x + 25,

            camera.position.y + 15,

            camera.position.z - 180

        );

        animateHeart();

    }, 3000);

    setTimeout(() => {

    hideHeart();

    hideLily();

    hideFinalMessages();

    setTimeout(() => {


    createEnding("Con cariño,\nErnesto");

    showEnding(

        camera.position.x + 20,

        camera.position.y + 10,

        camera.position.z - 150

    );
}, 2500);

    setTimeout(() => {

        hideEnding();

        setTimeout(() => {

         createEnding("Fin del viaje.");

showEnding(

    camera.position.x + 20,

    camera.position.y + 10,

    camera.position.z - 150

);

setTimeout(() => {

    hideEnding();

}, 4000);

setTimeout(() => {
    endJourneyEffects();
    scene.children.forEach(obj => {
        obj.visible = false;
    });

    scene.background = new THREE.Color(0x000000);

    const fadeMusic = setInterval(() => {
        if (music.volume > 0.001){
            music.volume -= 0.001;
        } else {
            music.volume = 0;
            music.pause();
            clearInterval(fadeMusic);
        }
    }, 150);

}, 6000);

        },2000);

    },5000);

},28000);

}

    updateNebula (time);

    updateMessages (camera.position.z);
    }

    renderer.render(

        scene,

        camera

    );

}

animate();

//=====================================
// RESIZE
//=====================================

window.addEventListener(

    "resize",

    ()=>{

        camera.aspect =

        window.innerWidth /

        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

);

const intro = document.getElementById("intro");

intro.addEventListener("click", () => {

    started = true;

    music.play();

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

    }, 700);

});