//loadNinias();
loadNinios();
//loadBebes();

function loadNinias(){

	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=2&filters=[{%20%22id%22:%201,%20%22value%22:%20%22Femenino%22%20}]";
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
		                    '<a href="pagEnConstruccion.html">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuMujeres/'+ c.subcategories[i].name +'.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#indumentaria").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="pagEnConstruccion.html">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuMujeres/vertodoIndumentaria.jpg" title="vertodoIndumentaria" alt="vertodoIndumentaria" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#indumentaria").append('</div>');		

	});
}


function loadNinios(){
	var j,i=0;
	for(j = 1; j<= 3; j++){
		var request = new Object();
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id="+j+"&filters=[%20{%20%22id%22:%201,%20%22value%22:%20%22Masculino%22%20},%20{%20%22id%22:%202,%20%22value%22:%20%22Infantil%22%20}%20]";
		request.dataType = "jsonp";

		console.log(request.url);

		$.ajax(request).done(function(c){
			var i;
			for(; i < c.subcategories.length; i++){
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
			                    '<a href="pagEnConstruccion.html">'+
			                        '<div class="bw pic">'+
			                            '<img src="img/menuInfantiles/'+ c.subcategories[i].name +'Ninios.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
			                        '</div>'+
			                    '</a>'+
			                '</div>');	
			}
		});
	}

	$("#ninios").append('<div class="col-xs-2">'+
			                    '<div class="row">'+
			                        '<div class=text-center>'+
			                            '<h3>Ver Todo</h3></div>'+
			                    '</div>'+
			                    '<a href="pagEnConstruccion.html">'+
			                        '<div class="bw pic">'+
			                            '<img src="img/menuInfantiles/vertodoNinios.jpg" title="vertodoNinios" alt="vertodoNinios" style="width:200px;height:275px;">'+
			                        '</div>'+
			                    '</a>'+
			                '</div>');	

			$("#ninios").append('</div>');		
}

function loadBebes(){

	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=3&filters=[{%20%22id%22:%201,%20%22value%22:%20%22Femenino%22%20}]";
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
		                    '<a href="pagEnConstruccion.html">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuMujeres/'+ c.subcategories[i].name +'.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#accesorios").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Ver Todo</h3></div>'+
		                    '</div>'+
		                    '<a href="pagEnConstruccion.html">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuMujeres/vertodoCalzado.jpg" title="vertodoAccesorios" alt="vertodoAccesorios" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#accesorios").append('</div>');		

	});
}