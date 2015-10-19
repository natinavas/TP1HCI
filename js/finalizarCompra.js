$(document).ready(function () {
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
			//alert("new address:" + JSON.stringify(newAddress));
	
			var user = JSON.parse(sessionStorage.getItem("loggedUser"));
			var request=new Object();
			request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + user.account.username + "&authentication_token=" + user.authenticationToken + "&address=" + JSON.stringify(newAddress);
			request.dataType = "jsonp";
			$.ajax(request).done(function(data) { //funcion de agregar nueva direccion
				
				error=data.error;
				//console.log("data: " + JSON.stringify(data));
			
				if(error==undefined){
					
                   var s = '';
				   alert(JSON.stringify(data));
				   alert(JSON.stringify(data.address));
                    s += '<br/>' + data.address.name
                    + '<br/>' + data.address.street + ' ' + data.address.number
                    + '<br/>Código Postal : ' + data.address.zipCode;

                    document.getElementById("receptor").innerHTML = s;
					
					
					
					alert("primer request");
	                var request2 = new Object();
	                request2.timeout = 7000;
	                request2.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=ChangeOrderAddress&username=" + username + "&authentication_token=" + authenticationToken + "&order=" + JSON.stringify(newAddress);
	                request2.dataType="jsonp";
	                //console.log(request.url);
	                
					alert("antes del segundo request");
					$.ajax(request2).done( function(data) {
	                   // alert(JSON.stringify(data));
					   alert("despues del segunod requiest");

					  
						alert("funcionaria");
	                    var $active = $('.wizard .nav-tabs li.active');
	                    $active.next().removeClass('disabled');
	                    nextTab($active);
						alert("asdfasdf");
						return;


	                }).fail(function (jqXHR, textStatus, errorThrown) {
	                    swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
	                        type: "error",
	                        confirmButtonText: "Cerrar"
	                    });
	                });
				
				
				}else{
					showError(error);
				}
				});
			
			}
	

		else{
        var addresses = JSON.parse(sessionStorage.getItem("addresses"));


        for(var i = 0; addresses != undefined && addresses[i] != undefined; i++){

            if(document.getElementById("dir" + JSON.parse(addresses[i]).id).checked){
				selected=true;

                var selectedAdress = JSON.parse(addresses[i]);

                //alert(addresses[i] + " esta checked");
                var user = JSON.parse(sessionStorage.getItem("loggedUser"));

                var username = user.account.username;

                var authenticationToken = user.authenticationToken;


                var orderId = parseInt(sessionStorage.getItem("orderId"));


                //alert(orderId);

               // alert( "dir id : " + addresses[i].split("dir")[1]);

                var adr = new Object();
                adr.id = orderId;
                var address = new Object();
                address.id = parseInt(JSON.parse(addresses[i]).id);
                adr.address = address;

                sessionStorage.setItem("address", JSON.stringify(address));

                var request = new Object();
                request.timeout = 7000;
                request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=ChangeOrderAddress&username=" + username + "&authentication_token=" + authenticationToken + "&order=" + JSON.stringify(adr);


                request.dataType="jsonp";
                console.log(request.url);
                $.ajax(request).done( function(data) {
                   // alert(JSON.stringify(data));


                    var s = '';

                    s += '<br/>' + selectedAdress.name
                    + '<br/>' + selectedAdress.street + ' ' + selectedAdress.number
                    + '<br/>Código Postal : ' + selectedAdress.zipCode;

                    document.getElementById("receptor").innerHTML = s;


                    var $active = $('.wizard .nav-tabs li.active');
                    $active.next().removeClass('disabled');
                    nextTab($active);


                }).fail(function (jqXHR, textStatus, errorThrown) {
                    swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
                        type: "error",
                        confirmButtonText: "Cerrar"
                    });
                });



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
        var finalOrder = JSON.parse(sessionStorage.getItem("finalOrder"));

        var user = JSON.parse(sessionStorage.getItem("loggedUser"));

        var username = user.account.username;

        var authenticationToken = user.authenticationToken;


         var request = new Object();
        request.timeout = 7000;
        request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=ConfirmOrder&username=" + username + "&authentication_token=" + authenticationToken + "&order=" + JSON.stringify(finalOrder);


        //alert(JSON.stringify(finalOrder));

        request.dataType="jsonp";
        console.log(request.url);
        $.ajax(request).done( function(data) {

            //alert(JSON.stringify(data));

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

    });


    $("#second-step").click(function (e) {
		
		var checked = false;


		
		if(document.getElementById('nuevaTarjeta2').checked){
			checked = true;
			
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
			swal({   title: "Por favor elija su tipo de tarjeta",
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
			
            var s = '';

            var num = '';

            for(var j = 0; j < tarjeta.number.length - 4; j++){
                num += '*';
            }
			alert("jiopajsdiofasdf2");
            num += tarjeta.number.substring(tarjeta.number.length - 4, tarjeta.number.length);

            s += '<br/>Tarjeta ' + (i + 1)
            + '<br/>' + num
            + '<br/>Fecha de vencimiento: ' + tarjeta.expirationDate.substring(0,2) + '/' + tarjeta.expirationDate.substring(2,4);
			
			alert("jiopajsdiofasdf");
            document.getElementById("metodoPago").innerHTML = s;
			
			
			
	        var orderId = parseInt(sessionStorage.getItem("orderId"));
	        var address = JSON.parse(sessionStorage.getItem("address"));
	            //alert(addresses);

	        var finalOrder = new Object();
	        finalOrder.id = orderId;
	        finalOrder.address = address;
			
			
            var creditCard = new Object();
            creditCard.id = tarjeta.id;
            finalOrder.creditCard = creditCard;





            sessionStorage.setItem("finalOrder", JSON.stringify(finalOrder));

            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
			alert("jiopajsdiofasdf3");
			$.ajax(request).done(function(data) {
				error = data.error;
				if(error == undefined){ //agrego la tarjeta a la orden

                   


                    return;
					
					
					
					
				}else{
					show_error(error);
					alert(error.code);
				}
			});
			
			
		}else{
		
		
        var creditCards = JSON.parse(sessionStorage.getItem("creditCards"));


        var orderId = parseInt(sessionStorage.getItem("orderId"));
        var address = JSON.parse(sessionStorage.getItem("address"));
            //alert(addresses);

        var finalOrder = new Object();
        finalOrder.id = orderId;
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

                    //alert(addresses[i] + " esta checked");

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



    document.getElementById("total").innerHTML = sessionStorage.getItem("total")

    showAddresses();

    var user = JSON.parse(sessionStorage.getItem("loggedUser"));

    var username = user.account.username;

    var authenticationToken = user.authenticationToken;

    var s = '';

    s += '<br/>' + user.account.firstName + ' ' + user.account.lastName
    + '<br/>' + user.account.email;

    $("#cliente").append(s);



    var request = new Object();
    request.timeout = 7000;
    request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=CreateOrder&username=" + username  + "&authentication_token=" + authenticationToken;


    request.dataType="jsonp";
    console.log(request.url);
    $.ajax(request).done( function(data) {
       // alert("cree la orden");
       // alert(JSON.stringify(data));

        sessionStorage.setItem("orderId", JSON.stringify(data.order.id));

        document.getElementById("date").innerHTML = '<br/>' + data.order.receivedDate.toString();
        document.getElementById("pedido").innerHTML = 'Pedido # ' + data.order.id;
        var carrito = JSON.parse(localStorage.getItem("carrito"));


        for(var i = 0; carrito != undefined && carrito[i] != undefined; i++){
           // alert("elemento de carrito: " + carrito[i]);
            addItemToCart(data, JSON.parse(carrito[i]));
            loadProduct(JSON.parse(carrito[i]));
        }


        document.getElementById("subtotal").innerHTML += sessionStorage.getItem("subtotal");
        document.getElementById("costoEnvio").innerHTML += sessionStorage.getItem("costoEnvio");
        document.getElementById("totalPrecio").innerHTML += sessionStorage.getItem("total");



    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });


    request= new Object();
    request.url ="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAllCreditCards&username="+user.account.username +"&authentication_token="+user.authenticationToken+"&page_size=" + 10;
    request.dataType = "jsonp";
    console.log(request.url);
  //  alert(request.url);

    
    $.ajax(request).done(function(data) {
        error = data.error;
		
        if(error == undefined){


            var myCards = data.creditCards;

            var ret = "";

            var creditCards = [];

            if(myCards[0] == undefined){
                ret += '<h5>Su cuenta no tiene tarjetas de crédito registradas</h5><br/>'
                    + '<h5>Para añadir una diríjase a Mi Cuenta -> Mi Usuario ->  '
                    + '<span class="glyphicon glyphicon-credit-card"  style="color:black"></span>'
                    + '  -> Agregar Nueva Tarjeta<h5/>';
            }

            else{
                for(i=0; myCards[i] != undefined; i++){
                    ret +='<label class="radio-inline"><input type="radio" id="card' + myCards[i].id + '" name="optradio"></input>';
                    ret +='<h3> Tarjeta ' + (i+1) + ':</h3><h4>' + myCards[i].number
                        + '</h4>'
                        + '<h4> Vencimiento: ' + myCards[i].expirationDate
                        + '</h4></label>';

                    creditCards.push(JSON.stringify(myCards[i]));

                }
            }
            document.getElementById("medioPago").innerHTML += ret;
            sessionStorage.setItem("creditCards", JSON.stringify(creditCards));
        }else{
            showError(error);
        }
    
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal({   title: "Ha ocurrido un error con la conexión. Por favor inténtelo luego",
            type: "error",
            confirmButtonText: "Cerrar"
        });
    });



});


function showAddresses(){
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

                if(adr[0] == undefined){
                    ret += '<h5>Debe agregar direcciones de envío a su cuenta para continuar</h5><br/>'
                    + '<h5>Diríjase a Mi Cuenta -> Mi Usuario ->  '
                    + '<span class="glyphicon glyphicon-home"  style="color:black"></span>'
                    + '  -> Agregar Nueva Dirección<h5/>';
                }


                //alert(JSON.stringify(adr[0]));
                for (i=0; adr[i] != undefined && adr[i] != null; i++){

                    var miDir = adr[i];



                addresses.push(JSON.stringify(miDir));
                    
                    ret += '<label class="radio-inline"><input type="radio" id="dir' + miDir.id + '" name="optradio">'
                    + '<div id= addres' + i + '><h3> Direccion ' + (i+1) + ':</h3><h4>' + miDir.name
                    + '</h4><h5>' + miDir.street + ' ' + miDir.number
                    + '</h5><h5> Provincia: ' + miDir.province + '</h5><h5> Código Postal: ' 
                    + miDir.zipCode
					+ '</h5><h5> Numero de Telefono: ' + miDir.phoneNumber + '</h5></div></label>';
                }
                $("#direcciones").append(ret);

            
            }else{
                showError(error);
            }
            sessionStorage.setItem("addresses", JSON.stringify(addresses));
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

    //alert("prod :" + JSON.stringify(prod));


    request = new Object();
    request.timeout = 7000;
    request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=AddItemToOrder&username=" + username + "&authentication_token=" + authenticationToken + "&order_item=" + JSON.stringify(prod);


    request.dataType="jsonp";
    console.log(request.url);


    $.ajax(request).done( function(data) {
       // alert(JSON.stringify(data.orderItem));
       // alert("cantidad : " + JSON.stringify(data.orderItem.quantity));
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
    + '<td class="text-center">' + product.price + '</td>'
    + '<td class="text-center">' + product.quantity + '</td>'
    + '<td class="text-right">' + (product.price * product.quantity) + '</td>'
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
return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta));
	
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
	
var regSecCode = /^[0-9]{4}$/;
var regTar1 = /34[0-9]{13}$/;
var regTar2 = /37[0-9]{13}$/;
	
//alert(regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta)));
return regSecCode.test(numSeguridad) && (regTar1.test(numTarjeta)|| regTar2.test(numTarjeta));
	
}