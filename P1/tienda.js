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
const pagina_main = `

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

//-- Texto HTML de la página de error
const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: red">
    <h1 style="color: white">ERROR!!!!</h1>
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
   
    //-- Generar respuesta por defecto
    //-- web OK
    let code = 200;
    let code_sms = "OK";
    //-- Cabecera que indica el tipo de datos de la respuesta: Texto html
    // -- res.setHeader('Content-Type', 'text/html');
    //-- Mensaje del cuerpo de la pagina
    let page = pagina_main;

//-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname != '/') {
        code = 404;
        code_sms = "Not Found";
        page = pagina_error;
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_sms y page
    res.statusCode = code;
    res.statusMessage = code_sms;
    res.setHeader('Content-Type','text/html');
    res.write(page);

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
