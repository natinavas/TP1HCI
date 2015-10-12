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
