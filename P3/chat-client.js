/* CLIENTE/S */

//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const send = document.getElementById("send");

//-- Cargar sonido
let sonido = new Audio('sonido.mp3');

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Mensaje recibido
socket.on("message", (msg)=>{
    display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
    if (msg_entry.value)
        socket.send(msg_entry.value);
        sonido.play();

  //-- Borrar el mensaje actual
  msg_entry.value = "";
}


