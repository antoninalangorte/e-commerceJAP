function validar(){

    let nombre = document.getElementById("nombre").value;
    let pass = document.getElementById("pass").value;
    if ((nombre !== "") && (pass !== "")){
        setUser()
        window.location.href="./portada.html"
    }
    else{
        alert ("Debe completar todos los campos");
    } 

}

document.addEventListener("DOMContentLoaded", function(e){

});

function setUser() {
    var userName = document.getElementById("nombre").value;
    localStorage.setItem("user", userName);
    
}