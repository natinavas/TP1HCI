	//clearAddresses();
	
	personalInformation();
	showAddresses();
	showCards();
	
	

	
	document.getElementById("agregarDir").addEventListener("click", function() {
		addAddress(); 
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
			
			swal({   title: "Las contraseñas no coinciden.",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else if( newPass1 == null || newPass1 == "" || newPass1.length < 8 || newPass1.length >15){
		swal({   title: "Ingrese su nueva contraseña, recuerde que tiene que tener entre 8 y 15 caracteres",
		type: "error",
		confirmButtonText: "Cerrar"
	});
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
				show_error(error);
			}
		});
			
	}
		
	/*var request = new Object();
	request.url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=ChangePassword&username=" + changePassUser + "&password=" + password + "&new_password=" + newPassword1;
	request.dataType="jsonp";*/
	}

	function show_error(error) {
	if(error.code == 101){
		swal({title: "El usuario es inválido y/o la contraseña no coincide con la del usuario.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 2){
		swal({title: "Se requiere un nombre de usuario.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 3){
		swal({title: "Se requiere la actual contraseña del usuario la cual no fue suministrada.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 5){
		swal({title: "Se requiere la nueva contraseña del usuario la cual no fue suministrada.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 104){
		swal({title: "El nombre de usuario es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 105){
		swal({ title: "La contraseña del usuario (actual o nueva) es inválida.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 999){
		swal({title: "Se produjo un error inesperado procesando la solicitud.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 9){
		swal({title: "Se requieren los datos de la dirección de envío.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 114){
		swal({title: "Los datos de la dirección de envío son inválidos.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 115){
		swal({title: "El nombre es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 116){
		swal({title: "El nombre de la calle es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 117){
		swal({title: "La altura de la calle es inválida.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 118){
		swal({title: "El piso es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 119){
		swal({title: "La puerta es inválida.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 120){
		swal({title: "La provincia es inválida.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 121){
		swal({title: "La ciudad es inválida.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 122){
		swal({title: "El código postal es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 123){
		swal({title: "El número de teléfono es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 202){
		swal({title: "El nombre ya se encuentra en uso.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 13){
		swal({title: "Se requieren los datos de la tarjeta de crédito.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 102){
		swal({title: "El token de autenticación es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code== 134){
		swal({title: "Los datos de la tarjeta de crédito son inválidos.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 135){
		swal({title: "El número es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 136){
		swal({title: "La fecha de expiración es inválida.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 137){
		swal({title: "El código de seguridad es inválido.",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if(error.code == 203){
		swal({title: "El número ya se encuentra en uso",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}
	
	
	
	
	
	else{
	swal({title: error.message,
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}
	
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
	
	//alert("new address:" + JSON.stringify(newAddress));
	
	var user = JSON.parse(sessionStorage.getItem("loggedUser"));
	
	var request=new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + user.account.username + "&authentication_token=" + user.authenticationToken + "&address=" + JSON.stringify(newAddress);
	request.dataType = "jsonp";
	
	$.ajax(request).done(function(data) {
	error=data.error;
	console.log("data: " + JSON.stringify(data));
			
	if(error==undefined){
		location.reload();
				
	}else{
		show_error(error);
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
		show_error(error);
	}
	});
		
	}
	
	function showCards(){
		
	var user = JSON.parse(sessionStorage.getItem("loggedUser"));

	var request= new Object();
	request.url ="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAllCreditCards&username="+user.account.username +"&authentication_token="+user.authenticationToken+"&page_size=" + 10;
	request.dataType = "jsonp";
	//alert(request.url);
		
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
		show_error(error);
	}
		
	});
		
		
	}
	
	function editPersonalInfo(){
		
	var user = JSON.parse(sessionStorage.getItem("loggedUser"));
		
	var firstName = document.getElementById("nuevoNombre").value;
	if( !validateName(firstName)){
	swal({   title: "Usted ha ingresado un nombre inválido",
	type: "error",
	confirmButtonText: "Cerrar"
	});
	}else{
			
	var lastName = document.getElementById("nuevoApellido").value;
	if( !validateName (lastName)){
		swal({   title: "Usted ha ingresado un apellido inválido",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else{
				
		var email = document.getElementById("nuevoEmail").value;
		if( !validateEmail( email)){
			swal({   title: "Usted ha ingresado un email inválido",
			type: "error",
			confirmButtonText: "Cerrar"
		});
	}else{
					
		var brthDate = new Date(document.getElementById("nuevaFecha").value);
		var validDate = new Date("1999-01-01");
		if(brthDate > validDate){
			swal({   title: "Fecha inválida, se deben tener al menos 16 años para estar registrado en esta página",
			type: "error",
			confirmButtonText: "Cerrar"
		});
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
				swal({   title: "Sus cambios han sido guardados.",
				type: "error",
				confirmButtonText: "Cerrar"
			});
			location.reload();
		}else{
			show_error(error);
		}
	});
	}
	}
	}
	}
		
	}

	function addCard(){
		
	if (document.getElementById('amex').checked) {
	//alert("la tarj es amex");
	if(!validateAmex()){
	//alert("la tarjeta es amex");
	swal({   title: "Por favor ingrese información válida",
	type: "error",
	confirmButtonText: "Cerrar"
	});
	}
	}else if(document.getElementById('diners').checked){
	if(!validateDiners()){
	//alert("la tarjeta es diners");
	swal({   title: "Por favor ingrese información válida",
	type: "error",
	confirmButtonText: "Cerrar"
	});
	}
	}else if(document.getElementById('master').checked){
	if(!validateMaster()){
	//alert("la tarjeta es master");
	swal({   title: "Por favor ingrese información válida",
	type: "error",
	confirmButtonText: "Cerrar"
	});
	}
	}else if(document.getElementById('visa').checked){
	if(!validateVisa()){
	//alert("la tarjeta es visa");
	swal({   title: "Por favor ingrese información válida",
	type: "error",
	confirmButtonText: "Cerrar"
	});
	}
	}else{
	swal({   title: "Por favor ingrese información válida",
	type: "error",
	confirmButtonText: "Cerrar"
	});
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
	show_error(error);
	}
		
	});
	}
	
	function validateMaster(){
	var numTarjeta = document.getElementById("numeroTarjeta").value;
	var numSeguridad = document.getElementById("secCode").value;
		
	var regSecCode = /^[0-9]{3}$/;
	var regTar = /5[1-4][0-9]{14}$/;
		
	//alert(regSecCode.test(numSeguridad) && regTar.test(numTarjeta));
	return regSecCode.test(numSeguridad) && regTar.test(numTarjeta);
		
	}
	
	function validateVisa(){
	var numTarjeta = document.getElementById("numeroTarjeta").value;
	var numSeguridad = document.getElementById("secCode").value;
		
	var regSecCode = /^[0-9]{3}$/;
	var regTar1 = /4[0-9]{12}$/;
	var regTar2 = /4[0-9]{15}$/;
		
	//alert(regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| reTar2.test(numTarjeta)));
	return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| reTar2.test(numTarjeta));
		
	}
	
	function validateDiners(){
		
	var numTarjeta = document.getElementById("numeroTarjeta").value;
	var numSeguridad = document.getElementById("secCode").value;
		
	var regSecCode = /^[0-9]{3}$/;
	var regTar = /36[0-9]{14}$/;
		
	//alert(regSecCode.test(numSeguridad) && regTar.test(numTarjeta));
	return regSecCode.test(numSeguridad) && regTar.test(numTarjeta);
		
	}
	
	function validateAmex(){
		
	var numTarjeta = document.getElementById("numeroTarjeta").value;
	var numSeguridad = document.getElementById("secCode").value;
		
	var regSecCode = /^[0-9]{3}$/;
	var regTar1 = /34[0-9]{13}$/;
	var regTar2 = /37[0-9]{13}$/;
		
	//alert(regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta)));
	return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta));
		
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
	
	