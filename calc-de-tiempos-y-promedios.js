//juntando HTML y JS (DOM)
const inputTiempo = document.getElementById('input-tiempo');
const btnRegistrar = document.getElementById('btn-registrar');
const btnResetear = document.getElementById('btn-resetear');
const listaTiempos = document.getElementById('lista-tiempos');
const textoVueltaRapida = document.getElementById('mejor-tiempo');
const textoPromedioVuelta = document.getElementById('promedio');
const textoPeorVuelta = document.getElementById('peor-tiempo');
const btnNuevaSesion = document.getElementById('btn-nuevaSesion');
const dashboard = document.getElementById('dashboard');
const sesionActivada = document.getElementById('sesionActiva');
const historial = document.getElementById('historial');
const btnVolverDashboard = document.getElementById('btn-volver-dashboard');
const btnVolverDashboardHistorial = document.getElementById('btn-volver-dashboard-historial');
const btnHistorial = document.getElementById('btn-historial');
const historialGrid = document.getElementById('historial-grid');
const cards = document.querySelector('.cards');

//segundos a -:--.---
  function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundosRestantes = (segundosTotales % 60).toFixed(3);
    const segundosFormateados = segundosRestantes.padStart(6, "0");
    return minutos + ":" + segundosFormateados;
  }

  function promediosVueltas(tiempos) {
    if (tiempos.length === 0) {
        return 0;
    }
    let suma = 0;
    for (let i = 0; i < tiempos.length; i++)
    suma = suma + tiempos[i];
    const promedioSegundos = suma / tiempos.length;
    return formatearTiempo(promedioSegundos);
  }

  function entrarSesion(sesion) {
    listaTiempos.innerHTML = '';
    let contadorVuelta = 1;
    for (const vueltas of sesion.vueltas) {
      const nuevaVuelta = document.createElement('li');
      nuevaVuelta.textContent = `Vuelta ${contadorVuelta}: ${formatearTiempo(vueltas)}`;
      listaTiempos.appendChild(nuevaVuelta);
      contadorVuelta = contadorVuelta + 1;
    }
    if (sesion.vueltas.length === 0) {
      textoVueltaRapida.textContent = "Vuelta Rapida: --:--.---";
      textoPeorVuelta.textContent = "Peor Vuelta: --:--.---";
      textoPromedioVuelta.textContent = "Promedio Vuelta: --:--.---"
    } else {
      const vueltaRapidaSegundos = Math.min(...sesion.vueltas);
      const vueltaRapidaTexto = formatearTiempo(vueltaRapidaSegundos);
      textoVueltaRapida.textContent = `Vuelta Rápida: ${vueltaRapidaTexto}`;

      const vueltaLentaSegundos = Math.max(...sesion.vueltas);
      const vueltaLentaTexto = formatearTiempo(vueltaLentaSegundos);
      textoPeorVuelta.textContent = `Vuelta Lenta: ${vueltaLentaTexto}`;

      const promedioTexto = promediosVueltas(sesion.vueltas);
      textoPromedioVuelta.textContent = `Promedio de Vuelta: ${promedioTexto}`;
    }
  }

  function actualizarDashboard() {
    cards.innerHTML = '';
    const ultimas4Sesiones = sesiones.slice(-4);
    for (const sesion of ultimas4Sesiones) {
      const divCardDashboard = document.createElement('div');
      divCardDashboard.className = 'card';
      const divCardHeader = document.createElement('div');
      divCardHeader.className = 'header-card';
      const nombreH3 = document.createElement('h3');
      nombreH3.textContent = sesion.nombre;
      const fechaP = document.createElement('p');
      fechaP.textContent = sesion.fecha;
      const btnIrASesion = document.createElement('button');
      btnIrASesion.textContent = 'Entrar en la Sesion';
      const mejorVueltaDashboard = document.createElement('p');
      const peorVueltaDashboard = document.createElement('p');
      const promedioVueltaDashboard = document.createElement('p');

     if (sesion.vueltas.length === 0){
      mejorVueltaDashboard.textContent = "Vuelta Rapida: --:--.---";
      peorVueltaDashboard.textContent = "Peor Vuelta: --:--.---";
      promedioVueltaDashboard.textContent = "Promedio Vuelta: --:--.---"
    } else {
      const vueltaRapidaSegundos = Math.min(...sesion.vueltas);
      const vueltaRapidaTexto = formatearTiempo(vueltaRapidaSegundos);
      mejorVueltaDashboard.textContent = `Vuelta Rápida: ${vueltaRapidaTexto}`;

      const vueltaLentaSegundos = Math.max(...sesion.vueltas);
      const vueltaLentaTexto = formatearTiempo(vueltaLentaSegundos);
      peorVueltaDashboard.textContent = `Vuelta Lenta: ${vueltaLentaTexto}`;

      const promedioTexto = promediosVueltas(sesion.vueltas);
      promedioVueltaDashboard.textContent = `Promedio de Vuelta: ${promedioTexto}`;
    }

    const barraExterior = document.createElement('div');
    barraExterior.className = 'barra-exterior';
    const barraInterior = document.createElement('div');
    barraInterior.className = 'barra-interior';

    divCardHeader.appendChild(nombreH3);
    divCardHeader.appendChild(fechaP);
    divCardHeader.appendChild(btnIrASesion);
    barraExterior.appendChild(barraInterior);
    divCardDashboard.appendChild(divCardHeader);
    divCardDashboard.appendChild(mejorVueltaDashboard);
    divCardDashboard.appendChild(peorVueltaDashboard);
    divCardDashboard.appendChild(promedioVueltaDashboard);
    divCardDashboard.appendChild(barraExterior);
    cards.appendChild(divCardDashboard);
  }
  }

btnRegistrar.addEventListener('click', function() {

  console.log('¡boton pulsado!');

  const tiempoIngresado = inputTiempo.value;
  const partesTiempo = tiempoIngresado.split(':');
  const parteMinutos = parseFloat(partesTiempo[0]);
  const parteSegundos = parseFloat(partesTiempo[1]);
  const segundosTotales = (parteMinutos * 60) + parteSegundos;
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);

  sesionActiva.vueltas.push(segundosTotales);

  const nuevaVuelta = document.createElement('li');

  nuevaVuelta.textContent = `Vuelta ${sesionActiva.vueltas.length}: ${tiempoIngresado}`;

  listaTiempos.appendChild(nuevaVuelta);

  const vueltaRapidaSegundos = Math.min(...sesionActiva.vueltas);
  const vueltaRapidaTexto = formatearTiempo(vueltaRapidaSegundos);
  console.log("vuelta rapida", vueltaRapidaTexto);

  textoVueltaRapida.textContent = `Vuelta rápida: ${vueltaRapidaTexto}`;

  const vueltaLentaSegundos = Math.max(...sesionActiva.vueltas);
  const vueltaLentaTexto = formatearTiempo(vueltaLentaSegundos);

  textoPeorVuelta.textContent = `Vuelta lenta: ${vueltaLentaTexto}`;

  const promedioTexto = promediosVueltas(sesionActiva.vueltas);
  textoPromedioVuelta.textContent = `Promedio vuelta: ${promedioTexto}`;

  inputTiempo.value = '';
});

btnResetear.addEventListener('click', function() {
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);
  listaTiempos.innerHTML = '';
  sesionActiva.vueltas.length = 0;
  textoVueltaRapida.textContent = "Vuelta Rapida: --:--.---";
  textoPeorVuelta.textContent = "Peor Vuelta: --:--.---";
  textoPromedioVuelta.textContent = "Promedio de Vuelta: --:--.---";
});
const sesiones = [];
let sesionActivaId = null;
function crearSesion (circuito) {
  const id = Date.now ()
  const fecha = new Date().toLocaleDateString();
  const nuevaSesion = { id: id, nombre: circuito, fecha: fecha, vueltas: [], mejor: null, promedio: null, peor: null, porcentaje: null};
  sesiones.push(nuevaSesion);
  sesionActivaId = id;
}
function seleccionarSesion(id) {
  sesionActivaId = id;
}
btnNuevaSesion.addEventListener('click', function() {
  const nombreSesion = prompt('Nombre de la sesion: ');
  crearSesion(nombreSesion);
  dashboard.style.display = 'none';
  sesionActivada.style.display = 'flex';
  historial.style.display = 'none';
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);
  entrarSesion(sesionActiva);
});
btnVolverDashboard.addEventListener('click', function() {
  dashboard.style.display = '';
  sesionActivada.style.display = 'none';
  historial.style.display = 'none';
  actualizarDashboard();
});
btnVolverDashboardHistorial.addEventListener('click', function() {
  dashboard.style.display = '';
  sesionActivada.style.display = 'none';
  historial.style.display = 'none';
});
btnHistorial.addEventListener('click', function() {

  dashboard.style.display = 'none';
  sesionActivada.style.display = 'none';
  historial.style.display = '';
  historialGrid.innerHTML = '';

  for (const sesion of sesiones) {
    const divCardHistorial = document.createElement('div');
    divCardHistorial.className = 'historial-card';
    const nombreH3 = document.createElement('h3');
    nombreH3.textContent = sesion.nombre;
    const fechaP = document.createElement('p');
    fechaP.textContent = sesion.fecha;
    const botonHistorialIrASesion = document.createElement('button');
    botonHistorialIrASesion.textContent = 'Entrar en la Sesion';
    divCardHistorial.appendChild(nombreH3);
    divCardHistorial.appendChild(fechaP);
    divCardHistorial.appendChild(botonHistorialIrASesion);
    historialGrid.appendChild(divCardHistorial);

    botonHistorialIrASesion.addEventListener('click', function() {
      seleccionarSesion(sesion.id);
      historial.style.display = 'none';
      dashboard.style.display = 'none';
      sesionActivada.style.display = 'flex';
      entrarSesion(sesion);
    });
  }
});