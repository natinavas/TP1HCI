
var request = new Object();
request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetCategoryById&id=1";
request.dataType = "jsonp";

console.log(request.url);

$.ajax(request).done(function(calzado) {
	error=calzado.error;
    if (error === undefined) {
		alert(JSON.stringify(calzado.category.attributes[1].values[0]));
		var mujer;
		var hombre;
		var bebe;
		var i;
		for(i=0; i<3;i++){
			if(calzado.category.attributes[0].values[i] == "Adulto" && calzado.category.attributes[1].values[i] == "Femenino")
				mujer=true;
			if(calzado.category.attributes[0].values[i] == "Adulto" && calzado.category.attributes[1].values[i] == "Masculino")
				hombre=true;
			if(calzado.category.attributes[0].values[i] == "")
	}			
				
        document.getElementById('navBarMujeres').innerHTML += "";
    } else {
        showError(error);
    }
	
});

function showError(error) {
    alert(error.message);
}
