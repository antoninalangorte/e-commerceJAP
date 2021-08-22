function validar(){

    let nombre = document.getElementById("nombre").value;
    let pass = document.getElementById("pass").value;
    if ((nombre !== "") && (pass !== "")){
        window.location.href="./portada.html"
    }
    else{
        alert ("Debe completar todos los campos");
    }
}

document.addEventListener("DOMContentLoaded", function(e){

});