//seteo filtros

var request = new Object();
request.timeout = 7000;

//no hay filtros
sessionStorage.setItem("actualFilters", "");
sessionStorage.setItem("prevFilters", "");


var search = window.location.search.split("?")[1];

var input = search.split("=")[1];


var pageNum = 0;
load();

//Subo colores

request.url="http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAttributeById&id=4";
request.dataType="jsonp";
console.log(request.url);

$.ajax(request).done( function(data){
	var i = 0;
	for(i =0 ; i < data.attribute.values.length; i++){
		document.getElementById('color' + JSON.stringify(i+1)).innerHTML =  data.attribute.values[i];
	}
});

//Subo marcas

request.url="http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAttributeById&id=9";
request.dataType="jsonp";
console.log(request.url);

$.ajax(request).done( function(data){
	var i = 0;
	for(i =0 ; i < data.attribute.values.length; i++){
		document.getElementById('trademark' + JSON.stringify(i+1)).innerHTML =  data.attribute.values[i];
	}
});

//Subo ocasion

request.url="http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAttributeById&id=3";
request.dataType="jsonp";
console.log(request.url);

$.ajax(request).done( function(data){
	var i = 0;
	for(i =0 ; i < data.attribute.values.length; i++){
		document.getElementById('ocassion' + JSON.stringify(i+1)).innerHTML =  data.attribute.values[i];
	}
});


function applyFilter(){
	var colors = getFilterColors();
	var trademarks = getFilterTrademarks();
	var ocassions = getFilterOcassions();

	pageNum = 0;

	var jsonFilters = '['
	for(i=0; i<colors.length; i++){
		jsonFilters += '{	"id": ' + 4 + ',	"value": "' + colors[i] + '"},';
	}
	for(i=0; i<trademarks.length; i++){
		jsonFilters += '{	"id": ' + 9 + ',	"value": "' + trademarks[i] + '"},';
	}
	for(i=0; i<ocassions.length; i++){
		jsonFilters += '{	"id": ' + 3 + ',	"value": "' + ocassions[i] + '"},';
	}
	if(document.getElementById('inputOfertas').checked == true){
		jsonFilters += '{	"id": ' + 5 + ',	"value": "Oferta"},';
	}
	if(document.getElementById('inputNuevo').checked == true){
		jsonFilters += '{	"id": ' + 6 + ',	"value": "Nuevo"},';
	}
	jsonFilters = jsonFilters.slice(0,jsonFilters.length - 1);
	jsonFilters += ']';

	if(jsonFilters.length == 1){
		jsonFilters = "";
	}
	else{
		jsonFilters = "&filters=" + jsonFilters;
	}

	reloadWithFilters(jsonFilters);

	alert(jsonFilters);
}

function reloadWithFilters(filt){

	document.getElementById('products').innerHTML = "";
	
	sessionStorage.setItem("prevFilters", sessionStorage.getItem("actualFilters"));
	sessionStorage.setItem("actualFilters", filt);

	load();
}

function getFilterColors(){
	var ret = [];
	var i;
	for(i = 1; i <= 23; i++){
		if(document.getElementById('inputColor'+JSON.stringify(i)).checked == true){
			ret.push(document.getElementById('color'+ JSON.stringify(i)).innerHTML);
		}
	}
	return ret;
}

function getFilterTrademarks(){
	var ret = [];
	var i;
	for(i = 1; i <= 50; i++){
		if(document.getElementById('inputTrademark'+JSON.stringify(i)).checked == true){
			ret.push(document.getElementById('trademark'+ JSON.stringify(i)).innerHTML);
		}
	}
	return ret;
}

function getFilterOcassions(){
	var ret = [];
	var i;
	for(i = 1; i <= 7; i++){
		if(document.getElementById('inputOcassion'+JSON.stringify(i)).checked == true){
			ret.push(document.getElementById('ocassion'+ JSON.stringify(i)).innerHTML);
		}
	}
	return ret;
}








//results.js









function load(){

		document.getElementById('loadMoreButton').innerHTML = "Cargando...";	

	setTimeout(continueLoading,500);
}

function continueLoading(){
		var request = new Object();
		request.timeout = 7000;
		request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsByName&name="+input+"&page_size=24"+"&page=";
		request.dataType="jsonp";

		sessionStorage.setItem("lastSearch", request.url);

		if(sessionStorage.getItem("actualFilters") != sessionStorage.getItem("prevFilters")){
			
			alert("aca estoy");
			pageNum = 0;
		}
		request.url +=  ++pageNum;

		if(sessionStorage.getItem("actualFilters") != ""){
			request.url += sessionStorage.getItem("actualFilters");
		}




		console.log(request.url);

		$.ajax(request).done( function(data) {

			document.getElementById('cantResultados').innerHTML = "Se encontraron <b>" + JSON.stringify(data.total) + "</b> resultados.";

		var i  = 0;
		for (i = 0; i < data.total && data.products[i] != undefined; i++) { 
			if(i % 4 == 0){

			document.getElementById('products').innerHTML += '<div class="container">'+
															'<div class="row">';
			}

			var params = window.location.href.split("?")[1];

			var ID = "pagProd.html?" + params + ";product=" + data.products[i].id;


			var prod = 
		        '<div class="col-xs-3">'+
		            '<div class="panel panel-default">'+
	                    '<a  href='+ID+'>'+
			                '<div class="panel-body">'+
			                    '<div class="imgWrapper">'+
									'<img src='+data.products[i].imageUrl[0]+'>'+
			                    '</div>'+
			                    '<br>'+
								'<font size="3" style="color:black"><b>'+data.products[i].name+'</b></font>'+
			                    '<br>'+
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