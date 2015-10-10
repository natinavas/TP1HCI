





var request = new Object();
request.timeout = 7000;
request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllProducts&id=1&page_size=18";




request.dataType="jsonp";
console.log(request.url);
$.ajax(request).done( function(data) {
		sessionStorage.setItem("calzados",data);
		addOffers(data);
});



function addOffers(data){

	var i  = 0;
	for (i = 0; i < data.total; i++) { 
		if(i % 6 == 0){

		document.getElementById('ofertas').innerHTML += '<div class="container">'+
														'<div class="row">';
		}
		var prod = '<div class="col-md-2 col-sm-6 col-xs-6">'+
				'<a href="pagProd.html">'+
					'<div class="panel panel-default">'+
						'<div class="panel-body">'+
							'<div class="imgWrapper">'+
								'<img src='+data.products[i].imageUrl[0]+'>'+
							'</div>'+
							'<br>'+
							'<font size="3" style="color:black"><b>'+data.products[i].name+'</b></font>'+
							'<br>'+
							'<font size="2" style="color:grey">$'+data.products[i].price+'</font>'+
						'</div>'+
					'</div>'+
				'</a>'+
			'</div>';

		document.getElementById('ofertas').innerHTML += prod;

		if(i % 6 == 5){

		document.getElementById('ofertas').innerHTML += '</div>'+
														'</div>'+
														'<br>'+
														'<br>'+
														'<br>';
		}
	}






}