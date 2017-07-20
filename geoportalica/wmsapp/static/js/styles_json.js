//Lim departamental style
	var stlLimDep = {
			 	opacity: 1,
                color: 'rgba(129,129,129,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 3.0,
                fillOpacity: 0,
	};

	var stlLimDis = {
				opacity: 1,
                color: 'rgba(129,129,129,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 0
	}

	var stlLimPro = {
				 opacity: 1,
                color: 'rgba(206,0,68,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 2.0,
                fillOpacity: 0
	}	

	var stlLit = {
				opacity: 1,
                color: 'rgba(0,92,230,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 3.0,
                fillOpacity: 0
	}

	var stlFallas = {
				opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '10,5',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1.0,
                fillOpacity: 0
	};

        /*
	var stlHidrPrin = {
		 		opacity: 1,
                color: 'rgba(64,211,240,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 3.0,
                fillOpacity: 0
	};
        */

//Hidografia Principal
        function stlHidrPrin(feature) {
            switch(feature.properties['rasgo_prin']) {
                case 'Quebrada Húmeda':
                    return {
                //pane: 'pane_HidrografiaPrincipal1',
                opacity: 1,
                color: 'rgba(70,164,240,1.0)',
                dashArray: '10,5',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 2.0,
                fillOpacity: 0,
            }
                    break;
                case 'Quebrada Seca':
                    return {
                //pane: 'pane_HidrografiaPrincipal1',
                opacity: 1,
                color: 'rgba(89,181,209,1.0)',
                dashArray: '10,5',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1.0,
                fillOpacity: 0,
            }
                    break;
                case 'Río Principal':
                    return {
                //pane: 'pane_HidrografiaPrincipal1',
                opacity: 1,
                color: 'rgba(88,86,228,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 3.0,
                fillOpacity: 0,
            }
                    break;
                case 'Río Secundario':
                    return {
                //pane: 'pane_HidrografiaPrincipal1',
                opacity: 1,
                color: 'rgba(81,89,206,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 2.0,
                fillOpacity: 0,
            }
                    break;
            }
        }

//CUM - Capacidad de uso mayor
        function styleCum(feature) {
            var context = {
                feature: feature,
                variables: {}
            };
            // Start of if blocks and style check logic
            if (CUM0rule0_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(209,95,42,1.0)',
            };
                }
                else if (CUM0rule1_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(162,205,86,1.0)',
            };
                }
                else if (CUM0rule2_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(218,220,66,1.0)',
            };
                }
                else if (CUM0rule3_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(243,0,0,1.0)',
            };
                }
                else if (CUM0rule4_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(150,73,17,1.0)',
            };
                }
                else if (CUM0rule5_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(137,121,209,1.0)',
            };
                }
                else if (CUM0rule6_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(130,40,204,1.0)',
            };
                }
                else if (CUM0rule7_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(70,93,210,1.0)',
            };
                }
                else if (CUM0rule8_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(74,153,76,1.0)',
            };
                }
                else if (CUM0rule9_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(223,163,43,1.0)',
            };
                }
                else if (CUM0rule10_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(240,45,192,1.0)',
            };
                }
                else if (CUM0rule11_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(138,187,233,1.0)',
            };
                }
                else if (CUM0rule12_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(43,215,54,1.0)',
            };
                }
                else if (CUM0rule13_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(37,213,172,1.0)',
            };
                }
                else if (CUM0rule14_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(101,204,220,1.0)',
            };
                }
                else if (CUM0rule15_eval_expression(context)) {
                  return {
                pane: 'pane_CUM0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(216,28,104,1.0)',
            };
                }
            else {
                return {fill: false, stroke: false};
            }
        }        

//Suelos
        function stlSuelos(feature) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                // Start of if blocks and style check logic
                if (Suelos3rule0_eval_expression(context)) {
                      return {
                    pane: 'pane_Suelos3',
                    opacity: 1,
                    color: 'rgba(0,0,0,1.0)',
                    dashArray: '',
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    weight: 1.0, 
                    fillOpacity: 1,
                    fillColor: 'rgba(153,52,4,1.0)',
                };
                    }
                    else if (Suelos3rule1_eval_expression(context)) {
                      return {
                    pane: 'pane_Suelos3',
                    opacity: 1,
                    color: 'rgba(0,0,0,1.0)',
                    dashArray: '',
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    weight: 1.0, 
                    fillOpacity: 1,
                    fillColor: 'rgba(204,86,12,1.0)',
                };
                    }
                    else if (Suelos3rule2_eval_expression(context)) {
                      return {
                    pane: 'pane_Suelos3',
                    opacity: 1,
                    color: 'rgba(0,0,0,1.0)',
                    dashArray: '',
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    weight: 1.0, 
                    fillOpacity: 1,
                    fillColor: 'rgba(240,130,30,1.0)',
                };
                    }
                    else if (Suelos3rule3_eval_expression(context)) {
                      return {
                    pane: 'pane_Suelos3',
                    opacity: 1,
                    color: 'rgba(0,0,0,1.0)',
                    dashArray: '',
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    weight: 1.0, 
                    fillOpacity: 1,
                    fillColor: 'rgba(254,179,81,1.0)',
                };
                    }
                    else if (Suelos3rule4_eval_expression(context)) {
                      return {
                    pane: 'pane_Suelos3',
                    opacity: 1,
                    color: 'rgba(0,0,0,1.0)',
                    dashArray: '',
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    weight: 1.0, 
                    fillOpacity: 1,
                    fillColor: 'rgba(255,225,156,1.0)',
                };
                    }
                else {
                    return {fill: false, stroke: false};
                }
            }

//Vulnerabilidad de Tierras
    function stlVulnTier(feature) {
            var context = {
                feature: feature,
                variables: {}
            };
            // Start of if blocks and style check logic
            if (VulnerabilidadTierras4rule0_eval_expression(context)) {
                  return {
                pane: 'pane_VulnerabilidadTierras4',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(66,76,218,1.0)',
            };
                }
                else if (VulnerabilidadTierras4rule1_eval_expression(context)) {
                  return {
                pane: 'pane_VulnerabilidadTierras4',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(154,151,151,1.0)',
            };
                }
                else if (VulnerabilidadTierras4rule2_eval_expression(context)) {
                  return {
                pane: 'pane_VulnerabilidadTierras4',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(243,0,0,1.0)',
            };
                }
                else if (VulnerabilidadTierras4rule3_eval_expression(context)) {
                  return {
                pane: 'pane_VulnerabilidadTierras4',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(248,165,0,1.0)',
            };
                }
                else if (VulnerabilidadTierras4rule4_eval_expression(context)) {
                  return {
                pane: 'pane_VulnerabilidadTierras4',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(255,243,1,1.0)',
            };
                }
                else if (VulnerabilidadTierras4rule5_eval_expression(context)) {
                  return {
                pane: 'pane_VulnerabilidadTierras4',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(51,160,44,1.0)',
            };
                }
            else {
                return {fill: false, stroke: false};
            }
        }

//Relieves
    function stlReli(feature) {
            var context = {
                feature: feature,
                variables: {}
            };
            // Start of if blocks and style check logic
            if (Relieves5rule0_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(208,16,90,1.0)',
            };
                }
                else if (Relieves5rule1_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(57,221,131,1.0)',
            };
                }
                else if (Relieves5rule2_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(58,128,203,1.0)',
            };
                }
                else if (Relieves5rule3_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(132,211,106,1.0)',
            };
                }
                else if (Relieves5rule4_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(57,237,75,1.0)',
            };
                }
                else if (Relieves5rule5_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(226,86,16,1.0)',
            };
                }
                else if (Relieves5rule6_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(210,45,166,1.0)',
            };
                }
                else if (Relieves5rule7_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(229,237,73,1.0)',
            };
                }
                else if (Relieves5rule8_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(119,213,229,1.0)',
            };
                }
                else if (Relieves5rule9_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(160,108,110,1.0)',
            };
                }
                else if (Relieves5rule10_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(127,71,31,1.0)',
            };
                }
                else if (Relieves5rule11_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(160,228,58,1.0)',
            };
                }
                else if (Relieves5rule12_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(70,206,179,1.0)',
            };
                }
                else if (Relieves5rule13_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(66,84,207,1.0)',
            };
                }
                else if (Relieves5rule14_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(101,67,221,1.0)',
            };
                }
                else if (Relieves5rule15_eval_expression(context)) {
                  return {
                pane: 'pane_Relieves5',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(101,67,221,1.0)',
            };
                }
            else {
                return {fill: false, stroke: false};
            }
        }



//Metalogenetica
        function stlMeta(feature) {
            var context = {
                feature: feature,
                variables: {}
            };
            // Start of if blocks and style check logic
            if (Metalogenetica2rule0_eval_expression(context)) {
                  return {
                pane: 'pane_Metalogenetica2',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(237,196,100,1.0)',
            };
                }
                else if (Metalogenetica2rule1_eval_expression(context)) {
                  return {
                pane: 'pane_Metalogenetica2',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(160,204,106,1.0)',
            };
                }
                else if (Metalogenetica2rule2_eval_expression(context)) {
                  return {
                pane: 'pane_Metalogenetica2',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(218,12,23,1.0)',
            };
                }
                else if (Metalogenetica2rule3_eval_expression(context)) {
                  return {
                pane: 'pane_Metalogenetica2',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(214,95,190,1.0)',
            };
                }
                else if (Metalogenetica2rule4_eval_expression(context)) {
                  return {
                pane: 'pane_Metalogenetica2',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(93,223,119,1.0)',
            };
                }
                else if (Metalogenetica2rule5_eval_expression(context)) {
                  return {
                pane: 'pane_Metalogenetica2',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(123,227,224,1.0)',
            };
                }
                else if (Metalogenetica2rule6_eval_expression(context)) {
                  return {
                pane: 'pane_Metalogenetica2',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(48,94,209,1.0)',
            };
                }
            else {
                return {fill: false, stroke: false};
            }
        }

//Hidrogeologia
        function stlHidrGeol(feature) {
            var context = {
                feature: feature,
                variables: {}
            };
            // Start of if blocks and style check logic
            if (hidrogelogia0rule0_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(231,157,108,1.0)',
            };
                }
                else if (hidrogelogia0rule1_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(80,133,63,1.0)',
            };
                }
                else if (hidrogelogia0rule2_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(50,222,76,1.0)',
            };
                }
                else if (hidrogelogia0rule3_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(90,104,212,1.0)',
            };
                }
                else if (hidrogelogia0rule4_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(38,127,216,1.0)',
            };
                }
                else if (hidrogelogia0rule5_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(222,55,13,1.0)',
            };
                }
                else if (hidrogelogia0rule6_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(117,240,205,1.0)',
            };
                }
                else if (hidrogelogia0rule7_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(44,202,223,1.0)',
            };
                }
                else if (hidrogelogia0rule8_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(232,230,110,1.0)',
            };
                }
                else if (hidrogelogia0rule9_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(93,172,205,1.0)',
            };
                }
                else if (hidrogelogia0rule10_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(211,73,235,1.0)',
            };
                }
                else if (hidrogelogia0rule11_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(147,93,209,1.0)',
            };
                }
                else if (hidrogelogia0rule12_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(232,95,173,1.0)',
            };
                }
                else if (hidrogelogia0rule13_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(96,233,88,1.0)',
            };
                }
                else if (hidrogelogia0rule14_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(95,85,212,1.0)',
            };
                }
                else if (hidrogelogia0rule15_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(82,155,162,1.0)',
            };
                }
                else if (hidrogelogia0rule16_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(206,62,88,1.0)',
            };
                }
                else if (hidrogelogia0rule17_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(112,236,178,1.0)',
            };
                }
                else if (hidrogelogia0rule18_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(196,225,68,1.0)',
            };
                }
                else if (hidrogelogia0rule19_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(238,82,82,1.0)',
            };
                }
                else if (hidrogelogia0rule20_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(211,171,12,1.0)',
            };
                }
                else if (hidrogelogia0rule21_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(239,31,191,1.0)',
            };
                }
                else if (hidrogelogia0rule22_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(19,88,236,1.0)',
            };
                }
                else if (hidrogelogia0rule23_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(178,99,220,1.0)',
            };
                }
                else if (hidrogelogia0rule24_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(107,221,212,1.0)',
            };
                }
                else if (hidrogelogia0rule25_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(222,165,84,1.0)',
            };
                }
                else if (hidrogelogia0rule26_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(125,207,62,1.0)',
            };
                }
                else if (hidrogelogia0rule27_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(121,92,200,1.0)',
            };
                }
                else if (hidrogelogia0rule28_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(162,230,43,1.0)',
            };
                }
                else if (hidrogelogia0rule29_eval_expression(context)) {
                  return {
                pane: 'pane_hidrogelogia0',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fillOpacity: 1,
                fillColor: 'rgba(219,12,92,1.0)',
            };
                }
            else {
                return {fill: false, stroke: false};
            }
        }

//Curvas de nivel
    function stlCurvasNivel(feature) {
            var context = {
                feature: feature,
                variables: {}
            };
            // Start of if blocks and style check logic
            if (curvasnivel0rule0_eval_expression(context)) {
                  return {
                pane: 'pane_curvasnivel0',
                opacity: 1,
                color: 'rgba(219,108,5,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1.0,
                fillOpacity: 0,
            };
                }
                else if (curvasnivel0rule1_eval_expression(context)) {
                  return {
                pane: 'pane_curvasnivel0',
                opacity: 1,
                color: 'rgba(230,170,29,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1.0,
                fillOpacity: 0,
            };
                }
            else {
                return {fill: false, stroke: false};
            }
        }