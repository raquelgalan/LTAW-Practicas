//-- Autora: Raquel Galán
//-- Práctica 2: Interacción cliente-servidor. Tienda mejorada

//-- Importar los módulos
const http = require('http'); //-- Módulo http, creación de servidores web
const url = require('url'); //-- Módulo url, analiza y procesa URLs
const fs = require('fs'); //-- Módulo fs, acceso al sistema de ficheros

//-- Declarar constantes
const PUERTO = 9090; //-- Puerto a utilizar
const PAGINA = fs.readFileSync('tienda.html','utf-8'); //-- Página web
const PAG_ERR = fs.readFileSync('error.html', 'utf-8'); //-- Página de error
const FORMULARIO = fs.readFileSync('formulario.html','utf-8'); //-- Cargar web de compra
const BAILARINAS = fs.readFileSync('bailarinas.html', 'utf-8'); //-- Página del producto 1
const MAR = fs.readFileSync('mar.html', 'utf-8'); //-- Página del producto 2
const CABALLO = fs.readFileSync('caballo.html', 'utf-8'); //-- Página del producto 3
const CARRITO = fs.readFileSync('carrito.html', 'utf-8'); //-- Página del carrito
const LOGIN = fs.readFileSync('login.html', 'utf-8') //-- Loguearse
const LOGOUT = fs.readFileSync('logout.html', 'utf-8') //-- Desloguearse
const RESPUESTA_OK = fs.readFileSync('conocido.html', 'utf-8'); //-- Página de bienvenida
const RESPUESTA_ERROR = fs.readFileSync('desconocido.html', 'utf-8'); //-- cliente desconocido
const PEDIDO = fs.readFileSync('pedido.html','utf-8'); //-- Compra
const COMPRA_OK = fs.readFileSync('compra-ok.html', 'utf-8'); //-- Respuesta de la compra
const FICHERO_OUT = "tienda-out.json" //-- Nombre del fichero JSON de salida

const FICHERO_JSON = 'tienda.json'; //-- Fichero JSON con datos
const tienda_json = fs.readFileSync(FICHERO_JSON); //-- Leer el fichero JSON

//-- Crear la estructura tienda a partir del contenido del fichero
//-- nos devuelve la estructura del json
const tienda = JSON.parse(tienda_json);

//-- Declarar valores tipo MIME
const mime = {
    'html' : 'text/html', /* Texto HTML */
    'css'  : 'text/css', /* Hoja de estilo */
    'jpeg' : 'image/jpeg', /* Imagen en formato jpeg */
    'png'  : 'image/png', /* Imagen en formato png */
    'ico'  : 'image/x-icon', /* Icono favicon */
    'json' : 'application/json', /* JSON */
    'gif'  :  'image/gif' /* Gifs */
 };

//--Variables
let pag_principal; //-- Variable pagina principal
let contenido; //-- Contenido solicitado


//-- Arrays
let busqueda =""; //-- Variable de busqueda
let productos_disp = [];
let product_list = [];
let carrito = "";
let nombre = [];
let password = [];

tienda[0]["productos"].forEach((element, index)=>{
    console.log("Producto " + (index + 1) + ": " + element.nombre +
                ", Stock: " + element.stock + ", Precio: " + element.precio);
    productos_disp.push([element.nombre, element.descripcion, element.stock, 
                        element.precio]);
    product_list.push(element.nombre);
  });

//-- Comprobar usuario
function usuario(req) {

    //-- Leer cookie
    const cookie = req.headers.cookie;

    //-- Comprobar si hay cookies
    if (cookie) {
        console.log("Cookie: " + cookie);

        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        
        //-- Variable para guardar el usuario
        let user;
    
        //-- Recorrer todos los pares nombre-valor
        pares.forEach((element, index) => {
    
            //-- Obtener los nombres y valores por separado
            let [nombre, valor] = element.split('=');
    
            //-- Leer el usuario
            //-- Solo si el nombre es 'user'
            if (nombre.trim() === 'user') {
            user = valor;
            }
        });
    
        //-- Si la variable user no está asignada
        //-- se devuelve null
        return user || null;
    }
}
  
//-- Comprobar el carrito
function carrito(req){
    //-- Leer la cookie recibida
    const cookie = req.headers.cookie;

    //-- Comprobar si hay cookies
    if (cookie){
        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
    
        //-- Variables para guardar los datos del carrito
        let carrito;
        let bailarinas = '';
        let carrito1 = 0;
        let mar = '';
        let carrito2 = 0;
        let caballo = '';
        let carrito3 = 0;

        //-- Recorrer todos los pares nombre-valor
        pares.forEach((element, index) => {
            //-- Obtener los nombre y los valores por separado
            let [nombre, valor] = element.split('=');
    
            //-- Si nombre = carrito registramos los articulos
            if (nombre.trim() === 'carrito') {
            productos = valor.split(':');
            productos.forEach((producto) => {
                if (producto == 'bailarinas'){
                if (carrito1 == 0) {
                    bailarinas = productos_disp[0][0];
                }
                carrito1 += 1;
                }else if (producto == 'mar'){
                if (carrito2 == 0){
                    mar = productos_disp[1][0];
                }
                carrito2 += 1;
                }else if (producto == 'caballo'){
                if (carrito3 == 0){
                    caballo = productos_disp[2][0];
                }
                carrito3 += 1;
                }
            });
    
            if (carrito1 != 0) {
                bailarinas += ' x ' + carrito1;
            }
            if (carrito2 != 0) {
                mar += ' x ' + carrito2;
            }
            if (carrito3 != 0) {
                caballo += ' x ' + carrito3;
            }

            shopcart = bailarinas + '<br>' + mar + '<br>' + caballo;
            }
      });
  
      //-- Si esta vacío se devuelve null
      return shopcart || null;
    }
}


//-- Crear el sevidor
const server = http.createServer((req, res)=>{
    console.log('\nPeticion recibida');

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  
    console.log("");
    console.log("Método: " + req.method); //-- método
    console.log("Recurso: " + req.url); //-- recurso
    console.log(" Ruta: " + myURL.pathname); //-- ruta sin parámetros
    console.log(" Parámetros: " + myURL.searchParams); //-- parámetros separados
    const login ='Login';

    //-- Leer los parámetros
    let usuario = myURL.searchParams.get('usuario');
    let direccion = myURL.searchParams.get('direccion');
    let tarjeta = myURL.searchParams.get('tarjeta');
    let password = myURL.searchParams.get('password');
    console.log(" Nombre usuario: " + usuario);
    console.log(" Direccion de envío: " + direccion);
    console.log(" Numero de Tarjeta de credito: " + tarjeta);
    console.log(" Numero de Tarjeta de credito: " + tarjeta);
    console.log(" Password: " + password);

    //-- Por defecto entregar texto html
    let content_type = mime_type["html"];

    //-- Comprobamos las rutas solicitadas
    if(myURL.pathname == '/'){   //-- Acceder al recurso raiz
        //-- Comprobar si hay cookie de ese usuario
        if(user){
        //-- Introducir su nombre en la pagina principal
        contenido = PAGINA.replace('<h3></h3>', '<h3> Usuario: ' + user + '</h3>');
        contenido = contenido.replace('<b></b>',
                                '<a  class= "element" href="/comprar">Comprar</a>');
        pag_principal = contenido;
        }else{
        //-- Pagina principal con el login
        contenido = PAGINA; //-- Contenido solicitado
        pag_principal = contenido; //-- Variable pagina principal
    }

    //-- Acceder al recurso login
    }else if (myURL.pathname == '/login'){
    //-- Comprobamos si hay cookie del usuario
    if(user){
      //-- No le mandamos el formulario
      //-- Le decimos que ya esta logeado
      console.log('Hay cookie guardada, ya estas logeado');
      content = LOGIN.replace("USUARIO", user );

    }else{
      console.log('No hay cookie, hay que logearse');
      //-- Le mandamos el formulario para que se registre
      content = FORMULARIO;
    }
    ext = "html";
  //-- Acceder al recurso procesar
  }else if (myURL.pathname == '/procesar'){
    //-- Comprobamos si el usuario esta registrado en JSON, si es asi OK
    if ((nombre_reg.includes(nombre)) && (password_reg.includes(password))){

      console.log('User: ' + nombre);

      //-- Asignar la cookie del usuario registrado
      res.setHeader('Set-Cookie', "user=" + nombre );

      //-- Mostramos la pagina OK
      console.log('Usuario registrado');
      content = RESPUESTA_OK;
      html_extra = nombre;
      content = content.replace("HTML_EXTRA", html_extra);

    }else{
        content = RESPUESTAERROR;
    }
    
  }else if (myURL.pathname == '/comprar'){
    content = COMPRAR.replace('PRODUCTOS', productos_carrito)

    
  }else if (myURL.pathname == '/finalizar'){
    content = RESPUESTACOMP;
  

  //-- Acceder al recurso producto 1
  }else if(myURL.pathname == '/bailarinas'){
    content = BAILARINAS;
    //-- Obtengo las descripciones y precios de cada producto
      content = content.replace('DESCRIPCION' + (i+1), descripcion["bailarinas"])
      content = content.replace('PRECIO' + (i+1), precio["bailarinas"])

  //-- Acceder al recurso producto 2
  }else if(myURL.pathname == '/mar'){
    content = MAR;
    //-- Obtengo las descripciones y precios de cada producto
      content = content.replace('DESCRIPCION' + (i+1), descripcion["mar"])
      content = content.replace('PRECIO' + (i+1), precio["mar"])
  //-- Acceder al recurso producto 3
  }else if(myURL.pathname == '/caballo'){
    content = CABALLO;
    //-- Obtengo las descripciones y precios de cada producto
      content = content.replace('DESCRIPCION' + (i+1), descripcion["caballo"][i])
      content = content.replace('PRECIO' + (i+1), precio["caballo"][i])
  //-- Acceder a recurso carrito
  }else if(myURL.pathname == '/bailarinas/carrito' || myURL.pathname == '/mar/carrito' ||
           myURL.pathname == '/caballo/carrito'){
    //-- Extraigo el producto
    producto_path = myURL.pathname.split('/')[1];
    
    //-- Añado el producto al array de productos
    productos.push(producto);
    //-- Contar la cantidad de cada producto
    let productos_sum = {};
    productos.forEach(function(numero){
      productos_sum[numero] = (productos_sum[numero] || 0) + 1;
    });
  


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