//no hay filtros
sessionStorage.setItem("actualFilters", "");
sessionStorage.setItem("prevFilters", "");


var search = window.location.search.split("?")[1];

var input = search.split("=")[1];


var request = new Object();
var pageNum = 0;
loadMore();



function load(){

		document.getElementById('loadMoreButton').innerHTML = "Cargando...";	

		var request = new Object();
		request.timeout = 7000;
		request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsByName&name="+input+"&page_size=24"+"&page=";
		request.dataType="jsonp";

		sessionStorage.setItem("lastSearch", request.url);

		if(sessionStorage.getItem("actualFilters") != sessionStorage.getItem("prevFilters")){
			request.url += sessionStorage.getItem("prevFilters");
			alert("aca estoy");
			pageNum = 0;
		}
		request.url +=  ++pageNum;

		console.log(request.url);

		$.ajax(request).done( function(data) {

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