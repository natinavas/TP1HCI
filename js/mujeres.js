$(document).ready( function() {
    $('#myCarousel').carousel({
		interval:   4000
	});
	
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav').children().length -1;
			var current = $('.nav li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});
});

loadIndumentaria();
loadCalzado();

function loadIndumentaria(){

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
		                            '<h3>Todo Indumentaria</h3></div>'+
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


function loadCalzado(){

	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=1&filters=[{%20%22id%22:%201,%20%22value%22:%20%22Femenino%22%20}]";
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
		                    '<a href="pagEnConstruccion.html">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuMujeres/'+ c.subcategories[i].name +'.jpg" title="'+ c.subcategories[i].name +'" alt="'+ c.subcategories[i].name +'" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	
		}

		$("#calzado").append('<div class="col-xs-2">'+
		                    '<div class="row">'+
		                        '<div class=text-center>'+
		                            '<h3>Todo Calzado</h3></div>'+
		                    '</div>'+
		                    '<a href="pagEnConstruccion.html">'+
		                        '<div class="bw pic">'+
		                            '<img src="img/menuMujeres/vertodoCalzado.jpg" title="vertodoIndumentaria" alt="vertodoCalzado" style="width:200px;height:275px;">'+
		                        '</div>'+
		                    '</a>'+
		                '</div>');	

		$("#calzado").append('</div>');		

	});
}