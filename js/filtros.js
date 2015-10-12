var request = new Object();
request.timeout = 7000;

//no hay filtros
sessionStorage.setItem("actualFilters", "");
sessionStorage.setItem("prevFilters", "");

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
	var jsonFilters = '['
	for(i=0; i<colors.length; i++){
		jsonFilters += '{	"id": ' + 4 + ',	"value": "' + colors[i] + '"},';
	}
	jsonFilters = jsonFilters.slice(0,jsonFilters.length - 1);
	jsonFilters += ']';

	reloadWithFilters(jsonFilters);

	alert(jsonFilters);
}

function reloadWithFilters(filt){
	
	sessionStorage.setItem("prevFilters", sessionStorage.getItem("actualFilters"));
	sessionStorage.setItem("actualFilters", "");

	var request = new Object();
	request.timeout = 7000;
	request.url = sessionStorage.getItem("lastSearch");
	if(filt.length != 1){
		request.url += "&filters=" + filt;
		sessionStorage.setItem("prevFilters", sessionStorage.getItem("actualFilters"));
		sessionStorage.setItem("actualFilters", "&filters=" + filt);
	}
	request.dataType="jsonp";

	//alert(request.url);
	document.getElementById('products').innerHTML = "";
	console.log(request.url);
	$.ajax(request).done( function(data) {

			alert (JSON.stringify(data.total));
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