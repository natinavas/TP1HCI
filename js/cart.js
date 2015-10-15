


var cart = JSON.parse(localStorage.getItem("carrito"));

var subtotal = 0;
var costoEnvio = 0;
var total = 0;

var i = 0;

if(cart[0] == undefined){
	document.getElementById("cartProducts").innerHTML = "<h3>SU CARRITO ESTÁ VACÍO</h3>";
}
else{
	document.getElementById("cartProducts").innerHTML = "";
}

for(i = 0; cart[i] != undefined; i++){

	var color = JSON.parse(cart[i]).color;
	var talle = JSON.parse(cart[i]).talle;
	var quantity = JSON.parse(cart[i]).quantity;


	var name = JSON.parse(cart[i]).name;
	var image = JSON.parse(cart[i]).image;
	var price = parseInt(JSON.parse(cart[i]).price);
	var marca = JSON.parse(cart[i]).marca;

	subtotal += price;
	costoEnvio += Math.round(price/20);
	total += price + Math.round(price/20);


	var prod = 	'<div class="row">'+
	            '<div class="col-xs-2"><img class="img-responsive" src=' + image + '>'+
	            '</div>'+
	            '<div class="col-xs-4">'+
	                '<h4 class="product-name"><strong>'+ name + '</strong></h4>'+
	                '<h4>Marca: '+ marca + '</h4>'+
	                
	            '</div>'+
	            '<div class="col-xs-6">'+
	                '<div class="col-xs-6 text-right">'+
	                    '<h4><strong>$' + price + ' <span class="text-muted">x</span></strong></h4>'+
	                '</div>'+
	                '<div class="col-xs-4">'+
	                    '<input type="number" name="quantity" min="1" max="15" value="' + quantity + '">'+
	                '</div>'+
	                '<div class="col-xs-2">'+
	                    '<button type="button" class="btn btn-link btn-xs">'+
	                        '<span class="glyphicon glyphicon-trash" style="color:black"> </span>'+
	                    '</button>'+
	                    '<button type="button" class="btn btn-link btn-xs">'+
	                '<span class="glyphicon glyphicon-heart-empty" style="color:black"></span>'+
	                    '</button>'+
	                '</div>'+
	            '</div>'+
	            '<br>'+
	            '<br>'+
	            '<div class="col-xs-3 col-xs-offset-1">'+
	            '<h4>Color: ' + color + '</h4>' +
	            '<h4>Talle: ' + talle + '</h4>' +
	            '</div><br/><br/><br/>'+
	        '</div>'+
	        '<hr></hr>';



	        document.getElementById("cartProducts").innerHTML += prod;

document.getElementById("subtotal").innerHTML = "$" + subtotal;
document.getElementById("costoEnvio").innerHTML = "$" + costoEnvio;
document.getElementById("total").innerHTML = "$" + total;

}
