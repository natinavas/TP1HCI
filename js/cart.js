


var cart = JSON.parse(localStorage.getItem("carrito"));


var i = 0;

for(i = 0; cart[i] != undefined; i++){
	var prod = 	'<div class="row">'+
	            '<div class="col-xs-2"><img class="img-responsive" src=' + cart[i].imageUrl[0] + '>'+
	            '</div>'+
	            '<div class="col-xs-4">'+
	                '<h4 class="product-name"><strong>'+ cart[i].name + '</strong></h4>'+
	                '<h4><small>Descripción: una clasica camisa azul para todo tipo de ocación.</small></h4>'+
	                '<div class="col-xs-1">'+
	                    '<button type="button" class="btn btn-link btn-xs">'+
	                        '<span class="glyphicon glyphicon-gift" style="color:black"> </span>'+
	                    '</button>'+
	                '</div>'+
	                '<div class="col-xs-10">'+
	                    '<h6>Opciones para regalo</h6>'+
	                '</div>'+
	            '</div>'+
	            '<div class="col-xs-6">'+
	                '<div class="col-xs-6 text-right">'+
	                    '<h6><strong>$' + cart[i].price + ' <span class="text-muted">x</span></strong></h6>'+
	                '</div>'+
	                '<div class="col-xs-4">'+
	                    '<input type="text" class="form-control input-sm" value="1">'+
	                '</div>'+
	                '<div class="col-xs-2">'+
	                    '<button type="button" class="btn btn-link btn-xs">'+
	                        '<span class="glyphicon glyphicon-trash" style="color:black"> </span>'+
	                    '</button>'+
	                    '<button type="button" class="btn btn-link btn-xs">'+
	                '<span class="glyphicon glyphicon-heart-empty" style="color:black"></span>'+
	                    '</button>'+
	                '</div>'+
	            '</div>'+
	            '<br>'+
	            '<br>'+
	            '<br>'+
	            '<div class="col-xs-1 col-xs-offset-1">'+
	                '<div class="col-xs-1 col-xs-offset-3">'+
	                    '<div class="btn-group btn-input clearfix">'+
	                        '<button type="button" class="btn smallButton dropdown-toggle form-control" data-toggle="dropdown">'+
	                            '<span data-bind="label">Talle</span> <span class="caret"></span>'+
	                        '</button>'+
	                        '<ul class="dropdown-menu" role="menu">'+
	                            '<li><a href="#">XS</a></li>'+
	                            '<li><a href="#">S</a></li>'+
	                            '<li><a href="#">M</a></li>'+
	                            '<li><a href="#">L</a></li>'+
	                            '<li><a href="#">XL</a></li>'+
	                        '</ul>'+
	                    '</div><br/><br/>'+
	                    '<div class="btn-group btn-input clearfix">'+
	                        '<button type="button" class="btn smallButton dropdown-toggle form-control" data-toggle="dropdown">'+
	                            '<span data-bind="label">Color</span> <span class="caret"></span>'+
	                        '</button>'+
	                        '<ul class="dropdown-menu" role="menu">'+
	                            '<li><a href="#">azul</a></li>'+
	                            '<li><a href="#">blanco</a></li>'+
	                            '<li><a href="#">celeste</a></li>'+
	                        '</ul>'+
	                    '</div>'+
	                '</div>'+
	            '</div><br/><br/><br/>'+
	            '<div class="col-xs-3 col-xs-offset-1">'+
	                '<button type="button" class="btn smallButton btn-sm btn-block">'+
	                    'Terminar editado'+
	                '</button>'+
	            '</div>'+
	        '</div>'+
	        '<hr></hr>';

	        document.getElementById("cartProducts").innerHTML += prod;

}

