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

    var username = JSON.stringify(document.getElementById("usernameP").value);			// stringify por que los valores tienen que estar como string
    var firstname = JSON.stringify(document.getElementById("nombre").value);
    var lastName = JSON.stringify(document.getElementById("apellido").value);
    var dni = JSON.stringify(document.getElementById("dni").value);
    var password = JSON.stringify(document.getElementById("passwordP").value);
    var email = JSON.stringify(document.getElementById("emailP").value);
    var birthdate = JSON.stringify("1989-04-10");										// para ahorrar tiempo harcodeo la fecha y el genero hasta acomodar eso

    var gender = JSON.stringify("M");

 
    var request = new Object();
    request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAccount&account=%7b%22username%22:" + username + ",%22password%22:" + password + ",%22firstName%22:" + firstname + ",%22lastName%22:" + lastName + ",%22gender%22:" + gender + ",%22identityCard%22:" + dni + ",%22email%22:" + email + ",%22birthDate%22:" + birthdate + "%7d";
    request.dataType = "jsonp";
   
    console.log(password);
    console.log(username); 
    console.log(firstname);
    console.log(request.url); 
    $.ajax(request).done(function(data) {
        error = data.error;
        if (error === undefined) {
            localStorage.setItem("account", JSON.stringify(data));
            //location.reload();
        } else {
            showError(error);
        }
    });

}
