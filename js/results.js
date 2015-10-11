
var search = window.location.search.split("?")[1];

var input = search.split("=")[1];


var request = new Object();
var pageNum = 0;
loadMore();



function loadMore(){

		document.getElementById('loadMoreButton').innerHTML = "Cargando...";	

		var request = new Object();
		request.timeout = 7000;
		request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsByName&name="+input+"&page_size=24"+"&page=" + ++pageNum;
		request.dataType="jsonp";
		console.log(request.url);

		$.ajax(request).done( function(data) {

		var i  = 0;
		for (i = 0; i < data.total; i++) { 
			if(i % 4 == 0){

			document.getElementById('products').innerHTML += '<div class="container">'+
															'<div class="row">';
			}



			var ID = "pagProd.html?" + "=" + data.products[i].id;


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