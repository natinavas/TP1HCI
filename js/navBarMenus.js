loadCalzadoFem();
loadIndumentariaFem();
loadAccesoriosFem();
loadCalzadoMasc();
loadIndumentariaMasc();
loadAccesoriosMasc();


function loadCalzadoFem(){
	loadNavBarFMClothes(1, "calzado", "Femenino");
}

function loadIndumentariaFem(){
	loadNavBarFMClothes(2, "indumentaria", "Femenino");
}

function loadAccesoriosFem(){
	loadNavBarFMClothes(3, "accesorios", "Femenino");
}

function loadCalzadoMasc(){
	loadNavBarFMClothes(1, "calzado", "Masculino");
}

function loadIndumentariaMasc(){
	loadNavBarFMClothes(2, "indumentaria", "Masculino");
}

function loadAccesoriosMasc(){
	loadNavBarFMClothes(3, "accesorios", "Masculino");
}

function loadNavBarFMClothes(num, categ, gender){
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id="+ num +"&filters=[{%20%22id%22:%201,%20%22value%22:%20%22"+gender+"%22%20}]";
	request.dataType = "jsonp";

	console.log(request.url);

	var i = 0;
	var g;
	if(gender == "Femenino"){
		g = "Fem";
	}
	else if(gender == "Masculino"){
		g = "Masc";
	}
	else{
		g = "";
	}

	$.ajax(request).done(function(c) {

		for(i=0; i<c.subcategories.length; i++){
			document.getElementById(categ + g).innerHTML += '<li><a href="#">'+ c.subcategories[i].name +'</a></li>';
		}		
	});
}