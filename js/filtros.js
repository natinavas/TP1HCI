var request = new Object();
request.timeout = 7000;

//Subo colores

request.url="http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAttributeById&id=4";
request.dataType="jsonp";
console.log(request.url);

$.ajax(request).done( function(data){
	var i = 0;
	for(i =0 ; i < data.attribute.values.length; i++){
		document.getElementById('color' + JSON.stringify(i+1)).innerHTML =  data.attribute.values[i];
	}
});

//Subo marcas

request.url="http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAttributeById&id=9";
request.dataType="jsonp";
console.log(request.url);

$.ajax(request).done( function(data){
	var i = 0;
	for(i =0 ; i < data.attribute.values.length; i++){
		document.getElementById('trademark' + JSON.stringify(i+1)).innerHTML =  data.attribute.values[i];
	}
});

//Subo ocasion

request.url="http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAttributeById&id=3";
request.dataType="jsonp";
console.log(request.url);

$.ajax(request).done( function(data){
	var i = 0;
	for(i =0 ; i < data.attribute.values.length; i++){
		document.getElementById('ocassion' + JSON.stringify(i+1)).innerHTML =  data.attribute.values[i];
	}
});


function applyFilter(){
	var colors = getFilterColors();
	var jsonFilters = '['
	for(i=0; i<colors.length; i++){
		jsonFilters += '{	"id": ' + 4 + ',	"value": "' + colors[i] + '"},';
	}
	jsonFilters = jsonFilters.slice(0,jsonFilters.length - 1);
	jsonFilters += ']';

	alert(jsonFilters);
}

function getFilterColors(){
	var ret = [];
	var i;
	for(i = 1; i <= 23; i++){
		if(document.getElementById('inputColor'+JSON.stringify(i)).checked == true){
			ret.push(document.getElementById('color'+ JSON.stringify(i)).innerHTML);
		}
	}
	return ret;
}