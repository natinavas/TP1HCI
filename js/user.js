alert(JSON.stringify(sessionStorage.getItem("loggedUser")));


alert(sessionStorage.getItem("loggedUser").authenticationToken);
//var aux2 = sessionStorage.getItem("loggedUser").account.username;
//alert("username: " + aux2);

document.getElementById("agregarDir").addEventListener("click", function() {
	alert("por entrar");
	//addAddress(); 
});





function changePassword(){
	var request = new Object();
	request.url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=ChangePassword&username=" + changePassUser + "&password=" + password + "&new_password=" + newPassword1;
	request.dataType="jsonp";
}


/*function addAddress(){
	
	var newAddress= {
		name: document.getElementById("nombreD").value,
		street: document.getElementById("calleD").value,
		number: document.getElementById("numeroD").value,
		province: document.getElementById("provinciaD").value;
		zipCode: document.getElementById("cpD");
		phoneNumber: document.getElementById("telD");
	};
	
	var request=new Object();
	request.url = "http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + janedoe + "&authentication_token=" + a8c0d2a9d332574951a8e4a0af7d516f + "&address=" + JSON.stringify(newAddress);
	request.dataType = "jsonp";
	alert("request url: " + request.url);
	
	$.ajax(request).done(function(data) {
		
	}
	
	
	
	
}*/