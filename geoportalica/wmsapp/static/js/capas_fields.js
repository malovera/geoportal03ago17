centros_poblados = ["gid", "ubigeo", "nomcp", "viv_total", "pob", "fuente","provincia","distrito","codccpp"];

capital_departamental = ["gid", "codccpp", "ubigeo","distrito","provincia","dpto"];

capital_distrital = ["gid", "codccpp", "nomccpp", "ubigeo", "distrito", "provincia", "dpto"];

capital_provincial = ["gid", "codccpp", "nomccpp", "ubigeo", "distrito", "provincia","dpto"];

limite_distrital = ["gid", "nom_cap", "area_ha", "distrito", "provincia", "dpto", "shape_leng", "shape_area"];

limite_departamental = ["gid", "area_ha", "dpto", "shape_leng", "shape_area"];

limite_provincial = ["gid", "area_ha", "provincia", "dpto", "shape_leng", "shape_area"];

litoral = ["gid", "nombre", "long_m", "shape_leng"];

	//------------------BIOFISICO --------------------------

	//Geologia > Hidrogeologia - Geocronologia - Metalogenetica - Litologia - Fallas

	//p (linea)
	//10
	/*litologia = ["nombr_trad","d_era","d_periodo","d_t_roca","l_litologi","area_ha"];*/ //p

//REVISAR:
//hidrogelogia = ["gid", "hidrogeo_", "name", "descripcio", "modelo", "submodelo", "modelo_tip", "shape_leng", "shape_area"];

hidrogelogia = ["gid","hidrogeo_","name", "descripcio","modelo"];

//hidrogelogia = ["submodelo"];

geocronologia = ["gid", "edad_ma", "error_ma", "metodo", "material", "unidad", "muestra", "tipo_de_ro", "referencia", "point_x", "point_y"];

metalogenetica = ["gid", "num_franja", "nombre_fra", "area_km2", "shape_leng", "shape_area"];

//REVISAR:
//litologia = ["gid", "nomencla", "nombr_trad", "d_era", "d_periodo", "d_epoca", "edad_max", "edad_min", "d_t_roca", "l_litologi", "area_ha", "shape_leng", "shape_area"];
litologia = ["gid", "nomencla"];

fallas_geologicas = ["gid", "codigo", "tipo", "long_m", "shape_leng"]; 

geodinamica_regional = ["gid","provincia","distrito","tipo","paraje","altitud","riesgo","subtipo"];

	//Geomorfologia > Relieves - Vulnerabilidad de Tierras

//REVISAR:
//relieves = ["gid", "simbolo", "fisio", "descrip", "shape_leng", "shape_area"];
relieves = ["gid","simbolo"];

vulnerabilidad_tierras = ["gid", "objectid", "codigo", "unidad", "simbolo", "shape_leng", "shape_le_1", "shape_area"];
	

	//Topografia > Curvas de nivel - Pendientes

curvas_nivel = ["gid", "dom_altura", "tipo_25", "shape_leng"];//p(linea)

pendientes = ["gid", "area_ha", "rangos","descrip","shape_leng", "shape_area"];//p

	//Edafologia > Suelos - CUM

suelos = ["gid", "simsue", "dessuelo", "propor", "area_ha", "shape_leng", "shape_area"];//p

//REVISAR
//cum = ["gid", "simbolo", "descrip", "proporc", "factor", "area_ha", "shape_leng", "shape_area"];
cum = ["gid","simbolo", "proporc", "factor", "area_ha", "shape_leng", "shape_area"];

	//Hidrografia > Hidrografia Principal - H. General - Lagunas - Manantiales - Cuencas - Subcuencas

hidrografia_principal = ["gid", "rasgo_prin", "rasgo_secu", "long_km", "nombre", "shape_leng"];

hidrografia_general = ["gid", "tipo", "nombre", "long_km", "shape_leng"];

lagunas = ["gid", "nombre", "rasgo_prin", "provincia", "dpto", "rasgo_secu", "area_ha", "shape_leng", "shape_area"];

manantiales = ["gid", "rasgo_prin", "distrito", "provincia", "cod_ign", "shape_leng"];

cuencas_hidrograficas = ["gid", "cuenca", "vertiente", "area_ha", "shape_leng", "shape_area"];

subcuencas_hidrograficas = ["gid", "cuenca", "subcuenca", "vertiente", "tipo", "area_ha"];

	//Hidrologia > Caudales

caudales = ["gid", "nomb_uh_n1", "nomb_uh_n2", "nomb_uh_n3", "nomb_uh_n4", "nomb_uh_n5", "nomb_uh_n6", "codigo", "nombre", "area_km2", "habitantes", "caudal_med", "volumen_an", "shape_leng", "shape_area"];

	//Ecologia y Cobertura Vegetal > Ecologia - Cobertura Vegetal

ecologia = ["gid", "ecocode", "pisoec", "zonlati", "area_ha", "descrip", "shape_leng", "shape_area"];

cobertura_vegetal = ["gid", "vegcode", "simbolo", "descripcio", "area_ha", "shape_leng", "shape_area"];

	//Oceanografia > Islas - Ecosistema Marino Costero

islas = ["gid", "nombre", "area_ha", "shape_leng", "shape_area"];

//REVISAR
//mar_ecosist_marin_coste = ["gid", "dpto", "codigo", "descrip_", "categ_", "subcate_", "area_km2", "especies", "obs", "shape_leng", "shape_area"];
mar_ecosist_marin_coste = ["gid","categ_"];

	//Climatologia - Estaciones Meteorologicas

estaciones_meteorologicas = ["gid", "tip_est", "tip_subest", "estado", "ano_inicio", "ano_final", "nom_pro", "nom_dis", "altitud", "insti_oper", "codigo", "nombre"];



	//-------------------INFRAESTRUCTURA ----------------------

	//Transporte > Aerodromo - Aeropuerto - Puentes - Puertos - Caminos de Herradura

aerodromos = ["gid", "nombre", "provincia", "distrito", "categoria", "observ", "este", "sur"];//c

aeropuerto = ["gid", "nombre", "provincia", "distrito", "categoria", "este", "sur"];//c

puertos = ["gid", "nombre", "categoria", "provincia", "distrito", "este", "sur"];//c

puentes = ["gid", "nombre", "distrito", "provincia"];//c

caminos_herradura = ["gid", "estado2001", "codigo_dis", "dptonom02", "provnom02", "distnom02", "shape_leng"]; //p
	
//Red Vial > Departamental - Nacional - Vecinal

//REVISAR
//red_vial_departamental = ["gid", "cod_ds11", "cod_ds12", "tray_ds12","tray_ds11", "ubigeo", "long_km", "obs", "sentido", "base", "fecha_actu", "dpto", "provincia", "shape_leng"];//p(lineas)
red_vial_departamental = ["gid"];

red_via_nacional=["gid", "et_id", "cod_ds11", "tray_ds11", "long_km", "sentido", "base", "superficie", "fecha_actu", "cambios", "dpto", "provincia", "distrito", "shape_leng", "num_eje"];

red_vial_vecinal = ["gid", "cod_ds11", "cod_ds12", "tray_ds12","tray_ds11", "ubigeo", "long_km", "obs", "sentido", "base", "fecha_actu", "dpto", "provincia", "shape_leng"];

	

	//Energia y Electricidad > Central Hidraulica - Centrales Termicas - Estaciones Electricas - Lineas Electricas - Red Fibra Optica - Gaseoducto - Poliducto - Red de Gas

centrales_termicas = ["gid", "descrip", "provincia", "distrito", "departamen", "este", "sur"];

central_hidraulica = ["gid", "descrip", "distrito", "provincia", "departamen", "este", "sur"];//c

estaciones_electricas = ["gid", "clase", "nombre", "potencia", "provincia", "departamen", "distrito", "este", "sur"];

lineas_electricas = ["gid", "tipo_lt", "long_km", "shape_leng"];

red_fibra_optica = ["gid", "estado", "long_km", "shape_leng"];

gaseoducto = ["gid", "text_", "fuente", "long_km", "nombre", "shape_leng"];

poliducto = ["gid", "fuente", "long_km", "nombre", "shape_leng"];

red_de_gas = ["gid", "diametro", "long_km", "provincia", "shape_leng"];

	//-----------------------------SOCIAL ----------------------

	//Equipamiento > Centros Educativos > Chincha - Ica - Nazca - Palpa - Pisco
		// centros_educativos_chincha=["cod__ccpp","nom__ccpp","cod__local","nom__iiee","nivel","dirección","docentes","alumnos","distrito","provincia"];//c
		// centros_educativos_ica=["cod__ccpp","nom__ccpp","cod__local","nom__iiee","nivel","dirección","docentes","alumnos"];
		// centros_educativos_nazca=["provincia","nom__ccpp","cod__local","nom__iiee","nivel","dirección","docentes","alumnos"];
		// centros_educativos_palpa=["cod__ccpp","nom__ccpp","cod__local","nom__iiee","nivel","dirección","docentes","alumnos"];
		// centros_educativos_pisco=["nom__ccpp","cod__local","nom__iiee","nivel","dirección","docentes","alumnos"];

//centros_educativos = ["gid", "nom__ccpp", "cod__local", "nom__iiee", "nivel", "docentes", "alumnos", "este", "norte", "provincia", "distrito", "cod_modulo", "codccpp", "direccion"];

centros_educativos = ["gid","provincia","distrito","nom__ccpp","cod__local","nom__iiee","nivel","docentes","alumnos","direccion","codccpp","cod_modulo","norte","este"];
	//Centros Salud
		// centros_salud_chincha=["nombre","tipo","clasificac","provincia","red"];//c
		// centros_salud_ica=["nombre","tipo","clasificac","red"];
		// centros_salud_nazca=["nombre","direccion","red"];
		// centros_salud_palpa=["nombre","tipo","provincia"];
		// centros_salud_pisco=["nombre","departamen","provincia","distrito","dirección"];

centros_salud = ["gid", "objectid_1", "objectid_2", "nom_eess", "tipo", "clasifcaci", "cod_renae", "provincia", "distrito", "direccion", "num_doc", "telefono", "red", "disa_dires", "micro_red", "fuente", "institucio"];

	//Comisarias

comisarias = ["gid", "distrito", "comisaria", "direccion", "telefono", "provincia", "sector", "norte", "este"];


	//Bomberos

bomberos = ["gid", "provincia", "distrito", "direccion", "telefono", "estado_act", "numero_per", "mat__costr", "radios_mov", "medica", "ambulancia", "autobombas", "este", "norte", "compania"];

	//Pobreza

pobreza_departamental = ["gid", "poblacion2", "indice_de", "pob_sin_ag", "pob_sin_de", "pob_sin_el", "tasa_analb", "tas__desn_", "idh", "ninhos_0", "fecha", "porc_dept", "shape_leng", "shape_area"];//p

pobreza_provincial = ["gid", "provin", "pob_2007", "porc_pr", "s_agua", "s_deslet", "s_elect", "muj_analf", "nino_0_12", "desn_6_9", "idh_2", "shape_leng", "shape_area"];

pobreza_distrital = ["gid", "provin", "distritos", "pob_2007", "porc_pr", "s_agua", "s_deslet", "s_elect", "muj_analf", "nino_0_12", "desn_6_9", "idh", "shape_leng", "shape_area"];

	//Conflictos Sociales

conflictos_sociales = ["gid", "provincia", "distrito", "ubicacion", "n_ord", "caso_nuevo", "tipo", "est_dia", "est_conf", "x", "y"];


	//CATASTRO Y VIVIENDA

	// Areas Naturales Protegidas > Admin. Nacional - Admin. Regional - Zonas Amortiguamiento

anp_administracion_nacional = ["grid", "anp_cate", "anp_nomb", "anp_codi", "anp_balecr", "anp_fecrea", "area_ha", "shape_leng", "shape_area"];//p

	anp_administracion_regional = ["grid", "anpc_cat", "anpc_codi", "anpc_nomb", "anpc_balec", "anpc_felec", "area_ha", "shape_leng", "shape_area"];

	zonas_amortiguamiento = ["gid", "za_nomb", "za_bale","za_fecr", "area_ha", "shape_leng", "shape_area"];

	//Comunidades > Comunidades campesinas
	comunidades_campesinas = ["gid", "nombre", "estado", "area_ha", "dptos", "shape_leng", "shape_area"];//p

	

	//ECONOMIA Y PROD > Agropecuario > Cultivos agric - Ganaderia
	cultivos_agricolas=["descripcio","area_ha"];//p
	ganaderia=["descripcio","area_ha"];

	//Analisis Temperaturas Bajas
	tb_ica=["nombdist","pobrez2013","provincia","pob_2015","tmortal_5","tneum_5","tleta_5","tiras_5","ids_5"];

	//Minas
	//47
	/*minas=["minautm_","id","mina","latitud","longitud","elemento","hoja","ubicacion","deposito","forma","estado"];//c*/
	minas=["mina"];