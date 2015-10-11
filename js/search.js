
document.getElementById("input").addEventListener("keypress", function(){
	if(event.keyCode == 13){
		search();
	}
});

function search(){
	var input =  document.getElementById("input").value;
	window.location.href = 'resultadosBusqueda.html?Search=' + input;
}