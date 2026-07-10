// scenes.js

let currentScene = 0;

let sceneStart = 0;

const DURATIONS = [

    6,   // Intro

    8,   // Sol

    8,   // Tierra

    8,   // Luna

    8,   // Saturno

    8,   // Espacio

    8,   // Corazón

    10   // Final

];

//=====================================
// REINICIAR
//=====================================

export function startScenes(){

    currentScene = 0;

    sceneStart = 0;

}

//=====================================
// ACTUALIZAR
//=====================================

export function updateScenes(time){

    if(sceneStart === 0){

        sceneStart = time;

    }

    if(

        time - sceneStart >

        DURATIONS[currentScene]

    ){

        currentScene++;

        sceneStart = time;

        if(

            currentScene >

            DURATIONS.length - 1

        ){

            currentScene =

            DURATIONS.length - 1;

        }

    }

}

//=====================================
// ESCENA ACTUAL
//=====================================

export function getCurrentScene(){

    return currentScene;

}