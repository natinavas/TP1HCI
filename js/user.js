//alert(sessionStorage.getItem("loggedUser").authenticationToken);
//var aux2 = sessionStorage.getItem("loggedUser").account.username;
//alert("username: " + aux2);

document.getElementById("addrs").addEventListener("click", function(){
	document.getElementById("agregarDir").addEventListener("click", function() {
		//alert("por entrar");
		addAddress(); 
	});
	//alert("Debug1");
});






function changePassword(){
	var request = new Object();
	request.url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=ChangePassword&username=" + changePassUser + "&password=" + password + "&new_password=" + newPassword1;
	request.dataType="jsonp";
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
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + user.account.username + "&authentication_token=" + user.authenticationToken + "&address=" + JSON.stringify(newAddress);
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