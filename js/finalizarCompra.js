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


            alert(addresses);

        for(var i = 0; addresses != undefined && addresses[i] != undefined; i++){
            if(document.getElementById(addresses[i]).checked){

                alert(addresses[i] + " esta checked");
                var user = JSON.parse(sessionStorage.getItem("loggedUser"));

                var username = user.account.username;

                var authenticationToken = user.authenticationToken;


                var orderId = parseInt(sessionStorage.getItem("orderId"));

                alert(orderId);

                alert( "dir id : " + addresses[i].split("dir")[1]);

                var adr = new Object();
                adr.id = orderId;
                var address = new Object();
                address.id = parseInt(addresses[i].split("dir")[1]);
                adr.address = address;


                var request = new Object();
                request.timeout = 7000;
                request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=ChangeOrderAddress&username=" + username + "&authentication_token=" + authenticationToken + "&order=" + JSON.stringify(adr);


                request.dataType="jsonp";
                console.log(request.url);
                $.ajax(request).done( function(data) {
                    alert(JSON.stringify(data));

                    var $active = $('.wizard .nav-tabs li.active');
                    $active.next().removeClass('disabled');
                    nextTab($active);


                });



                return;


            }
        }

        alert("debe seleccionar una opcion");

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
        alert("cree la orden");
        alert(JSON.stringify(data));

        sessionStorage.setItem("orderId", JSON.stringify(data.order.id));

        var carrito = JSON.parse(localStorage.getItem("carrito"));


        for(var i = 0; carrito != undefined && carrito[i] != undefined; i++){
            alert("elemento de carrito: " + carrito[i]);
            addItemToCart(data, JSON.parse(carrito[i]));
        }



    });

request = new Object();
    request.timeout = 7000;
    request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=GetAllOrders&username=" + username  + "&authentication_token=" + authenticationToken;


    request.dataType="jsonp";
    console.log(request.url);
    $.ajax(request).done( function(data) {
        alert(JSON.stringify(data));


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


                //alert(JSON.stringify(adr[0]));
                for (i=0; adr[i] != undefined && adr[i] != null; i++){

                    var miDir = adr[i];

                addresses.push('dir' + miDir.id);
                    
                    ret += '<label class="radio-inline"><input type="radio" id="dir' + miDir.id + '" value= "M" name="optradio">'
                    + '<div id= addres' + i + '><h3> Direccion ' + (i+1) + ':</h3><h4>' + miDir.name
                    + '</h4><h5>' + miDir.street + ' ' + miDir.number
                    + '</h5><h5> Provincia: ' + miDir.province + '</h5><h5> Código Postal: ' 
                    + miDir.zipCode
                    + '</h5> <h5> Numero de Telefono: ' + miDir.phoneNumber + '</h5></div><br/> <br/>'
                    + '</label>';
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

    alert("prod :" + JSON.stringify(prod));


    request = new Object();
    request.timeout = 7000;
    request.url="http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=AddItemToOrder&username=" + username + "&authentication_token=" + authenticationToken + "&order_item=" + JSON.stringify(prod);


    request.dataType="jsonp";
    console.log(request.url);


    $.ajax(request).done( function(data) {
        alert(JSON.stringify(data.orderItem));
        alert("cantidad : " + JSON.stringify(data.orderItem.quantity));
    });

}


function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}