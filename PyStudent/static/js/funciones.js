function registrar(){
    $.ajax({
        type: 'POST',
        url: '#',
        data:{
            csrfmiddlewaretoken: $("#token").val(),
            nombre: $("#nombreRegistro").val(),
            apellidos: $("#apellidosRegistro").val(),
            fecNac: $("#dia option:selected").text()+"/"+$("#mes option:selected").text()+"/"+$("#anio option:selected").text(),
            estado: $("#estado option:selected").text(),
            correo: $("#emailRegistro").val(),
            password: $("#contraseniaRegistro").val(),
        },
        success: function() {
          alert("Registro exitoso");
          window.location.href = "/pystudent/login/";
      }
    });
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
        for(i=1; i<=12; i++){
          document.getElementById('mes').innerHTML+=
          "<option>"+i+"</option>"
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
          alert("El usuario y/o contraseña son incorrectos")
        }
        else{
          window.location.href = "/pystudent/materia";
        }
    }
  });
}

function gradoDictado(x){
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
        if (x == 1) {
          boton = document.getElementById('siguiente');
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
  $.ajax({
      type: 'POST' ,
      url: '/pystudent/resultados/',
      data:{
          csrfmiddlewaretoken: $("#token").val(),
          'arrPalabras': palabras,
      },
      success: function() {
        grado=findGetParameter('grado');
        window.location.href = "/pystudent/resultados?grado="+grado;
    }
  });
}

$(document).ajaxStart(function(){
          $("#loader").css("display","block");
          $("#bocina").css("display","none");
        });
        $(document).ajaxComplete(function(){
          $("#loader").css("display","none");
          $("#bocina").css("display","block");
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
