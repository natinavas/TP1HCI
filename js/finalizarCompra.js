		$(document).ready(function () {

			if(localStorage.getItem("carrito") == undefined){
				document.getElementById("compra").innerHTML = '<h3>SU CARRITO ESTA VACIO</h3>'
				+ '<br/>'
				+ '<h3>PARA FINALIZAR SU COMPRA AÑADA PRODUCTOS AL CARRITO</h3>';
				return;
			}
			//Initialize tooltips
			$('.nav-tabs > li a[title]').tooltip();
    
			//Wizard
			$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

				var $target = $(e.target);
    
				if ($target.parent().hasClass('disabled')) {
					return false;
				}
			});


			$('#firstStep').click(function (e) {
				var selected = false;
		
				if(document.getElementById("nuevaDireccion").checked){
			
					selected = true;
					var newAddress= {
						name: document.getElementById("nombreD").value,
						street: document.getElementById("calleD").value,
						number: document.getElementById("numeroD").value,
						province: document.getElementById("provinciaD").value,
						//	city: document.getElementById("provinciaD").value,
						zipCode: document.getElementById("cpD").value,
						phoneNumber: document.getElementById("telD").value
					};
	
					var user = JSON.parse(sessionStorage.getItem("loggedUser"));
					var request=new Object();
					request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + user.account.username + "&authentication_token=" + user.authenticationToken + "&address=" + JSON.stringify(newAddress);
					request.dataType = "jsonp";


					$.ajax(request).done(function(data) { //funcion de agregar nueva direccion

				
						error=data.error;
						//console.log("data: " + JSON.stringify(data));
			
						if(error==undefined){


							var address = new Object();
							address.id = parseInt(data.address.id);

							sessionStorage.setItem("address", JSON.stringify(address));

					
							var s = '';
							s += '<br/>' + data.address.name
							+ '<br/>' + data.address.street + ' ' + data.address.number
							+ '<br/>Código Postal : ' + data.address.zipCode;

							document.getElementById("receptor").innerHTML = s;

							var $active = $('.wizard .nav-tabs li.active');
							$active.next().removeClass('disabled');
							nextTab($active);
							return;
				
				
					}else{
						show_error(error);
					}
				});
			
			}
	

			else{
				var addresses = JSON.parse(sessionStorage.getItem("addresses"));


				for(var i = 0; addresses != undefined && addresses[i] != undefined; i++){

					if(document.getElementById("dir" + JSON.parse(addresses[i]).id).checked){
						selected=true;

						var selectedAdress = JSON.parse(addresses[i]);

						var user = JSON.parse(sessionStorage.getItem("loggedUser"));

						var username = user.account.username;

						var authenticationToken = user.authenticationToken;




						var address = new Object();
						address.id = parseInt(JSON.parse(addresses[i]).id);

						sessionStorage.setItem("address", JSON.stringify(address));

							var s = '';

							s += '<br/>' + selectedAdress.name
							+ '<br/>' + selectedAdress.street + ' ' + selectedAdress.number
							+ '<br/>Código Postal : ' + selectedAdress.zipCode;

							document.getElementById("receptor").innerHTML = s;


							var $active = $('.wizard .nav-tabs li.active');
							$active.next().removeClass('disabled');
							nextTab($active);



					return;


				}
			
			}
		}
		
		if(!selected){
			swal({   title: "Error!",
			text: "Debe seleccionar una opción",
			type: "error",
			confirmButtonText: "Cerrrar"
		});
		}
       

		});



		$("#last-step").click(function (e) {





		var user = JSON.parse(sessionStorage.getItem("loggedUser"));

		var username = user.account.username;

		var authenticationToken = user.authenticationToken;

		var request = new Object();
		request.timeout = 7000;
		request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=CreateOrder&username=" + username  + "&authentication_token=" + authenticationToken;


		request.dataType="jsonp";
		console.log(request.url);
		$.ajax(request).done( function(data) {

		finalOrder = JSON.parse(sessionStorage.getItem("finalOrder"));




		finalOrder.id = data.order.id;

		sessionStorage.setItem("finalOrder", finalOrder);

		var carrito = JSON.parse(localStorage.getItem("carrito"));


		for(var i = 0; carrito != undefined && carrito[i] != undefined; i++){
		addItemToCart(data, JSON.parse(carrito[i]));
		}


		confirmOrder(finalOrder);


		}).fail(function (jqXHR, textStatus, errorThrown) {
		swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
		type: "error",
		confirmButtonText: "Cerrar"
		});
		});











		});





		$("#second-step").click(function (e) {
		
		var checked = false;


		
		if(document.getElementById('nuevaTarjeta2').checked){
		checked = true;
			
		if (document.getElementById('amex').checked) {

			if(!validateAmex()){
				swal({   title: "Por favor ingrese información válida",
				type: "error",
				confirmButtonText: "Cerrar"
			});
		}
		}else if(document.getElementById('diners').checked){
			if(!validateDiners()){
				swal({   title: "Por favor ingrese información válida",
				type: "error",
				confirmButtonText: "Cerrar"
			});
		}
		}else if(document.getElementById('master').checked){
			if(!validateMaster()){
				swal({   title: "Por favor ingrese información válida",
				type: "error",
				confirmButtonText: "Cerrar"
			});
		}
		}else if(document.getElementById('visa').checked){
			if(!validateVisa()){
				swal({   title: "Por favor ingrese información válida",
				type: "error",
				confirmButtonText: "Cerrar"
			});
		}
		}else{
			swal({   title: "Por favor elija su tipo de tarjeta",
			type: "error",
			confirmButtonText: "Cerrar"
		});
		}




		
		
		
		var user = JSON.parse(sessionStorage.getItem("loggedUser"));
		var tarjeta = {
		number : document.getElementById("numeroTarjeta").value,
		expirationDate: document.getElementById("mesTarjeta").value + document.getElementById("anoTarjeta").value,
		securityCode: document.getElementById("secCode").value
		};
		
		
		var request = new Object();
		request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateCreditCard&username=" + user.account.username + "&authentication_token=" + user.authenticationToken + "&credit_card="+JSON.stringify(tarjeta);
		request.dataType = "jsonp";
		console.log(request.url);
		$.ajax(request).done(function(data) {
		error = data.error;
		if(error == undefined){ //agrego la tarjeta a la orden



			
		var s = '';

		var num = '';

		for(var j = 0; j < tarjeta.number.length - 4; j++){
		num += '*';
		}
		num += tarjeta.number.substring(tarjeta.number.length - 4, tarjeta.number.length);

		s += '<br/>Tarjeta Nueva'
		+ '<br/>' + num
		+ '<br/>Fecha de vencimiento: ' + tarjeta.expirationDate.substring(0,2) + '/' + tarjeta.expirationDate.substring(2,4);
			
		document.getElementById("metodoPago").innerHTML = s;
			
			
			
		var address = JSON.parse(sessionStorage.getItem("address"));

		var finalOrder = new Object();
		finalOrder.address = address;
			
			
		var creditCard = new Object();
		creditCard.id = data.creditCard.id;
		finalOrder.creditCard = creditCard;





		sessionStorage.setItem("finalOrder", JSON.stringify(finalOrder));



		var $active = $('.wizard .nav-tabs li.active');
		$active.next().removeClass('disabled');
		nextTab($active);


			return;
					
					
					
					
		}else{
			show_error(error);
		}
		});
			
			
		}else{
		
		
		var creditCards = JSON.parse(sessionStorage.getItem("creditCards"));


		var address = JSON.parse(sessionStorage.getItem("address"));

		var finalOrder = new Object();
		finalOrder.address = address;

		if(document.getElementById("efectivo").checked){

			document.getElementById("metodoPago").innerHTML = '<br/>EFECTIVO';

			sessionStorage.setItem("finalOrder", JSON.stringify(finalOrder));

			var $active = $('.wizard .nav-tabs li.active');
			$active.next().removeClass('disabled');
			nextTab($active);
			return;
		}
		else{
			for(var i = 0; creditCards != undefined && creditCards[i] != undefined; i++){
				if(document.getElementById("card" + JSON.parse(creditCards[i]).id).checked){
					checked = true;

					var selectedCard = JSON.parse(creditCards[i]);

					var s = '';

					var num = '';

					for(var j = 0; j < selectedCard.number.length - 4; j++){
						num += '*';
					}

					num += selectedCard.number.substring(selectedCard.number.length - 4, selectedCard.number.length);

					s += '<br/>Tarjeta ' + (i + 1)
					+ '<br/>' + num
					+ '<br/>Fecha de vencimiento: ' + selectedCard.expirationDate.substring(0,2) + '/' + selectedCard.expirationDate.substring(2,4);

					document.getElementById("metodoPago").innerHTML = s;


					var creditCard = new Object();
					creditCard.id = JSON.parse(creditCards[i]).id;
					finalOrder.creditCard = creditCard;

					sessionStorage.setItem("finalOrder", JSON.stringify(finalOrder));

					var $active = $('.wizard .nav-tabs li.active');
					$active.next().removeClass('disabled');
					nextTab($active);


					return;

				}
			}
		}
		}
		if(!checked){
		swal({   title: "Error!",
		text: "Debe seleccionar una opción",
		type: "error",
		confirmButtonText: "Cerrrar"
		});
		}
       

		});

		$(".next-step").click(function (e) {
		var $active = $('.wizard .nav-tabs li.active');
		$active.next().removeClass('disabled');
		nextTab($active);
		});

		$(".prev-step").click(function (e) {

		var $active = $('.wizard .nav-tabs li.active');
		prevTab($active);

		});


		var carrito = JSON.parse(localStorage.getItem("carrito"));


		for(var i = 0; carrito != undefined && carrito[i] != undefined; i++){
		loadProduct(JSON.parse(carrito[i]));
		}


		document.getElementById("subtotal").innerHTML += sessionStorage.getItem("subtotal");
		document.getElementById("costoEnvio").innerHTML += sessionStorage.getItem("costoEnvio") + ".00";
		document.getElementById("totalPrecio").innerHTML += sessionStorage.getItem("total");



		document.getElementById("total").innerHTML = sessionStorage.getItem("total")

		showAddresses();

		var user = JSON.parse(sessionStorage.getItem("loggedUser"));

		var username = user.account.username;

		var authenticationToken = user.authenticationToken;

		var s = '';

		s += '<br/>' + user.account.firstName + ' ' + user.account.lastName
		+ '<br/>' + user.account.email;

		$("#cliente").append(s);






		request= new Object();
		request.url ="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAllCreditCards&username="+user.account.username +"&authentication_token="+user.authenticationToken+"&page_size=" + 10;
		request.dataType = "jsonp";
		console.log(request.url);

    
		$.ajax(request).done(function(data) {
		error = data.error;
		
		if(error == undefined){


		var myCards = data.creditCards;

		var ret = "";

		var creditCards = [];


		for(i=0; myCards != undefined && myCards[i] != undefined; i++){

			if(i % 6 == 0){
				ret += '<br/><br/>';
			}



			ret +='<label class="radio-inline"><input type="radio" id="card' + myCards[i].id + '" name="optradio"></input>';
			ret +='<h3> Tarjeta ' + (i+1) + ':</h3><h4>' + myCards[i].number
			+ '</h4>'
			+ '<h4> Vencimiento: ' + myCards[i].expirationDate
			+ '</h4></label>';

			creditCards.push(JSON.stringify(myCards[i]));

		}
		document.getElementById("medioPago").innerHTML += ret;
		sessionStorage.setItem("creditCards", JSON.stringify(creditCards));
		}else{
			show_error(error);
		}
    
		}).fail(function (jqXHR, textStatus, errorThrown) {
			swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
			type: "error",
			confirmButtonText: "Cerrar"
		});
		});



		});


		function showAddresses(){

		$("#direcciones").append('<center><img class="img-responsive" id="imagedir" src="img/loading.gif"></center>');

		var user= JSON.parse(sessionStorage.getItem("loggedUser"));

		var addresses = [];

        
		var request = new Object();
		request.url= "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAllAddresses&username=" + user.account.username + "&authentication_token=" +              user.authenticationToken + "&page_size=" + 20; 
		request.dataType = "jsonp";
		console.log(request.url);
        
		$.ajax(request).done(function(data){
		error = data.error;
            
		if(error == undefined){
		var i;
		var ret= '';
		adr = data.addresses;



		for (i=0; adr[i] != undefined && adr[i] != null; i++){

			if(i % 5 == 0){
				ret += '<br/><br/>';
			}

			var miDir = adr[i];



			addresses.push(JSON.stringify(miDir));
                    
			ret += '<label class="radio-inline"><input type="radio" id="dir' + miDir.id + '" name="optradio">'
			+ '<div id= addres' + i + '><h3> Direccion ' + (i+1) + ':</h3><h4>' + miDir.name
			+ '</h4><h5>' + miDir.street + ' ' + miDir.number
			+ '</h5><h5> Provincia: ' + miDir.province + '</h5><h5> Código Postal: ' 
			+ miDir.zipCode
			+ '</h5><h5> Numero de Telefono: ' + miDir.phoneNumber + '</h5></div></label>';
		}
		$("#imagedir").remove();
		$("#direcciones").append(ret);

            
		}else{
			show_error(error);
		}
		sessionStorage.setItem("addresses", JSON.stringify(addresses));
		}).fail(function (jqXHR, textStatus, errorThrown) {
			swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
			type: "error",
			confirmButtonText: "Cerrar"
		});
		});
        
		}


function confirmOrder(finalOrder){




		var user = JSON.parse(sessionStorage.getItem("loggedUser"));

		var username = user.account.username;

		var authenticationToken = user.authenticationToken;


		var request = new Object();
		request.timeout = 7000;
		request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=ConfirmOrder&username=" + username + "&authentication_token=" + authenticationToken + "&order=" + JSON.stringify(finalOrder);



		request.dataType="jsonp";
		console.log(request.url);
		$.ajax(request).done( function(data) {





		var $active = $('.wizard .nav-tabs li.active');
		$active.next().removeClass('disabled');
		$active.prev().prev().addClass('disabled');
		$active.prev().addClass('disabled');
		$active.addClass('disabled');
		nextTab($active);
		localStorage.removeItem("carrito");
		}).fail(function (jqXHR, textStatus, errorThrown) {
			swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
			type: "error",
			confirmButtonText: "Cerrar"
		});
		});

	}


		function addItemToCart(orderData, item){


			var user = JSON.parse(sessionStorage.getItem("loggedUser"));

			var username = user.account.username;

			var authenticationToken = user.authenticationToken;

			var prod = new Object();
			var order = new Object();
			order.id = orderData.order.id;
			prod.order = order;
			var product = new Object();
			product.id = item.id;
			prod.product = product;
			prod.quantity = item.quantity;



			request = new Object();
			request.timeout = 7000;
			request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=AddItemToOrder&username=" + username + "&authentication_token=" + authenticationToken + "&order_item=" + JSON.stringify(prod);


			request.dataType="jsonp";
			console.log(request.url);


			$.ajax(request).done( function(data) {
			}).fail(function (jqXHR, textStatus, errorThrown) {
				swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
				type: "error",
				confirmButtonText: "Cerrar"
			});
			});

			}

			function loadProduct(product){

				var content = document.getElementById("products").innerHTML;

				var s = '<tr>'
				+ '<td>' + product.name + '</td>'
				+ '<td class="text-center">$' + product.price + '</td>'
				+ '<td class="text-center">' + product.quantity + '</td>'
				+ '<td class="text-right">$' + parseFloat(product.price * product.quantity).toFixed(2) + '</td>'
				+ '</tr>';

				document.getElementById("products").innerHTML = s + content;


			}

		function nextTab(elem) {
			$(elem).next().find('a[data-toggle="tab"]').click();
		}
		function prevTab(elem) {
			$(elem).prev().find('a[data-toggle="tab"]').click();
		}




		function validateMaster(){
			var numTarjeta = document.getElementById("numeroTarjeta").value;
			var numSeguridad = document.getElementById("secCode").value;
	
			var regSecCode = /^[0-9]{3}$/;
			var regTar = /5[1-4][0-9]{14}$/;
	
			return regSecCode.test(numSeguridad) && regTar.test(numTarjeta);
	
		}

		function validateVisa(){
				var numTarjeta = document.getElementById("numeroTarjeta").value;
				var numSeguridad = document.getElementById("secCode").value;
	
				var regSecCode = /^[0-9]{3}$/;
				var regTar1 = /4[0-9]{12}$/;
				var regTar2 = /4[0-9]{15}$/;
	
				return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta));
	
		}

		function validateDiners(){
	
			var numTarjeta = document.getElementById("numeroTarjeta").value;
			var numSeguridad = document.getElementById("secCode").value;
	
			var regSecCode = /^[0-9]{3}$/;
			var regTar = /36[0-9]{14}$/;
	
			return regSecCode.test(numSeguridad) && regTar.test(numTarjeta);
	
		}

		function validateAmex(){
	
			var numTarjeta = document.getElementById("numeroTarjeta").value;
			var numSeguridad = document.getElementById("secCode").value;
	
			var regSecCode = /^[0-9]{4}$/;
			var regTar1 = /34[0-9]{13}$/;
			var regTar2 = /37[0-9]{13}$/;
	
			return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta));
	
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


