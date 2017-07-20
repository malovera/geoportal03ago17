//import "/lib/plugins/leaflet.sld.js";

var map,
	legVulne,
	fields,
	lTemp,
	lLimDep, lLimPro, lLimDis, lLit, lCenPob, lCapDep, lCapPro, lCapDis,
	//variables para guardar las capas de info y legend
	infLimDis, legLimDis,
	cFall, cLito, cSuel, cCurv, cPend,
	cCalChi, cCalIca, cCalNaz, cCalPal, cCalPis,
	cRedDep, cRedNac, cRedVec,
	cAere, cPuen, cPuer,
	cCenHid, cCenTer, cEstEle,
	cAdmNac, cAdmReg, cZonAmo,
	cCEChi, cCEIca, cCENaz, cCEPal, cCEPis,
	cCSChi, cCSIca, cCSNaz, cCSPal, cCSPis,
	cPobDep, cPobDis, cPobPro,
	cCulAgr, cGana,
	cMina,
	cbtnTempBajas,
	activo=0;

	//fields
	importarScript("static/js/capas_fields.js");
	//centros poblados por distrito
	importarScript("static/js/centros_poblados_fields.js");
	//Importar Estilos
	importarScript("static/js/styles_json.js");
	//Importar variables estilos
	importarScript("static/js/varStyles.js");

$(document).ready(initialize);

function initialize(){

	//$("#map").height($(window).height());

	map = L.map("map", {
		center: L.latLng(-14.22,-75.52),
		zoom: 8,
		zoomControl: false,

	});



	var tileLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(map);
	//var tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

	//Mostrar Escala
	L.control.scale().addTo(map);


	//Llenar menu contenido
	//alert(llenarMenu());
	//Llena el menu del visor dinamicamente
	llenarMenu();

	//Boton impresion
	/*
	L.easyPrint({
				title: 'Imprimir',
				elementsToHide: 'ul',
				position: 'bottomleft'
			}).addTo(map);

	//-
	*/
	//Funcion clic en pnlIcobm para mostrar Lista de mapas bases
	$( "#pnlIcobm" ).click(function() {
		if($( "#pnlBasemaps" ).hasClass("ocultarPanel")){
			$( "#pnlBasemaps" ).removeClass("ocultarPanel");
			$( "#pnlBasemaps" ).addClass("mostrarPanel");
			/*$( "#pnlBasemaps" ).addClass("animated fadeInRight");*/
		}
		else{
			$( "#pnlBasemaps" ).removeClass("mostrarPanel");
			/*$( "#pnlBasemaps" ).addClass("animated fadeOutRight");*/
			$( "#pnlBasemaps" ).addClass("ocultarPanel");
		}
	});

	$( "#icoP1" ).click(function() {
		$( "#ul1" ).toggleClass("ocultarLista");
	});

	/*
	$( "#icoP2" ).click(function() {
		$( "#ul2" ).toggleClass("ocultarLista");
	});
	$( "#icoP3" ).click(function() {
		$( "#ul3" ).toggleClass("ocultarLista");
	});
	$( "#icoP4" ).click(function() {
		$( "#ul4" ).toggleClass("ocultarLista");
	});
	$( "#icoP5" ).click(function() {
		$( "#ul5" ).toggleClass("ocultarLista");
	});
	*/

	//Mostrar panel riesgos
	$("#tabPeligro").click(function() {
		$("#pnlPeligros").toggleClass("ocultarPanel animated fadeInLeft");
	});
//};

//}; //initialize
//==============================================================================================
//t: tabla , f: figura, l: layer
function getData(t,f,l){
	$.ajax("wmslib/php/getData.php", {
		data: {
			table: t,
			fields: fields
		},
		async: false,
		success: function(data){
			mapData(data,f,l);
			getCapaTabla(t);
		}
	})
};

function getEstiloCapa(t){
	var result = "";
	$.ajax("wmslib/php/getEstiloCapa.php", {
		data: {
			table: t
		},
		async: false,
		success: function(data){
			result=data;
		}
	})
	return result;
};

function llenarMenu(){
	//var result = "";
	$.ajax("wmslib/php/llenarMenu.php", {
		async: false,
		success: function(data){
			$('.sidebar-menu').html(data);
		}
	})
	//return result;
};

function getCapaTabla(t){
	//var result = "";
	$.ajax("wmslib/php/getCapaTabla.php", {
		data: {
			table: t,
			fields: fields
		},
		async: false,
		success: function(data){
			$('#pnlTabla').html(data);
		}
	})
	//return result;
};

function mapData(data,f,l){

			var geojson = {
			"type": "FeatureCollection",
			"features": []
		};
		var dataArray = data.split(", ;");
		dataArray.pop();

		dataArray.forEach(function(d){
			d = d.split(", ");

			var feature = {
				"type": "Feature",
				"properties": {},
				"geometry": JSON.parse(d[fields.length])
			};

			for (var i=0; i<fields.length; i++){
				feature.properties[fields[i]] = d[i];
			};

			geojson.features.push(feature);
		});


    //mdl Circlemarker
    if(f=="c"){

    	/*
    	var markerStyle = {
					fillColor: "#ff1600",
					color: "#FFF",
					fillOpacity: 0.7,
					opacity: 0.8,
					weight: 1,
					radius: 8
				};

		var greenIcon = L.icon({
		    iconUrl: '1.png',
		    iconSize:     [38, 95], // size of the icon
		    shadowSize:   [50, 64], // size of the shadow
		    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		    shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});

		var mapDataLayerC = L.geoJson(geojson,  {icon: greenIcon},{
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, markerStyle);
			},
			onEachFeature: function (feature, layer) {
				layer.bindPopup("<h3>Centro Poblado</h3><i>"+feature.properties.nomcp+"</i>");
				 layer.on('mouseover', function (e) {
		            this.openPopup();
		        });
		        layer.on('mouseout', function (e) {
		            this.closePopup();
		        });
			}
		});


		var markers = new L.MarkerClusterGroup();
		markers.addLayer(mapDataLayerC);
		map.addLayer(markers);

		*/

		//Constructor marker Capital Departamental
		function capDepIcon(){
			var markerStyle = {
					radius: 6.0,
	                stroke: false,
	                fillOpacity: 1,
	                fillColor: 'rgba(230,0,0,1.0)'
				};

			var markers = L.geoJson(geojson, {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, markerStyle);
				},
				onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Capital Departamental</h4><h5><i>"+feature.properties.dpto+"</i></h5>");
					 layer.on('mouseover', function (e) {
			            this.openPopup();
			        });
			        layer.on('mouseout', function (e) {
			            this.closePopup();
			        });
				}
			});

			map.addLayer(markers);

			return markers;
		}

		//Constructor marker Capital Provincial
		function capProIcon(){
			var markerStyle = {
					radius: 4.6,
	                stroke: false,
	                fillOpacity: 1,
	                fillColor: 'rgba(0,168,132,1.0)'
				};

			var markers = L.geoJson(geojson, {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, markerStyle);
				},
				onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Capital Provincial</h4><h5><i>"+feature.properties.provincia+"</i></h5>");
					 layer.on('mouseover', function (e) {
			            this.openPopup();
			        });
			        layer.on('mouseout', function (e) {
			            this.closePopup();
			        });
				}
			});

			//var marCluster = new L.MarkerClusterGroup();
			//marCluster.addLayer(markers);
			map.addLayer(markers);
			return markers;
		}

		//Constructor marker Capital Distrital
		function capDisIcon(){
			var markerStyle = {
					radius: 2.7,
	                stroke: false,
	                fillOpacity: 1,
	                fillColor: 'rgba(197,0,255,1.0)'
				};

			var markers = L.geoJson(geojson, {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, markerStyle);
				},
				onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Capital Departamental</h4><h5><i>"+feature.properties.distrito+"</i></h5>");
					 layer.on('mouseover', function (e) {
			            this.openPopup();
			        });
			        layer.on('mouseout', function (e) {
			            this.closePopup();
			        });
				}
			});

			map.addLayer(markers);
			return markers;
		}

		//Constructor marker Centros Poblados
		function ccppIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [20, 20],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/ccpp.png'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>CENTRO POBLADO</h4><h5><i>"+feature.properties.nomcp+"</i></h5>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 });

				var marCluster = new L.MarkerClusterGroup();
				marCluster.addLayer(markers);
				map.addLayer(marCluster);

				return marCluster;
		}

		//Constructor marker Centros Educativos
		function centrosEducativosIcon(){
			var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/centros_edu.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>CENTRO EDUCATIVO</h4><h5><i>"+feature.properties.nom__iiee+"</i></h5>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 });

			var marCluster = new L.MarkerClusterGroup();
			marCluster.addLayer(markers);
			map.addLayer(marCluster);
			return marCluster;
		}

		//Constructor marker Centros de Salud
		function centrosSaludIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/centros_salud.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>CENTRO DE SALUD</h4><h5><i>"+feature.properties.nom_eess+"</i></h5><h6>TIPO : "+feature.properties.tipo+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 });

				var marCluster = new L.MarkerClusterGroup();
				marCluster.addLayer(markers);
				map.addLayer(marCluster);
				return marCluster;
		}

		//Constructor marker Bomberos
		function bomberosIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/bomberos.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>BOMBEROS</h4><h5><i>"+feature.properties.compania+"</i></h5><h6>TIPO : "+feature.properties.estado_act+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				return markers;
		}

		//Constructor marker Comisarias
		function comisariaIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/comisaria.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>COMISARIA</h4><h5><i>"+feature.properties.comisaria+"</i></h5><h6>DIRECCION : "+feature.properties.direccion+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				return markers;
		}

		//Constructor marker Aerodromos
		function aerodromoIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/aerodromo.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>AERODROMO</h4><h5><i>"+feature.properties.nombre+"</i></h5><h6>CATEGORIA : "+feature.properties.categoria+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				return markers;
		}

		//Constructor marker Aeropuerto
		function aeropuertoIcon(){
			var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/aeropuerto.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>AEROPUERTO</h4><h5><i>"+feature.properties.nombre+"</i></h5><h6>CATEGORIA : "+feature.properties.categoria+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				return markers;
		}

		//Constructor marker Central Hidraulica
		function hidraulicaIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/c_hidraulica.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>CENTRAL HIDRAULICA</h4><h5>DISTRITO : <i>"+feature.properties.distrito+"</i></h5><h6>PROVINCIA : "+feature.properties.provincia+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				return markers;
		}

		//Constructor marker Central Termica
		function termicaIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/c_termica.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>CENTRAL TERMICA</h4><h5>DISTRITO : <i>"+feature.properties.distrito+"</i></h5><h6>PROVINCIA : "+feature.properties.provincia+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				 return markers;
		}

		//Constructor marker Estacion Electrica
		function estacionElectricaIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/estacion_electrica.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>ESTACION ELECTRICA</h4><h5><i>"+feature.properties.nombre+"</i></h5><h6>CLASE : "+feature.properties.clase+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				 return markers;
		}

		//Constructor marker Puentes
		function puentesIcon(){
					var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/Puentes.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>PUENTE</h4><h5><i>"+feature.properties.nombre+"</i></h5><h6>DISTRITO : "+feature.properties.distrito+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				 return markers;
		}

		//Constructor marker Puertos
		function puertosIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/Puertos.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>PUERTO</h4><h5><i>"+feature.properties.nombre+"</i></h5><h6>CATEGORIA : "+feature.properties.categoria+"</h6>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				 return markers;
		}

		//Constructor marker Geocronologia
		function geocIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/cronologia.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>Geocronologia</h4><h5><i>Material : "+feature.properties.material+"</i></h5><h5><i>Unidad : "+feature.properties.unidad+"</i></h5>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				 return markers;
		}

		//Constructor marker Geodinamica Regional
		function geodinamicaIcon(){
				var smallIcon = new L.Icon({
				     iconSize: [30, 30],
				     iconAnchor: [13, 27],
				     popupAnchor:  [1, -24],
				     iconUrl: 'wmslib/icon/cronologia.svg'
				 });

				 markers = L.geoJson(geojson, {
				      pointToLayer: function (feature, latlng) {
				            return L.marker(latlng, {icon: smallIcon});
				      },
						onEachFeature: function (feature, layer) {
							layer.bindPopup("<h4>Geodinamica</h4><h5><i>Distrito : "+feature.properties.distrito+"</i></h5><h5><i>Tipo : "+feature.properties.tipo+"</i></h5>");
							 layer.on('mouseover', function (e) {
					            this.openPopup();
					        });
					        layer.on('mouseout', function (e) {
					            this.closePopup();
					        });
						}
				 }).addTo(map);

				 return markers;
		}


		//CENTROS POBLADOS - POR DISTRITO
		if(l=="5")
			lCenPob = markers;
			//CHINCHA - CENTROS POBLADOS
			else if(l=="501"){
				cpAltLar = ccppIcon();
			}
			else if(l=="502"){
				cpChav = ccppIcon();
			}
			else if(l=="503"){
				cpChiAlt = ccppIcon();
			}
			else if(l=="504"){
				cpChiBaj = ccppIcon();
			}
			else if(l=="505"){

				cpElCar = ccppIcon();
			}
			else if(l=="506"){

				cpGroPra = ccppIcon();
			}
			else if(l=="507"){

				cpPueNueC = ccppIcon();
			}
			else if(l=="508"){

				cpSjYan = ccppIcon();
			}
			else if(l=="509"){

				cpSpHua = ccppIcon();
			}
			else if(l=="510"){

				cpSun = ccppIcon();
			}
			else if(l=="511"){

				cpTamMor = ccppIcon();
			}
			//ICA - CENTROS POBLADOS
			else if(l=="512"){

				cpIca = ccppIcon();
			}
			else if(l=="513"){

				cpLaTin = ccppIcon();
			}
			else if(l=="514"){

				cpLosAqu = ccppIcon();
			}
			else if(l=="515"){

				cpOcu = ccppIcon();
			}
			else if(l=="516"){

				cpPac = ccppIcon();
			}
			else if(l=="517"){

				cpParc = ccppIcon();
			}
			else if(l=="518"){

				cpPueNueI = ccppIcon();
			}
			else if(l=="519"){

				cpSal = ccppIcon();
			}
			else if(l=="520"){

				cpSjMol = ccppIcon();
			}
			else if(l=="521"){

				cpSjBau = ccppIcon();
			}
			else if(l=="522"){

				cpSan = ccppIcon();
			}
			else if(l=="523"){

				cpSub = ccppIcon();
			}
			else if(l=="524"){

				cpTat = ccppIcon();
			}
			else if(l=="525"){

				cpYau = ccppIcon();
			}
			//NAZCA - CENTROS POBLADOS
			else if(l=="526"){

				cpChan = ccppIcon();
			}
			else if(l=="527"){

				cpElIng = ccppIcon();
			}
			else if(l=="528"){

				cpMar = ccppIcon();
			}
			else if(l=="529"){
				cpNaz = ccppIcon();
			}
			else if(l=="530"){
				cpVisAle = ccppIcon();
			}
			//PALPA - CENTROS POBLADOS
			else if(l=="531"){
				cpLli = ccppIcon();
			}
			else if(l=="532"){
				cpPal = ccppIcon();
			}
			else if(l=="533"){
				cpRioGra = ccppIcon();
			}
			else if(l=="534"){
				cpSanCru = ccppIcon();
			}
			else if(l=="535"){
				cpTib = ccppIcon();
			}
			//PISCO - CENTROS POBLADOS
			else if(l=="536"){
				cpHua = ccppIcon();
			}
			else if(l=="537"){
				cpHum = ccppIcon();
			}
			else if(l=="538"){
				cpInd = ccppIcon();
			}
			else if(l=="539"){
				cpPara = ccppIcon();
			}
			else if(l=="540"){
				cpPis = ccppIcon();
			}
			else if(l=="541"){
				cpSanAnd = ccppIcon();
			}
			else if(l=="542"){
				cpSanCle = ccppIcon();
			}
			else if(l=="543"){
				cpTupAma = ccppIcon();
			}
		//Capital Departamental
		else if(l=="6")
			lCapDep = capDepIcon();
		//Capital Provincial
		else if(l=="7")
			lCapPro = capProIcon();
		//Capital Distrital
		else if(l=="8")
			lCapDis = capDisIcon();
		else if(l=="22"){
			cAere = markers;
		}
		else if(l=="23"){
			cPuen = puentesIcon();
		}
		else if(l=="24"){
			cPuer = puertosIcon();
		}
		else if(l=="25"){
			cCenHid = hidraulicaIcon();
		}
		else if(l=="26"){
			cCenTer = termicaIcon();
		}
		else if(l=="27"){
			cEstEle = estacionElectricaIcon();
		}
		else if(l=="32"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			//cCEChi = markers;
		}
		//CE - CS - CO - BO
			//CHINCHA - CENTROS EDUCATIVOS
			else if(l=="321"){
				ceAltLar = centrosEducativosIcon();
			}
			else if(l=="322"){
				ceChav = centrosEducativosIcon();
			}
			else if(l=="323"){
				ceChiAlt = centrosEducativosIcon();
			}
			else if(l=="324"){
				ceChiBaj = centrosEducativosIcon();
			}
			else if(l=="325"){
				ceElCar = centrosEducativosIcon();
			}
			else if(l=="326"){
				ceGroPra = centrosEducativosIcon();
			}
			else if(l=="327"){
				cePueNueC = centrosEducativosIcon();
			}
			else if(l=="328"){
				ceSjYan = centrosEducativosIcon();
			}
			else if(l=="329"){
				ceSpHua = centrosEducativosIcon();
			}
			else if(l=="330"){
				ceSun = centrosEducativosIcon();
			}
			else if(l=="331"){
				ceTamMor = centrosEducativosIcon();
			}
			//ICA - CENTROS EDUCATIVOS
			else if(l=="332"){
				ceIca = centrosEducativosIcon();
			}
			else if(l=="333"){
				ceLaTin = centrosEducativosIcon();
			}
			else if(l=="334"){
				ceLosAqu = centrosEducativosIcon();
			}
			else if(l=="335"){
				ceOcu = centrosEducativosIcon();
			}
			else if(l=="336"){
				cePac = centrosEducativosIcon();
			}
			else if(l=="337"){
				ceParc = centrosEducativosIcon();
			}
			else if(l=="338"){
				cePueNueI = centrosEducativosIcon();
			}
			else if(l=="339"){
				ceSal = centrosEducativosIcon();
			}
			else if(l=="340"){
				ceSjMol = centrosEducativosIcon();
			}
			else if(l=="341"){
				ceSjBau = centrosEducativosIcon();
			}
			else if(l=="342"){
				ceSan = centrosEducativosIcon();
			}
			else if(l=="343"){
				ceSub = centrosEducativosIcon();
			}
			else if(l=="344"){
				ceTat = centrosEducativosIcon();
			}
			else if(l=="345"){
				ceYau = centrosEducativosIcon();
			}
			//NAZCA - CENTROS EDUCATIVOS
			else if(l=="346"){
				ceChan = centrosEducativosIcon();
			}
			else if(l=="347"){
				ceElIng = centrosEducativosIcon();
			}
			else if(l=="348"){
				ceMar = centrosEducativosIcon();
			}
			else if(l=="349"){
				ceNaz = centrosEducativosIcon();
			}
			else if(l=="350"){
				ceVisAle = centrosEducativosIcon();
			}
			//PALPA - CENTROS EDUCATIVOS
			else if(l=="351"){
				ceLli = centrosEducativosIcon();
			}
			else if(l=="352"){
				cePal = centrosEducativosIcon();
			}
			else if(l=="353"){
				ceRioGra = centrosEducativosIcon();
			}
			else if(l=="354"){
				ceSanCru = centrosEducativosIcon();
			}
			else if(l=="355"){
				ceTib = centrosEducativosIcon();
			}
			//PISCO - CENTROS EDUCATIVOS
			else if(l=="356"){
				ceHua = centrosEducativosIcon();
			}
			else if(l=="357"){
				ceHum = centrosEducativosIcon();
			}
			else if(l=="358"){
				ceInd = centrosEducativosIcon();
			}
			else if(l=="359"){
				cePara = centrosEducativosIcon();
			}
			else if(l=="360"){
				cePis = centrosEducativosIcon();
			}
			else if(l=="361"){
				ceSanAnd = centrosEducativosIcon();
			}
			else if(l=="362"){
				ceSanCle = centrosEducativosIcon();
			}
			else if(l=="363"){
				ceTupAma = centrosEducativosIcon();
			}
			//============================
			//CHINCHA - CENTROS SALUD
			else if(l=="364"){
				csAltLar = centrosSaludIcon();
			}
			else if(l=="365"){
				csChav = centrosSaludIcon();
			}
			else if(l=="366"){
				csChiAlt = centrosSaludIcon();
			}
			else if(l=="367"){
				csChiBaj = centrosSaludIcon();
			}
			else if(l=="368"){
				csElCar = centrosSaludIcon();
			}
			else if(l=="369"){
				csGroPra = centrosSaludIcon();
			}
			else if(l=="370"){
				csPueNueC = centrosSaludIcon();
			}
			else if(l=="371"){
				csSjYan = centrosSaludIcon();
			}
			else if(l=="372"){
				csSpHua = centrosSaludIcon();
			}
			else if(l=="373"){
				csSun = centrosSaludIcon();
			}
			else if(l=="374"){
				csTamMor = centrosSaludIcon();
			}
			//ICA - CENTROS SALUD
			else if(l=="375"){
				csIca = centrosSaludIcon();
			}

			else if(l=="376"){
				csLaTin = centrosSaludIcon();
			}

			else if(l=="377"){
				csLosAqu = centrosSaludIcon();
			}

			else if(l=="378"){
				csOcu = centrosSaludIcon();
			}

			else if(l=="379"){
				csPac = centrosSaludIcon();
			}

			else if(l=="380"){
				csParc = centrosSaludIcon();
			}

			else if(l=="381"){
				csPueNueI = centrosSaludIcon();
			}

			else if(l=="382"){
				csSal = centrosSaludIcon();
			}

			else if(l=="383"){
				csSjMol = centrosSaludIcon();
			}

			else if(l=="384"){
				csSjBau = centrosSaludIcon();
			}

			else if(l=="385"){
				csSan = centrosSaludIcon();
			}

			else if(l=="386"){
				csSub = centrosSaludIcon();
			}
			else if(l=="387"){
				csTat = centrosSaludIcon();
			}
			else if(l=="388"){
				csYau = centrosSaludIcon();
			}
			//NAZCA - CENTROS SALUD
			else if(l=="389"){
				csChan = centrosSaludIcon();
			}
			else if(l=="390"){
				csElIng = centrosSaludIcon();
			}
			else if(l=="391"){
				csMar = centrosSaludIcon();
			}
			else if(l=="392"){
				csNaz = centrosSaludIcon();
			}
			else if(l=="393"){
				csVisAle = centrosSaludIcon();
			}
			//PALPA - CENTROS SALUD
			else if(l=="394"){
				csLli = centrosSaludIcon();
			}
			else if(l=="395"){
				csPal = centrosSaludIcon();
			}
			else if(l=="396"){
				csRioGra = centrosSaludIcon();
			}
			else if(l=="397"){
				csSanCru = centrosSaludIcon();
			}
			else if(l=="398"){
				csTib = centrosSaludIcon();
			}
			//PISCO - CENTROS SALUD
			else if(l=="399"){
				csHua = centrosSaludIcon();
			}
			else if(l=="400"){
				csHum = centrosSaludIcon();
			}
			else if(l=="401"){
				csInd = centrosSaludIcon();
			}
			else if(l=="402"){
				csPara = centrosSaludIcon();
			}
			else if(l=="403"){
				csPis = centrosSaludIcon();
			}
			else if(l=="404"){
				csSanAnd = centrosSaludIcon();
			}
			else if(l=="405"){
				csSanCle = centrosSaludIcon();
			}
			else if(l=="406"){
				csTupAma = centrosSaludIcon();
			}
			//============================
			//CHINCHA - COMISARIAS
			else if(l=="407"){
				coAltLar = comisariaIcon();
			}
			else if(l=="408"){
				coChav = comisariaIcon();
			}
			else if(l=="409"){
				coChiAlt = comisariaIcon();
			}
			else if(l=="410"){
				coChiBaj = comisariaIcon();
			}
			else if(l=="411"){
				coElCar = comisariaIcon();
			}
			else if(l=="412"){
				coGroPra = comisariaIcon();
			}
			else if(l=="413"){
				coPueNueC = comisariaIcon();
			}
			else if(l=="414"){
				coSjYan = comisariaIcon();
			}
			else if(l=="415"){
				coSpHua = comisariaIcon();
			}
			else if(l=="416"){
				coSun = comisariaIcon();
			}
			else if(l=="417"){
				coTamMor = comisariaIcon();
			}
			//ICA - COMISARIAS
			else if(l=="418"){
				coIca = comisariaIcon();
			}
			else if(l=="419"){
				coLaTin = comisariaIcon();
			}
			else if(l=="420"){
				coLosAqu = comisariaIcon();
			}
			else if(l=="421"){
				coOcu = comisariaIcon();
			}
			else if(l=="422"){
				coPac = comisariaIcon();
			}
			else if(l=="423"){
				coParc = comisariaIcon();
			}
			else if(l=="424"){
				coPueNueI = comisariaIcon();
			}
			else if(l=="425"){
				coSal = comisariaIcon();
			}
			else if(l=="426"){
				coSjMol = comisariaIcon();
			}
			else if(l=="427"){
				coSjBau = comisariaIcon();
			}
			else if(l=="428"){
				coSan = comisariaIcon();
			}
			else if(l=="429"){
				coSub = comisariaIcon();
			}
			else if(l=="430"){
				coTat = comisariaIcon();
			}
			else if(l=="431"){
				coYau = comisariaIcon();
			}
			//NAZCA - COMISARIAS
			else if(l=="432"){
				coChan = comisariaIcon();
			}
			else if(l=="433"){
				coElIng = comisariaIcon();
			}
			else if(l=="434"){
				coMar = comisariaIcon();
			}
			else if(l=="435"){
				coNaz = comisariaIcon();
			}
			else if(l=="436"){
				coVisAle = comisariaIcon();
			}
			//PALPA - COMISARIAS
			else if(l=="437"){
				coLli = comisariaIcon();
			}
			else if(l=="438"){
				coPal = comisariaIcon();
			}
			else if(l=="439"){
				coRioGra = comisariaIcon();
			}
			else if(l=="440"){
				coSanCru = comisariaIcon();
			}
			else if(l=="441"){
				coTib = comisariaIcon();
			}
			//PISCO - COMISARIAS
			else if(l=="442"){
				coHua = comisariaIcon();
			}
			else if(l=="443"){
				coHum = comisariaIcon();
			}
			else if(l=="444"){
				coInd = comisariaIcon();
			}
			else if(l=="445"){
				coPara = comisariaIcon();
			}
			else if(l=="446"){
				coPis = comisariaIcon();
			}
			else if(l=="447"){
				coSanAnd = comisariaIcon();
			}
			else if(l=="448"){
				coSanCle = comisariaIcon();
			}
			else if(l=="449"){
				coTupAma = comisariaIcon();
			}
			//============================
			//CHINCHA - BOMBEROS
			else if(l=="450"){
				boChiAlt = bomberosIcon();
			}
			//ICA - BOMBEROS
			else if(l=="451"){
				boIca = bomberosIcon();
			}
			else if(l=="452"){
				boLaTin = bomberosIcon();
			}
			//NAZCA - BOMBEROS
			else if(l=="453"){
				boMar = bomberosIcon();
			}
			else if(l=="454"){
				boNaz = bomberosIcon();
			}
			else if(l=="455"){
				boVisAle = bomberosIcon();
			}
			//PISCO - BOMBEROS
			else if(l=="456"){
				boPis = bomberosIcon();
			}
			else if(l=="457"){
				boTupAma = bomberosIcon();
			}

		else if(l=="33"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCEIca = markers;
		}
		else if(l=="34"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCENaz = markers;
		}
		else if(l=="35"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCEPal = markers;
		}
		else if(l=="36"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCEPis = markers;
		}
		else if(l=="37"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCSChi = markers;
		}
		else if(l=="38"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCSIca = markers;
		}
		else if(l=="39"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCSNaz = markers;
		}
		else if(l=="40"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCSPal = markers;
		}
		else if(l=="41"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCSPis = markers;
		}
		else if(l=="47"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cMina = markers;
			//L.geoJson(geojson, {style: stlLimDep}).addTo(map);
		}
		//Geonocrologia
		else if(l=="49"){
			aGeoc = geocIcon();

		}
		else if(l=="69"){
			aAerod = aerodromoIcon();
		}
		else if(l=="70"){
			aAerop = aeropuertoIcon();
		}
		else if(l=="77"){
			aGeod = geodinamicaIcon();
		}
		//Arreglo que guarda la referencia a cada capa
		//lTemp[index] = mapDataLayerC;
		//lTemp = mapDataLayerC;
	}



	//mdl Poligon
	if(f=="p"){

		if(l=="1"){

			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			lLimDep = mapDataLayerP;
		}
		else if(l=="2"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			lLimPro = mapDataLayerP;
			}
		else if(l=="3"){

			var mapDataLayerP = L.geoJson(geojson, {
                  style: stlLimDis,
                  onEachFeature: onEachFeature
               }).addTo(map);

			//Funcion highlightFeature
			function highlightFeature(e) {
			    var layer = e.target;

			    layer.setStyle({
			        weight: 3,
			        color: '#FFE897',
			        dashArray: '',
			        fillOpacity: 0.5
			    });

			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
			    }
			    info.update(layer.feature.properties);
			}
			//------------
			//Funcion resetHighlight
			function resetHighlight(e) {
			    mapDataLayerP.resetStyle(e.target);
			    info.update();
			}
			//----------
			//Funcion zoomToFeature
			function zoomToFeature(e) {
			    map.fitBounds(e.target.getBounds());
			}

			//Funcion onEachFeature
			function onEachFeature(feature, layer) {
			    layer.on({
			        mouseover: highlightFeature,
			        mouseout: resetHighlight,
			        click: zoomToFeature
			    });
			}
			/*
			var mapDataLayerP = L.geoJson(geojson, {
				style: stlLimDep,
				onEachFeature: onEachFeature
			}).addTo(map);
			*/


			lLimDis = mapDataLayerP;

			//Cuadro inf personalizado-----
			var info = L.control({position: 'bottomleft'});

			info.onAdd = function (map) {
			    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
			    this.update();
			    return this._div;
			};

			// method that we will use to update the control based on feature properties passed
			info.update = function (props) {
			    this._div.innerHTML = '<h4>Nombre del Distrito:</h4>' +  (props ?
			        '<b>' + props.nom_cap + '</b><br /><br /><h4>Area en Hectáreas:</h4>' + props.area_ha + ''
			        : 'Pase el cursor por un distrito para mostrar información.');
			};

			infLimDis = info.addTo(map);

			//-----

			// Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend'),
			        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			        labels = [];

			    // loop through our density intervals and generate a label with a colored square for each interval
			    for (var i = 0; i < grades.length; i++) {
			        div.innerHTML +=
			            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
			            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			    }

			    return div;
			};

			legLimDis = legend.addTo(map);


			function getColor(d) {
			    return d > 1000 ? '#800026' :
			           d > 500  ? '#BD0026' :
			           d > 200  ? '#E31A1C' :
			           d > 100  ? '#FC4E2A' :
			           d > 50   ? '#FD8D3C' :
			           d > 20   ? '#FEB24C' :
			           d > 10   ? '#FED976' :
			                      '#FFEDA0';
			}
			// =====================================
		}
		//LITORAL
		else if(l=="4"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLit}).addTo(map);
			var mapDataLayerP = L.geoJson(geojson, {style: stlLit}).addTo(map);
			lLit = mapDataLayerP;
		}
		//FALLAS
		else if(l=="9"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlFallas}).addTo(map);
			cFall = mapDataLayerP;
			console.log(cFall);
		}
		//LITOLOGIA - PROBAR SLD
		else if(l=="10"){
			/*
			var SLDStyler = new L.SLDStyler(estilo);
							var mapDataLayerP = L.geoJson(geojson, {
				                  style: SLDStyler.getStyleFunction()
				               }).addTo(map);

			cLito = mapDataLayerP;
			*/

			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cLito = mapDataLayerP;


		}
		//SUELOS
		else if(l=="11"){
			map.createPane('pane_Suelos3');
		        //map.getPane('pane_Suelos3').style.zIndex = 403;
		        map.getPane('pane_Suelos3').style['mix-blend-mode'] = 'normal';
		    var layer_Suelos3 = new L.geoJson.multiStyle(geojson, {
		        attribution: '<a href=""></a>',
		        pane: 'pane_Suelos3',
		        onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Simbolo</h4><h5><i>"+feature.properties.simsue+"</i></h5>");
					 layer.on('mouseclick', function (e) {
			            this.openPopup();
			        });
				},
		        styles: [stlSuelos,]
		    });
       		map.addLayer(layer_Suelos3);
			aSuel = layer_Suelos3;

			// Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h3>Leyenda</h3>';
			        div.innerHTML += '<i style="background:rgba(153,52,4,1.0)"></i> ARh-SCh <br>';
			        div.innerHTML += '<i style="background:rgba(204,86,12,1.0)"></i> FLe-RGe <br>';
			        div.innerHTML += '<i style="background:rgba(240,130,30,1.0)"></i> LPd-R <br>';
			        div.innerHTML += '<i style="background:rgba(254,179,81,1.0)"></i> LPq-R <br>';
			        div.innerHTML += '<i style="background:rgba(255,225,156,1.0)"></i> RGd-R <br>';
			    return div;
			};

			legSue = legend.addTo(map);

		}
		//Curvas Nivel
		else if(l=="12"){
				map.createPane('pane_curvasnivel0');
		        map.getPane('pane_curvasnivel0').style.zIndex = 400;
		        map.getPane('pane_curvasnivel0').style['mix-blend-mode'] = 'normal';
		    var layer_curvasnivel0 = new L.geoJson.multiStyle(geojson, {
		        //attribution: '<a href=""></a>',
		        pane: 'pane_curvasnivel0',
		        //onEachFeature: pop_curvasnivel0,
		        styles: [stlCurvasNivel,]
		    });
		        map.addLayer(layer_curvasnivel0);
				aCurv = layer_curvasnivel0;

			// Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h3>Leyenda</h3>';
			        div.innerHTML += '<i style="background:rgba(219,108,5,1.0)"></i> Curvas Principales <br>';
			        div.innerHTML += '<i style="background:rgba(230,170,29,1.0)"></i> Curvas Secundarias <br>';

			        return div;
			};

			legCurv = legend.addTo(map);
		}
		else if(l=="14"){
			console.log(geojson);
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCalChi = mapDataLayerP;
		}
		else if(l=="15"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCalIca = mapDataLayerP;
		}
		else if(l=="16"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCalNaz = mapDataLayerP;
		}
		else if(l=="17"){
			/*
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCalPal = mapDataLayerP;
			*/
		}
		else if(l=="18"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCalPis = mapDataLayerP;
		}
		else if(l=="19"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cRedDep = mapDataLayerP;
		}
		else if(l=="20"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cRedNac = mapDataLayerP;
		}
		else if(l=="21"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cRedVec = mapDataLayerP;
		}
		else if(l=="28"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cAdmNac = mapDataLayerP;
		}
		else if(l=="29"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cAdmReg = mapDataLayerP;
		}
		else if(l=="30"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cZonAmo = mapDataLayerP;
		}
		else if(l=="42"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cPobDep = mapDataLayerP;
		}
		else if(l=="43"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cPobDis = mapDataLayerP;
		}
		else if(l=="44"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cPobPro = mapDataLayerP;
		}
		else if(l=="45"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cCulAgr = mapDataLayerP;
		}
		else if(l=="46"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cGana = mapDataLayerP;
		}
		else if(l=="48"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			cbtnTempBajas = mapDataLayerP;
		}
		//Fisiografia > Geologia > Hidrogeologia
		else if(l=="50"){
			map.createPane('pane_hidrogelogia0');
	        map.getPane('pane_hidrogelogia0').style.zIndex = 400;
	        map.getPane('pane_hidrogelogia0').style['mix-blend-mode'] = 'normal';
    	var layer_hidrogelogia0 = new L.geoJson.multiStyle(geojson, {
        //attribution: '<a href=""></a>',
        pane: 'pane_hidrogelogia0',
        onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Descripcion: </h4><h5><i>"+feature.properties.descripcio+"</i></h5>");
					 layer.on('mouseclick', function (e) {
			            this.openPopup();
			        });
				},
        styles: [stlHidrGeol,]
    });

        map.addLayer(layer_hidrogelogia0);
			aHidr = layer_hidrogelogia0;

			// Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h4>Leyenda</h4>';
			        div.innerHTML += '<i style="background:rgba(231,157,108,1.0)"></i> E-ms <br>';
			        div.innerHTML += '<i style="background:rgba(80,133,63,1.0)"></i> Ji-di/gb <br>';
			        div.innerHTML += '<i style="background:rgba(50,222,76,1.0)"></i> Jm-vs <br>';
			        div.innerHTML += '<i style="background:rgba(90,104,212,1.0)"></i> Js-vs <br>';
			        div.innerHTML += '<i style="background:rgba(38,127,216,1.0)"></i> Ki-an/da <br>';
			        div.innerHTML += '<i style="background:rgba(222,55,13,1.0)"></i> Ki-di/gb <br>';
			        div.innerHTML += '<i style="background:rgba(117,240,205,1.0)"></i> Ki-di/gb-pt <br>';
			        div.innerHTML += '<i style="background:rgba(44,202,223,1.0)"></i> Ki-mzgr/gr <br>';
			        div.innerHTML += '<i style="background:rgba(232,230,110,1.0)"></i> Ki-mzgr/gr-l <br>';
			        div.innerHTML += '<i style="background:rgba(93,172,205,1.0)></i> Kis-vs <br>';
			        div.innerHTML += '<i style="background:rgba(211,73,235,1.0)"></i> Ks-gd/to <br>';
			        div.innerHTML += '<i style="background:rgba(147,93,209,1.0)"></i> Ks-gd/to-ca <br>';
			        div.innerHTML += '<i style="background:rgba(232,95,173,1.0)"></i> Ks-gd/to-i <br>';
			        div.innerHTML += '<i style="background:rgba(96,233,88,1.0)"></i> Ks-gd/to-p <br>';
			        div.innerHTML += '<i style="background:rgba(95,85,212,1.0)"></i> Ks-mzgr/gdi <br>';
			        div.innerHTML += '<i style="background:rgba(82,155,162,1.0)></i> Ks-mzgr/gdi-t <br>';
			        div.innerHTML += '<i style="background:rgba(206,62,88,1.0)"></i> Nmp-v <br>';
			        div.innerHTML += '<i style="background:rgba(112,236,178,1.0)"></i> Nm-v <br>';
			        div.innerHTML += '<i style="background:rgba(196,225,68,1.0)"></i> Nm-vs <br>';
			        div.innerHTML += '<i style="background:rgba(238,82,82,1.0)"></i> Np-v <br>';
			        div.innerHTML += '<i style="background:rgba(211,171,12,1.0)"></i> P-an/ri <br>';
			        div.innerHTML += '<i style="background:rgba(239,31,191,1.0)"></i> PeA-e/gn <br>';
			        div.innerHTML += '<i style="background:rgba(19,88,236,1.0)"></i> PeB-gn <br>';
			        div.innerHTML += '<i style="background:rgba(178,99,220,1.0)"></i> Pe-gr <br>';
			        div.innerHTML += '<i style="background:rgba(107,221,212,1.0)"></i> Pe-m <br>';
			        div.innerHTML += '<i style="background:rgba(222,165,84,1.0)"></i> Pe-vs <br>';
			        div.innerHTML += '<i style="background:rgba(125,207,62,1.0)"></i> Pi-di <br>';
			        div.innerHTML += '<i style="background:rgba(121,92,200,1.0)"></i> Pi-gd/gr <br>';
			        div.innerHTML += '<i style="background:rgba(162,230,43,1.0)"></i> PN-vs <br>';
			        div.innerHTML += '<i style="background:rgba(219,12,92,1.0)"></i> P-to/gd <br>';

			    return div;
			};

			legHidr = legend.addTo(map);

		}
		else if(l=="51"){
			map.createPane('pane_Metalogenetica2');
		    map.getPane('pane_Metalogenetica2').style.zIndex = 402;
		    map.getPane('pane_Metalogenetica2').style['mix-blend-mode'] = 'normal';
		    var layer_Metalogenetica2 = new L.geoJson.multiStyle(geojson, {
		        //attribution: '<a href=""></a>',
		        pane: 'pane_Metalogenetica2',
		        onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Nombre Franja: </h4><h5><i>"+feature.properties.nombre_fra+"</i></h5>");
					 layer.on('mouseclick', function (e) {
			            this.openPopup();
			        });
				},
		        styles: [stlMeta,]
		    });
		        //bounds_group.addLayer(layer_Metalogenetica2);
		        map.addLayer(layer_Metalogenetica2);
			aMeta = layer_Metalogenetica2;

			// Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h4>Leyenda</h4>';
			        div.innerHTML += '<i style="background:rgba(237,196,100,1.0)"></i> IX <br>';
			        div.innerHTML += '<i style="background:rgba(160,204,106,1.0)"></i> V <br>';
			        div.innerHTML += '<i style="background:rgba(218,12,23,1.0)"></i> VIII <br>';
			        div.innerHTML += '<i style="background:rgba(214,95,190,1.0)></i> X <br>';
			        div.innerHTML += '<i style="background:rgba(93,223,119,1.0)"></i> XIV <br>';
			        div.innerHTML += '<i style="background:rgba(123,227,224,1.0)"></i> XVIII <br>';
			         div.innerHTML += '<i style="background:rgba(48,94,209,1.0)"></i> XXI <br>';

			    return div;
			};

			legMeta = legend.addTo(map);
		}
		else if(l=="53"){

			map.createPane('pane_Relieves5');
		    map.getPane('pane_Relieves5').style.zIndex = 405;
		    map.getPane('pane_Relieves5').style['mix-blend-mode'] = 'normal';
		    var layer_Relieves5 = new L.geoJson.multiStyle(geojson, {
		        //attribution: '<a href=""></a>',
		        pane: 'pane_Relieves5',
		        onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Simbolo</h4><h5><i>"+feature.properties.simbolo+"</i></h5>");
					 layer.on('mouseclick', function (e) {
			            this.openPopup();
			        });
				},
		        styles: [stlReli,]
		    });
		        //bounds_group.addLayer(layer_Relieves5);
		        map.addLayer(layer_Relieves5);

			aReli  = layer_Relieves5;

			// Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h4>Leyenda</h4>';
			        div.innerHTML += '<i style="background:rgba(208,16,90,1.0)"></i> C-d <br>';
			        div.innerHTML += '<i style="background:rgba(57,221,131,1.0)"></i> Fv3-a <br>';
			        div.innerHTML += '<i style="background:rgba(58,128,203,1.0)"></i> Lag <br>';
			        div.innerHTML += '<i style="background:rgba(132,211,106,1.0)></i> Ll-a <br>';
			        div.innerHTML += '<i style="background:rgba(57,237,75,1.0)"></i> Lld-c <br>';
			        div.innerHTML += '<i style="background:rgba(226,86,16,1.0)"></i> Llo-b <br>';
			        div.innerHTML += '<i style="background:rgba(210,45,166,1.0)"></i> Pob <br>';
			        div.innerHTML += '<i style="background:rgba(229,237,73,1.0)"></i> V-a <br>';
			        div.innerHTML += '<i style="background:rgba(119,213,229,1.0)"></i> Vc-d <br>';
			        div.innerHTML += '<i style="background:rgba(160,108,110,1.0)></i> Vc-e <br>';
			        div.innerHTML += '<i style="background:rgba(127,71,31,1.0)"></i> Vs1-d <br>';
			        div.innerHTML += '<i style="background:rgba(160,228,58,1.0)"></i> Vs1-e <br>';
			        div.innerHTML += '<i style="background:rgba(70,206,179,1.0)"></i> Vs2-d <br>';
			        div.innerHTML += '<i style="background:rgba(66,84,207,1.0)"></i> Vs2d-e <br>';
			        div.innerHTML += '<i style="background:rgba(101,67,221,1.0)"></i> Vs2-e <br>';
			        div.innerHTML += '<i style="background:rgba(223,55,58,1.0)></i> Vs3-e <br>';

			    return div;
			};

			legReli = legend.addTo(map);
		}
		//VULNERABILIDAD DE TIERRAS
		else if(l=="54"){
			map.createPane('pane_VulnerabilidadTierras4');
	        map.getPane('pane_VulnerabilidadTierras4').style.zIndex = 404;
	        map.getPane('pane_VulnerabilidadTierras4').style['mix-blend-mode'] = 'normal';
	   	    var layer_VulnerabilidadTierras4 = new L.geoJson.multiStyle(geojson, {
		        pane: 'pane_VulnerabilidadTierras4',
		        onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Simbolo</h4><h5><i>"+feature.properties.unidad+"</i></h5>");
					 layer.on('mouseclick', function (e) {
			            this.openPopup();
			        });
				},
		        styles: [stlVulnTier,]
	    	});

        	map.addLayer(layer_VulnerabilidadTierras4);
			aVuln  = layer_VulnerabilidadTierras4;

			// Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h4>Leyenda</h4>';
			        div.innerHTML += '<i style="background:rgba(66,76,218,1.0)"></i> Laguna <br>';
			        div.innerHTML += '<i style="background:rgba(154,151,151,1.0)"></i> Poblado <br>';
			        div.innerHTML += '<i style="background:rgba(243,0,0,1.0)"></i> Tierras con Alto Riesgo <br>';
			        div.innerHTML += '<i style="background:rgba(248,165,0,1.0)></i> Tierras con Moderado Riesgo <br>';
			        div.innerHTML += '<i style="background:rgba(255,243,1,1.0)"></i> Tierras con Leve Riesgo <br>';
			        div.innerHTML += '<i style="background:rgba(51,160,44,1.0)"></i> Tierras con Ligero Riesgo <br>';

			    return div;
			};

			legVulne = legend.addTo(map);
		}
		else if(l=="55"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aPend = mapDataLayerP;
		}
		//CUM - Capacidad de Uso Mayor
		else if(l=="56"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);

			map.createPane('pane_CUM0');
	        map.getPane('pane_CUM0').style.zIndex = 400;
	        map.getPane('pane_CUM0').style['mix-blend-mode'] = 'normal';
		    var layer_CUM0 = new L.geoJson.multiStyle(geojson, {
		        //attribution: '<a href=""></a>',
		        pane: 'pane_CUM0',
		        //onEachFeature: pop_CUM0,
		        onEachFeature: function (feature, layer) {
					layer.bindPopup("<h4>Simbolo</h4><h5><i>"+feature.properties.simbolo+"</i></h5>");
					 layer.on('mouseclick', function (e) {
			            this.openPopup();
			        });
				},
		        styles: [styleCum,]
		    });
	        //bounds_group.addLayer(layer_CUM0);
	        map.addLayer(layer_CUM0);

	        // Insertando una leyenda en el mapa
			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h3>Leyenda</h3>';
			        div.innerHTML += '<i style="background:rgba(209,95,42,1.5)"></i> A1s(r)-C2s(r) <br>';
			        div.innerHTML += '<i style="background:rgba(162,205,86,1.5)"></i> A2s(r)-C3s(r) <br>';
			        div.innerHTML += '<i style="background:rgba(218,220,66,1.5)"></i> Centros poblados <br>';
			        div.innerHTML += '<i style="background:rgba(243,0,0,1.5)"></i> Lagunas <br>';
			        div.innerHTML += '<i style="background:rgba(150,73,17,1.5)"></i> Xs(d) <br>';
			        div.innerHTML += '<i style="background:rgba(137,121,209,1.5)"></i> Xs(psva) <br>';
			        div.innerHTML += '<i style="background:rgba(130,40,204,1.5)"></i> Xs(py) <br>';
			        div.innerHTML += '<i style="background:rgba(70,93,210,1.5)"></i> Xse(d) <br>';
			        div.innerHTML += '<i style="background:rgba(74,153,76,1.5)"></i> Xse(ld) <br>';
			        div.innerHTML += '<i style="background:rgba(223,163,43,1.5)"></i> Xse(le) <br>';
			        div.innerHTML += '<i style="background:rgba(240,45,192,1.5)"></i> Xse-C3s(r)-A3s(r) <br>';
			        div.innerHTML += '<i style="background:rgba(138,187,233,1.5)"></i> Xse-F3se*-A3sec <br>';
			        div.innerHTML += '<i style="background:rgba(43,215,54,1.5)"></i> Xse-P2sc <br>';
			        div.innerHTML += '<i style="background:rgba(37,213,172,1.5)"></i> Xse-P2sec <br>';
			        div.innerHTML += '<i style="background:rgba(101,204,220,1.5)"></i> Xse-P3se(t) <br>';
			        div.innerHTML += '<i style="background:rgba(216,28,104,1.5)"></i> Xse-P3se(t)-A3se(r*) <br>';

			    return div;
			};

			legCum = legend.addTo(map);

			aCum  = layer_CUM0;
		}
		//Hidografia Principal
		else if(l=="57"){
				//map.createPane('pane_HidrografiaPrincipal1');
		        //map.getPane('pane_HidrografiaPrincipal1').style.zIndex = 401;
		        //map.getPane('pane_HidrografiaPrincipal1').style['mix-blend-mode'] = 'normal';
		    var layer_HidrografiaPrincipal1 = new L.geoJson.multiStyle(geojson, {
		        //pane: 'pane_HidrografiaPrincipal1',
		        styles: [stlHidrPrin,]
		    });
		    	//var bounds_group = new L.featureGroup([]);
		        //bounds_group.addLayer(layer_HidrografiaPrincipal1);
		        map.addLayer(layer_HidrografiaPrincipal1);
		        aHidrPrin  = layer_HidrografiaPrincipal1;

		        // Insertando una leyenda en el mapa
				var legend = L.control({position: 'bottomright'});

				legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend');

			    // loop through our density intervals and generate a label with a colored square for each interval
			  		//div.innerHTML += '<h3>Leyenda</h3>';
			        div.innerHTML += '<img src="wmslib/img/legend/HP_QuebradaHmeda0.png"> Quebrada Húmeda <br>';
			        div.innerHTML += '<img src="wmslib/img/legend/HP_QuebradaSeca1.png"> Quebrada Seca <br>';
			        div.innerHTML += '<img src="wmslib/img/legend/HP_RoPrincipal2.png"> Río Principal <br>';
			        div.innerHTML += '<img src="wmslib/img/legend/HP_RoSecundario3.png"> Río Secundario <br>';
			    return div;
			};

			legHidrPrin = legend.addTo(map);
		}
		else if(l=="58"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aHidrGene  = mapDataLayerP;
		}
		else if(l=="59"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aLagu  = mapDataLayerP;
		}
		else if(l=="60"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aCuen  = mapDataLayerP;
		}
		else if(l=="61"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aSubc  = mapDataLayerP;
		}
		else if(l=="62"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aMana  = mapDataLayerP;
		}
		else if(l=="63"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aCaud  = mapDataLayerP;
		}
		else if(l=="64"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aEcol  = mapDataLayerP;
		}
		else if(l=="65"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aCobe  = mapDataLayerP;
		}
		else if(l=="66"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aIsla  = mapDataLayerP;
		}
		else if(l=="67"){
			//var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			var estilo =getEstiloCapa("mar_ecosist");
			var SLDStyler = new L.SLDStyler(estilo);
							var mapDataLayerP = L.geoJson(geojson, {
				                  style: SLDStyler.getStyleFunction()
				               }).addTo(map);
			aMaryeco  = mapDataLayerP;
		}
		else if(l=="68"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aEsta  = mapDataLayerP;
		}
		else if(l=="71"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aCami  = mapDataLayerP;
		}
		else if(l=="72"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aLinEle  = mapDataLayerP;
		}
		else if(l=="73"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aRedFib  = mapDataLayerP;
		}
		else if(l=="74"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aGaso  = mapDataLayerP;
		}
		else if(l=="75"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aPoli  = mapDataLayerP;
		}
		else if(l=="76"){
			var mapDataLayerP = L.geoJson(geojson, {style: stlLimDep}).addTo(map);
			aRedGas  = mapDataLayerP;
		}


		//console.log(lLimDep);
		//console.log(lTemp);
		//index =+ 1;
	}

};

/*=========================LLAMADAS A CAPAS==========================*/
//console.log(map);

//Capa Limite Departamental p
$( "#aLdep" ).click(function() {
	//alert(lLimDep+"/"+lLimPro);
	fields=limite_departamental;

	if ($("#aLdep").hasClass("active")){
	  $("#aLdep").removeClass("active");
	  map.removeLayer(lLimDep);

	}
	else {
	  $("#aLdep").addClass("active");
	  getData("limite_departamental","p","1");
	  console.log(lLimDep);
	}
});

//Capa Limite Provincial p
$( "#aLpro" ).click(function() {
	//alert(lLimDep+"/"+lLimPro);
	fields=limite_provincial;

	if ($("#aLpro").hasClass("active")){
	  $("#aLpro").removeClass("active");
	  map.removeLayer(lLimPro);

	}
	else {
	  $("#aLpro").addClass("active");
	  getData("limite_provincial","p","2");
	}

});


//Capa Limite Distrital p
$( "#aLdis" ).click(function() {
	fields=limite_distrital;

	if($( "#aLdis" ).toggleClass("active").hasClass("active")){
		getData("limite_distrital","p","3");
		//getData("layer_styles","s","3")
	}
	else{
		map.removeLayer(lLimDis);
		map.removeControl(infLimDis);
		//map.removeControl(legLimDis);
	};
});

//Capa Litoral p
$( "#aLit" ).click(function() {
	fields=litoral;

	if($( "#aLit" ).toggleClass("active").hasClass("active")){
		getData("litoral","p","4");
	}
	else{
		map.removeLayer(lLit);
	};
});


//Capa Centros Poblados c
$( "#aCCPP" ).click(function() {
	fields=centros_poblados;

	if($( "#aCCPP" ).toggleClass("active").hasClass("active")){
		getData("centros_poblados","c","5");
	}
	else{
		map.removeLayer(lCenPob);
	};
});

//Centros poblados por Distrito
		//CHINCHA - CENTROS POBLADOS
		$( "#cpAltLar" ).click(function() {
			fields=centros_poblados_chincha_altolaran;

			if($( "#cpAltLar" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_chincha_altolaran","c","501");
			}
			else{
				map.removeLayer(cpAltLar);
			};
		});

		$( "#cpChav" ).click(function() {
			fields=centros_poblados_chincha_chavin;

			if($( "#cpChav" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_chincha_chavin","c","502");
			}
			else{
				map.removeLayer(cpChav);
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

		$( "#cpPueNueC" ).click(function() {
			fields=centros_poblados_chincha_pueblonuevo;

			if($( "#cpPueNueC" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_chincha_pueblonuevo","c","507");
			}
			else{
				map.removeLayer(cpPueNueC);
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

		//ICA - CENTROS POBLADOS
		$( "#cpIca" ).click(function() {
			fields=centros_poblados_ica_ica;

			if($( "#cpIca" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_ica","c","512");
			}
			else{
				map.removeLayer(cpIca);
			};
		});

		$( "#cpLaTin" ).click(function() {
			fields=centros_poblados_ica_tinguina;

			if($( "#cpLaTin" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_tinguina","c","513");
			}
			else{
				map.removeLayer(cpLaTin);
			};
		});

		$( "#cpLosAqu" ).click(function() {
			fields=centros_poblados_ica_aquijes;

			if($( "#cpLosAqu" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_aquijes","c","514");
			}
			else{
				map.removeLayer(cpLosAqu);
			};
		});

		$( "#cpOcu" ).click(function() {
			fields=centros_poblados_ica_ocucaje;

			if($( "#cpOcu" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_ocucaje","c","515");
			}
			else{
				map.removeLayer(cpOcu);
			};
		});

		$( "#cpPac" ).click(function() {
			fields=centros_poblados_ica_pachacutec;

			if($( "#cpPac" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_pachacutec","c","516");
			}
			else{
				map.removeLayer(cpPac);
			};
		});

		$( "#cpParc" ).click(function() {
			fields=centros_poblados_ica_parcona;

			if($( "#cpParc" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_parcona","c","517");
			}
			else{
				map.removeLayer(cpParc);
			};
		});

		$( "#cpPueNueI" ).click(function() {
			fields=centros_poblados_ica_pueblonuevo;

			if($( "#cpPueNueI" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_pueblonuevo","c","518");
			}
			else{
				map.removeLayer(cpPueNueI);
			};
		});

		$( "#cpSal" ).click(function() {
			fields=centros_poblados_ica_salas;

			if($( "#cpSal" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_salas","c","519");
			}
			else{
				map.removeLayer(cpSal);
			};
		});

		$( "#cpSjMol" ).click(function() {
			fields=centros_poblados_ica_sjmolinos;

			if($( "#cpSjMol" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_sjmolinos","c","520");
			}
			else{
				map.removeLayer(cpSjMol);
			};
		});

		$( "#cpSjBau" ).click(function() {
			fields=centros_poblados_ica_sjbautista;

			if($( "#cpSjBau" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_sjbautista","c","521");
			}
			else{
				map.removeLayer(cpSjBau);
			};
		});

		$( "#cpSan" ).click(function() {
			fields=centros_poblados_ica_santiago;

			if($( "#cpSan" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_santiago","c","522");
			}
			else{
				map.removeLayer(cpSan);
			};
		});

		$( "#cpSub" ).click(function() {
			fields=centros_poblados_ica_subtanjalla;

			if($( "#cpSub" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_subtanjalla","c","523");
			}
			else{
				map.removeLayer(cpSub);
			};
		});

		$( "#cpTat" ).click(function() {
			fields=centros_poblados_ica_tate;

			if($( "#cpTat" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_tate","c","524");
			}
			else{
				map.removeLayer(cpTat);
			};
		});

		$( "#cpYau" ).click(function() {
			fields=centros_poblados_ica_yaucarosario;

			if($( "#cpYau" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_ica_yaucarosario","c","525");
			}
			else{
				map.removeLayer(cpYau);
			};
		});

		//NAZCA - CENTROS POBLADOS
		$( "#cpChan" ).click(function() {
			fields=centros_poblados_nazca_changuillo;

			if($( "#cpChan" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_nazca_changuillo","c","526");
			}
			else{
				map.removeLayer(cpChan);
			};
		});

		$( "#cpElIng" ).click(function() {
			fields=centros_poblados_nazca_ingenio;

			if($( "#cpElIng" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_nazca_ingenio","c","527");
			}
			else{
				map.removeLayer(cpElIng);
			};
		});

		$( "#cpMar" ).click(function() {
			fields=centros_poblados_nazca_marcona;

			if($( "#cpMar" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_nazca_marcona","c","528");
			}
			else{
				map.removeLayer(cpMar);
			};
		});

		$( "#cpNaz" ).click(function() {
			fields=centros_poblados_nazca_nazca;

			if($( "#cpNaz" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_nazca_nazca","c","529");
			}
			else{
				map.removeLayer(cpNaz);
			};
		});

		$( "#cpVisAle" ).click(function() {
			fields=centros_poblados_nazca_vistaalegre;

			if($( "#cpVisAle" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_nazca_vistaalegre","c","530");
			}
			else{
				map.removeLayer(cpVisAle);
			};
		});

		//PALPA - CENTROS POBLADOS
		$( "#cpLli" ).click(function() {
			fields=centros_poblados_palpa_llipata;

			if($( "#cpLli" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_palpa_llipata","c","531");
			}
			else{
				map.removeLayer(cpLli);
			};
		});

		$( "#cpPal" ).click(function() {
			fields=centros_poblados_palpa_palpa;

			if($( "#cpPal" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_palpa_palpa","c","532");
			}
			else{
				map.removeLayer(cpPal);
			};
		});

		$( "#cpRioGra" ).click(function() {
			fields=centros_poblados_palpa_riogrande;

			if($( "#cpRioGra" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_palpa_riogrande","c","533");
			}
			else{
				map.removeLayer(cpRioGra);
			};
		});

		$( "#cpSanCru" ).click(function() {
			fields=centros_poblados_palpa_santacruz;

			if($( "#cpSanCru" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_palpa_santacruz","c","534");
			}
			else{
				map.removeLayer(cpSanCru);
			};
		});

		$( "#cpTib" ).click(function() {
			fields=centros_poblados_palpa_tibillo;

			if($( "#cpTib" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_palpa_tibillo","c","535");
			}
			else{
				map.removeLayer(cpTib);
			};
		});

		//PISCO - CENTROS POBLADOS
		$( "#cpHua" ).click(function() {
			fields=centros_poblados_pisco_huancano;

			if($( "#cpHua" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_huancano","c","536");
			}
			else{
				map.removeLayer(cpHua);
			};
		});

		$( "#cpHum" ).click(function() {
			fields=centros_poblados_pisco_humay;

			if($( "#cpHum" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_humay","c","537");
			}
			else{
				map.removeLayer(cpHum);
			};
		});

		$( "#cpInd" ).click(function() {
			fields=centros_poblados_pisco_independencia;

			if($( "#cpInd" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_independencia","c","538");
			}
			else{
				map.removeLayer(cpInd);
			};
		});

		$( "#cpPara" ).click(function() {
			fields=centros_poblados_pisco_paracas;

			if($( "#cpPara" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_paracas","c","539");
			}
			else{
				map.removeLayer(cpPara);
			};
		});

		$( "#cpPis" ).click(function() {
			fields=centros_poblados_pisco_pisco;

			if($( "#cpPis" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_pisco","c","540");
			}
			else{
				map.removeLayer(cpPis);
			};
		});

		$( "#cpSanAnd" ).click(function() {
			fields=centros_poblados_pisco_sanandres;

			if($( "#cpSanAnd" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_sanandres","c","541");
			}
			else{
				map.removeLayer(cpSanAnd);
			};
		});

		$( "#cpSanCle" ).click(function() {
			fields=centros_poblados_pisco_sanclemente;

			if($( "#cpSanCle" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_sanclemente","c","542");
			}
			else{
				map.removeLayer(cpSanCle);
			};
		});

		$( "#cpTupAma" ).click(function() {
			fields=centros_poblados_pisco_tupacamaru;

			if($( "#cpTupAma" ).toggleClass("active").hasClass("active")){
				getData("centros_poblados_pisco_tupacamaru","c","543");
			}
			else{
				map.removeLayer(cpTupAma);
			};
		});

//Centros Educativos por Distrito
		//CHINCHA - CENTROS EDUCATIVOS
		$( "#ceAltLar" ).click(function() {
			fields=centros_educativos_chincha_altolaran;

			if($( "#ceAltLar" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_altolaran","c","321");
			}
			else{
				map.removeLayer(ceAltLar);
			};
		});

		$( "#ceChav" ).click(function() {
			fields=centros_educativos_chincha_chavin;

			if($( "#ceChav" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_chavin","c","322");
			}
			else{
				map.removeLayer(ceChav);
			};
		});

		$( "#ceChiAlt" ).click(function() {
			fields=centros_educativos_chincha_chinchaalta;

			if($( "#ceChiAlt" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_chinchaalta","c","323");
			}
			else{
				map.removeLayer(ceChiAlt);
			};
		});

		$( "#ceChiBaj" ).click(function() {
			fields=centros_educativos_chincha_chinchabaja;

			if($( "#ceChiBaj" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_chinchabaja","c","324");
			}
			else{
				map.removeLayer(ceChiBaj);
			};
		});

		$( "#ceElCar" ).click(function() {
			fields=centros_educativos_chincha_elcarmen;

			if($( "#ceElCar" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_elcarmen","c","325");
			}
			else{
				map.removeLayer(ceElCar);
			};
		});

		$( "#ceGroPra" ).click(function() {
			fields=centros_educativos_chincha_grocioprado;

			if($( "#ceGroPra" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_grocioprado","c","326");
			}
			else{
				map.removeLayer(ceGroPra);
			};
		});

		$( "#cePueNueC" ).click(function() {
			fields=centros_educativos_chincha_pueblonuevo;

			if($( "#cePueNueC" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_pueblonuevo","c","327");
			}
			else{
				map.removeLayer(cePueNueC);
			};
		});

		$( "#ceSjYan" ).click(function() {
			fields=centros_educativos_chincha_sjyanac;

			if($( "#ceSjYan" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_sjyanac","c","328");
			}
			else{
				map.removeLayer(ceSjYan);
			};
		});

		$( "#ceSpHua" ).click(function() {
			fields=centros_educativos_chincha_sphuacarpana;

			if($( "#ceSpHua" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_sphuacarpana","c","329");
			}
			else{
				map.removeLayer(ceSpHua);
			};
		});

		$( "#ceSun" ).click(function() {
			fields=centros_educativos_chincha_sunampe;

			if($( "#ceSun" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_sunampe","c","330");
			}
			else{
				map.removeLayer(ceSun);
			};
		});

		$( "#ceTamMor" ).click(function() {
			fields=centros_educativos_chincha_tambomora;

			if($( "#ceTamMor" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_chincha_tambomora","c","331");
			}
			else{
				map.removeLayer(ceTamMor);
			};
		});

		//ICA - CENTROS EDUCATIVOS
		$( "#ceIca" ).click(function() {
			fields=centros_educativos_ica_ica;

			if($( "#ceIca" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_ica","c","332");
			}
			else{
				map.removeLayer(ceIca);
			};
		});

		$( "#ceLaTin" ).click(function() {
			fields=centros_educativos_ica_tinguina;

			if($( "#ceLaTin" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_tinguina","c","333");
			}
			else{
				map.removeLayer(ceLaTin);
			};
		});

		$( "#ceLosAqu" ).click(function() {
			fields=centros_educativos_ica_aquijes;

			if($( "#ceLosAqu" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_aquijes","c","334");
			}
			else{
				map.removeLayer(ceLosAqu);
			};
		});

		$( "#ceOcu" ).click(function() {
			fields=centros_educativos_ica_ocucaje;

			if($( "#ceOcu" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_ocucaje","c","335");
			}
			else{
				map.removeLayer(ceOcu);
			};
		});

		$( "#cePac" ).click(function() {
			fields=centros_educativos_ica_pachacutec;

			if($( "#cePac" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_pachacutec","c","336");
			}
			else{
				map.removeLayer(cePac);
			};
		});

		$( "#ceParc" ).click(function() {
			fields=centros_educativos_ica_parcona;

			if($( "#ceParc" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_parcona","c","337");
			}
			else{
				map.removeLayer(ceParc);
			};
		});

		$( "#cePueNueI" ).click(function() {
			fields=centros_educativos_ica_pueblonuevo;

			if($( "#cePueNueI" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_pueblonuevo","c","338");
			}
			else{
				map.removeLayer(cePueNueI);
			};
		});

		$( "#ceSal" ).click(function() {
			fields=centros_educativos_ica_salas;

			if($( "#ceSal" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_salas","c","339");
			}
			else{
				map.removeLayer(ceSal);
			};
		});

		$( "#ceSjMol" ).click(function() {
			fields=centros_educativos_ica_sjmolinos;

			if($( "#ceSjMol" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_sjmolinos","c","340");
			}
			else{
				map.removeLayer(ceSjMol);
			};
		});

		$( "#ceSjBau" ).click(function() {
			fields=centros_educativos_ica_sjbautista;

			if($( "#ceSjBau" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_sjbautista","c","341");
			}
			else{
				map.removeLayer(ceSjBau);
			};
		});

		$( "#ceSan" ).click(function() {
			fields=centros_educativos_ica_santiago;

			if($( "#ceSan" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_santiago","c","342");
			}
			else{
				map.removeLayer(ceSan);
			};
		});

		$( "#ceSub" ).click(function() {
			fields=centros_educativos_ica_subtanjalla;

			if($( "#ceSub" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_subtanjalla","c","343");
			}
			else{
				map.removeLayer(ceSub);
			};
		});

		$( "#ceTat" ).click(function() {
			fields=centros_educativos_ica_tate;

			if($( "#ceTat" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_tate","c","344");
			}
			else{
				map.removeLayer(ceTat);
			};
		});

		$( "#ceYau" ).click(function() {
			fields=centros_educativos_ica_yaucarosario;

			if($( "#ceYau" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_ica_yaucarosario","c","345");
			}
			else{
				map.removeLayer(ceYau);
			};
		});

		//NAZCA - CENTROS EDUCATIVOS
		$( "#ceChan" ).click(function() {
			fields=centros_educativos_nazca_changuillo;

			if($( "#ceChan" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_nazca_changuillo","c","346");
			}
			else{
				map.removeLayer(ceChan);
			};
		});

		$( "#ceElIng" ).click(function() {
			fields=centros_educativos_nazca_ingenio;

			if($( "#ceElIng" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_nazca_ingenio","c","347");
			}
			else{
				map.removeLayer(ceElIng);
			};
		});

		$( "#ceMar" ).click(function() {
			fields=centros_educativos_nazca_marcona;

			if($( "#ceMar" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_nazca_marcona","c","348");
			}
			else{
				map.removeLayer(ceMar);
			};
		});

		$( "#ceNaz" ).click(function() {
			fields=centros_educativos_nazca_nazca;

			if($( "#ceNaz" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_nazca_nazca","c","349");
			}
			else{
				map.removeLayer(ceNaz);
			};
		});

		$( "#ceVisAle" ).click(function() {
			fields=centros_educativos_nazca_vistaalegre;

			if($( "#ceVisAle" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_nazca_vistaalegre","c","350");
			}
			else{
				map.removeLayer(ceVisAle);
			};
		});

		//PALPA - CENTROS EDUCATIVOS
		$( "#ceLli" ).click(function() {
			fields=centros_educativos_palpa_llipata;

			if($( "#ceLli" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_palpa_llipata","c","351");
			}
			else{
				map.removeLayer(ceLli);
			};
		});

		$( "#cePal" ).click(function() {
			fields=centros_educativos_palpa_palpa;

			if($( "#cePal" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_palpa_palpa","c","352");
			}
			else{
				map.removeLayer(cePal);
			};
		});

		$( "#ceRioGra" ).click(function() {
			fields=centros_educativos_palpa_riogrande;

			if($( "#ceRioGra" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_palpa_riogrande","c","353");
			}
			else{
				map.removeLayer(ceRioGra);
			};
		});

		$( "#ceSanCru" ).click(function() {
			fields=centros_educativos_palpa_santacruz;

			if($( "#ceSanCru" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_palpa_santacruz","c","354");
			}
			else{
				map.removeLayer(ceSanCru);
			};
		});

		$( "#ceTib" ).click(function() {
			fields=centros_educativos_palpa_tibillo;

			if($( "#ceTib" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_palpa_tibillo","c","355");
			}
			else{
				map.removeLayer(ceTib);
			};
		});

		//PISCO - CENTROS EDUCATIVOS
		$( "#ceHua" ).click(function() {
			fields=centros_educativos_pisco_huancano;

			if($( "#ceHua" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_huancano","c","356");
			}
			else{
				map.removeLayer(ceHua);
			};
		});

		$( "#ceHum" ).click(function() {
			fields=centros_educativos_pisco_humay;

			if($( "#ceHum" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_humay","c","357");
			}
			else{
				map.removeLayer(ceHum);
			};
		});

		$( "#ceInd" ).click(function() {
			fields=centros_educativos_pisco_independencia;

			if($( "#ceInd" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_independencia","c","358");
			}
			else{
				map.removeLayer(ceInd);
			};
		});

		$( "#cePara" ).click(function() {
			fields=centros_educativos_pisco_paracas;

			if($( "#cePara" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_paracas","c","359");
			}
			else{
				map.removeLayer(cePara);
			};
		});

		$( "#cePis" ).click(function() {
			fields=centros_educativos_pisco_pisco;

			if($( "#cePis" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_pisco","c","360");
			}
			else{
				map.removeLayer(cePis);
			};
		});

		$( "#ceSanAnd" ).click(function() {
			fields=centros_educativos_pisco_sanandres;

			if($( "#ceSanAnd" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_sanandres","c","361");
			}
			else{
				map.removeLayer(ceSanAnd);
			};
		});

		$( "#ceSanCle" ).click(function() {
			fields=centros_educativos_pisco_sanclemente;

			if($( "#ceSanCle" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_sanclemente","c","362");
			}
			else{
				map.removeLayer(ceSanCle);
			};
		});

		$( "#ceTupAma" ).click(function() {
			fields=centros_educativos_pisco_tupacamaru;

			if($( "#ceTupAma" ).toggleClass("active").hasClass("active")){
				getData("centros_educativos_pisco_tupacamaru","c","363");
			}
			else{
				map.removeLayer(ceTupAma);
			};
		});
//Centros Salud por Distrito
		//CHINCHA - CENTROS SALUD
		$( "#csAltLar" ).click(function() {
			fields=centros_salud_chincha_altolaran;

			if($( "#csAltLar" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_altolaran","c","364");
			}
			else{
				map.removeLayer(csAltLar);
			};
		});

		$( "#csChav" ).click(function() {
			fields=centros_salud_chincha_chavin;

			if($( "#csChav" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_chavin","c","365");
			}
			else{
				map.removeLayer(csChav);
			};
		});

		$( "#csChiAlt" ).click(function() {
			fields=centros_salud_chincha_chinchaalta;

			if($( "#csChiAlt" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_chinchaalta","c","366");
			}
			else{
				map.removeLayer(csChiAlt);
			};
		});

		$( "#csChiBaj" ).click(function() {
			fields=centros_salud_chincha_chinchabaja;

			if($( "#csChiBaj" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_chinchabaja","c","367");
			}
			else{
				map.removeLayer(csChiBaj);
			};
		});

		$( "#csElCar" ).click(function() {
			fields=centros_salud_chincha_elcarmen;

			if($( "#csElCar" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_elcarmen","c","368");
			}
			else{
				map.removeLayer(csElCar);
			};
		});

		$( "#csGroPra" ).click(function() {
			fields=centros_salud_chincha_grocioprado;

			if($( "#csGroPra" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_grocioprado","c","369");
			}
			else{
				map.removeLayer(csGroPra);
			};
		});

		$( "#csPueNueC" ).click(function() {
			fields=centros_salud_chincha_pueblonuevo;

			if($( "#csPueNueC" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_pueblonuevo","c","370");
			}
			else{
				map.removeLayer(csPueNueC);
			};
		});

		$( "#csSjYan" ).click(function() {
			fields=centros_salud_chincha_sjyanac;

			if($( "#csSjYan" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_sjyanac","c","371");
			}
			else{
				map.removeLayer(csSjYan);
			};
		});

		$( "#csSpHua" ).click(function() {
			fields=centros_salud_chincha_sphuacarpana;

			if($( "#csSpHua" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_sphuacarpana","c","372");
			}
			else{
				map.removeLayer(csSpHua);
			};
		});

		$( "#csSun" ).click(function() {
			fields=centros_salud_chincha_sunampe;

			if($( "#csSun" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_sunampe","c","373");
			}
			else{
				map.removeLayer(csSun);
			};
		});

		$( "#csTamMor" ).click(function() {
			fields=centros_salud_chincha_tambomora;

			if($( "#csTamMor" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_chincha_tambomora","c","374");
			}
			else{
				map.removeLayer(csTamMor);
			};
		});

		//ICA - CENTROS SALUD
		$( "#csIca" ).click(function() {
			fields=centros_salud_ica_ica;

			if($( "#csIca" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_ica","c","375");
			}
			else{
				map.removeLayer(csIca);
			};
		});

		$( "#csLaTin" ).click(function() {
			fields=centros_salud_ica_tinguina;

			if($( "#csLaTin" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_tinguina","c","376");
			}
			else{
				map.removeLayer(csLaTin);
			};
		});

		$( "#csLosAqu" ).click(function() {
			fields=centros_salud_ica_aquijes;

			if($( "#csLosAqu" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_aquijes","c","377");
			}
			else{
				map.removeLayer(csLosAqu);
			};
		});

		$( "#csOcu" ).click(function() {
			fields=centros_salud_ica_ocucaje;

			if($( "#csOcu" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_ocucaje","c","378");
			}
			else{
				map.removeLayer(csOcu);
			};
		});

		$( "#csPac" ).click(function() {
			fields=centros_salud_ica_pachacutec;

			if($( "#csPac" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_pachacutec","c","379");
			}
			else{
				map.removeLayer(csPac);
			};
		});

		$( "#csParc" ).click(function() {
			fields=centros_salud_ica_parcona;

			if($( "#csParc" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_parcona","c","380");
			}
			else{
				map.removeLayer(csParc);
			};
		});

		$( "#csPueNueI" ).click(function() {
			fields=centros_salud_ica_pueblonuevo;

			if($( "#csPueNueI" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_pueblonuevo","c","381");
			}
			else{
				map.removeLayer(csPueNueI);
			};
		});

		$( "#csSal" ).click(function() {
			fields=centros_salud_ica_salas;

			if($( "#csSal" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_salas","c","382");
			}
			else{
				map.removeLayer(csSal);
			};
		});

		$( "#csSjMol" ).click(function() {
			fields=centros_salud_ica_sjmolinos;

			if($( "#csSjMol" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_sjmolinos","c","383");
			}
			else{
				map.removeLayer(csSjMol);
			};
		});

		$( "#csSjBau" ).click(function() {
			fields=centros_salud_ica_sjbautista;

			if($( "#csSjBau" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_sjbautista","c","384");
			}
			else{
				map.removeLayer(csSjBau);
			};
		});

		$( "#csSan" ).click(function() {
			fields=centros_salud_ica_santiago;

			if($( "#csSan" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_santiago","c","385");
			}
			else{
				map.removeLayer(csSan);
			};
		});

		$( "#csSub" ).click(function() {
			fields=centros_salud_ica_subtanjalla;

			if($( "#csSub" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_subtanjalla","c","386");
			}
			else{
				map.removeLayer(csSub);
			};
		});

		$( "#csTat" ).click(function() {
			fields=centros_salud_ica_tate;

			if($( "#csTat" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_tate","c","387");
			}
			else{
				map.removeLayer(csTat);
			};
		});

		$( "#csYau" ).click(function() {
			fields=centros_salud_ica_yaucarosario;

			if($( "#csYau" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_ica_yaucarosario","c","388");
			}
			else{
				map.removeLayer(csYau);
			};
		});

		//NAZCA - CENTROS SALUD
		$( "#csChan" ).click(function() {
			fields=centros_salud_nazca_changuillo;

			if($( "#csChan" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_nazca_changuillo","c","389");
			}
			else{
				map.removeLayer(csChan);
			};
		});

		$( "#csElIng" ).click(function() {
			fields=centros_salud_nazca_ingenio;

			if($( "#csElIng" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_nazca_ingenio","c","390");
			}
			else{
				map.removeLayer(csElIng);
			};
		});

		$( "#csMar" ).click(function() {
			fields=centros_salud_nazca_marcona;

			if($( "#csMar" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_nazca_marcona","c","391");
			}
			else{
				map.removeLayer(csMar);
			};
		});

		$( "#csNaz" ).click(function() {
			fields=centros_salud_nazca_nazca;

			if($( "#csNaz" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_nazca_nazca","c","392");
			}
			else{
				map.removeLayer(csNaz);
			};
		});

		$( "#csVisAle" ).click(function() {
			fields=centros_salud_nazca_vistaalegre;

			if($( "#csVisAle" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_nazca_vistaalegre","c","393");
			}
			else{
				map.removeLayer(csVisAle);
			};
		});

		//PALPA - CENTROS SALUD
		$( "#csLli" ).click(function() {
			fields=centros_salud_palpa_llipata;

			if($( "#csLli" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_palpa_llipata","c","394");
			}
			else{
				map.removeLayer(csLli);
			};
		});

		$( "#csPal" ).click(function() {
			fields=centros_salud_palpa_palpa;

			if($( "#csPal" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_palpa_palpa","c","395");
			}
			else{
				map.removeLayer(csPal);
			};
		});

		$( "#csRioGra" ).click(function() {
			fields=centros_salud_palpa_riogrande;

			if($( "#csRioGra" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_palpa_riogrande","c","396");
			}
			else{
				map.removeLayer(csRioGra);
			};
		});

		$( "#csSanCru" ).click(function() {
			fields=centros_salud_palpa_santacruz;

			if($( "#csSanCru" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_palpa_santacruz","c","397");
			}
			else{
				map.removeLayer(csSanCru);
			};
		});

		$( "#csTib" ).click(function() {
			fields=centros_salud_palpa_tibillo;

			if($( "#csTib" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_palpa_tibillo","c","398");
			}
			else{
				map.removeLayer(csTib);
			};
		});

		//PISCO - CENTROS SALUD
		$( "#csHua" ).click(function() {
			fields=centros_salud_pisco_huancano;

			if($( "#csHua" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_huancano","c","399");
			}
			else{
				map.removeLayer(csHua);
			};
		});

		$( "#csHum" ).click(function() {
			fields=centros_salud_pisco_humay;

			if($( "#csHum" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_humay","c","400");
			}
			else{
				map.removeLayer(csHum);
			};
		});

		$( "#csInd" ).click(function() {
			fields=centros_salud_pisco_independencia;

			if($( "#csInd" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_independencia","c","401");
			}
			else{
				map.removeLayer(csInd);
			};
		});

		$( "#csPara" ).click(function() {
			fields=centros_salud_pisco_paracas;

			if($( "#csPara" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_paracas","c","402");
			}
			else{
				map.removeLayer(csPara);
			};
		});

		$( "#csPis" ).click(function() {
			fields=centros_salud_pisco_pisco;

			if($( "#csPis" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_pisco","c","403");
			}
			else{
				map.removeLayer(csPis);
			};
		});

		$( "#csSanAnd" ).click(function() {
			fields=centros_salud_pisco_sanandres;

			if($( "#csSanAnd" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_sanandres","c","404");
			}
			else{
				map.removeLayer(csSanAnd);
			};
		});

		$( "#csSanCle" ).click(function() {
			fields=centros_salud_pisco_sanclemente;

			if($( "#csSanCle" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_sanclemente","c","405");
			}
			else{
				map.removeLayer(csSanCle);
			};
		});

		$( "#csTupAma" ).click(function() {
			fields=centros_salud_pisco_tupacamaru;

			if($( "#csTupAma" ).toggleClass("active").hasClass("active")){
				getData("centros_salud_pisco_tupacamaru","c","406");
			}
			else{
				map.removeLayer(csTupAma);
			};
		});

//Comisarias por Distrito
		//CHINCHA - COMISARIAS
		$( "#coAltLar" ).click(function() {
			fields=comisarias_chincha_altolaran;

			if($( "#coAltLar" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_altolaran","c","407");
			}
			else{
				map.removeLayer(coAltLar);
			};
		});

		$( "#coChav" ).click(function() {
			fields=comisarias_chincha_chavin;

			if($( "#coChav" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_chavin","c","408");
			}
			else{
				map.removeLayer(coChav);
			};
		});

		$( "#coChiAlt" ).click(function() {
			fields=comisarias_chincha_chinchaalta;

			if($( "#coChiAlt" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_chinchaalta","c","409");
			}
			else{
				map.removeLayer(coChiAlt);
			};
		});

		$( "#coChiBaj" ).click(function() {
			fields=comisarias_chincha_chinchabaja;

			if($( "#coChiBaj" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_chinchabaja","c","410");
			}
			else{
				map.removeLayer(coChiBaj);
			};
		});

		$( "#coElCar" ).click(function() {
			fields=comisarias_chincha_elcarmen;

			if($( "#coElCar" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_elcarmen","c","411");
			}
			else{
				map.removeLayer(coElCar);
			};
		});

		$( "#coGroPra" ).click(function() {
			fields=comisarias_chincha_grocioprado;

			if($( "#coGroPra" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_grocioprado","c","412");
			}
			else{
				map.removeLayer(coGroPra);
			};
		});

		$( "#coPueNueC" ).click(function() {
			fields=comisarias_chincha_pueblonuevo;

			if($( "#coPueNueC" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_pueblonuevo","c","413");
			}
			else{
				map.removeLayer(coPueNueC);
			};
		});

		$( "#coSjYan" ).click(function() {
			fields=comisarias_chincha_sjyanac;

			if($( "#coSjYan" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_sjyanac","c","414");
			}
			else{
				map.removeLayer(coSjYan);
			};
		});

		$( "#coSpHua" ).click(function() {
			fields=comisarias_chincha_sphuacarpana;

			if($( "#coSpHua" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_sphuacarpana","c","415");
			}
			else{
				map.removeLayer(coSpHua);
			};
		});

		$( "#coSun" ).click(function() {
			fields=comisarias_chincha_sunampe;

			if($( "#coSun" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_sunampe","c","416");
			}
			else{
				map.removeLayer(coSun);
			};
		});

		$( "#coTamMor" ).click(function() {
			fields=comisarias_chincha_tambomora;

			if($( "#coTamMor" ).toggleClass("active").hasClass("active")){
				getData("comisarias_chincha_tambomora","c","417");
			}
			else{
				map.removeLayer(coTamMor);
			};
		});

		//ICA - COMISARIAS
		$( "#coIca" ).click(function() {
			fields=comisarias_ica_ica;

			if($( "#coIca" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_ica","c","418");
			}
			else{
				map.removeLayer(coIca);
			};
		});

		$( "#coLaTin" ).click(function() {
			fields=comisarias_ica_tinguina;

			if($( "#coLaTin" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_tinguina","c","419");
			}
			else{
				map.removeLayer(coLaTin);
			};
		});

		$( "#coLosAqu" ).click(function() {
			fields=comisarias_ica_aquijes;

			if($( "#coLosAqu" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_aquijes","c","420");
			}
			else{
				map.removeLayer(coLosAqu);
			};
		});

		$( "#coOcu" ).click(function() {
			fields=comisarias_ica_ocucaje;

			if($( "#coOcu" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_ocucaje","c","421");
			}
			else{
				map.removeLayer(coOcu);
			};
		});

		$( "#coPac" ).click(function() {
			fields=comisarias_ica_pachacutec;

			if($( "#coPac" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_pachacutec","c","422");
			}
			else{
				map.removeLayer(coPac);
			};
		});

		$( "#coParc" ).click(function() {
			fields=comisarias_ica_parcona;

			if($( "#coParc" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_parcona","c","423");
			}
			else{
				map.removeLayer(coParc);
			};
		});

		$( "#coPueNueI" ).click(function() {
			fields=comisarias_ica_pueblonuevo;

			if($( "#coPueNueI" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_pueblonuevo","c","424");
			}
			else{
				map.removeLayer(coPueNueI);
			};
		});

		$( "#coSal" ).click(function() {
			fields=comisarias_ica_salas;

			if($( "#coSal" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_salas","c","425");
			}
			else{
				map.removeLayer(coSal);
			};
		});

		$( "#coSjMol" ).click(function() {
			fields=comisarias_ica_sjmolinos;

			if($( "#coSjMol" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_sjmolinos","c","426");
			}
			else{
				map.removeLayer(coSjMol);
			};
		});

		$( "#coSjBau" ).click(function() {
			fields=comisarias_ica_sjbautista;

			if($( "#coSjBau" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_sjbautista","c","427");
			}
			else{
				map.removeLayer(coSjBau);
			};
		});

		$( "#coSan" ).click(function() {
			fields=comisarias_ica_santiago;

			if($( "#coSan" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_santiago","c","428");
			}
			else{
				map.removeLayer(coSan);
			};
		});

		$( "#coSub" ).click(function() {
			fields=comisarias_ica_subtanjalla;

			if($( "#coSub" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_subtanjalla","c","429");
			}
			else{
				map.removeLayer(coSub);
			};
		});

		$( "#coTat" ).click(function() {
			fields=comisarias_ica_tate;

			if($( "#coTat" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_tate","c","430");
			}
			else{
				map.removeLayer(coTat);
			};
		});

		$( "#coYau" ).click(function() {
			fields=comisarias_ica_yaucarosario;

			if($( "#coYau" ).toggleClass("active").hasClass("active")){
				getData("comisarias_ica_yaucarosario","c","431");
			}
			else{
				map.removeLayer(coYau);
			};
		});

		//NAZCA - COMISARIAS
		$( "#coChan" ).click(function() {
			fields=comisarias_nazca_changuillo;

			if($( "#coChan" ).toggleClass("active").hasClass("active")){
				getData("comisarias_nazca_changuillo","c","432");
			}
			else{
				map.removeLayer(coChan);
			};
		});

		$( "#coElIng" ).click(function() {
			fields=comisarias_nazca_ingenio;

			if($( "#coElIng" ).toggleClass("active").hasClass("active")){
				getData("comisarias_nazca_ingenio","c","433");
			}
			else{
				map.removeLayer(coElIng);
			};
		});

		$( "#coMar" ).click(function() {
			fields=comisarias_nazca_marcona;

			if($( "#coMar" ).toggleClass("active").hasClass("active")){
				getData("comisarias_nazca_marcona","c","434");
			}
			else{
				map.removeLayer(coMar);
			};
		});

		$( "#coNaz" ).click(function() {
			fields=comisarias_nazca_nazca;

			if($( "#coNaz" ).toggleClass("active").hasClass("active")){
				getData("comisarias_nazca_nazca","c","435");
			}
			else{
				map.removeLayer(coNaz);
			};
		});

		$( "#coVisAle" ).click(function() {
			fields=comisarias_nazca_vistaalegre;

			if($( "#coVisAle" ).toggleClass("active").hasClass("active")){
				getData("comisarias_nazca_vistaalegre","c","436");
			}
			else{
				map.removeLayer(coVisAle);
			};
		});

		//PALPA - COMISARIAS
		$( "#coLli" ).click(function() {
			fields=comisarias_palpa_llipata;

			if($( "#coLli" ).toggleClass("active").hasClass("active")){
				getData("comisarias_palpa_llipata","c","437");
			}
			else{
				map.removeLayer(coLli);
			};
		});

		$( "#coPal" ).click(function() {
			fields=comisarias_palpa_palpa;

			if($( "#coPal" ).toggleClass("active").hasClass("active")){
				getData("comisarias_palpa_palpa","c","438");
			}
			else{
				map.removeLayer(coPal);
			};
		});

		$( "#coRioGra" ).click(function() {
			fields=comisarias_palpa_riogrande;

			if($( "#coRioGra" ).toggleClass("active").hasClass("active")){
				getData("comisarias_palpa_riogrande","c","439");
			}
			else{
				map.removeLayer(coRioGra);
			};
		});

		$( "#coSanCru" ).click(function() {
			fields=comisarias_palpa_santacruz;

			if($( "#coSanCru" ).toggleClass("active").hasClass("active")){
				getData("comisarias_palpa_santacruz","c","440");
			}
			else{
				map.removeLayer(coSanCru);
			};
		});

		$( "#coTib" ).click(function() {
			fields=comisarias_palpa_tibillo;

			if($( "#coTib" ).toggleClass("active").hasClass("active")){
				getData("comisarias_palpa_tibillo","c","441");
			}
			else{
				map.removeLayer(coTib);
			};
		});

		//PISCO - COMISARIAS
		$( "#coHua" ).click(function() {
			fields=comisarias_pisco_huancano;

			if($( "#coHua" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_huancano","c","442");
			}
			else{
				map.removeLayer(coHua);
			};
		});

		$( "#coHum" ).click(function() {
			fields=comisarias_pisco_humay;

			if($( "#coHum" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_humay","c","443");
			}
			else{
				map.removeLayer(coHum);
			};
		});

		$( "#coInd" ).click(function() {
			fields=comisarias_pisco_independencia;

			if($( "#coInd" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_independencia","c","444");
			}
			else{
				map.removeLayer(coInd);
			};
		});

		$( "#coPara" ).click(function() {
			fields=comisarias_pisco_paracas;

			if($( "#coPara" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_paracas","c","445");
			}
			else{
				map.removeLayer(coPara);
			};
		});

		$( "#coPis" ).click(function() {
			fields=comisarias_pisco_pisco;

			if($( "#coPis" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_pisco","c","446");
			}
			else{
				map.removeLayer(coPis);
			};
		});

		$( "#coSanAnd" ).click(function() {
			fields=comisarias_pisco_sanandres;

			if($( "#coSanAnd" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_sanandres","c","447");
			}
			else{
				map.removeLayer(coSanAnd);
			};
		});

		$( "#coSanCle" ).click(function() {
			fields=comisarias_pisco_sanclemente;

			if($( "#coSanCle" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_sanclemente","c","448");
			}
			else{
				map.removeLayer(coSanCle);
			};
		});

		$( "#coTupAma" ).click(function() {
			fields=comisarias_pisco_tupacamaru;

			if($( "#coTupAma" ).toggleClass("active").hasClass("active")){
				getData("comisarias_pisco_tupacamaru","c","449");
			}
			else{
				map.removeLayer(coTupAma);
			};
		});
//Bomberos por Distrito
		//CHINCHA - BOMBEROS
		$( "#boChiAlt" ).click(function() {
			fields=bomberos_chincha_chinchaalta;

			if($( "#boChiAlt" ).toggleClass("active").hasClass("active")){
				getData("bomberos_chincha_chinchaalta","c","450");
			}
			else{
				map.removeLayer(boChiAlt);
			};
		});


		//ICA - BOMBEROS
		$( "#boIca" ).click(function() {
			fields=bomberos_ica_ica;

			if($( "#boIca" ).toggleClass("active").hasClass("active")){
				getData("bomberos_ica_ica","c","451");
			}
			else{
				map.removeLayer(boIca);
			};
		});

		$( "#boLaTin" ).click(function() {
			fields=bomberos_ica_tinguina;

			if($( "#boLaTin" ).toggleClass("active").hasClass("active")){
				getData("bomberos_ica_tinguina","c","452");
			}
			else{
				map.removeLayer(boLaTin);
			};
		});

		//NAZCA - BOMBEROS
		$( "#boMar" ).click(function() {
			fields=bomberos_nazca_marcona;

			if($( "#boMar" ).toggleClass("active").hasClass("active")){
				getData("bomberos_nazca_marcona","c","453");
			}
			else{
				map.removeLayer(boMar);
			};
		});

		$( "#boNaz" ).click(function() {
			fields=bomberos_nazca_nazca;

			if($( "#boNaz" ).toggleClass("active").hasClass("active")){
				getData("bomberos_nazca_nazca","c","454");
			}
			else{
				map.removeLayer(boNaz);
			};
		});

		$( "#boVisAle" ).click(function() {
			fields=bomberos_nazca_vistaalegre;

			if($( "#boVisAle" ).toggleClass("active").hasClass("active")){
				getData("bomberos_nazca_vistaalegre","c","455");
			}
			else{
				map.removeLayer(boVisAle);
			};
		});

		//PISbo - BOMBEROS
		$( "#boPis" ).click(function() {
			fields=bomberos_pisco_pisco;

			if($( "#boPis" ).toggleClass("active").hasClass("active")){
				getData("bomberos_pisco_pisco","c","456");
			}
			else{
				map.removeLayer(boPis);
			};
		});

		$( "#boTupAma" ).click(function() {
			fields=bomberos_pisco_tupacamaru;

			if($( "#boTupAma" ).toggleClass("active").hasClass("active")){
				getData("bomberos_pisco_tupacamaru","c","457");
			}
			else{
				map.removeLayer(boTupAma);
			};
		});

//Capa Capital Departamental c
$( "#aCdep" ).click(function() {
 	fields=capital_departamental;

	if($( "#aCdep" ).toggleClass("active").hasClass("active")){
		getData("capital_departamental","c","6");
	}
	else{
		map.removeLayer(lCapDep);
	};
});

//Capa Capital Provincial c
$( "#aCpro" ).click(function() {
 	fields=capital_provincial;

	if($( "#aCpro" ).toggleClass("active").hasClass("active")){
		getData("capital_provincial","c","7");
	}
	else{
		map.removeLayer(lCapPro);
	};
});

//Capa Capital Distrital c
$( "#aCdis" ).click(function() {
 	fields=capital_distrital;

	if($( "#aCdis" ).toggleClass("active").hasClass("active")){
		getData("capital_distrital","c","8");
	}
	else{
		map.removeLayer(lCapDis);
	};
});

//Capa Geologia Fallas p
$( "#aFall" ).click(function() {
 	fields=fallas_geologicas;

	if($( "#aFall" ).toggleClass("active").hasClass("active")){
		getData("fallas_geologicas","p","9");
	}
	else{
		map.removeLayer(cFall);
	};
});

//Capa Litologia p (10)
$( "#aLito" ).click(function() {
 	fields=litologia;

	if($( "#aLito" ).toggleClass("active").hasClass("active")){
		getData("litologia","p","10");
	}
	else{
		map.removeLayer(cLito);
	};
});

//Capa Geocronologia p (49)
$( "#aGeoc" ).click(function() {
 	fields=geocronologia;

	if($( "#aGeoc" ).toggleClass("active").hasClass("active")){
		getData("geocronologia","c","49");
	}
	else{
		map.removeLayer(aGeoc);
	};
});

//Capa Suelos p
$( "#aSuel" ).click(function() {
 	fields=suelos;

	if($( "#aSuel" ).toggleClass("active").hasClass("active")){
		getData("suelos","p","11");
	}
	else{
		map.removeLayer(aSuel);
		map.removeControl(legSue);
	};
});

//Capa Curvas nivel p
$( "#aCurv" ).click(function() {
 	fields=curvas_nivel;

	if($( "#aCurv" ).toggleClass("active").hasClass("active")){
		getData("curvas_nivel","p","12");
	}
	else{
		map.removeLayer(aCurv);
		map.removeControl(legCurv);
	};
});

//Capa Red Vial Dep p
$( "#aRedDep" ).click(function() {
 	fields=red_vial_departamental;

	if($( "#aRedDep" ).toggleClass("active").hasClass("active")){
		getData("red_vial_departamental","p","19");
	}
	else{
		map.removeLayer(cRedDep);
	};
});

//Capa Red Vial Nacional p
$( "#aRedNac" ).click(function() {
 	fields=red_via_nacional;

	if($( "#aRedNac" ).toggleClass("active").hasClass("active")){
		getData("red_via_nacional","p","20");
	}
	else{
		map.removeLayer(cRedNac);
	};
});

//Capa Red Vial Vecinal p
$( "#aRedVec" ).click(function() {
 	fields=red_vial_vecinal;

	if($( "#aRedVec" ).toggleClass("active").hasClass("active")){
		getData("red_vial_vecinal","p","21");
	}
	else{
		map.removeLayer(cRedVec);
	};
});

//Capa Aereos c
$( "#aAere" ).click(function() {
 	fields=aereo;

	if($( "#aAere" ).toggleClass("active").hasClass("active")){
		getData("aereo","c","22");
	}
	else{
		map.removeLayer(cAere);
	};
});

//Capa Puentes c
$( "#aPuen" ).click(function() {
 	fields=puentes;

	if($( "#aPuen" ).toggleClass("active").hasClass("active")){
		getData("puentes","c","23");
	}
	else{
		map.removeLayer(cPuen);
	};
});

//Capa Puertos c
$( "#aPuer" ).click(function() {
 	fields=puertos;

	if($( "#aPuer" ).toggleClass("active").hasClass("active")){
		getData("puertos","c","24");
	}
	else{
		map.removeLayer(cPuer);
	};
});

//Capa Centra Hidraulica c
$( "#aCenHid" ).click(function() {
 	fields=central_hidraulica;

	if($( "#aCenHid" ).toggleClass("active").hasClass("active")){
		getData("central_hidraulica","c","25");
	}
	else{
		map.removeLayer(cCenHid);
	};
});

//Capa Centra Termica c
$( "#aCenTer" ).click(function() {
 	fields=centrales_termicas;

	if($( "#aCenTer" ).toggleClass("active").hasClass("active")){
		getData("centrales_termicas","c","26");
	}
	else{
		map.removeLayer(cCenTer);
	};
});

//Capa Estacion Electrica c
$( "#aEstEle" ).click(function() {
 	fields=estaciones_electricas;

	if($( "#aEstEle" ).toggleClass("active").hasClass("active")){
		getData("estaciones_electricas","c","27");
	}
	else{
		map.removeLayer(cEstEle);
	};
});

//Capa ANP Adm Nacional p
$( "#aAdmNac" ).click(function() {
 	fields=anp_administracion_nacional;

	if($( "#aAdmNac" ).toggleClass("active").hasClass("active")){
		getData("anp_administracion_nacional","p","28");
	}
	else{
		map.removeLayer(cAdmNac);
	};
});

//Capa ANP Adm Regional p
$( "#aAdmReg" ).click(function() {
 	fields=anp_administracion_regional;

	if($( "#aAdmReg" ).toggleClass("active").hasClass("active")){
		getData("anp_administracion_regional","p","29");
	}
	else{
		map.removeLayer(cAdmReg);
	};
});

//Capa ANP zon amortiguamiento p
$( "#aZonAmo" ).click(function() {
 	fields=zonas_amortiguamiento;

	if($( "#aZonAmo" ).toggleClass("active").hasClass("active")){
		getData("zonas_amortiguamiento","p","30");
	}
	else{
		map.removeLayer(cZonAmo);
	};
});

//Capa CE chincha c
$( "#aCEChi" ).click(function() {
 	fields=centros_educativos_chincha;

	if($( "#aCEChi" ).toggleClass("active").hasClass("active")){
		getData("centros_educativos_chincha","c","32");
	}
	else{
		map.removeLayer(cCEChi);
	};
});

//Capa CE Ica c
$( "#aCEIca" ).click(function() {
 	fields=centros_educativos_ica;

	if($( "#aCEIca" ).toggleClass("active").hasClass("active")){
		getData("centros_educativos_ica","c","33");
	}
	else{
		map.removeLayer(cCEIca);
	};
});

//Capa CE Nazca c
$( "#aCENaz" ).click(function() {
 	fields=centros_educativos_nazca;

	if($( "#aCENaz" ).toggleClass("active").hasClass("active")){
		getData("centros_educativos_nazca","c","34");
	}
	else{
		map.removeLayer(cCENaz);
	};
});

//Capa CE Palpa c
$( "#aCEPal" ).click(function() {
 	fields=centros_educativos_palpa;

	if($( "#aCEPal" ).toggleClass("active").hasClass("active")){
		getData("centros_educativos_palpa","c","35");
	}
	else{
		map.removeLayer(cCEPal);
	};
});

//Capa CE Pisco c
$( "#aCEPis" ).click(function() {
 	fields=centros_educativos_pisco;

	if($( "#aCEPis" ).toggleClass("active").hasClass("active")){
		getData("centros_educativos_pisco","c","36");
	}
	else{
		map.removeLayer(cCEPis);
	};
});

//Capa CS chincha c
$( "#aCSChi" ).click(function() {
 	fields=centros_salud_chincha;

	if($( "#aCSChi" ).toggleClass("active").hasClass("active")){
		getData("centros_salud_chincha","c","37");
	}
	else{
		map.removeLayer(cCSChi);
	};
});

//Capa CS Ica c
$( "#aCSIca" ).click(function() {
 	fields=centros_salud_ica;

	if($( "#aCSIca" ).toggleClass("active").hasClass("active")){
		getData("centros_salud_ica","c","38");
	}
	else{
		map.removeLayer(cCSIca);
	};
});

//Capa CS Nazca c
$( "#aCSNaz" ).click(function() {
 	fields=centros_salud_nazca;

	if($( "#aCSNaz" ).toggleClass("active").hasClass("active")){
		getData("centros_salud_nazca","c","39");
	}
	else{
		map.removeLayer(cCSNaz);
	};
});

//Capa CE Palpa c
$( "#aCSPal" ).click(function() {
 	fields=centros_salud_palpa;

	if($( "#aCSPal" ).toggleClass("active").hasClass("active")){
		getData("centros_salud_palpa","c","40");
	}
	else{
		map.removeLayer(cCSPal);
	};
});

//Capa CE Pisco c
$( "#aCSPis" ).click(function() {
 	fields=centros_salud_pisco;

	if($( "#aCSPis" ).toggleClass("active").hasClass("active")){
		getData("centros_salud_pisco","c","41");
	}
	else{
		map.removeLayer(cCSPis);
	};
});

//Capa Pobreza Departamental p
$( "#aPobDep" ).click(function() {
 	fields=pobreza_departamental;

	if($( "#aPobDep" ).toggleClass("active").hasClass("active")){
		getData("pobreza_departamental","p","42");
	}
	else{
		map.removeLayer(cPobDep);
	};
});

//Capa Pobreza Distrital p
$( "#aPobDis" ).click(function() {
 	fields=pobreza_distrital;

	if($( "#aPobDis" ).toggleClass("active").hasClass("active")){
		getData("pobreza_distrital","p","43");
	}
	else{
		map.removeLayer(cPobDis);
	};
});

//Capa Pobreza Provincial p
$( "#aPobPro" ).click(function() {
 	fields=pobreza_provincial;

	if($( "#aPobPro" ).toggleClass("active").hasClass("active")){
		getData("pobreza_provincial","p","44");
	}
	else{
		map.removeLayer(cPobPro);
	};
});

//Capa Cultivos agrigolas p
$( "#aCulAgr" ).click(function() {
 	fields=cultivos_agricolas;

	if($( "#aCulAgr" ).toggleClass("active").hasClass("active")){
		getData("cultivos_agricolas","p","45");
	}
	else{
		map.removeLayer(cCulAgr);
	};
});

//Capa Ganaderia p
$( "#aGana" ).click(function() {
 	fields=ganaderia;

	if($( "#aGana" ).toggleClass("active").hasClass("active")){
		getData("ganaderia","p","46");
	}
	else{
		map.removeLayer(cGana);
	};
});

//Capa Minas c
$( "#aMina" ).click(function() {
 	fields=minas;

	if($( "#aMina" ).toggleClass("active").hasClass("active")){
		getData("minas","c","47");
	}
	else{
		map.removeLayer(cMina);
	};
});

//Capa Temp Bajas
$( "#btnTempBajas" ).click(function() {


	//if($( "#btnTempBajas" ).toggleClass("active").hasClass("active")){
		//if(activo=0){
			fields=tb_ica;
			getData("tb_ica2","p","48");
		//	activo=1;
		//}
		//else{
		//	map.removeLayer(cbtnTempBajas);
		//	activo=0;
		//}

	//}
	//else{
		//map.removeLayer(cbtnTempBajas);
	//};

});

//Capa Hidrogelogia
$( "#aHidr" ).click(function() {
 	fields=hidrogelogia;

	if($( "#aHidr" ).toggleClass("active").hasClass("active")){
		getData("hidrogelogia","p","50");
	}
	else{
		map.removeLayer(aHidr);
		map.removeControl(legHidr);
	};
});

//Capa Metalogenetica
$( "#aMeta" ).click(function() {
 	fields=metalogenetica;

	if($( "#aMeta" ).toggleClass("active").hasClass("active")){
		getData("metalogenetica","p","51");
	}
	else{
		map.removeLayer(aMeta);
		map.removeControl(legMeta);
	};
});

//Capa Relieves
$( "#aReli" ).click(function() {
 	fields=relieves;

	if($( "#aReli" ).toggleClass("active").hasClass("active")){
		getData("relieves","p","53");
	}
	else{
		map.removeLayer(aReli);
		map.removeControl(legReli);
	};
});

//Capa Vulnerabilidad Tierras
$( "#aVuln" ).click(function() {
 	fields=vulnerabilidad_tierras;

	if($( "#aVuln" ).toggleClass("active").hasClass("active")){
		getData("vulnerabilidad_tierras","p","54");
	}
	else{
		map.removeLayer(aVuln);
		map.removeControl(legVulne);
	};
});

//Capa Pendientes
$( "#aPend" ).click(function() {
 	fields=pendientes;

	if($( "#aPend" ).toggleClass("active").hasClass("active")){
		getData("pendientes","p","55");
	}
	else{
		map.removeLayer(aPend);
	};
});

//Capa CUM - Capacidad de Uso Mayor
$( "#aCum" ).click(function() {
 	fields=cum;

	if($( "#aCum" ).toggleClass("active").hasClass("active")){
		getData("cum","p","56");
	}
	else{
		map.removeLayer(aCum);
		map.removeControl(legCum);
	};
});

//Capa Hidrografia Principal
$( "#aHidrPrin" ).click(function() {
 	fields=hidrografia_principal;

	if($( "#aHidrPrin" ).toggleClass("active").hasClass("active")){
		getData("hidrografia_principal","p","57");
	}
	else{
		map.removeLayer(aHidrPrin);
		map.removeControl(legHidrPrin);
	};
});

//Capa Hidrografia General
$( "#aHidrGene" ).click(function() {
 	fields=hidrografia_general;

	if($( "#aHidrGene" ).toggleClass("active").hasClass("active")){
		getData("hidrografia_general","p","58");
	}
	else{
		map.removeLayer(aHidrGene);
	};
});

//Capa Lagunas
$( "#aLagu" ).click(function() {
 	fields=lagunas;

	if($( "#aLagu" ).toggleClass("active").hasClass("active")){
		getData("lagunas","p","59");
	}
	else{
		map.removeLayer(aLagu);
	};
});

//Capa Cuencas Hidro
$( "#aCuen" ).click(function() {
 	fields=cuencas_hidrograficas;

	if($( "#aCuen" ).toggleClass("active").hasClass("active")){
		getData("cuencas_hidrograficas","p","60");
	}
	else{
		map.removeLayer(aCuen);
	};
});

//Capa Sub cuencas Hidrogr
$( "#aSubc" ).click(function() {
 	fields=subcuencas_hidrograficas;

	if($( "#aSubc" ).toggleClass("active").hasClass("active")){
		getData("subcuencas_hidrograficas","p","61");
	}
	else{
		map.removeLayer(aSubc);
	};
});

//Capa Manantiales
$( "#aMana" ).click(function() {
 	fields=manantiales;

	if($( "#aMana" ).toggleClass("active").hasClass("active")){
		getData("manantiales","p","62");
	}
	else{
		map.removeLayer(aMana);
	};
});

//Capa Caudales
$( "#aCaud" ).click(function() {
 	fields=caudales;

	if($( "#aCaud" ).toggleClass("active").hasClass("active")){
		getData("caudales","p","63");
	}
	else{
		map.removeLayer(aCaud);
	};
});

//Capa Ecologia
$( "#aEcol" ).click(function() {
 	fields=ecologia;

	if($( "#aEcol" ).toggleClass("active").hasClass("active")){
		getData("ecologia","p","64");
	}
	else{
		map.removeLayer(aEcol);
	};
});

//Capa Cobertura Vegetal
$( "#aCobe" ).click(function() {
 	fields=cobertura_vegetal;

	if($( "#aCobe" ).toggleClass("active").hasClass("active")){
		getData("cobertura_vegetal","p","65");
	}
	else{
		map.removeLayer(aCobe);
	};
});

//Capa Isla
$( "#aIsla" ).click(function() {
 	fields=islas ;

	if($( "#aIsla" ).toggleClass("active").hasClass("active")){
		getData("islas ","p","66");
	}
	else{
		map.removeLayer(aIsla);
	};
});

//Capa Mar y ecosistema marino
$( "#aMaryeco " ).click(function() {
 	fields=mar_ecosist_marin_coste ;

	if($( "#aMaryeco " ).toggleClass("active").hasClass("active")){
		getData("mar_ecosist_marin_coste ","p","67");
	}
	else{
		map.removeLayer(aMaryeco );
	};
});

//Capa Estaciones metereologicas
$( "#aEsta " ).click(function() {
 	fields=estaciones_meteorologicas ;

	if($( "#aEsta " ).toggleClass("active").hasClass("active")){
		getData("estaciones_meteorologicas ","p","68");
	}
	else{
		map.removeLayer(aEsta );
	};
});

//Capa Aerodromos
$( "#aAerod" ).click(function() {
 	fields=aerodromos ;

	if($( "#aAerod" ).toggleClass("active").hasClass("active")){
		getData("aerodromos","c","69");
	}
	else{
		map.removeLayer(aAerod);
	};
});

//Capa Aeropuerto
$( "#aAerop " ).click(function() {
 	fields=aeropuerto;

	if($( "#aAerop " ).toggleClass("active").hasClass("active")){
		getData("aeropuerto","c","70");
	}
	else{
		map.removeLayer(aAerop);
	};
});

//Capa Caminos herradura
$( "#aCami" ).click(function() {
 	fields=caminos_herradura;

	if($( "#aCami" ).toggleClass("active").hasClass("active")){
		getData("caminos_herradura","p","71");
	}
	else{
		map.removeLayer(aCami);
	};
});

//Capa Lineas Electricas
$( "#aLinEle" ).click(function() {
 	fields=lineas_electricas;

	if($( "#aLinEle" ).toggleClass("active").hasClass("active")){
		getData("lineas_electricas","p","72");
	}
	else{
		map.removeLayer(aLinEle);
	};
});

//Capa Red Fibra Optica
$( "#aRedFib" ).click(function() {
 	fields=red_fibra_optica;

	if($( "#aRedFib" ).toggleClass("active").hasClass("active")){
		getData("red_fibra_optica","p","73");
	}
	else{
		map.removeLayer(aRedFib);
	};
});

//Capa Gasoducto
$( "#aGaso" ).click(function() {
 	fields=gaseoducto;

	if($( "#aGaso" ).toggleClass("active").hasClass("active")){
		getData("gaseoducto","p","74");
	}
	else{
		map.removeLayer(aGaso);
	};
});

//Capa Poliducto
$( "#aPoli" ).click(function() {
 	fields=poliducto;

	if($( "#aPoli" ).toggleClass("active").hasClass("active")){
		getData("poliducto","p","75");
	}
	else{
		map.removeLayer(aPoli);
	};
});

//Capa Red de Gas
$( "#aRedGas" ).click(function() {
 	fields=red_de_gas;

	if($( "#aRedGas" ).toggleClass("active").hasClass("active")){
		getData("red_de_gas","p","76");
	}
	else{
		map.removeLayer(aRedGas);
	};
});

//Capa Fisiografia > Geodinamica Regional
$( "#aGeod" ).click(function() {
 	fields=geodinamica_regional;

	if($( "#aGeod" ).toggleClass("active").hasClass("active")){
		getData("geodinamica_regional","c","77");
	}
	else{
		map.removeLayer(aGeod);
	};
});

//=====CAMBIO DE BASES MAPAS=====

//Mapa base 1
$( "#liM1" ).click(function() {
 	L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(map);
});

//Mapa base 2
$( "#liM2" ).click(function() {
 	L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png').addTo(map);
});

//Mapa base 3
$( "#liM3" ).click(function() {
 	L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
});

//Mapa base 4
$( "#liM4" ).click(function() {
 	L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}').addTo(map);
});

//Mapa base 5 - Mapa Contraste Oscuro
$( "#liM5" ).click(function() {
 	L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(map);
});

//Mapa base 6 (imagen drone)
$( "#liM6" ).click(function() {
 	L.tileLayer('http://127.0.0.1:8080/tileserver/tileserver.php?/index.json?/mb_CHANCHAJALLA/{z}/{x}/{y}.png',
 		{
 			minZoom: 7,
 			maxZoom: 22
 		}).addTo(map);
});

//Mapa base 7 - HERE.hybridDay
$( "#liM7" ).click(function() {
 	L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
	attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
	subdomains: '1234',
	mapID: 'newest',
	app_id: '<your app_id>',
	app_code: '<your app_code>',
	base: 'aerial',
	maxZoom: 20,
	type: 'maptile',
	language: 'eng',
	format: 'png8',
	size: '256'
	}).addTo(map);
});

//Mapa base 8 - OpenStreetMap.HOT
$( "#liM8" ).click(function() {
 	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
 		{
 			minZoom: 7,
 			maxZoom: 22
 		}).addTo(map);
});

//Mapa base 9 - OpenTopoMap
$( "#liM9" ).click(function() {
 	L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
 		{
 			minZoom: 7,
 			maxZoom: 22
 		}).addTo(map);
});

//Mapa base 10 - Thunderforest.Transport
$( "#liM10" ).click(function() {
 	L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
 		{
 			minZoom: 7,
 			maxZoom: 22
 		}).addTo(map);
});

//Icono para mostrar Tabla Informacion Capas
$( "#pnlIcoTabla" ).click(function() {
	 $("#pnlTabla").slideToggle("slow");
	 if($("#imgIcoTabla").attr("src") == "wmslib/img/arrowup.png"){
	 	$("#imgIcoTabla").attr("src","wmslib/img/arrowdown.png");
	 }
	 else{
	 	$("#imgIcoTabla").attr("src","wmslib/img/arrowup.png");
	 }
});


}; //initialize

function importarScript(nombre) {
    var s = document.createElement("script");
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}

