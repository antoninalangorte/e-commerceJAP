var product = {};
var productComments = [];

// En esta funcion se recibe un objeto producto para mostrarlo en pantalla
function showProduct(product) {

    let imagesProduct = "";

   //imagesProduct = `
   // <img class="img" src= "${product.images}" width="150" height = "100px">
    //<img class="img" src= "${product.images[1]}" width="150px" height = "100px">
    //<img class="img" src= "${product.images[2]}" width="1500px" height = "100px">
    //<img class="img" src= "${product.images[3]}" width="150px" height = "100px">
    //<img class="img" src= "${product.images[4]}" width="150px" height = "100px">
    //`;

    document.getElementById("categoryName").innerHTML = product.name;
    document.getElementById("categoryDescription").innerHTML = product.description;
    document.getElementById("productCount").innerHTML = product.cost;
    document.getElementById("soldCount").innerHTML = product.soldCount;
    document.getElementById ("category").innerHTML = product.category;

    }

// Con esta funcion recibimos un array de comentarios y se muestran en pantalla
function showProductComment(comment) {

    let commentToShow = "<hr>";

    comment.forEach(function (itemComment) {

        let commentPoints = "";

        commentToShow += `
            <strong>${itemComment.user} </strong> dice: <br>
            <p>${itemComment.description}</p>
        `;
//for  que muestras las estrellas que el usuario selecciona en comentarios
        for (let i = 1; i <= itemComment.score; i++) {
            commentPoints += `<span class= "fa fa-star checked"></span>`;
        }
//for que muestra en negro las estrellas restantes a la elección del usuario
        for (let i = itemComment.score + 1; i <= 5; i++) {
            commentPoints += `<span class= "fa fa-star"></span>`;
        }

        commentToShow += `<sub>${itemComment.dateTime}</sub><br>`;
        commentToShow += `<div style= "text-align: right;">${commentPoints}</div><br><hr>`;

    });

    document.getElementById("comments").innerHTML = commentToShow;
}


document.addEventListener("DOMContentLoaded", function () {

    // Se extrae la informacion del producto
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
        }
    });

    // Extraemos los comentarios del producto
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
        }

        // Se muestra el producto
        showProduct(product);
        // Se muestran los comentarios del producto
        showProductComment(productComments)

    });

});

// Nuevo comentario del usuario
document.getElementById("sendComment").addEventListener("click", function () {

    // Extrae el comentario
    let elementoTextArea = document.getElementById("productDescription");
    let comment = elementoTextArea.value;
    let stars = parseInt(document.getElementById("stars").value);

    commentAdd = {};

    // Extraemos fecha y hora
    let date = new Date();
    let formatDate = date.getFullYear().toString() + "-" + (date.getMonth() +1).toString().padStart(2,'0') + '-' + date.getDate().toString().padStart(2, '0') + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    // Se crea el comentario
    commentAdd = {
        score: stars,
        description: comment,
        user: localStorage.getItem("user"),
        dateTime: formatDate,
    };

    // Así  se agregan los comentarios a los demás
    productComments.push(commentAdd);

    // Mostramos nuevamente los comentarios
    showProductComment(productComments);

});
    