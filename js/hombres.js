
loadIndumentaria();
loadCalzado();
loadAccesorios();

function loadIndumentaria(){

	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=2&filters=[{%20%22id%22:%201,%20%22value%22:%20%22Masculino%22%20}]";
	request.dataType = "jsonp";

	console.log(request.url);

	$.ajax(request).done(function(c){
		var i;
		for(i = 0; i < c.subcategories.length; i++){
			if(i%6 == 0){
				if(i != 0){
					$("#indumentaria").append('</div>');
				}
				$("#indumentaria").append('<div class="row">');
			}
			$("#indumentaria").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>'+ c.subcategories[i].name +'</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender=Hombres;age=Adulto">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuHombres/'+ c.subcategories[i].name +'.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#indumentaria").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?category=2;gender=Hombres;age=Adulto">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuHombres/vertodoIndumentaria.jpg" title="vertodoIndumentaria" alt="vertodoIndumentaria" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#indumentaria").append('</div>');		

	}).fail(function (jqXHR, textStatus, errorThrown) {
		aleert("holaa");
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });
}


function loadCalzado(){

	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=1&filters=[{%20%22id%22:%201,%20%22value%22:%20%22Masculino%22%20}]";
	request.dataType = "jsonp";

	console.log(request.url);

	$.ajax(request).done(function(c){
		var i;
		for(i = 0; i < c.subcategories.length; i++){
			if(i%6 == 0){
				if(i != 0){
					$("#calzado").append('</div>');
				}
				$("#calzado").append('<div class="row">');
			}
			$("#calzado").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>'+ c.subcategories[i].name +'</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender=Hombres;age=Adulto">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuHombres/'+ c.subcategories[i].name +'.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#calzado").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?category=1;gender=Hombres;age=Adulto">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuHombres/vertodoCalzado.jpg" title="vertodoCalzado" alt="vertodoCalzado" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#calzado").append('</div>');		

	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });
}

function loadAccesorios(){

	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=3&filters=[{%20%22id%22:%201,%20%22value%22:%20%22Masculino%22%20}]";
	request.dataType = "jsonp";

	console.log(request.url);

	$.ajax(request).done(function(c){
		var i;
		for(i = 0; i < c.subcategories.length; i++){
			if(i%6 == 0){
				if(i != 0){
					$("#accesorios").append('</div>');
				}
				$("#accesorios").append('<div class="row">');
			}
			$("#accesorios").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>'+ c.subcategories[i].name +'</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender=Hombres;age=Adulto">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuHombres/'+ c.subcategories[i].name +'.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#accesorios").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?category=3;gender=Hombres;age=Adulto">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuHombres/vertodoAccesorios.jpg" title="vertodoAccesorios" alt="vertodoAccesorios" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#accesorios").append('</div>');		

	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });
}