const ORDER_ASC_BY_COST = "MinMax";
const ORDER_DESC_BY_COST = "MaxMin";
const ORDER_BY_PROD_SOLDCOUNT = "Relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

//href - al hacer click en cualquier producto te dirige a product-info
        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name + `</h4>
                                <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                            </div>
                            <p> ` + product.description + `</p>
                            <p> ` + product.currency + "   " + product.cost + `</p>
                        </div>
                    </div>
                </a>
                `
        document.getElementById("product").innerHTML = htmlContentToAppend;
    }
}
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") 
        {
            categoriesArray = resultObj.data;
            //Muestro las los productos de forma ordenada
            sortAndShowProducts(ORDER_DESC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar los productos por sus precios.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList()

    });
}); 
