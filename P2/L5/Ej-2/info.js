/* Ejercicio 2: Estructura del fichero tienda.json */

//-- Crear una variable con la estructura definida
//-- en un fichero JSON

const fs = require('fs');

//-- Npmbre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Leer el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Mostrar informacion sobre la tienda
console.log("El tipo de productos que hay en la tienda es: " + tienda.productos.length + "\n");
console.log("La información sobre los productos es: \n");
tienda.productos.forEach((element,index)=>{
    console.log("Producto " + (index + 1) + ": " + element["nombre"]);
    console.log("Descripcion " + (index + 1) + ": " + element["descripcion"]);
    console.log("Hay " + element["stock"] + " unidades disponibles.\n");
});

//-- Numero de usuarios registrados en la tienda
console.log("El número de usuarios registrados en la tienda es: " + tienda.usuarios.length + " y su información es: \n");

//-- Listado con los usuarios de la tienda
tienda.usuarios.forEach((element,index)=>{
    console.log("Usuario " + (index + 1) + ": " + element["usuario"]);
    console.log("Email: " + element["email"]);
    console.log(" ")
});

//-- Información de los pedidos
console.log("El número de pedidos pendientes es: " + tienda.pedidos.length + " y su información es: \n");
tienda.pedidos.forEach((element,index)=>{
    console.log("Usuario: " + element["usuario"] + "\n");
    console.log("Detalles de pago: " + element["tarjeta"] + "\n");
    element["productos"].forEach((element,index)=> {
        console.log("Tipo de producto: " + element.producto + ". Cantidad: " + element.unidades + "\n" + "\n");
    });

});
