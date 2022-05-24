/* SERVIDOR */

//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const ip = require('ip');


//-- Cargar el módulo de electron
const electron = require('electron');

console.log("Arrancando electron...");

const PUERTO = 9090;

//-- Crear una nueva aplicacion web
const app = express();

//-- Crear un servidor, asosiado a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-- Contador de usuarios
let Contador = 0;

//-- Dirección del chat
let path = __dirname + '/public/chat.html';

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

//-- Obtener direccion IP
dir_ip = ip.address();

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.sendFile(path);
    console.log("Accediendo a: " + path);
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
    console.log('** NUEVO USUARIO CONECTADO **'.yellow);
    Contador +=1; //-- Se incrementa contador del número de usuarios

    //-- Enviar el número de usuarios al renderer
    win.webContents.send('usuarios', Contador);

    // Mensaje de Bienvenida al nuevo usuario
    socket.send('> ¡Bienvenido!');
    socket.send('> Si quieres conocer los comandos especiales introduce: /help');

    // Mensaje para todos los usuarios avisando de que se ha conectado un nuevo usuario
    if (Contador >= 2) {
        io.send("> Nuevo usuario conectado. Hay " + Contador + " usuarios.");
    }else{
        io.send("> Nuevo usuario conectado. Hay " + Contador + " usuario.");
    };

    //-- Enviar mensaje de conexión al renderer
    win.webContents.send('msg_conex', "> Nuevo usuario conectado.");

    //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
    socket.on("message", (msg)=> {
        //-- Enviar al renderer
        win.webContents.send("message", msg);
        //-- Se elimina la parte del nickname
        msg_solo = msg.split(': ')[1];
        if (msg_solo.startsWith("/")) {
            if(msg_solo =='/help'){
                socket.send("> Comandos especiales:" + "<br>" +
                "/list: Devolverá el número de usuarios conectados." + "<br>" +
                " /hello: El servidor nos devolverá el saludo." + "<br>" +
                " /date: Nos devolverá la fecha");
            }else if (msg_solo =='/list') {
                socket.send("Hay " + Contador + " usuario/s" );
            }else if (msg_solo =='/hello') {
                socket.send("¡Hola!");
            }else if (msg_solo =='/date') {
                let Fecha= new Date();
                socket.send("La fecha actual es: " + Fecha.toGMTString());
            }else{
                socket.send("No es un comando especial, en /help tiene más información");
            }    
        }else{
            //-- Reenviarlo a todos los clientes conectados
            io.send(msg);
            console.log("> Mensaje Recibido!: " + msg.blue);
        };
    });

    //-- Evento de desconexión
    socket.on('disconnect', function(){
        console.log('** CONEXIÓN TERMINADA **'.yellow);
        //-- Restamos 1 al contador del número de usuarios
        Contador -= 1;

        //-- Enviar el número de usuarios al renderer
        win.webContents.send('usuarios', Contador);

        //-- Mensaje para todos los usuarios
        if (Contador >= 2) {
            io.send("> Un usuario ha dejado el chat. Hay " + Contador + " usuarios.");
        }else{
            io.send("> Un usuario ha dejado el chat. Hay " + Contador + " usuario.");
        };
    
        //-- Enviar mensaje de desconexión al renderer
        win.webContents.send('msg_desconex', "> Un usuario se ha desconectado.");

    });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);


//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");
    
     //-- Crear la ventana principal de nuestra aplicación
     win = new electron.BrowserWindow({
        width: 1000,   //-- Anchura 
        height: 1000,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

    //-- Cargar interfaz gráfica en HTML
    win.loadFile("index.html");

    //-- Esperar a que la página se cargue y se muestre
    //-- y luego enviar el mensaje al proceso de renderizado para que 
    //-- lo saque por la interfaz gráfica
    win.on('ready-to-show', () => {
    win.webContents.send("ip", "http://" + ip.address() + ":" + PUERTO);
    });

});

//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola
electron.ipcMain.handle('test', (event, msg) => {
    io.send(msg);
    console.log("> Mensaje: " + msg);
});