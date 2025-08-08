document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener datos de los partidos desde el archivo JSON
    async function fetchPartidos() {
        try {
            const response = await fetch('partidos.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            const matches = data.matches;
            displayPartidos(matches);
        } catch (error) {
            console.error('Error al obtener los datos de los partidos:', error);
        }
    }

    // Función para mostrar los partidos en la página
    function displayPartidos(matches) {
        const partidosContainer = document.getElementById('partidos');
        partidosContainer.innerHTML = '';

        matches.forEach(match => {
            const partidoElement = document.createElement('div');
            partidoElement.className = 'partido';

            const homeTeam = match.homeTeam;
            const awayTeam = match.awayTeam;
            const homeFlag = match.homeFlag;
            const awayFlag = match.awayFlag;
            const matchDate = new Date(match.date);
            const formattedDate = matchDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
            const formattedTime = matchDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

            partidoElement.innerHTML = `
                <div class="match-date">
                    <span>${formattedDate}</span>
                    <span style="font-size: 12px;">${formattedTime}</span>
                </div>
                <div class="team-container">
                    <div class="team">
                        <img class="team-flag" src="${homeFlag}" alt="${homeTeam} Flag">
                        <span>${homeTeam}</span>
                    </div>
                    <div class="team">
                        <img class="team-flag" src="${awayFlag}" alt="${awayTeam} Flag">
                        <span>${awayTeam}</span>
                    </div>
                </div>
                <div class="resultado">
                    <button data-result="1">1</button>
                    <button data-result="X">X</button>
                    <button data-result="2">2</button>
                </div>
                <div class="resultado-input">
                    <input type="number" class="home-score" placeholder="Local">
                    <span>-</span>
                    <input type="number" class="away-score" placeholder="Visitante">
                    <button class="save-result">Guardar</button>
                </div>
            `;

            const buttons = partidoElement.querySelectorAll('.resultado button');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                });
            });

            const saveButton = partidoElement.querySelector('.save-result');
            saveButton.addEventListener('click', () => {
                const homeScore = partidoElement.querySelector('.home-score').value;
                const awayScore = partidoElement.querySelector('.away-score').value;
                console.log(`Resultado guardado: ${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}`);
                // Aquí podrías añadir código para enviar el resultado a un servidor o actualizar la UI
            });

            partidosContainer.appendChild(partidoElement);
        });

        // Una vez mostrados los partidos, actualizamos la tabla de clasificación
        actualizarTablaClasificacion(matches);
    }

    // Función para actualizar la tabla de clasificación
    function actualizarTablaClasificacion(matches) {
        // Supongamos que tenemos una función o datos simulados para la clasificación
        const clasificacionData = generarClasificacionData(matches);

        // Mostrar la tabla de clasificación
        mostrarTablaClasificacion(clasificacionData);
    }

    // Función para generar datos de clasificación (simulados para prueba)
    function generarClasificacionData(matches) {
        // Aquí generamos datos de clasificación simulados para prueba
        // Puedes reemplazar esto con lógica real para calcular la clasificación
        const clasificacion = [];
        matches.forEach(match => {
            const jugador = `Jugador ${Math.floor(Math.random() * 10) + 1}`;
            const partidosJugados = Math.floor(Math.random() * 10) + 1;
            const aciertos = Math.floor(Math.random() * 5) + 1;
            const fallos = partidosJugados - aciertos;
            const resultadosAcertados = Math.floor(Math.random() * 5) + 1;
            const equiposAcertados = Math.floor(Math.random() * 5) + 1;
            const maxGoleadorTorneo = 'Goleador';
            const maxGoleadorEspana = 'GoleadorEspaña';
            const pts = aciertos * 3; // Puntos hipotéticos

            clasificacion.push({
                jugador,
                partidosJugados,
                aciertos,
                fallos,
                resultadosAcertados,
                equiposAcertados,
                maxGoleadorTorneo,
                maxGoleadorEspana,
                pts
            });
        });

        return clasificacion;
    }

    // Función para mostrar la tabla de clasificación
    function mostrarTablaClasificacion(data) {
        const tablaClasificacion = document.getElementById('tablaClasificacion');
        const tbody = tablaClasificacion.querySelector('tbody');

        // Limpiar tabla antes de actualizar
        tbody.innerHTML = '';

        // Iterar sobre los datos y agregar filas a la tabla
        data.forEach((jugador, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jugador.jugador}</td>
                <td>${jugador.partidosJugados}</td>
                <td>${jugador.aciertos}</td>
                <td>${jugador.fallos}</td>
                <td>${jugador.resultadosAcertados}</td>
                <td>${jugador.equiposAcertados}</td>
                <td>${jugador.maxGoleadorTorneo}</td>
                <td>${jugador.maxGoleadorEspana}</td>
                <td>${jugador.pts}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Llamar a la función para obtener y mostrar los partidos
    fetchPartidos();

    // Código para el formulario de predicciones (no cambió, sigue igual)
    const seleccionJugadorSelect = document.getElementById('seleccionJugador');
    const jugadorSelect = document.getElementById('jugador');
    const maxGoleadorEspSelect = document.getElementById('maxGoleadorEsp');

    const equipos = [
        { nombre: 'Alemania', jugadores: ['Jugador1', 'Jugador2', 'Jugador3'] },
        { nombre: 'España', jugadores: ['Jugador4', 'Jugador5', 'Jugador6'] },
        { nombre: 'Francia', jugadores: ['Jugador7', 'Jugador8', 'Jugador9'] },
        // Añade más equipos con sus respectivos jugadores según necesites
    ];

    const jugadoresEspana = ['Jugador10', 'Jugador11', 'Jugador12'];

    function actualizarJugadores() {
        const seleccion = seleccionJugadorSelect.value;
        const equipo = equipos.find(equipo => equipo.nombre === seleccion);

        jugadorSelect.innerHTML = '<option value="">Selecciona un jugador</option>';

        if (equipo) {
            equipo.jugadores.forEach(jugador => {
                const option = document.createElement('option');
                option.textContent = jugador;
                option.value = jugador;
                jugadorSelect.appendChild(option);
            });
        }
    }

    seleccionJugadorSelect.addEventListener('change', () => {
        actualizarJugadores();
    });

    equipos.forEach(equipo => {
        const option = document.createElement('option');
        option.textContent = equipo.nombre;
        option.value = equipo.nombre;
        seleccionJugadorSelect.appendChild(option);
    });

    jugadoresEspana.forEach(jugador => {
        const option = document.createElement('option');
        option.textContent = jugador;
        option.value = jugador;
        maxGoleadorEspSelect.appendChild(option);
    });
});
