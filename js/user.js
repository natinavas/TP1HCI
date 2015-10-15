	$("#userInfo").append(personalInformation());

	document.getElementById("addrs").addEventListener("click", function(){
		document.getElementById("agregarDir").addEventListener("click", function() {
			//alert("por entrar");
			addAddress(); 
		});
		//alert("Debug1");
	});
	
	document.getElementById("changePass").addEventListener("click", function(){
		changePassword();
	});
	
	
	document.getElementById("editInfo").addEventListener("click", function(){
		editPersonalInfo();
	});

	function personalInformation(){
		var user= JSON.parse(sessionStorage.getItem("loggedUser"));
	
		var information = '<div class="col-xs-1"></div> <div class="col-xs-11">'
		+'<h5> Usuario: ' + user.account.username
		+ '<h5> Nombre: ' + user.account.firstName + ' ' + user.account.lastName
		+ '<h5> E-mail: ' + user.account.email
		+ '<h5> Fecha de Nacimiento: ' + user.account.birthDate 
		+ '<br/><h5> Fecha de Creación de Cuenta: ' + user.account.createdDate
		+ '<h5> Última fecha de inicio de sesión: ' + user.account.lastLoginDate
		+ '<div/>';	
	
		return information;
	}



	function changePassword(){
		var user = document.getElementById("changePassUser").value;
		var oldPass = document.getElementById("oldPassword").value;
		var newPass1 = new String();
		newPass1 = document.getElementById("password1").value;
		var newPass2 = new String();
		newPass2 = document.getElementById("password2").value;
		
		if( newPass1 != newPass2){
			alert("Las contraseñas no coincieden.");
			
		}else{
			var request = new Object();
			request.url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=ChangePassword&username=" + user + "&password=" + oldPass + "&new_password=" +newPass1;
			request.dataType = "jsonp";
			console.log(request.url);
			
			$.ajax(request).done(function(data) {
				error=data.error;
				if(error==undefined){
				
				
					location.reload();
				}else{
					showError(error);
				}
			});
			
			
			
		}
		
		/*var request = new Object();
		request.url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=ChangePassword&username=" + changePassUser + "&password=" + password + "&new_password=" + newPassword1;
		request.dataType="jsonp";*/
	}


	function showError(error) {
		alert(error.message);
	}


	function addAddress(){
		//alert("entro");
		var newAddress= {
			name: document.getElementById("nombreD").value,
			street: document.getElementById("calleD").value,
			number: document.getElementById("numeroD").value,
			province: document.getElementById("provinciaD").value,
			zipCode: document.getElementById("cpD"),
			phoneNumber: document.getElementById("telD")
		};
	
		console.log("new address:" + JSON.stringify(newAddress));
	
		var user = JSON.parse(sessionStorage.getItem("loggedUser"));
	
		var request=new Object();
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + user.account.username + "&authentication_token=" + 				user.authenticationToken + "&address=" + JSON.stringify(newAddress);
		request.dataType = "jsonp";
		console.log("request url: " + request.url);
	
		$.ajax(request).done(function(data) {
			error=data.error;
			//alert("rta" + JSON.stringify(data));
			if(error==undefined){
				if(user.cantAddress == undefined || user.cantAddress == 0){
					user.cantAdress=1;
					user.addresses= {};
				}
				else
					user.cantAddress+=1;
				user.addresses[user.cantAddress - 1] = data;
			}else{
				showError(error);
			}
		});
	}
	
	function editPersonalInfo(){
		
		var user = JSON.parse(sessionStorage.getItem("loggedUser"));
		
		var account ={
			firstName: document.getElementById("nuevoNombre").value,
			lastName: document.getElementById("nuevoApellido").value,
			gender: user.account.gender,
			identityCard: user.account.identityCard,
			email: document.getElementById("nuevoEmail").value,
			birthDate: "1979-01-01"
			
		}
		var request = new Object();
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=UpdateAccount&username=" + user.account.username + "&authentication_token="+ 			user.authenticationToken + "&account=" + JSON.stringify(account);
		request.dataType="jsonp";
		console.log(request.url);
		
		$.ajax(request).done(function(data) {
			error=data.error;
			if(error == undefined){
				
				user.account.firstName = account.firstName;
				user.account.lastName = account.lastName;
				user.account.email = account.email;
				//user.account.birthDate = account.birthDate;
				
				sessionStorage.setItem("loggedUser", JSON.stringify(user));
				alert("Sus cambios han sido guardados.");
				
				location.reload();
			}else{
				showError(error);
			}
		});
		
	}
	
	
	
	
	
	
	$("input[type=password]").keyup(function(){
	
		if($("#password1").val().length >= 8){
			$("#8char").removeClass("glyphicon-remove");
			$("#8char").addClass("glyphicon-ok");
			$("#8char").css("color","#00A41E");
		}else{
			$("#8char").removeClass("glyphicon-ok");
			$("#8char").addClass("glyphicon-remove");
			$("#8char").css("color","#FF0004");
		}
	
	
		if($("#password1").val().length < 15){
			$("#15char").removeClass("glyphicon-remove");
			$("#15char").addClass("glyphicon-ok");
			$("#15char").css("color","#00A41E");
		}else{
			$("#15char").removeClass("glyphicon-ok");
			$("#15char").addClass("glyphicon-remove");
			$("#15char").css("color","#FF0004");
		}
	
		if($("#password1").val() == $("#password2").val()){
			$("#pwmatch").removeClass("glyphicon-remove");
			$("#pwmatch").addClass("glyphicon-ok");
			$("#pwmatch").css("color","#00A41E");
		}else{
			$("#pwmatch").removeClass("glyphicon-ok");
			$("#pwmatch").addClass("glyphicon-remove");
			$("#pwmatch").css("color","#FF0004");
		}
	});
	
	