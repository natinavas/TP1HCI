<<<<<<< HEAD


document.getElementById("addCarrito").addEventListener("click", function(){addCarrito()});


=======
>>>>>>> origin/master
document.getElementById("picture2").addEventListener("mouseover", function(){hover("picture2")});
document.getElementById("picture2").addEventListener("mouseout", function(){hover("picture2")});
document.getElementById("picture3").addEventListener("mouseover", function(){hover("picture3")});
document.getElementById("picture3").addEventListener("mouseout", function(){hover("picture3")});
document.getElementById("picture4").addEventListener("mouseover", function(){hover("picture4")});
document.getElementById("picture4").addEventListener("mouseout", function(){hover("picture4")});
document.getElementById("picture5").addEventListener("mouseover", function(){hover("picture5")});
document.getElementById("picture5").addEventListener("mouseout", function(){hover("picture5")});

var id = window.location.search.split("=")[1];

var request = new Object();
request.timeout = 7000;
request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductById&id="+id;


request.dataType="jsonp";
console.log(request.url);
$.ajax(request).done( function(data) {
	localStorage.setItem("product", data);
	document.getElementById("nameProd").innerHTML = data.product.name;
	document.getElementById("mainPicture").src = data.product.imageUrl[0];
	document.getElementById("price").innerHTML = "$" + data.product.price;

	var i =  0, j = 0;

	for(i  = 1; data.product.imageUrl[i] !=  undefined; i++){
		var picture = "picture"+ (i+1);
		document.getElementById(picture).src = data.product.imageUrl[i];
	}

	for(j = 0; data.product.attributes[j] != undefined; j++){
		if(data.product.attributes[j].name == "Color"){
			for(i = 0; data.product.attributes[j].values[i] != undefined; i++)
				document.getElementById("Color").innerHTML += '<li><a href="#">'+ data.product.attributes[j].values[i] +'</a></li>';
		}
	}

	var flag = 1;
	for(j = 0; (data.product.attributes[j] != undefined); j++){
		if(data.product.attributes[j].name.split("-")[0] == "Talle"){
			for(i  = 0; data.product.attributes[j].values[i] !=  undefined; i++){
			document.getElementById("Talles").innerHTML += '<li><a href="#">'+ data.product.attributes[j].values[i] +'</a></li>';
		}
		}
	}
});


function addCarrito(){
	var carrito = localStorage.getItem("carrito");
	var prod = localStorage.getItem("product");
	if(carrito.products == undefined){
		
	alert("agrego al carrito");
		carrito.products = new Array();
	}
	carrito.products[products.lenght](prod);
	console.log(carrito.products);
}


function hover(picture) {
    imagen1 = document.getElementById(picture).src;
    document.getElementById(picture).src = document.getElementById("mainPicture").src;
    document.getElementById("mainPicture").src = imagen1;
}

