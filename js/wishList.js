
var wishList = JSON.parse(localStorage.getItem("wishList"));



if(wishList[0] == undefined){
	document.getElementById("wishListProducts").innerHTML = "<h3>SU LISTA DE DESEOS ESTÁ VACÍA</h3>";
}
else{
	document.getElementById("wishListProducts").innerHTML = "";
}

for(i = 0; wishList[i] != undefined; i++){
	loadProduct(i);
}

function loadProduct(i){


	var wishList = JSON.parse(localStorage.getItem("wishList"));

	var color = JSON.parse(wishList[i]).color;
	var talle = JSON.parse(wishList[i]).talle;
	var quantity = JSON.parse(wishList[i]).quantity;


	var name = JSON.parse(wishList[i]).name;
	var image = JSON.parse(wishList[i]).image;
	var price = parseInt(JSON.parse(wishList[i]).price);
	var marca = JSON.parse(wishList[i]).marca;
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
			                    '<h4><strong>$' + price + '</strong></h4>'+
			                '</div>'+
		                '<div class="col-xs-2">'+
		                    '<button type="button" id="trash' + number + '" class="btn btn-link btn-xs">'+
		                        '<span class="glyphicon glyphicon-trash" style="color:black"> </span>'+
		                    '</button>'+
		                    '<button type="button" id="cart' + number + '" onclick="hola()" class="btn btn-link btn-xs">'+
		                		'<span class="glyphicon glyphicon-shopping-cart" style="color:black"></span>'+
		                    '</button>'+
		                '</div>'+
		                '<div class="col-xs-4">'+
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

	        document.getElementById("wishListProducts").innerHTML += prod;


	        $(document).on('click', "#trash"+number, function(){
	        	removeItem(number);
	        });
	        $(document).on('click', "#cart"+number, function(){
	        	addItemToCart(number);
	        });

}


function removeItem(number){
	$("#"+number).remove();
	var wishList = JSON.parse(localStorage.getItem("wishList"));

	if (number > -1) {
    	wishList.splice(number, 1);
	}

	localStorage.setItem("wishList", JSON.stringify(wishList));

    location.reload();

}

function addItemToCart(number){

	var wishList = JSON.parse(localStorage.getItem("wishList"));
	var carrito = JSON.parse(localStorage.getItem("carrito"));

    var flag = 0;

    for (var i = 0; carrito[i] != undefined; i++) {

    	if(JSON.parse(wishList[number]).id == JSON.parse(carrito[i]).id && JSON.parse(wishList[number]).color == JSON.parse(carrito[i]).color
    	 && JSON.parse(wishList[number]).talle == JSON.parse(carrito[i]).talle){
    		alert("el item ya se encuentra en el carrito");
    		flag = 1;
    	}
    }


    if(flag == 0){
	alert("se ha agregado al carrito");
    	carrito.push(wishList[number]);
    }

	localStorage.setItem("carrito", JSON.stringify(carrito));


}


