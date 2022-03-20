//--Práctica 1: Tienda online con nodejs

//-- Importar los módulos
const http = require('http'); //-- Módulo http, creación de servidores web
const url = require('url'); //-- Módulo url, analiza y procesa URLs
const fs = require('fs'); //-- Módulo fs, acceso al sistema de ficheros

//-- Declarar constantes
const PUERTO = 9090; //-- Puerto a utilizar
const PAGINA ='tienda.html'; //-- Página web

//-- Declarar valores tipo MIME
const mime = {
    'html' : 'text/html', /* Texto HTML */
    'css'  : 'text/css', /* Hoja de estilo */
    'jpeg'  : 'image/jpeg', /* Imagen en formato jpeg */
    'png'  : 'image/png', /* Imagen en formato png */

 };

//-- Crear el sevidor
const server = http.createServer(function (req, res) {


    //-- Crear el objeto URL del mensaje de solitud (req)
    //-- y coger el recurso (url)
    let myURL = url.parse(req.url, true);

    //-- Ruta de recurso
    console.log("Recurso recibido: " + myURL.pathname);

    //-- Cabecera que indica el tipo de datos del
    //-- cuerpo de la respuesta: Texto plano
    res.setHeader('Content-Type', 'text/plain');

    //-- Cargar en el fichero mi tienda
    let filename = "";

    //-- Obtenemos el fichero correspondiente.
    if (myURL.pathname == '/'){
        filename += "tienda.html";  //-- Abrir página
    }else{
        filename += myURL.pathname.substr(1);  //-- Abrir fichero
    }

    //-- Página web html con lectura asíncrona
    fs.readFile(filename, (error, page) => {
        if (error){
            console.log (error.message) 
            console.log(filename);
            //filename == "error.html";
            //console.log(filename);
            res.writeHead(404, {'Content-Type': mime});
            //return error.html;
            
            //return res.end("404 ERROR");
            //console.log(err.message);


        }else{
            //-- Petición 200 OK
            res.writeHead(200, {'Content-Type': mime});
            console.log("Petición 200 OK");
            
      }
    
    res.write(page);

    //-- Terminar la respuesta y enviarla
    res.end();
    });
});

//-- El servidor escucha en el puerto
server.listen(PUERTO);


//-- Mensaje de inicio del servidor
console.log("Web artística!. Escuchando en el puerto: " + PUERTO);