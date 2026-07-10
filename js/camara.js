import { camera } from "./main.js";

let speed = 0.75;
let cameraStopped = false;

export function stopCamera(){
    cameraStopped = true;
}

export function updateCamera(time) {

    if(cameraStopped){
        return;
    }

    //=================================
    // VELOCIDAD SEGÚN LA ZONA
    //=================================

    if (camera.position.z > -1200) {

        speed = 0.75;

    } else if (camera.position.z > -1850) {

        speed = 0.70;

    } else if (camera.position.z > -2550) {

        speed = 0.55;

    } else if (camera.position.z > -3050) {

        speed = 0.25;

    } else if (camera.position.z > -3300) {

        speed = 0.55;

    } else {

        speed = 0.80;

    }

    //=================================
    // AVANCE
    //=================================

    camera.position.z -= speed * 1.15;

    //=================================
    // MOVIMIENTO SUAVE
    //=================================

    camera.position.x =
        Math.sin(time * 0.035) * 35;

    camera.position.y =
        Math.cos(time * 0.025) * 6;

    //=================================
    // MIRADA
    //=================================

    camera.lookAt(

        camera.position.x + 8,

        0,

        camera.position.z - 60

    );

}