//=====================================
// MENSAJES
//=====================================

let message;
let currentStage = -1;

export function createMessages(){

    message = document.createElement("div");

    message.id = "message";

    message.style.position = "fixed";

    message.style.left = "30px";

    message.style.bottom = "90px";

    message.style.transform = "none";

    message.style.color = "white";

    message.style.textShadow = "0 0 12px rgba(0,0,0,0.9)";

    message.style.fontSize = "26px";

    message.style.lineHeight = "1.5";

    message.style.fontFamily = "Georgia, serif";

    message.style.textAlign = "left";

    message.style.opacity = "0";

    message.style.transition = "opacity 1.5s";

    message.style.pointerEvents = "none";

    message.style.width = "75vw";
    message.style.maxWidth = "420px";

    document.body.appendChild(message);

}

export function showMessage(text){

    message.innerHTML = text;

    message.style.opacity = "1";

}

export function hideMessage(){

    message.style.opacity = "0";

}

export function updateMessages(cameraZ){

// SOL
if(cameraZ < -450 && currentStage === -1){

    currentStage = 0;

    showMessage("Dicen que el Sol es la estrella que más brilla...");

    setTimeout(()=>{

        hideMessage();

    },5500);

    setTimeout(()=>{

        showMessage("...pero nunca ha iluminado mi vida tanto como tú.");

    },8500);

    setTimeout(()=>{

        hideMessage();

    },13000);

}

// TIERRA
if(cameraZ < -1400 && currentStage === 0){

    currentStage = 1;

    showMessage("Entre millones de personas...");

    setTimeout(()=>{

        hideMessage();

    },5500);

    setTimeout(()=>{

        showMessage("...coincidir contigo fue la casualidad más bonita.");

    },8000);

    setTimeout(()=>{

        hideMessage();

    },13000);

}

// LUNA
if(cameraZ < -2450 && currentStage === 1){

    currentStage = 2;

    showMessage("La Luna nos recuerda que, incluso a la distancia...");

    setTimeout(()=>{

        hideMessage();

    },6000);

    setTimeout(()=>{

        showMessage("...siempre podemos compartir el mismo cielo.");

    },9000);

    setTimeout(()=>{

        hideMessage();

    },15000);

}

// SATURNO
if(cameraZ < -3100 && currentStage === 2){

    currentStage = 3;

    showMessage("No importa qué tan lejos llegue este viaje...");

    setTimeout(()=>{

        hideMessage();

    },5500);

    setTimeout(()=>{

        showMessage("...lo más bonito será compartirlo siempre contigo.");

    },8500);

    setTimeout(()=>{

        hideMessage();

    },12600);

}

}