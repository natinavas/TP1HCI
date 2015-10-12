





var params = window.location.href.split("?")[1].split(";");

for (var i = 0 ; i < params.length; i++) {
	var key = params[i].split("=")[0];
	switch(key){
		case "search":
			document.getElementById("breadcrumbs-two").innerHTML += '<li><a href="#">BÚSQUEDA</a></li>';
			break;
		case "product":
			
			var request = new Object();
			request.timeout = 7000;
			request.url="http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductById&id="+params[i].split("=")[1];


			request.dataType="jsonp";
			console.log(request.url);
			$.ajax(request).done( function(data) {
				document.getElementById("breadcrumbs-two").innerHTML += '<li><a href="#">' + data.product.name + '</a></li>';
			});
			break;
	}

};


function saveBreadcrumb(info){
	var cant = sessionStorage.getItem("cantBreadcrumb");
	cant++;
	sessionStorage.setItem("cantBreadcrumb",cant);
	sessionStorage.setItem("breadcrumb" + cant, info);
}

function loadBreadcrumbs(){
	var cant = sessionStorage.getItem("cantBreadcrumb");
	var i = 1;
	var name;
	for(i = 1; i < cant; i ++){
		name = sessionStorage.getItem("breadcrumb" + i);
		document.getElementById("myBreadcrumbs").innerHTML += '<li><a href="pagPrincipal.html">' + name + '</a></li>';
	}
}
	