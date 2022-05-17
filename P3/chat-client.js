/* CLIENTE/S */

//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const send = document.getElementById("send");
const msg_nickname = document.getElementById("apodo");

//-- Cargar sonido
let sonido = new Audio("sonido.mp3");

//-- Variable para el nickname
let nickname = "Usuario sin nickname";

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Mensaje recibido
socket.on("message", (msg)=>{
    display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
    if (msg_entry.value)
        socket.send(nickname + ': ' +msg_entry.value);
        sonido.play();

    //-- Borrar el mensaje actual
    msg_entry.value = "";
}

//-- Al escribir un apodo queda registrado el usuario 
msg_nickname.onchange = () => {
    if(msg_nickname.value){
      nickname = msg_nickname.value;
    }
    console.log(nickname);
    //-- Borrar el mensaje actual
    msg_nickname.value = "";
    socket.send("Ha introducido su nickname: " + nickname)
    sonido.play();
}
