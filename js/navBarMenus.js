
var request = new Object();
request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=1";
request.dataType = "jsonp";

console.log(request.url);

$.ajax(request).done(function(calzado) {
	error=calzado.error;
    if (error === undefined) {
		alert(calzado.subcategories[0].attributes[0].values[0]);
		var i;
		for(i=0; calzado.subcategorioes[i] != undefined; i++){
			if(calzado.subcategories[i].attributes[0].values[0] == "Adulto" && calzado.category.attributes[1].values[i] == "Femenino"){
				document.getElementById('calzadoMujeres').innerHTML = <li><a href="#">Alpargatas</a></li>;
				
			}
	}			
				
        document.getElementById('navBarMujeres').innerHTML += "";
    } else {
        showError(error);
    }
	
});

function showError(error) {
    alert(error.message);
}
