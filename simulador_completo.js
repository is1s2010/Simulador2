
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  function ocultarSecciones() {
  let secciones = document.querySelectorAll("section");
  secciones.forEach(function(seccion) {
    seccion.classList.remove("activa");
  });
}

function mostrarSeccion(id) {
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let valorIngresado = recuperarFloat("tasaInteres");
  
  if (valorIngresado >= 10 && valorIngresado <= 20) {
    tasaInteres = valorIngresado;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%");
  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function buscarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula === cedula) {
      return clientes[i]; 
    }
  }
  return null; 
}

function seleccionarCliente(cedula) {
  clienteSeleccionado = buscarCliente(cedula);
  
  if (clienteSeleccionado !== null) {
    mostrarTextoEnCaja("cedulaCli", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("nombreCli", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("apellidoCli", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("ingresosCli", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("egresosCli", clienteSeleccionado.egresos);
  }
}

function limpiar() {
  mostrarTextoEnCaja("cedulaCli", "");
  mostrarTextoEnCaja("nombreCli", "");
  mostrarTextoEnCaja("apellidoCli", "");
  mostrarTextoEnCaja("ingresosCli", "");
  mostrarTextoEnCaja("egresosCli", "");
  clienteSeleccionado = null; 
}

function guardarCliente() {
  let cedula = recuperaraTexto("cedulaCli");
  let nombre = recuperaraTexto("nombreCli");
  let apellido = recuperaraTexto("apellidoCli");
  let ingresos = recuperarFloat("ingresosCli");
  let egresos = recuperarFloat("egresosCli");
  
  let clienteExistente = buscarCliente(cedula);
  
  if (clienteExistente !== null) {
    clienteExistente.nombre = nombre;
    clienteExistente.apellido = apellido;
    clienteExistente.ingresos = ingresos;
    clienteExistente.egresos = egresos;
  } else {
    let nuevoCliente = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ingresos: ingresos,
      egresos: egresos
    };
    clientes.push(nuevoCliente);
  }
  
  pintarClientes(); 
  limpiar(); 
}

function pintarClientes() {
  let contenidoTabla = "";
  
  for (let i = 0; i < clientes.length; i++) {
    let c = clientes[i];
    contenidoTabla += "<tr>";
    contenidoTabla += "<td>" + c.cedula + "</td>";
    contenidoTabla += "<td>" + c.nombre + "</td>";
    contenidoTabla += "<td>" + c.apellido + "</td>";
    contenidoTabla += "<td>" + c.ingresos + "</td>";
    contenidoTabla += "<td>" + c.egresos + "</td>";
    
    contenidoTabla += `<td>
      <button onclick="seleccionarCliente('` + c.cedula + `')">Actualizar</button>
    </td>`;
    
    contenidoTabla += "</tr>";
  }
  
  document.getElementById("tablaClientes").innerHTML = contenidoTabla;
}