//--Práctica 1: Tienda online con nodejs

//-- Importar los módulos
const http = require('http'); //-- Módulo http, creación de servidores web
const url = require('url'); //-- Módulo url, analiza y procesa URLs
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


//-- Texto HTML
const pagina = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Happy Server!</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">HAPPY SERVER!!!</h1>
</body>
</html>
`

//-- Crear el servidor. Por cada petición se imprime mensaje.
const server = http.createServer((req, res) => {

    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");

    //-- Cabecera que indica el tipo de datos del
    //-- cuerpo de la respuesta: Texto plano
    //--res.setHeader('Content-Type', 'text/html');
   
    //-- Generar respuesta
    //-- web OK
    res.statusCode = 200;
    res.statusMessage = "OK";
    //-- Cabecera que indica el tipo de datos de la respuesta: Texto html
    res.setHeader('Content-Type', 'text/html');
    //-- Mensaje del cuerpo de la pagina
    res.write(pagina);

    //-- Terminar la respuesta y enviarla
    res.end();

});


//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);


//-- Mensaje de inicio del servidor
console.log("Web artística!. Escuchando en el puerto: " + PUERTO);





/* recurso principal index.html
al menos 3 productos => producto1.html, producto2.html y producto3.html// producto1.css, producto2.css y producto3.css

mejoras ej:añadir recurso _ls (puerta trasera al server) node lee los ficheros que hay en el directorio y los devuelve.

*/
