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
const barraProgresoSesionActiva = document.querySelector('.barra-progreso');

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
    let suma = 0;//VARIABLE QUE SUMA LOS TIEMPOS PARA HACER EL PROMEDIO, AHORA VALE 0 POR ESO ES UN LET Y NO CONST
    for (let i = 0; i < tiempos.length; i++)//I SUMA(verbo sumar, no la variable) EN 1 CADA VEZ QUE LA CONDICION ES VERDADERA. CUANDO ES FALSA LA SUMA NO SE EJECUTA
    //'I' SON LAS POSICIONES
    suma = suma + tiempos[i];//SUMA EL VALOR DE LAS POSICIONES DE TIEMPOS Y LOS METE EN 'SUMA'
    const promedioSegundos = suma / tiempos.length;//CALCULO DEL PROMEDIO. SE EJECUTA UNA VEZ QUE SUMA ESTE COMPLETO
    return formatearTiempo(promedioSegundos);//DEVUELVE EL PROMEDIO FORMATEADO POR formatearTiempo
  }
//FUNCION DE ENTRAR SESION
  function entrarSesion(sesion) {
    listaTiempos.innerHTML = '';//VACIA LOS TIEMPOS DE OTRAS SESIONES
    let contadorVuelta = 1;
    for (const vueltas of sesion.vueltas) {
      const nuevaVuelta = document.createElement('li');
      nuevaVuelta.textContent = `Vuelta ${contadorVuelta}: ${formatearTiempo(vueltas)}`;
      listaTiempos.appendChild(nuevaVuelta);//AGREGA NUEVA VUELTA A LA LISTA DE TIEMPOS
      contadorVuelta = contadorVuelta + 1;//HACE QUE EL CONTADOR SUBA EN 1 POR CADA VUELTA
    }
    if (sesion.vueltas.length === 0) {
      textoVueltaRapida.textContent = "Vuelta Rapida: --:--.---";
      textoPeorVuelta.textContent = "Peor Vuelta: --:--.---";
      textoPromedioVuelta.textContent = "Promedio Vuelta: --:--.---"
    } else {//SI LA LENGTH DE VUELTAS NO ES 0
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
        const vueltaRapidaSegundos = Math.min(...sesion.vueltas);
        const vueltaRapidaTexto = formatearTiempo(vueltaRapidaSegundos);
        mejorVueltaDashboard.textContent = `Vuelta Rápida: ${vueltaRapidaTexto}`;
        
        const vueltaLentaSegundos = Math.max(...sesion.vueltas);
        const vueltaLentaTexto = formatearTiempo(vueltaLentaSegundos);
        peorVueltaDashboard.textContent = `Vuelta Lenta: ${vueltaLentaTexto}`;
        
        const promedioTexto = promediosVueltas(sesion.vueltas);
        promedioVueltaDashboard.textContent = `Promedio de Vuelta: ${promedioTexto}`;
        
        //BARRA DE PROGRESO DEL DASHBOARD
        let suma = 0;
        for (let i = 0; i < sesion.vueltas.length; i++)
          suma = suma + sesion.vueltas[i];
        const promedioSegundos = suma / sesion.vueltas.length;//CALCULO DEL PROMEDIO EN SEGUNDOS
        const porcentaje = ((promedioSegundos - vueltaRapidaSegundos) / promedioSegundos) * 100;//CALCULO DEL PORCENTAJE *100 PORQUE SI NO SERIA UN NUMERO MUY PEQUEÑO
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

  const vueltaRapidaSegundos = Math.min(...sesionActiva.vueltas);
  const vueltaRapidaTexto = formatearTiempo(vueltaRapidaSegundos);
  console.log("vuelta rapida", vueltaRapidaTexto);

  textoVueltaRapida.textContent = `Vuelta rápida: ${vueltaRapidaTexto}`;

  const vueltaLentaSegundos = Math.max(...sesionActiva.vueltas);
  const vueltaLentaTexto = formatearTiempo(vueltaLentaSegundos);

  textoPeorVuelta.textContent = `Vuelta lenta: ${vueltaLentaTexto}`;

  const promedioTexto = promediosVueltas(sesionActiva.vueltas);
  textoPromedioVuelta.textContent = `Promedio vuelta: ${promedioTexto}`;

  inputTiempo.value = '';//VACIA EL VALOR ANTERIOR DEL INPUT
  barraSesionActiva(sesionActiva);
});
//BTN DE RESETEAR LA SESION ACTIVA
btnResetear.addEventListener('click', function() {
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);
  listaTiempos.innerHTML = '';//VACIA LA LISTA DE TIEMPOS
  sesionActiva.vueltas.length = 0;
  textoVueltaRapida.textContent = "Vuelta Rapida: --:--.---";
  textoPeorVuelta.textContent = "Peor Vuelta: --:--.---";
  textoPromedioVuelta.textContent = "Promedio de Vuelta: --:--.---";
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
  const sesionActiva = sesiones.find(sesion => sesion.id === sesionActivaId);
  entrarSesion(sesionActiva);
});
//BTN DE VOLVER AL DASHBOARD DESDE LA SESION ACTIVA
btnVolverDashboard.addEventListener('click', function() {
  dashboard.style.display = '';
  sesionActivada.style.display = 'none';
  historial.style.display = 'none';
  actualizarDashboard();
});
//BTN DE VOLVER AL DASHBOARD DESDE EL HISTORIAL
btnVolverDashboardHistorial.addEventListener('click', function() {
  dashboard.style.display = '';
  sesionActivada.style.display = 'none';
  historial.style.display = 'none';
});
//BTN DE IR AL HISTORIAL DESDE EL DASHBOARD
btnHistorial.addEventListener('click', function() {

  dashboard.style.display = 'none';
  sesionActivada.style.display = 'none';
  historial.style.display = 'block';
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

//BTN DE IR A LA SESION DESDE EL HISTORIAL
    botonHistorialIrASesion.addEventListener('click', function() {
      seleccionarSesion(sesion.id);
      historial.style.display = 'none';
      dashboard.style.display = 'none';
      sesionActivada.style.display = 'flex';
      entrarSesion(sesion);
    });
  }
});