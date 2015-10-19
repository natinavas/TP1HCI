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
				signIn();
			});
			document.getElementById("registrarse").addEventListener("click", function() {
				register(); 
			});

		} else {
			$("#navbarContent").append(loggedInButtons());
			document.getElementById("cerrarSesion").addEventListener("click", function() {
				signOut();
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
		var buttons = '<ul class="nav navbar-nav navbar-right registrarse">'
		+'<li><a href="#"  data-toggle="modal" class="registrarseA registrarseP" data-target="#myModal" >Registrarse</a></li>' 
		+ '<li class="divider-vertical"></li>' 
		+ '<li class="dropdown">' 
		+ '<a class="dropdown-toggle" href="#" data-toggle="dropdown">Iniciar Sesión<strong class="caret"></strong></a>' 
		+ '<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px;">' 
		+ '<form method="post"  accept-charset="UTF-8">' 
		+ '<input style="margin-bottom: 15px;" type="text" placeholder="Usuario" id="loginUser" name="username">' 
		+ '<input style="margin-bottom: 15px;" type="password" placeholder="Contraseña" id="loginPassword" name="password">' 
		+ '<input class="btn btn-primary btn-block" id="sign-in" value="Iniciar Sesión">' 
		+ '<a data-toggle="modal" data-target="#cont" href="#"><span class="olvidoC">¿Olvidaste tu contraseña?</span></a>' 
		+ '</form>' + '</div>' + '</li>' + '</ul>';
		return buttons;
	}

	function loggedInButtons() {
		var buttons = ' <li class="dropdown" style="margin-left: 40px;margin-top: 15px;">' 
		+ '<a class="dropdown-toggle" href="#" data-toggle="dropdown">Mi Cuenta<strong class="caret"></strong></a>' 
		+ '<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px; margin-top: 15px;">' 
		+ '<form method="post" action="login" accept-charset="UTF-8">' 
		+ '<li><a href="usuario.html"><i class="glyphicon glyphicon-user" style = "color:black"></i><h7 style = "color:black">Mi Usuario</h7></a></li>' 
		+ '<li><a href="contacto.html"><i class="glyphicon glyphicon-envelope" style = "color:black"></i><h7 style = "color:black"> Contacto</h7></a></li>' 
		+ '<li class="divider"></li>' 
		+ '<li><a><i class="glyphicon glyphicon-off" style = "color:black"></i><h7 id="cerrarSesion" style = "color:black">Cerrar Sesión</h7></a></li>' 
		+ '</form>' + '</div>' + '</li>'
		return buttons;
	}

	function showError(error) {
		if(error.code == 101){
			swal({   title: "El usuario es inválido.",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else if(error.code == 105){
		swal({   title: "La contraseña es inválida.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 104){
		swal({   title: "El nombre de usuario es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 999){
		swal({   title: "Se produjo un error inesperado procesando la solicitud.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code== 2){
		swal({   title: "Se requiere un nombre de usuario.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if( error.code == 3){
		swal({   title: "Se requiere la contraseña la cual no fue suministrada.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else{
		swal({   title: error.message,
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}
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
	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });
	}

	function deleteAccount() {
	sessionStorage.setItem("account", null);
	location.reload();
	}

	function signOut() {
		
	var user = JSON.parse(sessionStorage.getItem("loggedUser"));
	//alert(JSON.stringify(user.authenticationToken));
		
	var request = new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignOut&username=" + user.account.username + "&authentication_token=" 					+user.authenticationToken;
	request.dataType = "jsonp";
	$.ajax(request).done(function(data){
		error = data.error;
		if(error == undefined){
			sessionStorage.removeItem("loggedUser");
			localStorage.removeItem("carrito");
			localStorage.removeItem("wishList");
			location.replace("index.html");
		}else{
			showError(error);
		}
	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });
		
	}
	
	function register(){
	var id=document.getElementById("dni").value;
	if(!validateId(id)){
		swal({   title: "Su número de DNI debe tener hasta ocho numeros",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else{
		var firstName = document.getElementById("nombre").value;
		if(!validateName(firstName)){
			swal({   title: "El nombre debe tener hasta 80 caracteres alfa-numericos",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else{
		var lastName = document.getElementById("apellido").value;
		if(!validateName(lastName)){
			swal({   title: "El apellido debe tener hasta 80 caracteres alfa-numericos",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else{
		var pass = document.getElementById("passwordP").value;
		if(!validatePassword(pass)){
			swal({   title: "La contraseña debe tener entre 8 y 15 caracteres alfa-numericos",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else{
		var user=document.getElementById("usernameP").value;
		if(!validateUser(user)){
			swal({   title: "El usuario debe tener entre 6 y 15 caracteres",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else{
		var email=document.getElementById("emailP").value;
		if(!validateEmail(email)){
			swal({   title: "El email no es válido",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else{
		var brthDate = new Date(document.getElementById('fechaP').value);
		var validDate = new Date("1999-01-01");
		if(brthDate > validDate){
			swal({   title: "Fecha inválida, se deben tener al menos 16 años para poder registrarse",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else{
		var sex;
		if (document.getElementById('masc').checked) {
			sex = document.getElementById('masc').value;
		}else{
			sex="F";
		}
		var account2 = { 
			username : user,
			password : pass,
			firstName : firstName,
			lastName : lastName,
			gender : sex,
			identityCard : id,
			email : email,
			birthDate : brthDate
		};
		console.log("account2 created");
		var request = new Object();
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAccount&account=" + JSON.stringify(account2);
		request.dataType = "jsonp";
		$.ajax(request).done(function(data){
			error = data.error;
			if(error == undefined){
				signIn2(user, pass);
			}else{
				showError(error);
			
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
	        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
	            type: "error",
	            confirmButtonText: "Cerrar"
	        });
	    });
	}
	}
	}
	}
	}
	}
	}
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
	}).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });
	}
		
	function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
	}	
	
	function validateUser(user){
	var re = /^[a-z0-9_-]{6,15}$/;
	return re.test(user);
	}
	
	function validatePassword(pass){
	var re = /^[a-z0-9_-]{8,15}$/;
	return re.test(pass);
	}
	
	function validateName(name){
	var re = /^[a-z0-9_-]{1,80}$/;
	return re.test(name);
	}
	
	function validateId(id){
	var re = /^[0-9]{8}$/;
	return re.test(id);
	}
	
	
	

