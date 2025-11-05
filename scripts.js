document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------
  // GESTIÓN GLOBAL DE MODALES
  // ------------------------------------------
  const modalOverlay = document.getElementById('modal-overlay');
  const modalButtons = document.querySelectorAll('.ejercicio-card');
  const closeButtons = document.querySelectorAll('.modal .close-btn');
  let activeModal = null;

  const openModal = (modalId) => {
    const modal = document.querySelector(modalId);
    if (modal) {
      closeAllModals(); // Asegura que solo uno esté activo
      modalOverlay.classList.add('active');
      modal.classList.add('active');
      modal.removeAttribute('aria-hidden');
      modal.focus();
      activeModal = modal;
    }
  };

  const closeAllModals = () => {
    if (activeModal) {
      activeModal.classList.remove('active');
      activeModal.setAttribute('aria-hidden', 'true');
      activeModal = null;
    }
    modalOverlay.classList.remove('active');
  };

  modalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-modal-target');
      openModal(targetId);
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
  });

  modalOverlay.addEventListener('click', closeAllModals);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // ------------------------------------------
  // EJERCICIO 1: CALCULADORA
  // ------------------------------------------
  window.calcular = function (operacion) {
    const num1 = parseFloat(document.getElementById('calcNum1').value);
    const num2 = parseFloat(document.getElementById('calcNum2').value);
    const resultadoDiv = document.getElementById('calcResultado');
    let resultado;
    let simbolo = '';

    if (isNaN(num1) || isNaN(num2)) {
      resultadoDiv.innerHTML = '<span style="color: var(--neon-magenta);">Error: Introduce números válidos.</span>';
      return;
    }

    switch (operacion) {
      case 'sumar':
        resultado = num1 + num2;
        simbolo = '+';
        break;
      case 'restar':
        resultado = num1 - num2;
        simbolo = '-';
        break;
      case 'multiplicar':
        resultado = num1 * num2;
        simbolo = '*';
        break;
      case 'dividir':
        if (num2 === 0) {
          resultado = 'División por cero no permitida';
        } else {
          resultado = num1 / num2;
        }
        simbolo = '/';
        break;
    }

    if (typeof resultado === 'string') {
      resultadoDiv.innerHTML = resultado;
    } else {
      resultadoDiv.innerHTML = `<span style="color: var(--text-primary);">${num1} ${simbolo} ${num2}</span> = <strong style="color: var(--neon-green);">${resultado.toFixed(2)}</strong>`;
    }
  };


  // ------------------------------------------
  // EJERCICIO 2: CONJETURA DE COLLATZ
  // ------------------------------------------
  window.verificarCollatz = function () {
    let n = parseInt(document.getElementById('collatzNum').value);
    const resultadoDiv = document.getElementById('collatzResultado');

    if (isNaN(n) || n <= 0) {
      resultadoDiv.innerHTML = '<span style="color: var(--neon-magenta);">Error: Introduce un entero positivo.</span>';
      return;
    }

    let secuencia = [n];
    const limite = 1000; // Límite de seguridad para evitar bucles infinitos

    for (let i = 0; i < limite && n !== 1; i++) {
      if (n % 2 === 0) {
        n = n / 2; // Es par
      } else {
        n = 3 * n + 1; // Es impar
      }
      secuencia.push(n);
    }

    const estilo = n === 1 ? 'color: var(--neon-green);' : 'color: var(--neon-magenta);';
    resultadoDiv.innerHTML = `
                    <span style="${estilo}">Número inicial: ${secuencia[0]}</span><br>
                    <span style="${estilo}">Longitud de la secuencia: ${secuencia.length}</span><br>
                    <span style="color: var(--text-primary);">Secuencia:</span><br>
                    <div style="max-height: 100px; overflow-y: auto;">
                        ${secuencia.join(', ')}
                    </div>
                `;
  };

  // ------------------------------------------
  // EJERCICIO 3: CONDICIONALES
  // ------------------------------------------
  window.comprobarCondicionales = function () {
    const numero1 = 5;
    const numero2 = 8;
    const resultados = [];

    // Condición 1: numero1 no es mayor que numero2
    const cond1 = !(numero1 > numero2);
    if (cond1) {
      resultados.push(`1. Condición: !(${numero1} > ${numero2}) = ${cond1} (Correcto)`);
      // alert("numero1 no es mayor que numero2"); // Usamos console.log en lugar de alert
    }

    // Condición 2: numero2 es positivo
    const cond2 = numero2 > 0;
    if (cond2) {
      resultados.push(`2. Condición: ${numero2} > 0 = ${cond2} (Correcto)`);
      // alert("numero2 es positivo");
    }

    // Condición 3: numero1 es negativo o distinto de cero
    const cond3 = numero1 < 0 || numero1 !== 0;
    if (cond3) {
      resultados.push(`3. Condición: ${numero1} < 0 || ${numero1} !== 0 = ${cond3} (Correcto)`);
      // alert("numero1 es negativo o distinto de cero");
    }

    // Condición 4: Incrementar en 1 unidad el valor de numero1 no lo hace mayor o igual que numero2
    const cond4 = (numero1 + 1) < numero2;
    if (cond4) {
      resultados.push(`4. Condición: (${numero1} + 1) < ${numero2} = ${cond4} (Correcto)`);
      // alert("Incrementar en 1 unidad el valor de numero1 no lo hace mayor o igual que numero2");
    }

    const codeHtml = `
if(!(numero1 > numero2)) { ... }
if(numero2 > 0) { ... }
if(numero1 < 0 || numero1 !== 0) { ... }
if((numero1 + 1) < numero2) { ... }
                `;

    document.getElementById('condicionalCode').textContent = codeHtml;
    document.getElementById('condicionalResultado').innerHTML = '<span style="color: var(--neon-green);">Mensajes generados:</span><br>' + resultados.join('<br>');
  };


  // ------------------------------------------
  // EJERCICIO 4: ANÁLISIS DE ARRAY
  // ------------------------------------------
  window.analizarArray = function () {
    const valores = [true, 5, false, "hola", "adios", 2];
    const resultadoDiv = document.getElementById('arrayResultado');
    let output = '';

    // 1. Determinar cuál de los dos elementos de texto es mayor
    const texto1 = valores[3]; // "hola"
    const texto2 = valores[4]; // "adios"
    const mayorTexto = (texto1.length > texto2.length) ? texto1 : texto2;
    output += `<strong>1. Comparación de Texto:</strong><br>`;
    output += `  - "${texto1}" vs "${texto2}". Mayor: <span style="color: var(--neon-blue);">${mayorTexto}</span><br><br>`;

    // 2. Operadores booleanos
    const bool1 = valores[0]; // true
    const bool2 = valores[2]; // false
    const resTrue = bool1 || bool2; // true
    const resFalse = bool1 && bool2; // false

    output += `<strong>2. Operaciones Booleanas:</strong><br>`;
    output += `  - Resultado TRUE (OR): <span style="color: var(--neon-green);">${bool1} || ${bool2} = ${resTrue}</span><br>`;
    output += `  - Resultado FALSE (AND): <span style="color: var(--neon-magenta);">${bool1} && ${bool2} = ${resFalse}</span><br><br>`;

    // 3. Operaciones matemáticas
    const num1 = valores[1]; // 5
    const num2 = valores[5]; // 2

    output += `<strong>3. Operaciones Matemáticas (${num1} y ${num2}):</strong><br>`;
    output += `  - Suma: ${num1 + num2}<br>`;
    output += `  - Resta: ${num1 - num2}<br>`;
    output += `  - Multiplicación: ${num1 * num2}<br>`;
    output += `  - División: ${num1 / num2}<br>`;
    output += `  - Módulo: ${num1 % num2}<br>`;

    resultadoDiv.innerHTML = output;
  };

  // ------------------------------------------
  // EJERCICIO 5: INFO DOM (ENLACES)
  // ------------------------------------------
  window.obtenerInfoDOM = function () {
    const enlaces = document.querySelectorAll('a');
    const tercerParrafo = document.getElementById('parrafo-tercero');
    const resultadoDiv = document.getElementById('domResultado');
    let output = '';

    // 1. Número de enlaces de la página
    const numEnlaces = enlaces.length;
    output += `<strong>1. Número total de enlaces:</strong> <span style="color: var(--neon-blue);">${numEnlaces}</span><br>`;

    // 2. Dirección a la que enlaza el penúltimo enlace
    let penultimoEnlace = 'No disponible';
    if (numEnlaces >= 2) {
      penultimoEnlace = enlaces[numEnlaces - 2].href;
    }
    output += `<strong>2. Dirección del penúltimo enlace:</strong> <span style="color: var(--neon-green);">${penultimoEnlace}</span><br>`;

    // 3. Número de enlaces del tercer párrafo
    let numEnlacesParrafoTercero = 0;
    if (tercerParrafo) {
      numEnlacesParrafoTercero = tercerParrafo.querySelectorAll('a').length;
    }
    output += `<strong>3. Número de enlaces en el 3er párrafo:</strong> <span style="color: var(--neon-blue);">${numEnlacesParrafoTercero}</span><br>`;

    resultadoDiv.innerHTML = output;
  };

  // ------------------------------------------
  // EJERCICIO 6: MOSTRAR/OCULTAR TEXTO
  // ------------------------------------------
  const showMoreLink = document.getElementById('show-more-link');
  const extraContent = document.getElementById('extra-content');
  const toggleResultado = document.getElementById('toggleResultado');

  if (showMoreLink) {
    showMoreLink.addEventListener('click', function (e) {
      e.preventDefault();
      if (extraContent && showMoreLink.style.display !== 'none') {
        extraContent.style.display = 'inline';
        showMoreLink.style.display = 'none';
        if (toggleResultado) {
          toggleResultado.innerHTML = 'Estado: Contenido mostrado. Enlace <strong style="color: var(--neon-magenta);">ocultado</strong> permanentemente.';
        }
      }
    });
  }

  // ------------------------------------------
  // EJERCICIO 7: AÑADIR NODOS A LISTA
  // ------------------------------------------
  let itemCounter = 1;
  window.añadirElementoLista = function () {
    const lista = document.getElementById('new-list-target');
    const resultadoDiv = document.getElementById('listaResultado');

    if (lista) {
      const nuevoLi = document.createElement('li');
      nuevoLi.textContent = `Elemento de lista añadido: #${itemCounter}`;
      nuevoLi.style.color = 'var(--text-primary)';
      lista.appendChild(nuevoLi);
      itemCounter++;
      resultadoDiv.innerHTML = `Se ha añadido un nuevo elemento a la lista. Total: <span style="color: var(--neon-green);">${lista.children.length}</span>.`;
    } else {
      resultadoDiv.innerHTML = '<span style="color: var(--neon-magenta);">Error: No se encontró la lista de destino.</span>';
    }
  };

  // ------------------------------------------
  // EJERCICIO 8: SECCIONES COLAPSABLES
  // ------------------------------------------
  const sectionLinks = document.querySelectorAll('.section-link');

  window.toggleSection = function (link) {
    const targetId = link.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const isVisible = targetSection.style.display !== 'none';
      targetSection.style.display = isVisible ? 'none' : 'block';
      link.innerHTML = isVisible ? 'Mostrar ' + link.textContent.replace('Ocultar ', '') : 'Ocultar ' + link.textContent.replace('Mostrar ', '');
    }
  };

  sectionLinks.forEach(link => {
    const targetId = link.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      // Estado inicial: ocultar todas las secciones colapsables al cargar
      targetSection.style.display = 'none';
      link.textContent = 'Mostrar ' + link.textContent; // Ajustar texto inicial

      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.toggleSection(this);
      });
    }
  });

  // ------------------------------------------
  // EJERCICIO 9: EVENTOS DE RATÓN Y TECLADO
  // ------------------------------------------
  const infoCuadro = document.getElementById('infoCuadro');
  const mensajeTipo = document.getElementById('mensajeTipo');
  const mensajeInfo = document.getElementById('mensajeInfo');

  const mostrarMensaje = (tipo, info, color) => {
    infoCuadro.style.backgroundColor = color;
    mensajeTipo.innerHTML = `<span style="color: ${color === 'white' ? 'var(--bg)' : 'var(--text-primary)'};">Evento: ${tipo}</span>`;
    mensajeInfo.innerHTML = `<span style="color: ${color === 'white' ? 'var(--bg)' : 'var(--text-primary)'}; white-space: pre-wrap;">${info}</span>`;
  };

  document.addEventListener('mousemove', (e) => {
    // Solo si el modal 9 está abierto
    if (activeModal && activeModal.id === 'modal-ejercicio9') {
      const info = `
Posición (Cliente - Navegador):
  X: ${e.clientX} px
  Y: ${e.clientY} px

Posición (Página - Documento):
  X: ${e.pageX} px
  Y: ${e.pageY} px
                    `;
      mostrarMensaje('Ratón Moviéndose (mousemove)', info, 'white');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (activeModal && activeModal.id === 'modal-ejercicio9') {
      const info = `
Información de la Tecla:
  Tecla Pulsada: "${e.key}"
  Código (Code): "${e.code}"
                    `;
      mostrarMensaje('Tecla Pulsada (keydown)', info, '#CCE6FF'); // Azul claro
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (activeModal && activeModal.id === 'modal-ejercicio9') {
      const info = `
Botón pulsado.
  Posición X (Cliente): ${e.clientX} px
  Posición Y (Cliente): ${e.clientY} px
                    `;
      mostrarMensaje('Botón del Ratón Pulsado (mousedown)', info, '#FFFFCC'); // Amarillo claro
    }
  });

  // ------------------------------------------
  // EJERCICIO 10: ANÁLISIS DE TEXTO
  // ------------------------------------------
  window.analizarTexto = function () {
    const texto = document.getElementById('textoAnalisis').value;
    if (!texto) {
      // En lugar de alert, mostramos en el div de salida del modal
      document.getElementById('interface-ejercicio10').querySelector('.ejercicio-content-area').insertAdjacentHTML('beforeend', '<div class="validation-errors" style="margin-top: 15px;">Error: La cadena de texto está vacía.</div>');
      return;
    }

    // Usamos una regex simple para dividir por espacios y eliminar vacíos
    const palabras = texto.trim().split(/\s+/).filter(word => word.length > 0);

    if (palabras.length === 0) {
      document.getElementById('interface-ejercicio10').querySelector('.ejercicio-content-area').insertAdjacentHTML('beforeend', '<div class="validation-errors" style="margin-top: 15px;">Error: No se detectaron palabras válidas.</div>');
      return;
    }

    // 1. Número de palabras
    const numPalabras = palabras.length;
    // 2. Primera palabra
    const primeraPalabra = palabras[0];
    // 3. Última palabra
    const ultimaPalabra = palabras[palabras.length - 1];
    // 4. Palabras en orden inverso (creamos una copia para invertir)
    const palabrasInversas = [...palabras].reverse().join(' ');
    // 5. Palabras ordenadas A-Z (creamos una copia para ordenar)
    const palabrasAZ = [...palabras].sort().join(' ');
    // 6. Palabras ordenadas Z-A (ordenamos y luego invertimos)
    const palabrasZA = [...palabras].sort().reverse().join(' ');

    // Generar contenido HTML para la ventana nueva
    const newWindowContent = `
                    <html>
                    <head>
                        <title>Análisis de Texto</title>
                        <style>
                            body { font-family: 'Space Mono', monospace; background: #1f1f1f; color: #00e5ff; padding: 20px; line-height: 1.6; }
                            h1 { color: #ff20c4; border-bottom: 2px solid #00e5ff; padding-bottom: 10px; }
                            strong { color: #20ff9d; }
                            pre { background: #0a141d; padding: 10px; border-radius: 5px; overflow-x: auto; }
                        </style>
                    </head>
                    <body>
                        <h1>Resultados del Análisis de Texto</h1>
                        <p><strong>Cadena Original:</strong> <pre>${texto}</pre></p>
                        <p><strong>1. Número de Palabras:</strong> ${numPalabras}</p>
                        <p><strong>2. Primera Palabra:</strong> ${primeraPalabra}</p>
                        <p><strong>3. Última Palabra:</strong> ${ultimaPalabra}</p>
                        <p><strong>4. Palabras en Orden Inverso:</strong> <pre>${palabrasInversas}</pre></p>
                        <p><strong>5. Palabras Ordenadas A-Z:</strong> <pre>${palabrasAZ}</pre></p>
                        <p><strong>6. Palabras Ordenadas Z-A:</strong> <pre>${palabrasZA}</pre></p>
                        <button onclick="window.close()" style="background: #ff20c4; color: white; border: none; padding: 10px 15px; border-radius: 5px; margin-top: 20px; cursor: pointer;">Cerrar Ventana</button>
                    </body>
                    </html>
                `;

    const nuevaVentana = window.open('', 'AnalisisTexto', 'width=600,height=500,scrollbars=yes');
    if (nuevaVentana) {
      nuevaVentana.document.write(newWindowContent);
      nuevaVentana.document.close();
    }
  };

  // ------------------------------------------
  // EJERCICIO 11: ZONAS DE PANTALLA
  // ------------------------------------------
  document.addEventListener('click', function (e) {
    // Solo si el modal 11 está activo
    if (activeModal && activeModal.id === 'modal-ejercicio11') {
      const ancho = window.innerWidth;
      const alto = window.innerHeight;
      const x = e.clientX;
      const y = e.clientY;

      const mitadAncho = ancho / 2;
      const mitadAlto = alto / 2;

      let horizontal = (x < mitadAncho) ? 'izquierda' : 'derecha';
      let vertical = (y < mitadAlto) ? 'arriba' : 'abajo';

      const zona = `${horizontal} ${vertical}`;

      const resultadoDiv = document.getElementById('zonaResultado');
      resultadoDiv.innerHTML = `
                        <span style="color: var(--neon-green);">¡Clic detectado!</span><br>
                        Coordenadas: (${x.toFixed(0)}px, ${y.toFixed(0)}px)<br>
                        Zona de la pantalla: <strong style="color: var(--neon-magenta); text-transform: uppercase;">${zona}</strong>
                    `;
    }
  });

  // ------------------------------------------
  // EJERCICIO 12: FORMULARIO DE REGISTRO
  // ------------------------------------------
  window.validarFormulario = function () {
    const form = document.getElementById('registroForm');
    const erroresDiv = document.getElementById('formErrores');
    const resultadoDiv = document.getElementById('formResultado');
    let errores = [];
    const campos = [
      'nombre', 'apellidoPaterno', 'apellidoMaterno', 'direccion', 'edad',
      'fechaNacimiento', 'sexo', 'email', 'telefono', 'ciudad'
    ];

    campos.forEach(campo => {
      const input = form.elements[campo];
      if (!input || !input.value.trim()) {
        errores.push(`- El campo "${campo}" es obligatorio.`);
      }
    });

    // Validaciones específicas
    const edad = parseInt(form.elements['edad'].value);
    if (form.elements['edad'].value && (isNaN(edad) || edad < 1 || edad > 120)) {
      errores.push(`- La edad debe ser un número entre 1 y 120.`);
    }

    // Validación simple de formato de email
    const email = form.elements['email'].value;
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errores.push(`- El email no tiene un formato válido.`);
    }

    if (errores.length > 0) {
      erroresDiv.hidden = false;
      erroresDiv.innerHTML = '<strong>Errores de Validación:</strong>\n' + errores.join('\n');
      resultadoDiv.innerHTML = '';
      resultadoDiv.style.background = 'none';
      resultadoDiv.style.border = 'none';
    } else {
      erroresDiv.hidden = true;
      erroresDiv.innerHTML = '';
      resultadoDiv.style.border = '1px solid var(--neon-green)';
      resultadoDiv.style.background = 'rgba(32, 255, 157, 0.1)';
      resultadoDiv.innerHTML = '<span style="color: var(--neon-green); font-weight: 700;">¡Validación Exitosa! Todos los campos son válidos.</span>';
    }
  };

  // ------------------------------------------
  // INICIALIZACIÓN DE ESTADOS
  // ------------------------------------------
  // Ocultar contenido extra del Ej. 6 al inicio
  if (extraContent) extraContent.style.display = 'none';
});