//Capa Centros Chincha
$( "#cpAltLar" ).click(function() {
	fields=centros_poblados_chincha_altolaran;
	
	if($( "#cpAltLar" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_altolaran","c","501");	
	}
	else{
		map.removeLayer(cpAltLar);			
	};
});

$( "#cpCha" ).click(function() {
	fields=centros_poblados_chincha_chavin;
	
	if($( "#cpCha" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_chavin","c","502");	
	}
	else{
		map.removeLayer(cpCha);			
	};
});

$( "#cpChiAlt" ).click(function() {
	fields=centros_poblados_chincha_chinchaalta;
	
	if($( "#cpChiAlt" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_chinchaalta","c","503");	
	}
	else{
		map.removeLayer(cpChiAlt);			
	};
});

$( "#cpChiBaj" ).click(function() {
	fields=centros_poblados_chincha_chinchabaja;
	
	if($( "#cpChiBaj" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_chinchabaja","c","504");	
	}
	else{
		map.removeLayer(cpChiBaj);			
	};
});

$( "#cpElCar" ).click(function() {
	fields=centros_poblados_chincha_elcarmen;
	
	if($( "#cpElCar" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_elcarmen","c","505");	
	}
	else{
		map.removeLayer(cpElCar);			
	};
});

$( "#cpGroPra" ).click(function() {
	fields=centros_poblados_chincha_grocioprado;
	
	if($( "#cpGroPra" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_grocioprado","c","506");	
	}
	else{
		map.removeLayer(cpGroPra);			
	};
});

$( "#cpPueNue" ).click(function() {
	fields=centros_poblados_chincha_pueblonuevo;
	
	if($( "#cpPueNue" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_pueblonuevo","c","507");	
	}
	else{
		map.removeLayer(cpPueNue);			
	};
});

$( "#cpSjYan" ).click(function() {
	fields=centros_poblados_chincha_sjyanac;
	
	if($( "#cpSjYan" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_sjyanac","c","508");	
	}
	else{
		map.removeLayer(cpSjYan);			
	};
});

$( "#cpSpHua" ).click(function() {
	fields=centros_poblados_chincha_sphuacarpana;
	
	if($( "#cpSpHua" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_sphuacarpana","c","509");	
	}
	else{
		map.removeLayer(cpSpHua);			
	};
});

$( "#cpSun" ).click(function() {
	fields=centros_poblados_chincha_sunampe;
	
	if($( "#cpSun" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_sunampe","c","510");	
	}
	else{
		map.removeLayer(cpSun);			
	};
});

$( "#cpTamMor" ).click(function() {
	fields=centros_poblados_chincha_tambomora;
	
	if($( "#cpTamMor" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados_chincha_tambomora","c","511");	
	}
	else{
		map.removeLayer(cpTamMor);			
	};
});

//ICA

