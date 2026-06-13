<?php
// TODO: cuando auth (Dev 1) esté listo, agregar session_start() y verificar sesión
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendario - Sistema de Turnos</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

    <main class="calendario-page">
        <h1>Calendario de disponibilidad</h1>

        <div class="calendario-nav">
            <button id="btn-mes-anterior">&lt; Anterior</button>
            <h2 id="calendario-titulo"></h2>
            <button id="btn-mes-siguiente">Siguiente &gt;</button>
        </div>

        <div id="calendario-grid" class="calendario-grid">
            <!-- Los días se generan dinámicamente desde calendario.js -->
        </div>

        <div id="slots-panel" class="slots-panel" hidden>
            <h3 id="slots-titulo"></h3>
            <ul id="slots-lista"></ul>
        </div>
    </main>

    <script src="../assets/js/calendario.js"></script>
</body>
</html>