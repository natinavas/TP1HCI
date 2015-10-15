function changePassword(){
	var request = new Object();
	request.url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=ChangePassword&username=" + changePassUser + "&password=" + password + "&new_password=" + newPassword1;
	request.dataType="jsonp";
}