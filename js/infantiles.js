loadNinias();
loadNinios();
loadBebes();

function loadNinias(){
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=1&filters=[%20{%20%22id%22:%201,%20%22value%22:%20%22Femenino%22%20},%20{%20%22id%22:%202,%20%22value%22:%20%22Infantil%22%20}%20]";
	request.dataType = "jsonp";

	console.log(request.url);

	$.ajax(request).done(function(c){
		var i;
		for(i = 0; i < c.subcategories.length; i++){
			if(i%6 == 0){
				if(i != 0){
					$("#ninias").append('</div>');
				}
				$("#ninias").append('<div class="row">');
			}
			$("#ninias").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>'+ c.subcategories[i].name +'</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender=Mujeres;age=Infantil">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuInfantiles/'+ c.subcategories[i].name +'Ninias.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#ninias").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?category=1;gender=Mujeres;age=Infantil">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuInfantiles/vertodoNinias.jpg" title="vertodoNinias" alt="vertodoNinias" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#ninias").append('</div>');		

	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });		
}


function loadNinios(){
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=1&filters=[%20{%20%22id%22:%201,%20%22value%22:%20%22Masculino%22%20},%20{%20%22id%22:%202,%20%22value%22:%20%22Infantil%22%20}%20]";
	request.dataType = "jsonp";

	console.log(request.url);

	$.ajax(request).done(function(c){
		var i;
		for(i = 0; i < c.subcategories.length; i++){
			if(i%6 == 0){
				if(i != 0){
					$("#ninios").append('</div>');
				}
				$("#ninios").append('<div class="row">');
			}
			$("#ninios").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>'+ c.subcategories[i].name +'</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender=Hombres;age=Infantil">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuInfantiles/'+ c.subcategories[i].name +'Ninios.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#ninios").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?category=1;gender=Hombres;age=Infantil">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuInfantiles/vertodoNinios.jpg" title="vertodoIndumentaria" alt="vertodoIndumentaria" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#ninios").append('</div>');		

	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });	
}

function loadBebes(){
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=1&filters=[{%20%22id%22:%202,%20%22value%22:%20%22Bebe%22%20}]";
	request.dataType = "jsonp";

	console.log(request.url);

	$.ajax(request).done(function(c){
		var i;
		for(i = 0; i < c.subcategories.length; i++){
			if(i%6 == 0){
				if(i != 0){
					$("#bebes").append('</div>');
				}
				$("#bebes").append('<div class="row">');
			}
			$("#bebes").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>'+ c.subcategories[i].name +'</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';age=Bebe">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuInfantiles/'+ c.subcategories[i].name +'Bebes.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#bebes").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="resultadosBusqueda.html?category=1;age=Bebe">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuInfantiles/vertodoBebes.jpg" title="vertodoBebes" alt="vertodoBebes" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#bebes").append('</div>');		

	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });	
}