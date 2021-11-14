let productosCarrito=[];

let moneda = "UYU";

//completa la función para actualizar el precio subtotal del producto al modificar la cantidad del mismo
function updateProductSubtotal(id){
    let cost = convert(productosCarrito[id-1].unitCost, productosCarrito[id-1].currency);
    let amount = document.getElementById(id).value;
    if (amount<=0){
    	amount = 1;
    	document.getElementById(id).value = 1;
    }
    document.getElementById("subtotal" + id).innerHTML = amount*cost;
    sumaSubtotales();
    modificarTotal();
    updateTotalCosts();
}


//función que permite que aparezca el subtotal del producto en base a la cantidad y precio unitario
function showCarrito(){
    //mostrar los productos del carrito con el input correspondiente a la cantidad que se selecciona del producto
    let htmlToAppend = "";
    let id = 1;
    let cost = 0;
    for(let article of productosCarrito){
        cost = convert(article.unitCost, article.currency);

        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50%;"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle" id="unitCost${id}">${moneda} ${cost}</td>
        <td class="align-middle"><input id="${id}" onchange="updateProductSubtotal(${id});" type="number" min ="1" value=${article.count}></td>
        <td class="aling-middle subtotal" id="subtotal${id}">${article.count * cost}</td>
        </tr>`
        
        id++;         
    }

    document.getElementById("tabla").innerHTML = htmlToAppend
}

//función que realiza el cambio de moneda que trae el JSON a UYU
function cambiarMonedas(){
    let costUnitario = 0;
    let amount = 0;
    for(let i=1;i<=productosCarrito.length;i++){
        costUnitario = convert(productosCarrito[i-1].unitCost, productosCarrito[i-1].currency)
        amount = document.getElementById(i).value;
        if (amount<=0){
    		amount = 1;
    		document.getElementById(i).value = 1;
    	}
        document.getElementById("subtotal"+i).innerHTML = amount*costUnitario;
        document.getElementById("unitCost"+i).innerHTML = moneda +" "+costUnitario;
    }
    sumaSubtotales();
}

//mostramos la suma de todos los subtotales de los productos
function sumaSubtotales(){
    let htmlToAppend = "";
    let subtotal = 0;
    for(let i=1; i<=productosCarrito.length; i++){
        subtotal = subtotal + parseFloat(document.getElementById("subtotal"+i).textContent);
    }

    document.getElementById("sumaSubtotal").innerHTML = subtotal;
    updateTotalCosts();
}

//cÁlculo que se hace para pasar de USD a UYU en este caso
function convert(cost, currency){
    if (moneda == 'UYU' && currency=='USD'){
        cost = cost*40;
    }
    return cost;
}

function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

//modifica el valor del costo total 
function modificarTotal() {
    document.getElementById("total").innerHTML = `Total (${moneda})`;
    document.getElementById("costoTotal").innerHTML = `<b>${parseFloat(document.getElementById("sumaSubtotal").innerHTML) +
        parseFloat(document.getElementById("costoEnvio").innerHTML)}</b>`;
}

//cálculo del porcentaje del costo de envío, dependiendo del envío elegido

comissionPercentage = 0;
document.getElementById("premium").addEventListener("change", function(){
    comissionPercentage = 0.15;
    updateTotalCosts();
});

document.getElementById("express").addEventListener("change", function(){
    comissionPercentage = 0.07;
    updateTotalCosts();
});

document.getElementById("standard").addEventListener("change", function(){
    comissionPercentage = 0.05;
    updateTotalCosts();
});

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    let subtotal = parseFloat(document.getElementById("sumaSubtotal").innerHTML);
    
    let costoEnvio = subtotal * comissionPercentage;
    document.getElementById("costoEnvio").innerHTML = costoEnvio;

    let total =  subtotal +  costoEnvio;
    document.getElementById("costoTotal").innerHTML = total;
}


//función que guarda los datos que se escriben en el formulario, y los datos a mostrar 
function guardarDatosEnvio() {
    var datosEnvio = "";
    var nombre = document.getElementById("inputNombre").value;
    var apellido = document.getElementById("inputApellido").value;
    var calle = document.getElementById("inputCalle").value;
    var número = document.getElementById("inputNumero").value;
    var departamento = document.getElementById("inputDepartamento").value;
  
    datosEnvio = `<strong>Nombre:</strong>`+" "+ nombre +" "+ apellido + " " + `<strong>Dirección:</strong>`+ " " + calle + " " + número + " " + "-" + " " + departamento;
     
    localStorage.setItem('datosEnvios',datosEnvio);
  }
  

  //función que guarda los datos ingresados de la tarjeta
  function guardarDatosTarjeta() {
    var datosTarjeta = "";
  
    datosTarjeta = `<strong>Forma de pago:</strong>` + " " + "Tarjeta";
    localStorage.setItem('datosPago',datosTarjeta);
  
  }

  //guarda los datos ingresados de la cuenta bancaria 
  
  function guardarDatosTransf() {
    var datosTransf = "";
  
    datosTransf = `<strong>Forma de pago:</strong>` + " " + "Transferencia";
    localStorage.setItem('datosPago',datosTransf);
  }

  // Función para activar botón de modal de transferencia bancaria
function activarBoton(okCheckBox) {
    
    if(okCheckBox.checked){
        document.getElementById("botonAceptarTransf").disabled = false;
    }
    else{
        document.getElementById("botonAceptarTransf").disabled = true;
    }
}

 // Mostrar datos de envio y pago en div de resumen
 let datosEnvio = localStorage.getItem('datosEnvios');
 let datosPago = localStorage.getItem('datosPago')

 if (datosEnvio != null) {
 document.getElementById("infoEnvio").innerHTML = datosEnvio;
}

if (datosPago != null) {
 document.getElementById("infoPago").innerHTML = datosPago;
}

// Función que larga las diferentes alertas al darle a finalizar compra, dependiendo de los formularios completos 
document.getElementById('finalizarCompra').addEventListener('click', function (e) {
    let envioGuardado = document.getElementById('infoEnvio').innerHTML;
    let pagoGuardado = document.getElementById('infoPago').innerHTML;
    
    if (envioGuardado != "" && pagoGuardado != "") {
      
      swal({
        title: "¡Felicidades!",
        text: "¡Que disfrutes tu compra!",
        icon: "success",
        buttons: ["Volver a inicio", "Cerrar sesión"],
      dangerMode: true,
    })
    .then((cerrarSesion) => {
      if (cerrarSesion) {
        window.location.href = "index.html";
        localStorage.clear();
        
      } else {
        window.location = "portada.html";
        
      }
    });
    }
    
    
    if (envioGuardado == "" && pagoGuardado != "") {
      swal(
        "¡No tan rápido!",
        "Te olvidaste de ingresar tu información de envío",
        "error"
      );
    }
    
    if (envioGuardado != "" && pagoGuardado == "") {
      swal(
        "¡No tan rápido!",
        "Te olvidaste de seleccionar un método de pago",
        "error"
      );
    }

    if (envioGuardado == "" && pagoGuardado == "") {
        swal(
          "¡No tan rápido!",
          "Selecciona un método de pago e ingresa tu información de envío",
          "error"
        );
      }
  
    
    });
    
document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        moneda = 'UYU';
        showCarrito();
        sumaSubtotales();
        
        console.log(productosCarrito);
    })
})


  
  
