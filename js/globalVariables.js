

// Inicar la variable de cantidad de breadcrumbs


	if(sessionStorage.getItem("cantBreadcrumb") == undefined){
		alert("wawa");

		var bh = new Object();
		bh.loadBreadcrumbs = 
			function loadBreadcrumbs(){
				var cant = sessionStorage.getItem("cantBreadcrumb");
				var i = 1;
				var name;
				for(i = 1; i < cant; i ++){
					name = sessionStorage.getItem("breadcrumb" + i);
					document.getElementById("myBreadcrumbs").innerHTML += '<li><a href="pagPrincipal.html">' + name + '</a></li>';
				}
			};


		bh.saveBreadcrumb = 
			function saveBreadcrumb(info){
				var cant = sessionStorage.getItem("cantBreadcrumb");
				cant++;
				sessionStorage.setItem("cantBreadcrumb",cant);
				sessionStorage.setItem("breadcrumb" + cant, info);
				alert("hello");
			};

		sessionStorage.setItem("breadcrumbHandler",bh);

		sessionStorage.setItem("cantBreadcrumb",1);
		sessionStorage.setItem("breadcrumb1","Inicio");
	}

