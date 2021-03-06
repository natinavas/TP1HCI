var params = window.location.href.split("?")[1].split(";");
var bc = document.getElementById("breadcrumbs-two");
var ph = document.getElementById("pageHeader");

var i=0;

loadBreadcrumbs();

function loadBreadcrumbs(){
	// me fijo si es una busqueda por nombre
	for (i = 0 ; i < params.length; i++){
		if(params[i].split("=")[0] == "search"){
			bc.innerHTML += '<li><a href="resultadosBusqueda.html?search='+ params[i].split("=")[1] +'">BUSQUEDA</a></li>';
			if(ph != null)
				ph.innerHTML = "<h1>BUSQUEDA DE '"+ params[i].split("=")[1] + "'</h1>";
		}
	}

	// me fijo el genero el genero pero NO SETEO breadcrumbs
	var g = "";
	for (i = 0 ; i < params.length; i++){
		if(params[i].split("=")[0] == "gender"){
			g = params[i].split("=")[1];
		}
	}

	var isAdult = false;
	var isBaby = false;
	// me fijo si es adulto o infantil
	for (i = 0 ; i < params.length; i++){
		if(params[i].split("=")[0] == "age"){
			if(params[i].split("=")[1] == "Adulto"){
				isAdult = true;
			}
			else if(params[i].split("=")[1] == "Bebe"){
				isBaby = true;
				bc.innerHTML += '<li><a href="infantil.html">INFANTIL</a></li>';
				bc.innerHTML += '<li><a href="resultadosBusqueda.html?category=1;age=Bebe">BEBES</a></li>';
				if(ph != null)
					ph.innerHTML = '<h1>BEBES</h1>';
			}
			else{
				bc.innerHTML += '<li><a href="infantil.html">INFANTIL</a></li>';
				var kid = "";
				var kidHref = "";
				if(g == "Hombres"){
					kid = "NIÑOS";
					kidHref = "resultadosBusqueda.html?category=1;gender=Hombres;age=Infantil";
					bc.innerHTML += '<li><a href="'+ kidHref +'">'+ kid +'</a></li>';
					if(ph != null)
						ph.innerHTML = '<h1>NIÑOS</h1>';
				}
				if(g == "Mujeres"){
					kid = "NIÑAS";
					kidHref = "resultadosBusqueda.html?category=1;gender=Mujeres;age=Infantil";
					bc.innerHTML += '<li><a href="'+ kidHref +'">'+ kid +'</a></li>';
					if(ph != null)
						ph.innerHTML = '<h1>NIÑAS</h1>';

				}
				
			}
		}
	}

	// me fijo si es hombre o mujer
	if(isAdult == true){
		if(g == "Hombres"){
			bc.innerHTML += '<li><a href="hombres.html">HOMBRES</a></li>';
			if(ph != null)
				ph.innerHTML = '<h1>HOMBRES</h1>';
		}
		if(g == "Mujeres"){
			bc.innerHTML += '<li><a href="mujeres.html">MUJERES</a></li>';
			if(ph != null)
				ph.innerHTML = '<h1>MUJERES</h1>';
		}
	}

	// me fijo la categoría
	if(isAdult == true){

		for (i = 0 ; i < params.length; i++){
			if(params[i].split("=")[0] == "category"){

				var request = new Object();
				request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetCategoryById&id=" + params[i].split("=")[1];
				request.dataType = "jsonp";

				console.log(request.url);

				$.ajax(request).done(function(c){
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?category='+ c.category.id +';gender='+ g +';age=Adulto">'+ c.category.name.toUpperCase() +'</a></li>';
					if(ph != null)
						ph.innerHTML = '<h1>' + c.category.name.toUpperCase() + '</h1>';
				}).fail(function (jqXHR, textStatus, errorThrown) {
			       swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
			            type: "error",
			            confirmButtonText: "Cerrar"
			        });
			    });
			}
		}
	}

	// me fijo la subcategoria
	for (i = 0 ; i < params.length; i++){
		if(params[i].split("=")[0] == "subcategory"){
		
			var request = new Object();
			request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetSubcategoryById&id=" + params[i].split("=")[1];
			request.dataType = "jsonp";

			console.log(request.url);

			$.ajax(request).done(function(c){
				if(isAdult == true){
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?category='+ c.subcategory.category.id +';gender='+ g +';age=Adulto">'+ c.subcategory.category.name.toUpperCase() +'</a></li>';
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?subcategory='+ c.subcategory.id +';gender='+ g +';age=Adulto">'+ c.subcategory.name.toUpperCase() +'</a></li>';
				}else if(isBaby == true){
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?subcategory='+ c.subcategory.id +';age=Bebe">'+ c.subcategory.name.toUpperCase() +'</a></li>';
				}
				else{
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?subcategory='+ c.subcategory.id +';gender='+ g +';age=Infantil">'+ c.subcategory.name.toUpperCase() +'</a></li>';
				}
				if(ph != null)
					ph.innerHTML = '<h1>' + c.subcategory.name.toUpperCase() + '</h1>';
			}).fail(function (jqXHR, textStatus, errorThrown) {
		        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
		            type: "error",
		            confirmButtonText: "Cerrar"
		        });
		    });
		
		}
	}

	//me fijo si es ofertas
	for (i = 0 ; i < params.length; i++){
		if(params[i].split("=")[0] == "oferta"){
			if(isAdult == true){
				bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;oferta=Ofertas;gender='+ g +';age=Adulto">OFERTAS</a></li>';
			}
			else if(isBaby == true){
				bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;oferta=Ofertas;age=Bebe">OFERTAS</a></li>';
			}
			else{
				if(g != ""){
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;oferta=Ofertas;gender='+ g +';age=Infantil">OFERTAS</a></li>';
				}
				else{
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;oferta=Ofertas">OFERTAS</a></li>';
				}
			}
			if(ph != null)
				ph.innerHTML = '<h1>OFERTAS</h1>';
		}
	}

	//me fijo si es nuevo
	for (i = 0 ; i < params.length; i++){
		if(params[i].split("=")[0] == "nuevo"){
			if(isAdult == true){
				bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;nuevo=Novedades;gender='+ g +';age=Adulto">NUEVO</a></li>';
			}
			else if(isBaby == true){
				bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;nuevo=Novedades;age=Bebe">NUEVO</a></li>';
			}
			else{
				if(g != ""){
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;nuevo=Novedades;gender='+ g +';age=Infantil">NUEVO</a></li>';
				}else{
					bc.innerHTML += '<li><a href="resultadosBusqueda.html?todo=todo;nuevo=Novedades">NUEVO</a></li>';
				}
			}
			if(ph != null)
				ph.innerHTML = '<h1>NUEVO</h1>';
		}
	}
}


setTimeout(loadProdBreadCrumb,20);
//loadProdBreadCrumb();

function loadProdBreadCrumb(){
	//me fijo si es un producto
	for (var i = 0 ; i < params.length; i++){
		if(params[i].split("=")[0] == "product"){
			var request = new Object();
			request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductById&id=" + params[i].split("=")[1];
			request.dataType = "jsonp";


			console.log(request.url);

			$.ajax(request).done(function(c){

				bc.innerHTML += '<li><a >'+ c.product.name.toUpperCase() +'</a></li>';
				if(ph != null)
					ph.innerHTML = '<h1>' + c.product.name.toUpperCase() + '</h1>';
			}).fail(function (jqXHR, textStatus, errorThrown) {
		        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
		            type: "error",
		            confirmButtonText: "Cerrar"
		        });
		    });
		}
	}
}

/*
for (var i = 0 ; i < params.length; i++) {
	var key = params[i].split("=")[0];
	switch(key){
		
		case "search":
			document.getElementById("breadcrumbs-two").innerHTML += '<li><a href="resultadosBusqueda.html?search=' + params[i].split("=")[1] + '">BÚSQUEDA</a></li>';
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

};*/