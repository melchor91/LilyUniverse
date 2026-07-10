//=====================================
// TEXTOS DEL VIAJE
//=====================================

const messages = [

    {
        id:0,
        title:"Hola Lily 💜",
        text:"Toca para comenzar el viaje"
    },

    {
        id:1,
        title:"El Sol",
        text:"Como él, iluminas todo a tu alrededor."
    },

    {
        id:2,
        title:"La Tierra",
        text:"Entre miles de millones de personas, tú eres mi lugar favorito."
    },

    {
        id:3,
        title:"La Luna",
        text:"Incluso en la oscuridad siempre encuentras la forma de brillar."
    },

    {
        id:4,
        title:"Saturno",
        text:"Si el universo tiene maravillas, tú eres una de ellas."
    },

    {
        id:5,
        title:"",
        text:"Miles de estrellas se unen por ti..."
    },

    {
        id:6,
        title:"Lily",
        text:"Gracias por existir. ❤️"
    }

];

export function getMessage(id){

    return messages.find(

        m => m.id === id

    );

}