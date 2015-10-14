if (notSignedIn()) {
    $("#navbarContent").append(notLoggedInButtons());
    document.getElementById("sign-in").addEventListener("click", function() {
        signIn()
    });
    document.getElementById("registrarse").addEventListener("click", function() {
        CreateAccount()
    });
} else {
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        signOut()
    });
    $("#navbarContent").append(loggedInButtons());
}



function notSignedIn() {
    var loggedUser = sessionStorage.getItem("loggedUser");
    if (loggedUser == null || loggedUser == "" || loggedUser === "undefined" || loggedUser == "null" || loggedUser === undefined) {
        return true;
    } else {
        return false;
    }
}

function notLoggedInButtons() {
    var buttons = '<li><a href="#" data-toggle="modal" data-target="#myModal" >Registrarse</a></li>' + '<li class="divider-vertical"></li>' + '<li class="dropdown">' + '<a class="dropdown-toggle" href="#" data-toggle="dropdown">Iniciar Sesión<strong class="caret"></strong></a>' + '<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px;">' + '<form method="post"  accept-charset="UTF-8">' + '<input style="margin-bottom: 15px;" type="text" placeholder="Usuario" id="loginUser" name="username">' + '<input style="margin-bottom: 15px;" type="password" placeholder="Contraseña" id="loginPassword" name="password">' + '<input class="btn btn-primary btn-block" id="sign-in" value="Iniciar Sesión">' + '<a data-toggle="modal" data-target="#cont" href="#"><span class="olvidoC">¿Olvidaste tu contraseña?</span></a>' + '</form>' + '</div>' + '</li>';
    return buttons;
}

function loggedInButtons() {
    var buttons = ' <li class="dropdown">' + '<a class="dropdown-toggle" href="#" data-toggle="dropdown">Mi Cuenta<strong class="caret"></strong></a>' + '<div class="dropdown-menu" style="padding: 15px; padding-bottom: 9px;">' + '<form method="post" action="login" accept-charset="UTF-8">' + '<li><a href="usuario.html"><i class="glyphicon glyphicon-user" style = "color:black"></i><h7 style = "color:black">Mi Usuario</h7></a></li>' + '<li><a href="contacto.html"><i class="glyphicon glyphicon-envelope" style = "color:black"></i><h7 style = "color:black"> Contacto</h7></a></li>' + '<li class="divider"></li>' + '<li><a href="#" id="cerrarSesion"><i class="glyphicon glyphicon-off" style = "color:black"></i><h7 style = "color:black">Cerrar Sesión</h7></a></li>' + '</form>' + '</div>' + '</li>';
    return buttons;
}

function showError(error) {
    alert(error.message);
}

function signIn() {
    var request = new Object();
    request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignIn&username=" + document.getElementById('loginUser').value + "&password=" + document.getElementById('loginPassword').value;
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
        handleResponse(data, deleteAccount);
    });
}


function CreateAccount() {

   var username = document.getElementById("usernameP").value;
	var firstname = document.getElementById("nombre").value;
	var dni = document.getElementById("dni").value;
	var password = document.getElementById("passwordP").value;
	var email = document.getElementById("emailP").value;
	var lastName = document.getElementById("apellido").value;
	var birthdate = "1989-04-10"; 
	var gender = "M";

    var account2 = {
        "username": username,
        "password": password,
        "firstName": firstname,
        "lastName": lastName,
        "gender": gender,
        "identityCard": dni,
        "email": email,
        "birthDate": birthdate
    };


    var request = new Object();
    request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAccount&account=" + encodeURIComponent(JSON.stringify(account2)); 
    	request.dataType = "jsonp"; 
    	console.log(password); 
    	console.log(username); 
    	console.log(firstname); 
    	console.log(request.url);
    	 $.ajax(request).done(function(data) {
            console.log(data);
            error = data.error;
            if (error === undefined) {
            	console.log(password); 
    			console.log(username); 
    			console.log(firstname); 
    			console.log(request.url);
            	localStorage.setItem("loggedUser", JSON.stringify(data));
                localStorage.setItem("account", JSON.stringify(data));
                //location.reload();
            } else {
                showError(error);
            }
        });
   
    	
    
    
            //location.reload();
        
    
    	/*request.dataType = "jsonp"; 
    	console.log(password); 
    	console.log(username); 
    	console.log(firstname); 
    	console.log(request.url);
    	 $.ajax(request).done(function(data) {
            console.log(data);
            error = data.error;
            if (error === undefined) {
            	sessionStorage.setItem("account", JSON.stringify(data));
                location.reload();
            } else {
                showError(error);
            }
        });*/

    }
