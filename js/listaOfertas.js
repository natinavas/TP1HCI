
var request = new Object();
request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllProducts&filters=[{%20%22id%22:%205,%20%22value%22:%20%22Oferta%22%20}]&page_size=18";




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


        var marca = "";

        for(j = 0; (data.products[i].attributes[j] != undefined); j++){
            if(data.products[i].attributes[j].name == "Marca"){
                marca =data.products[i].attributes[j].values[0];
                if(marca.length > 7){
                    marca = marca.slice(0,5);
                    marca += "..."
                }
            }
        }

        var prodName = data.products[i].name;
        if(data.products[i].name.length > 12){
            prodName = data.products[i].name.slice(0,10);
            prodName += "..."
        }

        var prod = '<div class="col-md-2 col-sm-6 col-xs-6">' +
            '<a onclick="loadProduct(data.products[i].name)" href=' + ID + '>' +
            '<div class="panel panel-default">' +
            '<div class="panel-body">' +
            '<div class="imgWrapper">' +
            '<img src=' + data.products[i].imageUrl[0] + '>' +
            '</div>' +
            '<br>' +
            '<font size="3" style="color:black"><b>' + prodName + '</b></font>' +
            '<br>' +
            '<font size="2" style="color:grey">Marca: ' + marca + '</font>' +
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
