import * as THREE from "three";
import { scene, camera } from "./main.js";

const shootingStars = [];

let endJourney = false;

let timer = 0;
let interval = 3;

//=====================================
// CREAR ESTRELLA FUGAZ
//=====================================

function createShootingStar(){

    const bigStar = Math.random() <0.20;

  const geometry =
    new THREE.SphereGeometry(

        bigStar ? 1.8 : 1.0,

        8,

        8

    );

    const material =
        new THREE.MeshBasicMaterial({

        color:0xffffff

    });

  const starGroup = new THREE.Group();

const head = new THREE.Mesh(

    geometry,

    material

);
starGroup.add(head);

const tailGeometry =
    new THREE.BufferGeometry().setFromPoints([

        new THREE.Vector3(0,0,0),

        new THREE.Vector3(

            bigStar ? 45 : 28,

            bigStar ? 5 : 3,

            bigStar ? -60 : -35

        )

]);

const tailMaterial =
    new THREE.LineBasicMaterial({

        color:0xffffff,

        transparent:true,

        opacity: bigStar ? 0.75 : 0.40

});

const tail =
    new THREE.Line(

        tailGeometry,

        tailMaterial

);

starGroup.add(tail);

    starGroup.position.set(

        (Math.random()-0.5)*1200,

        (Math.random()-0.5)*900,

        camera.position.z-2200

    );

    starGroup.userData.velocity =
        new THREE.Vector3(

        -12,

        -3,

        14

    );

    scene.add(starGroup);

    shootingStars.push(starGroup);

}

//=====================================
// ACTUALIZAR EFECTOS
//=====================================

export function updateEffects(delta){

    if(endJourney){
        shootingStars.forEach(star => {
            scene.remove(star);
        });
        shootingStars.length = 0;
        return;
    }

    timer += delta;

    //---------------------------------
    // FRECUENCIA SEGÚN EL VIAJE
    //---------------------------------

 if(camera.position.z > -1500){

    interval = 1.5;

}else if(camera.position.z > -2500){

    interval = 1.0;

}else if(camera.position.z > -3500){

    interval = 0.7;

}else if(camera.position.z > -4300){

    interval = 0.35;

}else{

    interval = 0.12;

}

if (timer > interval){
    createShootingStar();
    timer = 0;
}

    //---------------------------------
    // MOVER ESTRELLAS
    //---------------------------------

    for(let i = shootingStars.length - 1; i >= 0; i--){

        const star = shootingStars[i];

        star.position.add(

            star.userData.velocity

        );

        if(

            star.position.z >

            camera.position.z + 200

        ){

            scene.remove(star);

            shootingStars.splice(i,1);

        }

    }

}

export function endJourneyEffects(){
    endJourney = true;
}