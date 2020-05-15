var script_url = "https://script.google.com/macros/s/AKfycbyiGAEZL99-hx1vXPiiDrl0fRryIrMUKPq3WTs6FmZfl6Jwl_o/exec";
var subasta_bucket = 0;
var base_datos;
var bandera_subasta = 0;
var titulo_subasta;

function setup() {
    card_login = select('#login');
    usuario = select('#usuario');
    contra = select('#pw');
    b_login = select('#ingresar');
    b_login.mouseClicked(login);
    loading_login = select("#loading1");

    card_codigo_subasta = select('#codigo_subasta');
    codigo_subasta = select('#codigo');
    b_ingresar_subasta = select('#ingresar_subasta');
    b_ingresar_subasta.mouseClicked(ingresar_subasta);
    loading_ingresar_subasta = select("#loading6");

    card_usuario = select('#usuario_nom');
    nombre_usuario = select('#nombre_usuario');

    card_subasta = select('#subasta');
    titulo_subasta = select('#titulo_subasta');
    descripcion_subasta = select('#descripcion_subasta');
    usuario_alto = select('#usuario_alto');
    monto_subasta = select('#monto_subasta');
    duracion = select('#duracion');
    imagen_subasta = select('#imagen_subasta');
    b_menos = select('#b_menos');
    b_menos.mouseClicked(menos);
    cantidad = select('#cantidad');
    cantidad.value(0);
    b_mas = select('#b_mas');
    b_mas.mouseClicked(mas);
    b_ofrecer = select('#b_ofrecer');
    b_ofrecer.mouseClicked(ofrecer);
    b_salir = select('#b_salir');
    b_salir.mouseClicked(salir);
    div_botones_subasta = select('#botonesSubasta');
    loading_subasta = select('#loading7');

    tabla_posiciones = select('#tabla_posiciones');

    var firebaseConfig = {
        apiKey: "AIzaSyC7qk-KYkAIj2xa4t2sI5BQZ3_oWqGtnwk",
        authDomain: "subastas-97669.firebaseapp.com",
        databaseURL: "https://subastas-97669.firebaseio.com",
        projectId: "subastas-97669",
        storageBucket: "subastas-97669.appspot.com",
        messagingSenderId: "579666934781",
        appId: "1:579666934781:web:5b9d7eb1c892186fab7794",
    };

    firebase.initializeApp(firebaseConfig);

    base_datos = firebase.database();



}

function login() {
    b_login.hide();
    loading_login.show();
    if (usuario.value() != "" && contra.value() != "") {
        var url = script_url + "?callback=ctrlq&" +
            "&usuario=" + usuario.value() +
            "&pw=" + contra.value() +
            "&action=login";

        var request = jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp",
        });
    } else {
        alert("Existen campos vacios");
        loading_login.hide();
        b_login.show();
    }
}

function ingresar_subasta() {
    b_ingresar_subasta.hide();
    loading_ingresar_subasta.show();
    if (codigo_subasta != "") {
        var url = script_url + "?callback=ctrlq&" +
            "&codigo=" + codigo_subasta.value() +
            "&usuario=" + usuario.value() +
            "&action=ingresarSubasta";

        var request = jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp",
        });
    } else {
        alert("Codigo de subasta vacio");
        loading_ingrsar_subasta.hide();
        b_ingresar_subasta.show();
    }

}

function mas() {
    var valor_actual = cantidad.value();
    valor_actual = int(valor_actual) + 100;
    cantidad.value(valor_actual);
}

function menos() {
    var valor_actual = cantidad.value();
    valor_actual = int(valor_actual) - 100;
    if (valor_actual < 0) {
        cantidad.value(0);
    } else {
        cantidad.value(valor_actual);
    }

}

function ofrecer() {
    div_botones_subasta.hide();
    loading_subasta.show();
    var url = script_url + "?callback=ctrlq&" +
        "&usuario=" + usuario.value() +
        "&monto=" + cantidad.value() +
        "&bucket=" + subasta_bucket +
        "&id=" + codigo_subasta.value() +
        "&articulo=" + subasta_nombre +
        "&action=crearPuja";

    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp",
    });
}

function salir() {
    card_codigo_subasta.show();
    card_subasta.hide();
    tabla_posiciones.hide();
    bandera_subasta = 0;

}

function gotData1(data) {
    if (bandera_subasta == 1) {
        datos1 = data.val();
        if (datos1.activo == 1) {
            titulo_subasta.html(datos1.nombre + "-" + datos1.id);
            subasta_nombre = datos1.nombre;
            descripcion_subasta.html(datos1.descripcion);
            usuario_alto.html("El usuario mas alto es:" + datos1.usuarioAlto);
            monto_subasta.html("$" + nfc(datos1.cantidad));
            duracion.html("Fecha limite: " + datos1.fecha + " a las " + datos1.hora);
            var id_1 = split(datos1.imagen, '/d/');
            var id_2 = split(id_1[1], '/');
            var url_imagen = "https://drive.google.com/uc?id=" + id_2[0];
            document.getElementById("imagen_subasta").src = url_imagen;
            actualizar_tabla();
        } else {
            alert("La suabasta termino");
            card_subasta.hide();
            tabla_posiciones.hide();
            loading_subasta.hide();
            card_codigo_subasta.show();
            bandera_subasta = 0;
        }

    }
}

function errData1() {

}

function gotData2(data) {
    if (bandera_subasta == 2) {
        datos2 = data.val();
        if (datos2.activo == 1) {
            titulo_subasta.html(datos2.nombre + "-" + datos2.id);
            subasta_nombre = datos2.nombre;
            descripcion_subasta.html(datos2.descripcion);
            usuario_alto.html("El usuario mas alto es:" + datos2.usuarioAlto);
            monto_subasta.html("$" + nfc(datos2.cantidad));
            duracion.html("Fecha limite: " + datos2.fecha + " a las " + datos2.hora);
            var id_12 = split(datos2.imagen, '/d/');
            var id_22 = split(id_12[1], '/');
            var url_imagen2 = "https://drive.google.com/uc?id=" + id_22[0];
            document.getElementById("imagen_subasta").src = url_imagen2;
            actualizar_tabla();
        } else {
            alert("La suabasta termino");
            card_subasta.hide();
            tabla_posiciones.hide();
            loading_subasta.hide();
            card_codigo_subasta.show();
            bandera_subasta = 0;
        }
    }

}

function errData2() {

}

function gotData3(data) {
    if (bandera_subasta == 3) {
        datos3 = data.val();
        if (datos3.activo == 1) {
            titulo_subasta.html(datos3.nombre + "-" + datos3.id);
            subasta_nombre = datos3.nombre;
            descripcion_subasta.html(datos3.descripcion);
            usuario_alto.html("El usuario mas alto es:" + datos3.usuarioAlto);
            monto_subasta.html("$" + nfc(datos3.cantidad));
            duracion.html("Fecha limite: " + datos3.fecha + " a las " + datos3.hora);
            var id_13 = split(datos3.imagen, '/d/');
            var id_23 = split(id_13[1], '/');
            var url_imagen3 = "https://drive.google.com/uc?id=" + id_23[0];
            document.getElementById("imagen_subasta").src = url_imagen3;
            actualizar_tabla();
        } else {
            alert("La suabasta termino");
            card_subasta.hide();
            loading_subasta.hide();
            card_codigo_subasta.show();
            tabla_posiciones.hide();
            bandera_subasta = 0;
        }
    }

}

function errData3() {

}

function actualizar_tabla() {
    var url = script_url + "?callback=ctrlq&" +
        "&bucket=" + subasta_bucket +
        "&action=actualizarTabla";

    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp",
    });
}

function ctrlq(e) {
    //console.log(e);
    if (e.r_metodo == "login") {
        if (e.result == 1) {
            alert("Bienvenido");
            loading_login.hide();
            b_login.show();
            card_login.hide();
            card_usuario.show();
            nombre_usuario.html(usuario.value());
            card_codigo_subasta.show();
        } else {
            alert("Usuario y/o contraseña incoreectas");
            loading_login.hide();
            b_login.show();
        }
    } else if (e.r_metodo == "ingresarSubasta") {
        if (e.result == 1) {
            loading_ingresar_subasta.hide();
            b_ingresar_subasta.show();
            card_codigo_subasta.hide();
            card_subasta.show();
            tabla_posiciones.show();
            subasta_bucket = e.r_bucket;
            if (e.r_bucket == 1) {
                bandera_subasta = 1;
                var ref1 = base_datos.ref("subasta1");
                ref1.on("value", gotData1, errData1);
            } else if (e.r_bucket == 2) {
                bandera_subasta = 2;
                var ref2 = base_datos.ref("subasta2");
                ref2.on("value", gotData2, errData2);
            } else if (e.r_bucket == 3) {
                bandera_subasta = 3;
                var ref3 = base_datos.ref("subasta3");
                ref3.on("value", gotData3, errData3);
            }
        } else {
            alert("No se puede ingresar a la subasta debido a que el codigo es incorrecto o la sala ya esta llena");
            loading_ingresar_subasta.hide();
            b_ingresar_subasta.show();
        }
    } else if (e.r_metodo == "crearPuja") {
        alert(e.result);
        loading_subasta.hide();
        div_botones_subasta.show();
    } else if (e.r_metodo == "actualizarTabla") {
        var ta = e.result.sort((a, b) => b[1] - a[1]).slice(0, 10);
        var num_t = ta.length;
        $("#t_rank").html("");
        for (var i = 0; i < num_t; i++) {
            var pos = int(i) + 1;
            if (pos == 1) {
                var tr = `<tr>
            <td>` + pos + `</td>
            <td>` + ta[i][0] + `</td>
            <td>` + '$' + nfc(ta[i][1]) + `</td>
            <td><i class="fa fa-fw fa-trophy " style="color: gold; "></i></td>
          </tr>`;
                $("#t_rank").append(tr)
            } else if (pos == 2) {
                var tr = `<tr>
                <td>` + pos + `</td>
                <td>` + ta[i][0] + `</td>
                <td>` + '$' + nfc(ta[i][1]) + `</td>
                <td><i class="fa fa-fw fa-trophy " style="color: silver; "></i></td>
              </tr>`;
                $("#t_rank").append(tr)
            } else if (pos == 3) {
                var tr = `<tr>
                <td>` + pos + `</td>
                <td>` + ta[i][0] + `</td>
                <td>` + '$' + nfc(ta[i][1]) + `</td>
                <td><i class="fa fa-fw fa-trophy " style="color: brown; "></i></td>
              </tr>`;
                $("#t_rank").append(tr)
            } else if (pos > 3) {
                var tr = `<tr>
            <td>` + pos + `</td>
            <td>` + ta[i][0] + `</td>
            <td>` + '$' + nfc(ta[i][1]) + `</td>
            <td><i class="fa fa-fw fa-user "></i></td>
          </tr>`;
                $("#t_rank").append(tr)
            }

        }

    }
}