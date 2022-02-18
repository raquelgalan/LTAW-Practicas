const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("\nMENSAJE A")

  req.on('data', (cuerpo) => {
    console.log("MENSAJE B")
  });

  req.on('end', ()=> {
    console.log("MENSAJE C");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

  console.log("MENSAJE D");

});

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

//-- Situación 1
//-- Arranca servidor
//-- MENSAJE E
//-- MENSAJE F
//-- llega solicitud (tipo 1)
//-- MENSAJE A
//-- MENSAJE D
//-- llegará el evento end
//-- MENSAJE C
//-- data no tiene cuerpo por eso el MENSAJE B no va a llegar

//-- Situación 2
//-- Arranca servidor
//-- MENSAJE E
//-- MENSAJE F
//-- llega solicitud (tipo 2)
//-- MENSAJE A
//-- MENSAJE D
//-- llega el evento DATA
//-- MENSAJE B
//-- llega el evento END
//-- MENSAJE C