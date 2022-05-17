/* SERVIDOR */

//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8080;

//-- Crear una nueva aplicacion web
const app = express();

//-- Crear un servidor, asosiado a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-- Contador de usuarios
let Contador = 0;

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/chat.html">Chat</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
    console.log('** NUEVO USUARIO CONECTADO **'.yellow);
    Contador +=1; //-- Se incrementa contador

    // Mensaje de Bienvenida al nuevo usuario
    socket.send('¡Bienvenido!');

    // Mensaje para todos los usuarios avisando de que se ha conectado un nuevo usuario
    io.send('Nuevo usuario conectado');

    //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
    socket.on("message", (msg)=> {
        if (msg.startsWith("/")) {
            if(msg =='/help'){
                socket.send("Comandos especiales:" + "<br>" +
                "/ list: Devolverá el número de usuarios conectados." + "<br>" +
                " / hello: El servidor nos devolverá el saludo." + "<br>" +
                " / date: Nos devolverá la fecha");
            }else if (msg =='/list') {
                socket.send("Hay " + Contador + " usuario/s" );
            }else if (msg =='/hello') {
                socket.send("¡Hola!");
            }else if (msg =='/date') {
                let Fecha= new Date();
                socket.send("La fecha de hoy es: " + Fecha);
            }else{
                socket.send("No es un comando especial, en /help tiene más información");
            }    
        }else{
            //-- Reenviarlo a todos los clientes conectados
            io.send(msg);
            console.log("Mensaje Recibido!: " + msg.blue);
        };
    });

    //-- Evento de desconexión
    socket.on('disconnect', function(){
        console.log('** CONEXIÓN TERMINADA **'.yellow);
        Contador -= 1;
        // Mensaje para todos los usuarios
        io.send('Un usuario ha dejado el chat');
    });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);