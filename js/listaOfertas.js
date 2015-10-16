localStorage.removeItem("carrito");
localStorage.removeItem("wishList");

var carro = JSON.parse(localStorage.getItem("carrito"));
if (carro == undefined) {
    alert("creo carrito");
    var carrito = [];

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

var wish = JSON.parse(localStorage.getItem("wishList"));
if (wish == undefined) {
    var wishList = [];

    localStorage.setItem("wishList", JSON.stringify(wishList));
}


var request = new Object();
request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllProducts&id=1&page_size=18";




request.dataType = "jsonp";
console.log(request.url);
$.ajax(request).done(function(data) {
    sessionStorage.setItem("ofertas", JSON.stringify(data));
    addOffers();
});



function addOffers() {

    document.getElementById('ofertas').innerHTML = "";


    var data = JSON.parse(sessionStorage.getItem("ofertas"));

    var i = 0;
    for (i = 0; i < data.total && data.products[i] != undefined; i++) {
        if (i % 6 == 0) {

            document.getElementById('ofertas').innerHTML += '<div class="container">' +
                '<div class="row">';
        }

        var ID = "pagProd.html?product" + "=" + data.products[i].id;

        var prod = '<div class="col-md-2 col-sm-6 col-xs-6">' +
            '<a onclick="loadProduct(data.products[i].name)" href=' + ID + '>' +
            '<div class="panel panel-default">' +
            '<div class="panel-body">' +
            '<div class="imgWrapper">' +
            '<img src=' + data.products[i].imageUrl[0] + '>' +
            '</div>' +
            '<br>' +
            '<font size="3" style="color:black"><b>' + data.products[i].name + '</b></font>' +
            '<br>' +
            '<font size="2" style="color:grey">$' + data.products[i].price + '</font>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</div>';

        document.getElementById('ofertas').innerHTML += prod;

        if (i % 6 == 5) {

            document.getElementById('ofertas').innerHTML += '</div>' +
                '</div>' +
                '<br>' +
                '<br>' +
                '<br>';
        }
    }

}
