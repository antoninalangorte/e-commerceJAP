// Obtengo los datos del formulario, se construye el div para mostrar, se guarda en localStorage y se muestra
function saveData() {
    var perfil = "";
    var nombre = document.getElementById("inputNombre").value;
    var apellidos = document.getElementById("inputApellidos").value;
    var edad = document.getElementById("inputEdad").value;
    var email = document.getElementById("inputEmail").value;
    var telefono = document.getElementById("inputTelefono").value;
  
    perfil += `
    <div class="card">
    <h4 class="card-header bg-dark text-center text-white">Mi perfil</h4>
    <div class="card-body">
      <div class="row">
        <div class="col align-self-center text-center">
          <h3><strong>${nombre + " " + apellidos}</strong></h3>
        </div>
        <div class="col align-self-center">
          <dl class="dlist-align">
            <dt><u>Email:</u></dt>
            <dd>${email}</dd>
          </dl>
          <dl class="dlist-align">
            <dt><u>Teléfono:</u></dt>
            <dd>${telefono}</dd>
          </dl>
          <dl class="dlist-align">
            <dt><u>Edad:</u></dt>
            <dd>${edad} años</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
  `;
  
    localStorage["guardarPerfil"] = JSON.stringify(perfil);
    document.getElementById("showPerfil").innerHTML = perfil;
  }

   // Si existe información guardada sobre el perfil en el localStorage se muestra, con esto mantengo la información si salgo o recargo la página
   if (localStorage["guardarPerfil"] != null) {
    document.getElementById("showPerfil").innerHTML = JSON.parse(
      localStorage["guardarPerfil"]
    );

    // Sino existen datos de perfil guardados se muestra que no hay datos
  } else {
    document.getElementById("showPerfil").innerHTML = `
    <div class="card border-0">
      <div class="card-body">
        <h5 class="card-title">No hay perfil guardado</h5>
        <p>Por favor, completa tus datos de contacto</p>
      </div>
    </div>
  </div>
 `;

  };
  