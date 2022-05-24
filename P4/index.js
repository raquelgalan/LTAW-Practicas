const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const print = document.getElementById("print");
const info4 = document.getElementById("info4");
const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const usuarios = document.getElementById("usuarios");
const ip_dir = document.getElementById("ip_dir");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();

info4.textContent = process.versions.node;
info5.textContent = process.versions.chrome;
info6.textContent = process.versions.electron;


//-- Numero de usuarios
electron.ipcRenderer.on('usuarios', (event, message) => {
    console.log("Recibido: " + message);
    usuarios.textContent = message;
});

//-- Mensaje enviado al proceso MAIN
btn_test.onclick = () => {
    display.innerHTML += "> Testeo: Probando, probando, 1, 2, 3..."+ "<br>";
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "> Testeo: Probando, probando, 1, 2, 3...");
}

  //-- Mensajes de los clientes
  electron.ipcRenderer.on("message", (event, msg) => {
    console.log("Recibido: " + msg);
    display.innerHTML += msg + "<br>";
    display.scrollTop = msg.scrollHeight;
});

//-- Mensaje recibido del proceso MAIN

electron.ipcRenderer.on('ip', (event, msg) => {
  console.log("Recibido2: " + msg);
  ip_dir.textContent = msg;
  console.log("ip2: " + ip_dir.address());
});

electron.ipcRenderer.on('print', (event, msg) => {
    console.log("Recibido1: " + msg);
    print.textContent = msg;

});