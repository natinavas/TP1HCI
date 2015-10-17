	//clearAddresses();
	
	personalInformation();
	showAddresses();
	showCards();
	
	

	
	document.getElementById("agregarDir").addEventListener("click", function() {
		//alert(JSON.stringify(document.getElementById("nombreD")));
		addAddress(); 
		//clearAddresses();
		//showAddresses();
	});
	
	document.getElementById("changePass").addEventListener("click", function(){
		changePassword();
	});
	
	document.getElementById("agregarTarjeta").addEventListener("click", function(){
		addCard();
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
	
		$("#userInfo").append(information);
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
		var newAddress= {
			name: document.getElementById("nombreD").value,
			street: document.getElementById("calleD").value,
			number: document.getElementById("numeroD").value,
			province: document.getElementById("provinciaD").value,
			//	city: document.getElementById("provinciaD").value,
			zipCode: document.getElementById("cpD").value,
			phoneNumber: document.getElementById("telD").value
		};
	
		alert("new address:" + JSON.stringify(newAddress));
	
		var user = JSON.parse(sessionStorage.getItem("loggedUser"));
	
		var request=new Object();
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + user.account.username + "&authentication_token=" + user.authenticationToken + "&address=" + JSON.stringify(newAddress);
		request.dataType = "jsonp";
	
		$.ajax(request).done(function(data) {
			error=data.error;
			console.log("data: " + JSON.stringify(data));
			
			if(error==undefined){
				
				var adr = JSON.parse(localStorage.getItem("adr"));
				alert(JSON.stringify(adr));
				if(adr == undefined || adr == null){
					var adr = [JSON.stringify(data)];
				}else{
					alert(JSON.stringify(data));
					adr.push(JSON.stringify(data));
				}
				
				localStorage.setItem("adr", JSON.stringify(adr));
				location.reload();
				
			}else{
				showError(error);
			}
		});
	}
	
	function showAddresses(){
		var user= JSON.parse(sessionStorage.getItem("loggedUser"));
		
		var request = new Object();
		request.url= "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAllAddresses&username=" + user.account.username + "&authentication_token=" + 				user.authenticationToken + "&page_size=" + 20; 
		request.dataType = "jsonp";
		console.log(request.url);
		
		$.ajax(request).done(function(data){
			error = data.error;
			
			if(error == undefined){
				var i;
				var ret= '';
				adr = data.addresses;
				//alert(JSON.stringify(adr[0]));
				for (i=0; adr[i] != undefined && adr[i] != null; i++){
					
					var miDir = adr[i];
					ret += '<div id= addres' + i + '><h3> Dirección ' + (i+1) + ':</h3><h4>' + miDir.name
					+ '</h4><h5>' + miDir.street + ' ' + miDir.number
					+ '</h5><h5> Provincia: ' + miDir.province + '</h5><h5> Código Postal: ' 
					+ miDir.zipCode
					+ '</h5> <h5> Número de Telefono: ' + miDir.phoneNumber + '</h5></div><br/> <br/>';
				}
				$("#direcciones").append(ret);
				
			}else{
				showError(error);
			}
		});
		
	}
	
	function showCards(){
		
		var user = JSON.parse(sessionStorage.getItem("loggedUser"));
		alert(user.authenticationToken);
		var request= new Object();
		request.url ="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAllCreditCards&username="+user.account.username +"&authentication_token="+user.authenticationToken+"&page_size=" + 10;
		request.dataType = "jsonp";
		alert(request.url);
		
		$.ajax(request).done(function(data) {
			error = data.error;
			
			if(error == undefined){
				console.log("my cards are: " + JSON.stringify(data));
				var cards = data.creditCards;
				var i;
				var ret= ' ';
				for(i=0; cards[i] != undefined; i++){
					ret+= '<h3>Tarjeta ' + (i+1) + ': ' + '</h3><h5>Numero: '+ cards[i].number+'</h5><h5>Fecha de Vencimiento: '+cards[i].expirationDate+'</h5><br/>';
				}
				$("#tarjetas").append(ret);
			}else{
				showError(error);
			}
		
		});
		
		
	}
	
	function editPersonalInfo(){
		
		var user = JSON.parse(sessionStorage.getItem("loggedUser"));
		
		var firstName = document.getElementById("nuevoNombre").value;
		if( !validateName(firstName)){
			alert("Usted ha ingresado un nombre inválido");
		}else{
			
			var lastName = document.getElementById("nuevoApellido").value;
			if( !validateName (lastName)){
				alert("Usted ha ingresado un apellido inválido");
			}else{
				
				var email = document.getElementById("nuevoEmail").value;
				if( !validateEmail( email)){
					alert("Usted ha ingresado un email inválido");
				}else{
					
					var brthDate = new Date(document.getElementById("nuevaFecha").value);
					var validDate = new Date("1999-01-01");
					if(brthDate > validDate){
						alert("Fecha inválida, se deben tener al menos 16 años para estar registrado en esta página");
					}else{
		
		
						var account ={
							firstName: firstName,
							lastName: lastName,
							gender: user.account.gender,
							identityCard: user.account.identityCard,
							email: email,
							birthDate: brthDate
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
				}
			}
		}
		
	}

	function addCard(){
		
		if (document.getElementById('amex').checked) {
			alert("la tarj es amex");
			if(!validateAmex()){
				alert("la tarjeta es amex");
				alert("Por favor ingrese información válida");
			}
		}else if(document.getElementById('diners').checked){
			if(!validateDiners()){
				alert("la tarjeta es diners");
				alert("Por favor ingrese información válida");
			}
		}else if(document.getElementById('master').checked){
			if(!validateMaster()){
				alert("la tarjeta es master");
				alert("Por favor ingrese información válida");
			}
		}else if(document.getElementById('visa').checked){
			if(!validateVisa()){
				alert("la tarjeta es visa");
				alert("Por favor ingrese información válida");
			}
		}else{
			alert("Por favor seleccione su tipo de tarjeta");
		}
		
		
		var user = JSON.parse(sessionStorage.getItem("loggedUser"));
		var tarjeta = {
			number : document.getElementById("numeroTarjeta").value,
			expirationDate: "0216",
			securityCode: document.getElementById("secCode").value
		};
		
		
		var request = new Object();
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateCreditCard&username=" + user.account.username + "&authentication_token=" + user.authenticationToken + "&credit_card="+JSON.stringify(tarjeta);
		request.dataType = "jsonp";
		console.log(request.url);
		$.ajax(request).done(function(data) {
			error = data.error;
			
			if(error == undefined){
				window.location.reload();
			}else{
				showError(error);
			}
		
		});
	}
	
	function validateMaster(){
		var numTarjeta = document.getElementById("numeroTarjeta").value;
		var numSeguridad = document.getElementById("secCode").value;
		
		var regSecCode = /^[0-9]{3}$/;
		var regTar = /5[1-4][0-9]{14}$/;
		
		alert(regSecCode.test(numSeguridad) && regTar.test(numTarjeta));
		return regSecCode.test(numSeguridad) && regTar.test(numTarjeta);
		
	}
	
	function validateVisa(){
		var numTarjeta = document.getElementById("numeroTarjeta").value;
		var numSeguridad = document.getElementById("secCode").value;
		
		var regSecCode = /^[0-9]{3}$/;
		var regTar1 = /4[0-9]{12}$/;
		var regTar2 = /4[0-9]{15}$/;
		
		alert(regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| reTar2.test(numTarjeta)));
		return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| reTar2.test(numTarjeta));
		
	}
	
	function validateDiners(){
		
		var numTarjeta = document.getElementById("numeroTarjeta").value;
		var numSeguridad = document.getElementById("secCode").value;
		
		var regSecCode = /^[0-9]{3}$/;
		var regTar = /36[0-9]{14}$/;
		
		alert(regSecCode.test(numSeguridad) && regTar.test(numTarjeta));
		return regSecCode.test(numSeguridad) && regTar.test(numTarjeta);
		
	}
	
	function validateAmex(){
		
		var numTarjeta = document.getElementById("numeroTarjeta").value;
		var numSeguridad = document.getElementById("secCode").value;
		
		var regSecCode = /^[0-9]{3}$/;
		var regTar1 = /34[0-9]{13}$/;
		var regTar2 = /37[0-9]{13}$/;
		
		alert(regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta)));
		return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta));
		
	}
	
	$("input[type=password]").keyup(function(){
	
		if($("#password1").val().length >= 8){
			$("#8char").removeClass("glyphicon-remove");
			$("#8char").addClass("glyphicon-ok");
			$("#8char").css("color","#00A41E");
		}else{ß
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
	
	