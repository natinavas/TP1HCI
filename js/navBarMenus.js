loadCalzadoFem();
loadIndumentariaFem();
loadAccesoriosFem();
loadCalzadoMasc();
loadIndumentariaMasc();
loadAccesoriosMasc();
loadRopaNinios();
loadRopaNinias();
loadRopaBebes();


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
			document.getElementById(categ + g).innerHTML += '<li><a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender='+ g +';age=Adulto">'+ c.subcategories[i].name +'</a></li>';
		}		
	});
}

function loadRopaNinios(){
	var request = new Object();
	var i,j;
	for(j = 1; j<=3; j++){
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id="+j+"&filters=[%20{%20%22id%22:%201,%20%22value%22:%20%22Masculino%22%20},%20{%20%22id%22:%202,%20%22value%22:%20%22Infantil%22%20}%20]";
		request.dataType = "jsonp";

		$.ajax(request).done(function(c) {
			for(i=0; i<c.subcategories.length; i++){
				document.getElementById("ropaNinios").innerHTML += '<li><a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender=Hombres;age=Infantil">'+ c.subcategories[i].name +'</a></li>';
			}
		});
	}
}

function loadRopaNinias(){
	var request = new Object();
	var i,j;
	for(j = 1; j<=3; j++){
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id="+j+"&filters=[%20{%20%22id%22:%201,%20%22value%22:%20%22Femenino%22%20},%20{%20%22id%22:%202,%20%22value%22:%20%22Infantil%22%20}%20]";
		request.dataType = "jsonp";


		$.ajax(request).done(function(c) {
			for(i=0; i<c.subcategories.length; i++){
				document.getElementById("ropaNinias").innerHTML += '<li><a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';gender=Mujeres;age=Infantil">'+ c.subcategories[i].name +'</a></li>';
			}
		});
	}
}

function loadRopaBebes(){
	var request = new Object();
	var i,j;
	for(j = 1; j<=3; j++){
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id="+j+"&filters=[{%20%22id%22:%202,%20%22value%22:%20%22Bebe%22%20}]";
		request.dataType = "jsonp";

		$.ajax(request).done(function(c) {
			for(i=0; i<c.subcategories.length; i++){
				document.getElementById("ropaBebes").innerHTML += '<li><a href="resultadosBusqueda.html?subcategory='+ c.subcategories[i].id +';age=Bebe">'+ c.subcategories[i].name +'</a></li>';
			}
		});
	}
}