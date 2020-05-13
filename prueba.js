function consultaSubastaActiva(request, subastas, subastasu1, subastasu2, subastasu3){
  
    var subasta        = request.parameter.codigo;
    var usuario        = request.parameter.usuario;
    
    var datos          = subastas.getRange(1,1, subastas.getLastRow(), subastas.getLastColumn()).getValues();
    
    var lista_subastas = datos.map(function(r) {return r[1]});
    var lista_bucket   = datos.map(function(r) {return r[0]});
    
    var subasta_temp   = lista_subastas.indexOf(subasta);
    var posicion       = 0;
    
    var r_flag;
    var r_acceso;
    
    if( subasta_temp > -1){
      r_flag = 1;
      posicion = datos[subasta_temp][0];
      var datos_U1 = subastasu1.getRange(1,1, subastasu1.getLastRow(), subastasu1.getLastColumn()).getValues();
      var datos_U2 = subastasu2.getRange(1,1, subastasu2.getLastRow(), subastasu2.getLastColumn()).getValues();
      var datos_U3 = subastasu3.getRange(1,1, subastasu3.getLastRow(), subastasu3.getLastColumn()).getValues();
      
      var lista_U1 = datos_U1.map(function(r) {return r[0]});
      var lista_U2 = datos_U2.map(function(r) {return r[0]});
      var lista_U3 = datos_U3.map(function(r) {return r[0]});
      
      switch( posicion ){
          
        case 1 :
          var usr_temp   = lista_U1.indexOf(usuario);
          if(lista_U1.length >=20){
            if (usr_temp > -1){
              r_acceso = 1;
            }else{
              r_acceso = 0;
            }
          }else{
            if (usr_temp > -1){
              r_acceso = 1;
            }
            else{
              subastasu1.appendRow([usuario, 0]);
              r_acceso = 1;
            }
          }
        break;
          
        case 2 :
          var usr_temp   = lista_U2.indexOf(usuario);
          if(lista_U2.length >=20){
            if (usr_temp > -1){
              r_acceso = 1;
            }else{
              r_acceso = 0;
            }
          }else{
            if (usr_temp > -1){
              r_acceso = 1;
            }
            else{
              subastasu2.appendRow([usuario, 0]);
              r_acceso = 1;
            }
        }
        break;

        case 3 :
        var usr_temp   = lista_U3.indexOf(usuario);
        if(lista_U3.length >=20){
            if (usr_temp > -1){
                r_acceso = 1;
            }
            else{
                r_acceso = 0;
            }
            }else{
            if (usr_temp > -1){
                r_acceso = 1;
            }
            else{
                subastasu3.appendRow([usuario, 0]);
                r_acceso = 1;
            }
        }
        break;
        }
    } 
    else{
        r_flag = 0;
        r_acceso = 0;
    }
    
    Logger.log(r_flag);
    
    var result = JSON.stringify({
        "result"   : r_acceso,
        "r_metodo" : "ingresarSubasta",
        "r_bucket" : posicion,
    });
        
    return ContentService
    .createTextOutput(request.parameter.callback + "(" + result + ")")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);   
}