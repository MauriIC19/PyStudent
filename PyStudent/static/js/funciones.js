window.location.replace(url);
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
