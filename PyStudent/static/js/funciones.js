//Validacionde tamaño de pantalla para un correcto funcionamiento

window.onresize = function(event) {
  sizeValidator();
};

function sizeValidator(){
  if(window.innerWidth <= 800 || window.innerHeight <= 600) {
    document.body.style.overflow="hidden";
    document.getElementById("no-compatible").classList.remove("no-visible");
  } else {
    document.body.style.overflow="auto";
    document.getElementById("no-compatible").classList.add("no-visible");
  }
}

document.addEventListener("DOMContentLoaded", sizeValidator);

//Notificaciones del Sistema

 function generarNotificacion(titulo, mensaje, boton, estado) {
     contenedorGeneral = document.getElementById("centrar_ventana_notificaciones");

     contenedorNotificacion = document.createElement('div');
     contenedorNotificacion.setAttribute("id", "ventana_notificaciones");

     contenedorEncabezadoNotificacion = document.createElement('div');
     contenedorEncabezadoNotificacion.setAttribute("id", "notificaciones_encabezado");

     contenedorInformacionNotificacion = document.createElement('div');
     contenedorInformacionNotificacion.classList.add("informacion_notificacion");

     contenedorPieNotificacion = document.createElement('div');
     contenedorPieNotificacion.classList.add("pie_notificaciones_general");

     h1 = document.createElement('h1');
     textoh1 = document.createTextNode(titulo);
     h1.appendChild(textoh1);
     h1.setAttribute("id", "titulo_notificacion");

     p = document.createElement('p');
     informacionp = document.createTextNode(mensaje);
     p.appendChild(informacionp);
     p.setAttribute("id", "contenido_notificacion");

     labelBoton = document.createElement('label');
     textoBoton = document.createTextNode(boton);
     labelBoton.appendChild(textoBoton);
     labelBoton.classList.add("guardar_btn");
     labelBoton.classList.add("div5");
     labelBoton.setAttribute("id", "boton_notificacion");

     if(estado=="ok"){
       contenedorEncabezadoNotificacion.classList.add("notificaciones_encabezado_ok");
       labelBoton.classList.add("guardar_btn_ok");
     }

     contenedorEncabezadoNotificacion.appendChild(h1);
     contenedorInformacionNotificacion.appendChild(p);
     contenedorPieNotificacion.appendChild(labelBoton);

     contenedorNotificacion.appendChild(contenedorEncabezadoNotificacion);
     contenedorNotificacion.appendChild(contenedorInformacionNotificacion);
     contenedorNotificacion.appendChild(contenedorPieNotificacion);

     contenedorGeneral.appendChild(contenedorNotificacion);

     document.getElementById("background-loading-notification").classList.remove("no-visible");
 }

 function cerrarNotificacion() {

      document.getElementById("background-loading-notification").classList.add("no-visible");
      document.getElementById('ventana_notificaciones').remove();
  }


//Funcionalidad General del Sistema

function registrar(){
  nombre = $("#nombreRegistro").val();
  apellidos = $("#apellidosRegistro").val();
  dia = $("#dia option:selected").text();
  mes = $("#mes").val();
  anio = $("#anio option:selected").text();
  estado = $("#estado option:selected").text();
  correo = $("#emailRegistro").val();
  password = $("#contraseniaRegistro").val()
  password2 = $("#contraseniaVerificarRegistro").val()

    if (password == password2) {
      if (nombre != "" && apellidos != "" && dia != "" && mes != "" && anio != "" && estado != "" && correo != "" && password != "") {
        $.ajax({
            type: 'POST',
            url: '#',
            data:{
                csrfmiddlewaretoken: $("#token").val(),
                nombre: nombre,
                apellidos: apellidos,
                fecNac: dia +"/"+mes+"/"+anio,
                estado: estado,
                correo: correo,
                password: password,
            },
            success: function(hola) {
              if (hola == 1) {
                generarNotificacion("Registro Exitoso","El alumno ha sido registrado de manera exitosa en PyStudent.","ACEPTAR","ok");
                document.getElementById("boton_notificacion").addEventListener("click", function() {
                  cerrarNotificacion();
                  window.location.href = "/pystudent/login/";
                });
              }
              else{
                generarNotificacion("Usuario Existente","La dirección de correo electrónico ingresado ya se encuentra registrada.","ACEPTAR","error");
                document.getElementById("boton_notificacion").addEventListener("click", function() {
                  cerrarNotificacion();
                });
              }
          }
        });
      } else{
        generarNotificacion("Completar Información","Se detectaron campos vacios, complete toda la información obligatoria para continuar.","ACEPTAR","error");
        document.getElementById("boton_notificacion").addEventListener("click", function() {
          cerrarNotificacion();
        });
      }
    }
    else{
      generarNotificacion("Error de Contraseña","Verifique que las contraseñas ingresadas coincidan e inténtelo nuevamente.","ACEPTAR","error");
      document.getElementById("boton_notificacion").addEventListener("click", function() {
        cerrarNotificacion();
      });
    }
  }

function cargarEstados(){
  $.ajax({
      url: '#',
      success: function(response) {
        result = response;
        $.each(result, function( key, value ) {
          $.each(value, function(key, value){
            document.getElementById('estado').innerHTML +=
            "<option>"+value+"</option>"
          });
        });
        for(i=1; i<=31; i++){
          document.getElementById('dia').innerHTML+=
          "<option>"+i+"</option>"
        }
        for(i=0; i<=11; i++){
          var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
          document.getElementById('mes').innerHTML+=
          "<option value="+(i+1)+">"+meses[i]+"</option>"
        }
        for(i=1980; i<=2017; i++){
          document.getElementById('anio').innerHTML+=
          "<option>"+i+"</option>"
        }
      }
    });
}

function verificarLogin(){
  $.ajax({
      type: 'POST',
      url: '',
      data:{
          csrfmiddlewaretoken: $("#token").val(),
          correo: $("#correoInicioSesion").val(),
          password: $("#contraseniaInicioSesion").val(),
      },
      success: function(response) {
        if (response['key'] === '0') {
          generarNotificacion("Usuario/Contraseña Incorrectos","Se ha ingresado erroneamente el usuario o la contraseña del alumno, verifique la información.","ACEPTAR","error");
          document.getElementById("boton_notificacion").addEventListener("click", function() {
            cerrarNotificacion();
          });
        }
        else{
          window.location.href = "/pystudent/materia";
        }
    }
  });
}

function gradoDictado(element,x){

  if(document.querySelector(".box-grade-selected")){
    var box = document.querySelector(".box-grade-selected");
    box.classList.remove("box-grade-selected");
  }

  element.classList.add("box-grade-selected");

  var a = document.getElementById('irDictado'); //or grab it by tagname etc
  a.href = "/pystudent/dictado?grado="+x;
  a.disabled = false;
}

function leerPalabra() {
    var audio = document.getElementById("audio");
    audio.play();
}

x = 0;
palabras = [];
function cambiarPalabra(){
  $.ajax({
      type: 'POST' ,
      url: '#',
      data:{
          csrfmiddlewaretoken: $("#token").val(),
          key: x,
      },
      success: function(response) {
        var audio = document.getElementById("audio");
        audio.src = response
        document.getElementById('conteo').innerHTML = "<p>Palabra "+(x+1)+" de 20</p>"
        if (x>0) {
          palabras.push(document.getElementById('palabraEscrita').value.toLowerCase())
          document.getElementById('palabraEscrita').value = ""
        }
        if (x == 19) {
          boton = document.getElementById('siguiente');
          link = document.getElementById('ref');
          link.href = "/pystudent/resultados/";
          boton.innerHTML = "Finalizar Dictado";
          boton.onclick = null;
          boton.onclick = function(){
            enviarPalabras();
          }
        }
        x++
    }
  });
}

function enviarPalabras(){
    palabras.push(document.getElementById('palabraEscrita').value.toLowerCase())
    if (palabras.length < 20) {
      while (palabras.length < 20) {
        palabras.push(" ")
      }
    }
    tiempo = document.getElementById('reloj').innerHTML
    grado=findGetParameter('grado');
  $.ajax({
      type: 'POST' ,
      url: '/pystudent/resultados/',
      data:{
          csrfmiddlewaretoken: $("#token").val(),
          'arrPalabras': palabras,
          'grade' : grado,
          'tiempo' : tiempo,
      },
      success: function() {
    }
  });
}

function startTimer() {
    var timer = 0, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display = document.getElementById('reloj');
        display.innerHTML = minutes + ":" + seconds;

        timer++
        timer = duration;
    }, 1000);
}

$(document).ajaxStart(function(){
          $("#loader").css("display","block");
          $("#bocina").css("display","none");

          if(document.getElementById("background-loading")){
            document.getElementById("background-loading").classList.remove("no-visible");
            document.getElementById("loading-div").classList.remove("no-visible");
          }
        });
$(document).ajaxComplete(function(){
          $("#loader").css("display","none");
          $("#bocina").css("display","block");

          if(document.getElementById("background-loading")){
            document.getElementById("loading-div").classList.add("no-visible");
            document.getElementById("background-loading").classList.add ("no-visible");
          }
        });

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
