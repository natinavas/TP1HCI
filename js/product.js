

document.getElementById("addCarrito").addEventListener("click", function(){addCarrito()});
document.getElementById("addFav").addEventListener("click", function(){addFav()});

document.getElementById("picture2").addEventListener("mouseover", function(){hover("picture2")});
document.getElementById("picture2").addEventListener("mouseout", function(){hover("picture2")});
document.getElementById("picture3").addEventListener("mouseover", function(){hover("picture3")});
document.getElementById("picture3").addEventListener("mouseout", function(){hover("picture3")});
document.getElementById("picture4").addEventListener("mouseover", function(){hover("picture4")});
document.getElementById("picture4").addEventListener("mouseout", function(){hover("picture4")});
document.getElementById("picture5").addEventListener("mouseover", function(){hover("picture5")});
document.getElementById("picture5").addEventListener("mouseout", function(){hover("picture5")});


var id ="";
var params = window.location.search.split("?")[1].split(";");

for (var i = 0 ; i < params.length; i++) {
	if(params[i].split("=")[0] == "product"){
		id = params[i].split("=")[1];
	}
}




var request = new Object();
request.timeout = 7000;
request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductById&id="+id;


request.dataType="jsonp";
console.log(request.url);
$.ajax(request).done( function(data) {



	localStorage.setItem("product", JSON.stringify(data));
	document.getElementById("nameProd").innerHTML = data.product.name;
	document.getElementById("mainPicture").src = data.product.imageUrl[0];
	document.getElementById("price").innerHTML = "$" + data.product.price;

	var i =  0, j = 0;

	sessionStorage.setItem("image", data.product.imageUrl[0]);
	sessionStorage.setItem("price", data.product.price);
	sessionStorage.setItem("name", data.product.name);


	for(i  = 1; data.product.imageUrl[i] !=  undefined; i++){
		var picture = "picture"+ (i+1);
		document.getElementById(picture).src = data.product.imageUrl[i];
	}

	for(j = 0; data.product.attributes[j] != undefined; j++){
		if(data.product.attributes[j].name == "Color"){
			document.getElementById("Color").innerHTML = '<option>Color</option>';
			for(i = 0; data.product.attributes[j].values[i] != undefined; i++)
				document.getElementById("Color").innerHTML += '<option>'+ data.product.attributes[j].values[i] +'</option>';
		}
	}

	for(j = 0; (data.product.attributes[j] != undefined); j++){
		if(data.product.attributes[j].name.split("-")[0] == "Talle"){
			document.getElementById("Talles").innerHTML = '<option>Talle</option>';
			for(i  = 0; data.product.attributes[j].values[i] !=  undefined; i++){
			document.getElementById("Talles").innerHTML += '<option>'+ data.product.attributes[j].values[i] +'</option>';
			}
		}
	}

	//seteo marca del producto		
	for(j = 0; (data.product.attributes[j] != undefined); j++){
		if(data.product.attributes[j].name == "Marca"){
			document.getElementById("prodTrademark").innerHTML = '<h5><b>Marca</b>: ' + data.product.attributes[j].values[0] +'.';
			sessionStorage.setItem("marca", data.product.attributes[j].values[0]);
		}
	}

	//seteo material del producto		
	for(j = 0; (data.product.attributes[j] != undefined); j++){
		if(data.product.attributes[j].name.split("-")[0] == "Material"){
			document.getElementById("prodMaterial").innerHTML = '<h5><b>Material</b>: '+ data.product.attributes[j].values[0] +'.';
		}
	}

	//seteo ocacion del producto		
	for(j = 0; (data.product.attributes[j] != undefined); j++){
		if(data.product.attributes[j].name == "Ocasion"){
			document.getElementById("prodOcassion").innerHTML = '<h5><b>Ocasión</b>: ' + data.product.attributes[j].values[0] + '.';
		}
	}

	//veo si es nuevo
	for(j = 0; (data.product.attributes[j] != undefined); j++){
		if(data.product.attributes[j].name == "Nuevo"){
			document.getElementById("isNew").innerHTML = '<span class="label label-info">Nuevo</span>';
		}
	}
	//veo si esta en oferta
	for(j = 0; (data.product.attributes[j] != undefined); j++){
		if(data.product.attributes[j].name == "Oferta"){
			document.getElementById("isOffer").innerHTML = '<span class="label label-success">En Oferta</span>';
		}
	}



}).fail(function (jqXHR, textStatus, errorThrown) {
    swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
        type: "error",
        confirmButtonText: "Cerrar"
    });
});


function getTalle(){
	var e = document.getElementById("Talles");
    var option = e.options[e.selectedIndex].text;
}

function getColor(){
	var e = document.getElementById("Color");
    var option = e.options[e.selectedIndex].text;
}

function addFav(){

	var wish = JSON.parse(localStorage.getItem("wishList"));
	if (wish == undefined) {
	    var wishList = [];

	    localStorage.setItem("wishList", JSON.stringify(wishList));
	}

	if(add("wishList") == 1){

		swal({   title: "Se ha agregado a la lista de deseos",
			type: "success",
			confirmButtonText: "Cerrar"
		});
	}
}

function add(s){


	var e = document.getElementById("Color");
    var optionColor = e.options[e.selectedIndex].text;
    if(optionColor == "Color"){
		swal({   title: "Elija un color",
			type: "error",
			confirmButtonText: "Cerrar"
		});
    	return -1;
    }
    e = document.getElementById("Talles");
    var optionTalle = e.options[e.selectedIndex].text;
    if(optionTalle == "Talle"){
		swal({   title: "Elija un talle",
			type: "error",
			confirmButtonText: "Cerrar"
		});
    	return -1;
    }

	var vector = JSON.parse(localStorage.getItem(s));
	var prod = JSON.parse(localStorage.getItem("product"));

	var newProd = new Object();
    newProd.id = prod.product.id;
    newProd.color = optionColor;
    newProd.talle = optionTalle;
    newProd.quantity = 1;
    newProd.marca = sessionStorage.getItem("marca");
    newProd.name = sessionStorage.getItem("name");
    newProd.image = sessionStorage.getItem("image");
    newProd.price = sessionStorage.getItem("price");

    for (var i = 0; vector[i] != undefined; i++) {
    	product = JSON.parse(vector[i]);
    	if(product.id == newProd.id && product.color == newProd.color
    	 && product.talle == newProd.talle){
    	 	if(s == "wishList"){
				swal({   title: "El producto ya se encuentra en la lista de deseos",
					type: "error",
					confirmButtonText: "Cerrar"
				});
				return -1;
    	 	}
    	 	else{
	    		product.quantity++;
	    		vector[i] = JSON.stringify(product);
				localStorage.setItem(s, JSON.stringify(vector));
				return 1;
			}
    	}
    }


    		vector.push(JSON.stringify(newProd));

	localStorage.setItem(s, JSON.stringify(vector));
	return 1;

}


function addCarrito(){

	var carro = JSON.parse(localStorage.getItem("carrito"));
	if (carro == undefined) {
	    var carrito = [];

	    localStorage.setItem("carrito", JSON.stringify(carrito));
	}

	if(add("carrito") == 1){

		swal({   title: "Se ha agregado al carrito",
			type: "success",
			confirmButtonText: "Cerrar"
		});
	}
}


function hover(picture) {
    imagen1 = document.getElementById(picture).src;
    document.getElementById(picture).src = document.getElementById("mainPicture").src;
    document.getElementById("mainPicture").src = imagen1;
}

