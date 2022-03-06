//--Práctica 1: Tienda online con nodejs

//-- Importar los módulos
const http = require('http'); //-- Módulo http, creación de servidores web
const fs = require('fs'); //-- Módulo fs, acceso al sistema de ficheros

//-- Declarar constantes
const PUERTO = 9090; //-- Puerto a utilizar

//-- Declarar valores tipo MIME
const mime = {
    'html' : 'text/html', /* Texto HTML */
    'css'  : 'text/css', /* Hoja de estilo */
    'jpeg'  : 'image/jpeg', /* Imagen en formato jpeg */
    'png'  : 'image/png', /* Imagen en formato png */
 };

//-- Mensaje de arranque
console.log("Arrancando el servidor...");

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);

//-- Crear el servidor. Por cada petición se imprime mensaje.
const server = http.createServer((req, res) => {

    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");
  });

//-- Mensaje de inicio del servidor
console.log("!. Escuchando en puerto: " + PUERTO);

/* recurso principal index.html
al menos 3 productos => producto1.html, producto2.html y producto3.html// producto1.css, producto2.css y producto3.css

mejoras ej:añadir recurso _ls (puerta trasera al server) node lee los ficheros que hay en el directorio y los devuelve.

*/
