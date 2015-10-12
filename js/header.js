document.getElementById("sign-in").addEventListener("click", function(){signIn()});

$("#navbarContent").empty();

if(notSignedIn()){
	$("#navbarContent").append(notLoggedInButtons());
}else{
	$("#navbarContent").append(loggedInButtons());
}



function notSignedIn(){
	var loggedUser = sessionStorage.getItem("loggedUser");
	if(loggedUser == null || loggedUser == "" || loggedUser === "undefined" || loggedUser == "null" || loggedUser === undefined){
		return true;
	}else{
		return false;
	}
}

function notLoggedInButtons(){
	var buttons='<li><a href="#" data-toggle="modal" data-target="#myModal" >Registrarse</a></li>'
			+'<li class="divider-vertical"></li>'
			+'<li class="dropdown">'
			+'<a class="dropdown-toggle" href="#" data-toggle="dropdown">Iniciar Sesión<strong class="caret"></strong></a>'
			+'<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px;">'
			+'<form method="post"  accept-charset="UTF-8">'
			+'<input style="margin-bottom: 15px;" type="text" placeholder="Usuario" id="loginUser" name="username">'
			+'<input style="margin-bottom: 15px;" type="password" placeholder="Contraseña" id="loginPassword" name="password">'
			+'<input class="btn btn-primary btn-block" type="submit" id="sign-in" value="Iniciar Sesión"> <a data-toggle="modal" data-target="#cont" href="#"><span class="olvidoC">¿Olvidaste tu contraseña?</span></a>'
			+'</form>'
			+'</div>'
			+'</li>';
	return buttons;
}

function loggedInButtons(){
	var buttons=' <li class="dropdown">'
			+'<a class="dropdown-toggle" href="#" data-toggle="dropdown">Mi Cuenta<strong class="caret"></strong></a>'
			+'<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px;">'
			+'<form method="post" action="login" accept-charset="UTF-8">'
			+'<li><a href="usuario.html"><i class="glyphicon glyphicon-user" style = "color:black"></i><h7 style = "color:black">Mi Usuario</h7></a></li>'
			+'<li><a href="contacto.html"><i class="glyphicon glyphicon-envelope" style = "color:black"></i><h7 style = "color:black"> Contacto</h7></a></li>'
			+'<li class="divider"></li>'
			+'<li><a href="pagPrincipal.html"><i class="glyphicon glyphicon-off" style = "color:black"></i><h7 style = "color:black">Cerrar Sesión</h7></a></li>'
			+'</form>'
			+'</div>'
			+'</li>';
	return buttons;
}

function showError(error){
	alert(error.message);
}


function signIn(){
	if("#loginPassword" != null || "#loginPassword" != "" || "#loginPassword" != null || "#loginUser" != null || "#loginUser" !=  ""){
		
		var request = new Object();
		request.url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignIn&username=" + loginUser + "&password=" + loginPassword;
		request.dataType="jsonp";
		
		console.log(request.url);
		$.ajax(request).done(function(data){
				error = data.meta.error;
				if(error === undefined){
					console.log(JSON.stringify(data.account));
				}else{
					showError(error);	
				}
		});
	}
}

