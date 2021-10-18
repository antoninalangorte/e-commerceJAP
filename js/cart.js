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
    document.getElementById("subtotal"+id).innerHTML = amount*cost;
    sumaSubtotales();
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


  
  
