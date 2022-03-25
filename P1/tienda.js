//-- Autora: Raquel Galán
//-- Práctica 1: Tienda online con nodejs

//-- Importar los módulos
const http = require('http'); //-- Módulo http, creación de servidores web
const url = require('url'); //-- Módulo url, analiza y procesa URLs
const fs = require('fs'); //-- Módulo fs, acceso al sistema de ficheros

//-- Declarar constantes
const PUERTO = 9090; //-- Puerto a utilizar
const PAGINA ='tienda.html'; //-- Página web
const PAG_ERR ='error.html'; 

//-- Declarar valores tipo MIME
const mime = {
    'html' : 'text/html', /* Texto HTML */
    'css'  : 'text/css', /* Hoja de estilo */
    'jpeg' : 'image/jpeg', /* Imagen en formato jpeg */
    'png'  : 'image/png', /* Imagen en formato png */
    'ico'  : 'image/x-icon', /* Icono favicon */
    'gif'  :  'image/gif', /* Gifs */
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
    res.setHeader('Content-Type', mime);

    //-- Cargar en el fichero mi tienda
    let filename = "";

    //-- Se obtiene el fichero
    if (myURL.pathname == '/') {
        filename += PAGINA;
    }else{
        filename += myURL.pathname.substr(1); 
    }    


    //-- Para devolver info sobre el archivo  
    fs.stat(filename, error => {    
        if (!error) {    
            //-- Lectura asíncrona
            fs.readFile(filename, (error, page) => {
                //-- Petición 200 OK
                res.writeHead(200, {'Content-Type': mime});
                console.log("Petición 200 OK");
                res.write(page);
                res.end();
            });

        }else{
            //-- 404 ERROR
            console.log("404 ERROR");
            //-- Lectura asíncrona
            fs.readFile(PAG_ERR,(error,page) => {
                res.writeHead(404, {'Content-Type': mime});
                res.write(page);
                res.end();    
            });
        }; 
    });
});


//-- El servidor escucha en el puerto
server.listen(PUERTO);

//-- Mensaje de inicio del servidor
console.log("Web artística!. Escuchando en el puerto: " + PUERTO);