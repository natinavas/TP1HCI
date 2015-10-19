


var cart = JSON.parse(localStorage.getItem("carrito"));

var subtotal = 0;
var costoEnvio = 0;
var total = 0;
var cantidad = 0;

var i = 0;

if(cart == undefined || cart[0] == undefined){
	document.getElementById("cartProducts").innerHTML = "<h3>SU CARRITO ESTÁ VACÍO</h3>";
}
else{
	document.getElementById("cartProducts").innerHTML = "";
}

for(i = 0; cart != undefined && cart[i] != undefined; i++){
	loadProduct(i);
}


function loadProduct(i){


	var cart = JSON.parse(localStorage.getItem("carrito"));

	var color = JSON.parse(cart[i]).color;
	var talle = JSON.parse(cart[i]).talle;
	var quantity = JSON.parse(cart[i]).quantity;


	var name = JSON.parse(cart[i]).name;
	var image = JSON.parse(cart[i]).image;
	var price = JSON.parse(cart[i]).price;
	var marca = JSON.parse(cart[i]).marca;

	cantidad += parseInt(quantity);
	subtotal += price * quantity;
	costoEnvio += Math.round((price * quantity)/20);
	total += (price * quantity) + Math.round((price * quantity)/20);

	var number = i;


	var prod = 	'<div id="' + number + '">'+
					'<div class="row">'+
		            	'<div class="col-xs-2"><img class="img-responsive" src=' + image + '>'+
		            	'</div>'+
		            	'<div class="col-xs-4">'+
		                	'<h4 class="product-name"><strong>'+ name + '</strong></h4>'+
		                	'<h4>Marca: '+ marca + '</h4>'+
		            	'</div>'+
		            	'<div class="col-xs-6">'+
			                '<div class="col-xs-6 text-right">'+
			                    '<h4><strong>$' + price + ' <span class="text-muted">x</span>  ' + quantity + '</strong></h4>'+
			                '</div>'+
		                '<div class="col-xs-2">'+
		                    '<button type="button" id="trash' + number + '" class="btn btn-link btn-xs">'+
		                        '<span class="glyphicon glyphicon-trash" style="color:black"> </span>'+
		                    '</button>'+
		                    '<button type="button" id="fav' + number + '" class="btn btn-link btn-xs">'+
		                		'<span class="glyphicon glyphicon-heart-empty" style="color:black"></span>'+
		                    '</button>'+
		                '</div>'+
		            '</div>'+
		            '<br/>'+
		            '<br/>'+
		            '<div class="col-xs-3 col-xs-offset-1">'+
			            '<h4>Color: ' + color + '</h4>' +
			            '<h4>Talle: ' + talle + '</h4>' +
		            '</div><br/><br/><br/>'+
		        	'<hr></hr>'+
	        	'</div>';

    document.getElementById("cartProducts").innerHTML += prod;


    $(document).on('click', "#trash"+number, function(){
    	removeItem(number);
    });
    $(document).on('click', "#fav"+number, function(){
    	addItemToFav(number);
    });



	document.getElementById("cantidad").innerHTML = cantidad;
	document.getElementById("subtotal").innerHTML = "$" + subtotal;
	document.getElementById("costoEnvio").innerHTML = "$" + costoEnvio;
	document.getElementById("total").innerHTML = "$" + total;


	sessionStorage.setItem("subtotal", "$" + subtotal);
	sessionStorage.setItem("costoEnvio", "$" + costoEnvio);
	sessionStorage.setItem("total", "$" + total);



}


function removeItem(number){
	$("#"+number).remove();
	var cart = JSON.parse(localStorage.getItem("carrito"));

	if (number > -1) {
    	cart.splice(number, 1);
	}
	localStorage.setItem("carrito", JSON.stringify(cart));


    location.reload();
}

function addItemToFav(number){

	var wishList = JSON.parse(localStorage.getItem("wishList"));
	var carrito = JSON.parse(localStorage.getItem("carrito"));


	if (wishList == undefined) {
	    var wishList = [];

	    localStorage.setItem("wishList", JSON.stringify(wishList));
	}

    var flag = 0;

    for (var i = 0; wishList[i] != undefined; i++) {
    	if(JSON.parse(wishList[i]).id == JSON.parse(carrito[number]).id && JSON.parse(wishList[i]).color == JSON.parse(carrito[number]).color
    	 && JSON.parse(wishList[i]).talle == JSON.parse(carrito[number]).talle){
			swal({   title: "El producto ya se encuentra en la lista de deseos",
				type: "error",
				confirmButtonText: "Cerrrar"
			});
    		flag = 1;
    	}
    }


    if(flag == 0){
    	var prod = JSON.parse(carrito[number]);
    	prod.quantity = 1;
    	swal({   title: "Se ha agregado a la lista de deseos",
			type: "success",
			confirmButtonText: "Cerrrar"
		});
    	wishList.push(JSON.stringify(prod));
    }

	localStorage.setItem("wishList", JSON.stringify(wishList));
}

function finalizar(){
	localStorage.removeItem("wishList");
	var carrito = JSON.parse(localStorage.getItem("carrito"));
	if(sessionStorage.getItem("loggedUser") == null || sessionStorage.getItem("loggedUser") == undefined){
		swal({   title: "Error!",
			text: "Debe iniciar sesión para finalizar su compra",
			type: "error",
			confirmButtonText: "Cerrrar"
		});
	}
	else if(carrito == undefined || carrito[0] == undefined){

		swal({   title: "Error!",
			text: "Agregue un producto al carrito para continuar",
			type: "error",
			confirmButtonText: "Cerrrar"
		});
	}
	else{
		window.location.href = "finalizarCompra.html";
	}
}