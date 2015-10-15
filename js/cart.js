


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

	var request = new Object();
	request.timeout = 7000;
	request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductById&id="+JSON.stringify(cart[i]);


	request.dataType="jsonp";
	console.log(request.url);
	$.ajax(request).done( function(product) {





	subtotal += product.product.price;
	costoEnvio += Math.round(product.product.price/20);
	total += product.product.price + Math.round(product.product.price/20);

	var colores = "";
	var j = 0;
	var k = 0;
	for(j = 0; product.product.attributes[j] != undefined; j++){
		if(product.product.attributes[j].name == "Color"){
			for(k = 0; product.product.attributes[j].values[k] != undefined; k++)
				colores += '<li><a href="#">'+ product.product.attributes[j].values[k] +'</a></li>';
		}
	}

	var talles = "";

	for(j = 0; (product.product.attributes[j] != undefined); j++){
		if(product.product.attributes[j].name.split("-")[0] == "Talle"){
			for(k  = 0; product.product.attributes[j].values[k] !=  undefined; k++){
			talles += '<li><a href="#">'+ product.product.attributes[j].values[k] +'</a></li>';
		}
		}
	}


	var prod = 	'<div class="row">'+
	            '<div class="col-xs-2"><img class="img-responsive" src=' + product.product.imageUrl[0] + '>'+
	            '</div>'+
	            '<div class="col-xs-4">'+
	                '<h4 class="product-name"><strong>'+ product.product.name + '</strong></h4>'+
	                '<h4><small>Descripción: una clasica camisa azul para todo tipo de ocación.</small></h4>'+
	                
	            '</div>'+
	            '<div class="col-xs-6">'+
	                '<div class="col-xs-6 text-right">'+
	                    '<h4><strong>$' + product.product.price + ' <span class="text-muted">x</span></strong></h4>'+
	                '</div>'+
	                '<div class="col-xs-4">'+
	                    '<input type="number" name="quantity" min="1" max="15" value="1">'+
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
	            '<br>'+
	            '<div class="col-xs-1 col-xs-offset-1">'+
	            '</div><br/><br/><br/>'+
	        '</div>'+
	        '<hr></hr>';

	        document.getElementById("cartProducts").innerHTML += prod;

document.getElementById("subtotal").innerHTML = "$" + subtotal;
document.getElementById("costoEnvio").innerHTML = "$" + costoEnvio;
document.getElementById("total").innerHTML = "$" + total;

	});
}


