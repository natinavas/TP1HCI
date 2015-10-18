//seteo filtros

var request = new Object();
request.timeout = 7000;

//no hay filtros
sessionStorage.setItem("actualFilters", "");
sessionStorage.setItem("prevFilters", "");

$("#ocasionTitle").hide();
$("#removeocasion").hide();

$("#trademarkTitle").hide();
$("#removetrademark").hide();

$("#colorTitle").hide();
$("#removecolor").hide();

var search = window.location.search.split("?")[1];

var basicSearch = getBasicSearch();
//search.split("=")[1];

document.getElementById('inputOfertas').checked = false;
document.getElementById('inputNuevo').checked = false;


var pageNum = 0;
var orderby = "";
load();


function removeFilter(category){

	$("#" + category + "Title").hide();
	$("#" + "remove" + category).hide();
	document.getElementById("color").innerHTML = '<option>'+ category +'</option>';
	location.reload();
}


function orderBy(opt){

	document.getElementById("products").innerHTML = '';

	pageNum = 0;
	
	switch(opt){
		case "nombre":
			orderby = "&sort_key=nombre";
			break;
		case "marca":
			orderby = "&sort_key=marca";
			break;
		case "precioasc":
			orderby = "&sort_key=precio&sort_order=asc";
			break;
		case"preciodesc":
			orderby = "&sort_key=precio&sort_order=desc";
			break;
		default:
			orderby = "";
			break;
	}

	load();
}


//Subo colores, marcas y ocasion

function setFilters(data){




	var i = 0;
	for(i =0 ; data.filters != undefined && data.filters[i] != undefined; i++){
		switch(data.filters[i].id){
			case 4:
				var e = document.getElementById("color");
			    var selection = e.options[e.selectedIndex].text;

			    if(selection != "Color"){
					$("#colorTitle").show();
					$("#removecolor").show();
				}
				else{
					document.getElementById("color").innerHTML = '<option>'+ 'Color' +'</option>';
					for(var j = 0; data.filters[i].values[j] != undefined; j ++){
						document.getElementById("color").innerHTML += '<option>'+ data.filters[i].values[j] +'</option>';
					}
				}
				break;
			case 9:
				var e = document.getElementById("trademark");
			    var selection = e.options[e.selectedIndex].text;

			    if(selection != "Marca"){
					$("#trademarkTitle").show();
					$("#removetrademark").show();
			    }
			    else{
			    	document.getElementById("trademark").innerHTML = '<option>'+ 'Marca' +'</option>';
					for(var j = 0; data.filters[i].values[j] != undefined; j ++){
						document.getElementById("trademark").innerHTML += '<option>'+ data.filters[i].values[j] +'</option>';
					}
				}
				break;
			case 3:
				var e = document.getElementById("ocasion");
			    var selection = e.options[e.selectedIndex].text;

			    if(selection != "Ocasión"){
					$("#ocasionTitle").show();
					$("#removeocasion").show();
			    }
			    else{
			    	document.getElementById("ocasion").innerHTML = '<option>'+ 'Ocasión' +'</option>';
					for(var j = 0; data.filters[i].values[j] != undefined; j ++){
						document.getElementById("ocasion").innerHTML += '<option>'+ data.filters[i].values[j] +'</option>';
					}
				}
				break;
			default:
				break;
		}
	}
}


function applyFilter(){
	var color = getFilterColors();
	var trademark = getFilterTrademarks();
	var ocassion = getFilterOcassions();

	pageNum = 0;

	var jsonFilters = '';
		if(color != undefined)
		jsonFilters += '{	"id": ' + 4 + ',	"value": "' + color + '"},';

		if(trademark != undefined)
		jsonFilters += '{	"id": ' + 9 + ',	"value": "' + trademark + '"},';

		if(ocassion != undefined)
		jsonFilters += '{	"id": ' + 3 + ',	"value": "' + ocassion + '"},';

	var search = window.location.search.split("?")[1];
	search = search.split(";");
	var alreadyOffers = false;
	var alreadyNew = false;
	for(var i = 0; i < search.length; i++){
		var keySearch = search[i].split("=")[0];
		if(keySearch == "oferta")
			alreadyOffers = true;
		if(keySearch == "nuevo")
			alreadyNew = true;
	}


	if(document.getElementById('inputOfertas').checked == true){
		if(alreadyOffers == false){
			jsonFilters += '{	"id": ' + 5 + ',	"value": "Oferta"},';
		}
	}
	if(document.getElementById('inputNuevo').checked == true){
		if(alreadyNew == false){
			jsonFilters += '{	"id": ' + 6 + ',	"value": "Nuevo"},';
		}
	}
	//jsonFilters = jsonFilters.slice(0,jsonFilters.length - 1);
	//jsonFilters += ']';

	if(jsonFilters.length == 1){
		jsonFilters = "";
	}


	reloadWithFilters(jsonFilters);
}

function reloadWithFilters(filt){

	document.getElementById('products').innerHTML = "";
	
	sessionStorage.setItem("prevFilters", sessionStorage.getItem("actualFilters"));
	sessionStorage.setItem("actualFilters", filt);

	load();
}

function getFilterColors(){
	var e = document.getElementById("color");
    var ret = e.options[e.selectedIndex].text;
    if(ret != "Color"){
		$("#color").hide();
		document.getElementById("ocasionTitle").innerHTML = ret;
    	return ret;
    }
    return undefined;
}

function getFilterTrademarks(){
	var e = document.getElementById("trademark");
    var ret = e.options[e.selectedIndex].text;
    if(ret != "Marca"){
    	return ret;
    }
    return undefined;
}

function getFilterOcassions(){
	var e = document.getElementById("ocasion");
    var ret = e.options[e.selectedIndex].text;
    if(ret != "Ocasión"){
    	return ret;
    }
    return undefined;
}








//results.js









function load(){

		document.getElementById('loadMoreButton').innerHTML = "Cargando...";	

	setTimeout(continueLoading,500);
}

function continueLoading(){
		var request = new Object();
		request.timeout = 7000;
		request.url= basicSearch;
		//alert(request.url);
		request.dataType="jsonp";

		sessionStorage.setItem("lastSearch", request.url);

		if(sessionStorage.getItem("actualFilters") != sessionStorage.getItem("prevFilters")){
		
			pageNum = 0;
		}


		request.url += "&page=" + ++pageNum;
		request.url += "&page_size=24";
		request.url += orderby;

		if(sessionStorage.getItem("actualFilters") != ""){
			var filtersNow = sessionStorage.getItem("actualFilters");
			var requestUrlVec = request.url.split("[");
			
			if(requestUrlVec.length == 2){
				request.url = requestUrlVec[0] + "[" + filtersNow + requestUrlVec[1];
			}
			else{
				filtersNow = filtersNow.slice(0,filtersNow.length - 1);
				request.url += "&filters=[" + filtersNow + "]";
			}
		}

		//alert(request.url);


		console.log(request.url);

		$.ajax(request).done( function(data) {


		if(pageNum == 1){
			setFilters(data);
		}

			document.getElementById('cantResultados').innerHTML = "Se encontraron <b>" + JSON.stringify(data.total) + "</b> resultados.";

		var i  = 0;
		for (i = 0; i < data.total && data.products[i] != undefined; i++) { 
			if(i % 4 == 0){

			document.getElementById('products').innerHTML += '<div class="container">'+
															'<div class="row">';
			}

			var params = window.location.href.split("?")[1];

			var ID = "pagProd.html?" + params + ";product=" + data.products[i].id;

			var marca = "";

			for(j = 0; (data.products[i].attributes[j] != undefined); j++){
				if(data.products[i].attributes[j].name == "Marca"){
					marca =data.products[i].attributes[j].values[0];
					
				}
			}
			var prodName = data.products[i].name;
			if(data.products[i].name.length > 21){
				prodName = data.products[i].name.slice(0,19);
				prodName += "..."
			}

			var prod = 
		        '<div class="col-xs-3">'+
		            '<div class="panel panel-default">'+
	                    '<a  href='+ID+'>'+
			                '<div class="panel-body">'+
			                    '<div class="imgWrapper">'+
									'<img src='+data.products[i].imageUrl[0]+'>'+
			                    '</div>'+
			                    '<br/>'+
								'<font size="3" style="color:black"><b>'+prodName+'</b></font>'+
			                    '<br/>'+
								'<font size="2" style="color:grey">Marca: '+marca+'</font>'+
			                    '<br/>'+
								'<font size="2" style="color:grey">$'+data.products[i].price+'</font>'+
			                '</div>'+
			            '</a>'+
		            '</div>'+
		        '</div>';
		   




			document.getElementById('products').innerHTML += prod;

			if(i % 4 == 3){

				document.getElementById('products').innerHTML += '</tr>';
			}
			
		}

	

	});

	document.getElementById('loadMoreButton').innerHTML = "CARGAR MAS";
}

function loadMore(){
	sessionStorage.setItem("prevFilters", sessionStorage.getItem("actualFilters"));
	//sessionStorage.setItem("actualFilters", "");

	load();
}

function getBasicSearch(){
	var search = window.location.search.split("?")[1];
	search = search.split(";");
	var ret = "";

	var base = search[0].split("=");
	switch(base[0]){
		case "category":
			ret += "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsByCategoryId&id=" + base[1];
			break;
		case "subcategory":
			ret += "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsBySubcategoryId&id=" + base[1];
			break;
		case "search":
			ret += "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsByName&name=" + base[1];
			break;
		default:
			ret += "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllProducts";
			break;
	}

	if(search.length > 1){
		ret += "&filters=[";
	}

	for (var i = 1 ; i < search.length; i++){
		var filterId;
		var key = search[i].split("=")[0];
		var value = search[i].split("=")[1];
		switch(key){
			case "age":
				ret += '{'+
						'"id": 2,'+
						 '"value":"'+ value +
						 '"},';
				break;
			case "gender":
				var gen;
				if(value == "Hombres"){
					gen = '"Masculino"';
				}else{
					gen = '"Femenino"';
				}

				ret += '{'+
						'"id": 1,'+
						 '"value":'+ gen +
						 '},';
				break;
			case "oferta":
				ret += '{'+
						'"id": 5,'+
						 '"value":"Oferta"},';
				break;
			case "nuevo":
				ret += '{'+
						'"id": 6,'+
						 '"value":"Nuevo"},';
				break;
			default:
				filterId = "";
				break;
		}
	}
	if(search.length > 1){
		ret = ret.slice(0,ret.length - 1);
		ret += "]";
	}
	//alert(ret);
	return ret;
}


