

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
	