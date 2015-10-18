	document.getElementById("enviarMsj").addEventListener("click", function() {
		sendMessage();
	});

	function sendMessage(){
		var nombre=document.getElementById("contactName").value;
		var email=document.getElementById("contactEmail").value;
		var msg=new String(document.getElementById("contactMessage").value);
	
	if( !validateName(nombre)  ){
		swal({  title: "Por favor ingrese un nombre válido",
				type: "error",
				confirmButtonText: "Cerrar"
		});
	}else if( !validateEmail(email)){
		swal({   title: "Por favor ingrese una dirección de email válida",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else if( msg.length < 15){
		alert("hola");
		swal({   title: "Por favor ingrese mensaje con al menos 15 caracteres",
		type: "error",
		confirmButtonText: "Cerrar"
	});
	}else{
		swal({   title: "Su mensaje ha sido enviado",
		type: "success",
		confirmButtonText: "Cerrar"
	});
	document.getElementById("contactName").value ="";
	document.getElementById("contactEmail").value ="";
	document.getElementById("contactMessage").value ="";
	}
	
	}




	function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
	}

	function validateName(name){
	var re = /^[a-z0-9_-]{1,80}$/;
	return re.test(name);
	}