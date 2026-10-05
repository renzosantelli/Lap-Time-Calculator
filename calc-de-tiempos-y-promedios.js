//juntando HTML y JS (DOM)
const body = document.querySelector('body');
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
const barraProgresoSesionActiva = document.querySelector('.barra-progreso');
const padreCajaBarrasGrafico = document.getElementById('padreCajaBarrasGrafico');
const cajaBarrasGrafico = document.getElementById('cajaBarrasGrafico');

//SEGUNDOS A --:--.---
  function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);//REDONDEA HACIA ABAJO AL NUMERO ENTERO MAS CERCANO
    const segundosRestantes = (segundosTotales % 60).toFixed(3);//DEVUELVE EL RESTO EN 3 CIFRAS (TO FIXED()) DE LA DIVISION DE LOS SEGUNDOS TOTALES ENTRE 60
    const segundosFormateados = segundosRestantes.padStart(6, "0");//AGREGA CEROS HASTA QUE HAYA 6 CARACTERES 
    return minutos + ":" + segundosFormateados;//JUNTA LOS MINUTOS Y LOS SEGUNDOS FORMATEADOS
  }
//PROMEDIO DE VUELTAS
  function promediosVueltas(tiempos) {
    if (tiempos.length === 0) {
        return 0;
    }
    const sumaTiempos = tiempos.reduce((suma, t) => {
      return suma + t;
    }, 0);
    const promedioSegundos = sumaTiempos / tiempos.length;//CALCULO DEL PROMEDIO. SE EJECUTA UNA VEZ QUE SUMA ESTE COMPLETO
    return formatearTiempo(promedioSegundos);//DEVUELVE EL PROMEDIO FORMATEADO POR formatearTiempo
  }
//FUNCTION DE MEJOR, PEOR Y PROMEDIO DE VUELTA
function estadisticasVueltas(sesion) {
  const vueltaRapidaSegundos = Math.min(...sesion.vueltas);
  const vueltaRapidaTexto = formatearTiempo(vueltaRapidaSegundos);

  const vueltaLentaSegundos = Math.max(...sesion.vueltas);
  const vueltaLentaTexto = formatearTiempo(vueltaLentaSegundos);

  const promedioTexto = promediosVueltas(sesion.vueltas);

  const estadisticasVuelta = {mejor: vueltaRapidaTexto, mejorSegundos: vueltaRapidaSegundos, peor: vueltaLentaTexto, promedio: promedioTexto};

  return estadisticasVuelta;
}
//FUNCTION DE MOSTRAR ESTADISTICAS VUELTAS
function mostrarEstadisticasVueltas (estadisticasVuelta) {
  textoVueltaRapida.textContent = `Vuelta Rápida: ${estadisticasVuelta.mejor}`;
  textoPeorVuelta.textContent = `Vuelta Lenta: ${estadisticasVuelta.peor}`;
  textoPromedioVuelta.textContent = `Promedio de Vuelta: ${estadisticasVuelta.promedio}`;
}
//FUNCION DE ENTRAR SESION
  function entrarSesion(sesion) {
    listaTiempos.innerHTML = '';//VACIA LOS TIEMPOS DE OTRAS SESIONES
    sesion.vueltas.forEach((v, i) => {
      const nuevaVuelta = document.createElement('li');
      nuevaVuelta.textContent = `Vuelta ${i + 1}: ${formatearTiempo(v)}`;
      listaTiempos.appendChild(nuevaVuelta);//AGREGA NUEVA VUELTA A LA LISTA DE TIEMPOS
    });
    if (sesion.vueltas.length === 0) {
      textoVueltaRapida.textContent = "Vuelta Rapida: --:--.---";
      textoPeorVuelta.textContent = "Peor Vuelta: --:--.---";
      textoPromedioVuelta.textContent = "Promedio Vuelta: --:--.---";
    } else {//SI LA LENGTH DE VUELTAS NO ES 0
      const datosVueltas = estadisticasVueltas(sesion);
      mostrarEstadisticasVueltas(datosVueltas);
    }
    grafico(sesion);
    barraSesionActiva(sesion);
  }
//ACTUALIZAR LAS CARDS DEL DASHBOARD
  function actualizarDashboard() {
    cards.innerHTML = '';//VACIA LAS CARDS PARA DIBUJAR LAS CARDS DE VUELTA CADA VEZ QUE SE LLAMA Y EVITA QUE SE DUPLIQUEN
    const ultimas4Sesiones = sesiones.slice(-4);//DEVUELVE LAS ULTIMAS 4 SESIONES 
    for (const sesion of ultimas4Sesiones) {
      const divCardDashboard = document.createElement('div');
      divCardDashboard.className = 'card';
      const divCardHeader = document.createElement('div');
      divCardHeader.className = 'header-card';
      const nombreH3 = document.createElement('h3');
      nombreH3.textContent = sesion.nombre;//LE PONE DE TEXTO EL NOMBRE DE LA SESION (EL PROMPT)
      const fechaP = document.createElement('p');
      fechaP.textContent = sesion.fecha;//LE PONE DE TEXTO LA FECHA DE LA SESION
      const btnIrASesion = document.createElement('button');
      btnIrASesion.textContent = 'Entrar en la Sesion';
      const mejorVueltaDashboard = document.createElement('p');
      const peorVueltaDashboard = document.createElement('p');
      const promedioVueltaDashboard = document.createElement('p');
      const textoBarraDashboard = document.createElement('p');
      
      const barraExterior = document.createElement('div');
      barraExterior.className = 'barra-exterior';
      const barraInterior = document.createElement('div');
      barraInterior.className = 'barra-interior';
      
      if (sesion.vueltas.length === 0){
        mejorVueltaDashboard.textContent = "Vuelta Rapida: --:--.---";
        peorVueltaDashboard.textContent = "Peor Vuelta: --:--.---";
        promedioVueltaDashboard.textContent = "Promedio Vuelta: --:--.---"
      } else {
        const datosVueltas = estadisticasVueltas(sesion);
        mejorVueltaDashboard.textContent = `Vuelta Rapida: ${datosVueltas.mejor}`;
        peorVueltaDashboard.textContent = `Vuelta Lenta: ${datosVueltas.peor}`;
        promedioVueltaDashboard.textContent = `Promedio de Vuelta: ${datosVueltas.promedio}`;
        //BARRA DE PROGRESO DEL DASHBOARD
        const sesionVueltas = sesion.vueltas.reduce((suma, sV) => {
          return suma + sV;
        } , 0);
        const promedioSegundos = sesionVueltas / sesion.vueltas.length;//CALCULO DEL PROMEDIO EN SEGUNDOS
        const porcentaje = ((promedioSegundos - datosVueltas.mejorSegundos) / promedioSegundos) * 100;//CALCULO DEL PORCENTAJE *100 PORQUE SI NO SERIA UN NUMERO MUY PEQUEÑO
        const porcentajeModificado = porcentaje * 10;//LO MODIFICA *10 POR AJUSTE DE DISEÑO. AGRANDA EL ESPACIO QUE OCUPA EL PORCENTAJE POR 10. FUNCIONA MIENTRAS LA DIFERENCIA SEA DE MAX 10%
        textoBarraDashboard.textContent = `Tu vuelta rapida es un ${porcentaje.toFixed(2)}% mas rapida que tu promedio:`;
        barraInterior.style.width = `${porcentajeModificado}%`
        barraInterior.style.backgroundColor = 'green';
      }
      

    divCardHeader.appendChild(nombreH3);
    divCardHeader.appendChild(fechaP);
    divCardHeader.appendChild(btnIrASesion);
    barraExterior.appendChild(barraInterior);
    divCardDashboard.appendChild(divCardHeader);
    divCardDashboard.appendChild(mejorVueltaDashboard);
    divCardDashboard.appendChild(peorVueltaDashboard);
    divCardDashboard.appendChild(promedioVueltaDashboard);
    divCardDashboard.appendChild(textoBarraDashboard);
    divCardDashboard.appendChild(barraExterior);
    cards.appendChild(divCardDashboard);
//BTN DE IR A SESION DESDE EL DASHBOARD
    btnIrASesion.addEventListener('click', function() {
      seleccionarSesion(sesion.id);//SELECCIONA EL ID DE LA SESION PARA ENTRAR EN ELLA
      dashboard.style.display = 'none';
      sesionActivada.style.display = 'flex';
      historial.style.display = 'none';
      body.style.overflowY = 'hidden';
      entrarSesion(sesion);
    })
  }
  }
//FUNCION DE LA BARRA DE PROGRESO DE LA SESION ACTIVA
  function barraSesionActiva(sesion) {

    barraProgresoSesionActiva.innerHTML = '';//VACIA LA BARRA DE PROGRESO PARA REEMPLAZAR EN VEZ DE AÑADIR UNA BARRA NUEVA

    const textoBarraSA = document.createElement('p');
    textoBarraSA.className = 'textoBarraSA';
    const barraExterior = document.createElement('div');
    barraExterior.className = 'barra-exterior-sa';
    const barraInterior = document.createElement('div');
    barraInterior.className = 'barra-interior-sa';

    if (sesion.vueltas.length < 2) {//SI ES MENOR A 2 PORQUE NECESITA DOS VALORES A COMPARAR
      barraProgresoSesionActiva.innerHTML = '';
      return;//DEVUELVE NADA
    }
    const ultimaVuelta = sesion.vueltas[sesion.vueltas.length - 1]//AGARRA LA ULTIMA VUELTA DE RESTARLE 1 A LA LENGTH DE VUELTAS
    const mejorVuelta = Math.min(...sesion.vueltas.slice(0, -1));//HACE LA MEJOR VUELTA DE DE TODAS LA VUELTAS MENOS LA ULTIMA
    const porcentaje = ((mejorVuelta - ultimaVuelta) / mejorVuelta) * 100;//CALCULO DEL PORCENTAJE
    const porcentajeAbsoluto = Math.abs(porcentaje);//VALOR ABSOLUTO DEL PORCENTAJE
    if (porcentaje >= 0) {//SI ES MAYOR O IGUAL
      barraInterior.style.backgroundColor = 'green';
      barraInterior.style.width = `${porcentajeAbsoluto * 10}%`;
      textoBarraSA.textContent = `Tu ultima vuelta es un ${porcentaje.toFixed(2)}% mas rapida que tu mejor vuelta:`//CON 2 DECIMALES
    } else {
      barraInterior.style.backgroundColor = 'red';
      barraInterior.style.width = `${porcentajeAbsoluto * 10}%`;
      textoBarraSA.textContent = `Tu ultima vuelta es un ${porcentajeAbsoluto.toFixed(2)}% mas lenta que tu mejor vuelta:`
    }
    barraExterior.appendChild(barraInterior);
    barraProgresoSesionActiva.appendChild(barraExterior);
    barraProgresoSesionActiva.appendChild(textoBarraSA);
  }
//FUNCION DE LA GRAFICA 
function grafico(sesion) {
  cajaBarrasGrafico.innerHTML = '';
  const vueltaRapida = Math.min(...sesion.vueltas);
  const vueltaLenta = Math.max(...sesion.vueltas);
  const diferenciaVueltas = vueltaLenta - vueltaRapida;
  if (sesion.vueltas.length === 0) {
    cajaBarrasGrafico.innerHTML = ''
    return;
  }  else {
    sesion.vueltas.forEach(v => {
      const barrasGrafico = document.createElement('div');
      barrasGrafico.className = 'barrasGrafico';
      let altura = ((1-(v - vueltaRapida) / diferenciaVueltas)) * 99 + 1;
      if (diferenciaVueltas === 0) {
        altura = 100;
      }
      barrasGrafico.style.height = `${altura}%`;
      cajaBarrasGrafico.appendChild(barrasGrafico);
    });
  }
}

//BOTON DE REGISTRAR EN SESION ACTIVA
btnRegistrar.addEventListener('click', function() {

  console.log('¡boton pulsado!');

  const tiempoIngresado = inputTiempo.value;//VALOR INGRESADO DEL INPUT
  const partesTiempo = tiempoIngresado.split(':');//DIVIDE EL VALOR DESDE EL ':' EN DOS PARTES
//parseFloat = IGNORA TODO LO QUE NO SEA NUMERO EJEMPLO: "53.647PX", DEVUELVE SOLO EL NUMERO: 53.647
  const parteMinutos = parseFloat(partesTiempo[0]);//AGARRA EL TEXTO NUMERICO DE LA PRIMERA PARTE DEL SPLIT [0]
  const parteSegundos = parseFloat(partesTiempo[1]);//LO MISMO DE LA SEGUNDA PARTE [1]
  const segundosTotales = (parteMinutos * 60) + parteSegundos;//PASA LOS MINUTOS A SEGUNDOS Y LOS SUMA CON LA PARTE SEGUNDOS PARA HACER LOS SEGUNDOS TOTALES
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);//BUSCA UNA SESION EN SESIONES CON EL ID IGUAL AL DE LA SESION ACTUAL. QUEDAN GUARDADOS TODOS LOS DATOS DE LA SESION, EL OBJETO DE NUEVA SESION EN CREAR SESION.

  sesionActiva.vueltas.push(segundosTotales);

  const nuevaVuelta = document.createElement('li');

  nuevaVuelta.textContent = `Vuelta ${sesionActiva.vueltas.length}: ${tiempoIngresado}`;

  listaTiempos.appendChild(nuevaVuelta);

  const datosVueltas = estadisticasVueltas(sesionActiva);
  mostrarEstadisticasVueltas(datosVueltas);
  inputTiempo.value = '';//VACIA EL VALOR ANTERIOR DEL INPUT
  barraSesionActiva(sesionActiva);
  grafico(sesionActiva);
});
//BTN DE RESETEAR LA SESION ACTIVA
btnResetear.addEventListener('click', function() {
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);
  listaTiempos.innerHTML = '';//VACIA LA LISTA DE TIEMPOS
  sesionActiva.vueltas.length = 0;
  textoVueltaRapida.textContent = "Vuelta Rapida: --:--.---";
  textoPeorVuelta.textContent = "Peor Vuelta: --:--.---";
  textoPromedioVuelta.textContent = "Promedio de Vuelta: --:--.---";
  grafico(sesionActiva);
  barraSesionActiva(sesionActiva);
});
const sesiones = [];
let sesionActivaId = null;//VALOR QUE SIGNIFICA QUE NO HAY NADA. PERO ESTA HECHO A PROPOSITO
function crearSesion (circuito) {
  const id = Date.now ()//GUARDA UNA 'CAPTURA DE PANTALLA' DE LA HORA EN MILISEGUNDOS Y SOLO NUMERO ASI NUNCA ES EL MISMO. ES EL ID
  const fecha = new Date().toLocaleDateString();//CREA LA HORA EN UN FORMATO LEGIBLE
  const nuevaSesion = { id: id, nombre: circuito, fecha: fecha, vueltas: [], mejor: null, promedio: null, peor: null, porcentaje: null};//CREA TODOS LOS DATOS DE UNA SESION
  sesiones.push(nuevaSesion);
  sesionActivaId = id;//AHORA MISMO EL VALOR ES 'LA CAPTURA DE PANTALLA'
}
//RECIBE UN ID POR PARAMETRO (LO PASAN LOS BOTONES DE ENTRAR A SESION CON sesion.id) Y LO GUARDA EN sesionActivaId. NO BUSCA NADA, SOLO CAMBIA EL ID PARA QUE EL FIND DE LOS BOTONES (EJ: REGISTRAR) TRAIGA ESA SESION.
function seleccionarSesion(id) {
  sesionActivaId = id;
}
//BTN DE CREAR NUEVA SESION EN EL DASHBOARD
btnNuevaSesion.addEventListener('click', function() {
  const nombreSesion = prompt('Nombre de la sesion: ');
  crearSesion(nombreSesion);
  dashboard.style.display = 'none';
  sesionActivada.style.display = 'flex';
  historial.style.display = 'none';
  body.style.overflowY = 'hidden';
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);
  entrarSesion(sesionActiva);
});
//BTN DE VOLVER AL DASHBOARD DESDE LA SESION ACTIVA
btnVolverDashboard.addEventListener('click', function() {
  dashboard.style.display = '';
  body.style.overflowY = 'visible'
  sesionActivada.style.display = 'none';
  historial.style.display = 'none';
  actualizarDashboard();
});
//BTN DE VOLVER AL DASHBOARD DESDE EL HISTORIAL
btnVolverDashboardHistorial.addEventListener('click', function() {
  dashboard.style.display = '';
  body.style.overflowY = 'visible'
  sesionActivada.style.display = 'none';
  historial.style.display = 'none';
});
//BTN DE IR AL HISTORIAL DESDE EL DASHBOARD
btnHistorial.addEventListener('click', function() {

  dashboard.style.display = 'none';
  sesionActivada.style.display = 'none';
  historial.style.display = 'block';
  historialGrid.innerHTML = '';
  body.style.overflowY = 'hidden';

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

//BTN DE IR A LA SESION DESDE EL HISTORIAL
    botonHistorialIrASesion.addEventListener('click', function() {
      seleccionarSesion(sesion.id);
      historial.style.display = 'none';
      dashboard.style.display = 'none';
      sesionActivada.style.display = 'flex';
      body.style.overflowY = 'hidden';
      entrarSesion(sesion);
    });
  }
});