function loadStuff(){

document.getElementById("input").addEventListener("keypress", function(){
	if(event.keyCode == 13){
		search();
	}
});

function search(){
	var input =  document.getElementById("input").value;
	window.location.href = 'resultadosBusqueda.html?search=' + input;
}

	console.log("logged User is: " + sessionStorage.getItem("loggedUser"));

	if (notSignedIn()) {
		$("#navbarContent").append(notLoggedInButtons()); // me parece que navbarContent no existe en pagPrinipal.html
		document.getElementById("sign-in").addEventListener("click", function() {
			signIn()
		});
		document.getElementById("registrarse").addEventListener("click", function() {
			alert("por entrar");
			register(); 
		});

	} else {
		$("#navbarContent").append(loggedInButtons());
		document.getElementById("cerrarSesion").addEventListener("click", function() {
			signOut()
		});
	}
}


function notSignedIn() {
	var loggedUser = sessionStorage.getItem("loggedUser");
	if (loggedUser == "" || loggedUser === undefined || loggedUser == null) {
		return true;

	} else {
		return false;
	}

}




function notLoggedInButtons() {
	var buttons = '<li><a href="#"  data-toggle="modal" data-target="#myModal" >Registrarse</a></li>' 
	+ '<li class="divider-vertical"></li>' 
	+ '<li class="dropdown">' 
	+ '<a class="dropdown-toggle" href="#" data-toggle="dropdown">Iniciar Sesión<strong class="caret"></strong></a>' 
	+ '<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px;">' 
	+ '<form method="post"  accept-charset="UTF-8">' 
	+ '<input style="margin-bottom: 15px;" type="text" placeholder="Usuario" id="loginUser" name="username">' 
	+ '<input style="margin-bottom: 15px;" type="password" placeholder="Contraseña" id="loginPassword" name="password">' 
	+ '<input class="btn btn-primary btn-block" id="sign-in" value="Iniciar Sesión">' 
	+ '<a data-toggle="modal" data-target="#cont" href="#"><span class="olvidoC">¿Olvidaste tu contraseña?</span></a>' 
	+ '</form>' + '</div>' + '</li>';
	return buttons;
}


function loggedInButtons() {
	var buttons = '<li class="divider-vertical"></li>' 
	+ ' <li class="dropdown"><br/>' 
	+ '<a class="dropdown-toggle" href="#" data-toggle="dropdown">Mi Cuenta<strong class="caret"></strong></a>' 
	+ '<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px;">' 
	+ '<form method="post" action="login" accept-charset="UTF-8">' 
	+ '<li><a href="usuario.html"><i class="glyphicon glyphicon-user" style = "color:black"></i><h7 style = "color:black">Mi Usuario</h7></a></li>' 
	+ '<li><a href="contacto.html"><i class="glyphicon glyphicon-envelope" style = "color:black"></i><h7 style = "color:black"> Contacto</h7></a></li>' 
	+ '<li class="divider"></li>' 
	+ '<li><a href="pagPrincipal.html"><i class="glyphicon glyphicon-off" style = "color:black"></i><h7 id="cerrarSesion" style = "color:black">Cerrar Sesión</h7></a></li>' 
	+ '</form>' + '</div>' + '</li>'
	return buttons;
}

function showError(error) {
	alert(error.message);
}

function signIn() {
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignIn&username=" + document.getElementById('loginUser').value + "&password=" + 			document.getElementById('loginPassword').value;
	request.dataType = "jsonp";
	console.log(request.url);
	$.ajax(request).done(function(data) {
		console.log(JSON.stringify(data));
		error = data.error;
		if (error === undefined) {
			sessionStorage.setItem("loggedUser", JSON.stringify(data));
			location.reload();

		} else {
			showError(error);
		}
	});
}

function signIn2(user, pass){
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignIn&username=" + document.getElementById('loginUser').value + "&password=" + 			document.getElementById('loginPassword').value;
	request.dataType = "jsonp";
	console.log(request.url);
	$.ajax(request).done(function(data) {
		error = data.error;
		if (error === undefined) {
			localStorage.setItem("loggedUser", JSON.stringify(data));
			location.reload();

		} else {
			showError(error);
		}
	});
}


function deleteAccount() {
	sessionStorage.setItem("account", null);
	location.reload();
}

function signOut() {
	var account = JSON.parse(sessionStorage.getItem("loggedUser"));
	var token = sessionStorage.getItem("token");

	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignOut&username=" + account.username + "&authentication_token=" + token;
	request.dataType = "jsonp";

	$.ajax(request).done(function(data) {
		error = data.error;
		
		if(error == undefined){
			sessionStorage.removeItem("loggedUser");
			localStorage.removeItem("carrito");
				
		}else{
			showError(error);
		}
	});
	location.reload();
}
// cierra el controller
	
	
function register() {
	alert("enters register");
	// creo el objeto account
	var account2 = { 
		username : document.getElementById("usernameP").value,
		password : document.getElementById("passwordP").value,
		firstName : document.getElementById("nombre").value,
		lastName : document.getElementById("apellido").value,
		gender : "M",
		identityCard : document.getElementById("dni").value,
		email : document.getElementById("emailP").value,
		birthDate : "1991-02-02"
	};
	console.log("account2 created");
	alert("register request parameter " + JSON.stringify(account2));
		
	var request=new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAccount&account=" + JSON.stringify(account2);
	request.dataType = "jsonp";
	alert("request url: " + request.url);
		
	$.ajax(request).done(function(data) { //aca hago el request de registrarse
			
		alert("register request: " + JSON.stringify(data));
		error = data.error;
		if(error == undefined){ //si no tengo error
			//sessionStorage.setItem("loggedUser", JSON.stringify(data));
			signIn2(document.getElementById("usernameP").value, document.getElementById("passwordP").value);
		}else{
			showError(error);
			
		}
	});

}
		
function signIn2(user, pass){
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignIn&username=" + user + "&password=" + pass;
	request.dataType = "jsonp";
	console.log(request.url);
			
	$.ajax(request).done(function(data) {
		console.log("login request: " + JSON.stringify(data));
		error = data.error;
		if (error === undefined) {
			sessionStorage.setItem("loggedUser", JSON.stringify(data));
			location.reload();
		} else {
			showError(error);
		}
	});
}

