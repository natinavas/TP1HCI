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



        var addresses = JSON.parse(sessionStorage.getItem("addresses"));


            //alert(addresses);



        for(var i = 0; addresses != undefined && addresses[i] != undefined; i++){

            if(document.getElementById(addresses[i]).checked){



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
                address.id = parseInt(addresses[i].split("dir")[1]);
                adr.address = address;

                sessionStorage.setItem("address", JSON.stringify(address));

                var request = new Object();
                request.timeout = 7000;
                request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=ChangeOrderAddress&username=" + username + "&authentication_token=" + authenticationToken + "&order=" + JSON.stringify(adr);


                request.dataType="jsonp";
                console.log(request.url);
                $.ajax(request).done( function(data) {
                   // alert(JSON.stringify(data));


                    var $active = $('.wizard .nav-tabs li.active');
                    $active.next().removeClass('disabled');
                    nextTab($active);


                });



                return;


            }
        }

        swal({   title: "Error!",
            text: "Debe seleccionar una opción",
            type: "error",
            confirmButtonText: "Cerrrar"
        });

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
        });

    });


    $("#second-step").click(function (e) {

        var creditCards = JSON.parse(sessionStorage.getItem("creditCards"));


        var orderId = parseInt(sessionStorage.getItem("orderId"));
        var address = JSON.parse(sessionStorage.getItem("address"));
            //alert(addresses);

        var finalOrder = new Object();
        finalOrder.id = orderId;
        finalOrder.address = address;

        if(document.getElementById("efectivo").checked){


            sessionStorage.setItem("finalOrder", JSON.stringify(finalOrder));

            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
            return;
        }
        else{

            for(var i = 0; creditCards != undefined && creditCards[i] != undefined; i++){
                if(document.getElementById("card" + creditCards[i]).checked){

                    //alert(addresses[i] + " esta checked");

                    var creditCard = new Object();
                    creditCard.id = creditCards[i];
                    finalOrder.creditCard = creditCard;

                    sessionStorage.setItem("finalOrder", JSON.stringify(finalOrder));

                    var $active = $('.wizard .nav-tabs li.active');
                    $active.next().removeClass('disabled');
                    nextTab($active);


                    return;

                }
            }
        }

        swal({   title: "Error!",
            text: "Debe seleccionar una opción",
            type: "error",
            confirmButtonText: "Cerrrar"
        });

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


    var total = JSON.parse(sessionStorage.getItem("total"));

    document.getElementById("total").innerHTML = "$" + total.value;

    showAddresses();

    var user = JSON.parse(sessionStorage.getItem("loggedUser"));

    var username = user.account.username;

    var authenticationToken = user.authenticationToken;


    var request = new Object();
    request.timeout = 7000;
    request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=CreateOrder&username=" + username  + "&authentication_token=" + authenticationToken;


    request.dataType="jsonp";
    console.log(request.url);
    $.ajax(request).done( function(data) {
       // alert("cree la orden");
       // alert(JSON.stringify(data));

        sessionStorage.setItem("orderId", JSON.stringify(data.order.id));

        var carrito = JSON.parse(localStorage.getItem("carrito"));


        for(var i = 0; carrito != undefined && carrito[i] != undefined; i++){
           // alert("elemento de carrito: " + carrito[i]);
            addItemToCart(data, JSON.parse(carrito[i]));
        }



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

                    creditCards.push(myCards[i].id);

                }
            }
             $("#medioPago").append(ret);
             sessionStorage.setItem("creditCards", JSON.stringify(creditCards));
        }else{
            showError(error);
        }
    
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

                addresses.push('dir' + miDir.id);
                    
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
    });

}


function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}