<!-- 
    Calculadora de Tablas de Verdad
    Desarrollado por [Jose Luis Martos]
    Descripción: Esta aplicación permite generar tablas de verdad a partir de expresiones lógicas ingresadas por el usuario. 
    Esta calculadora es diseñada para la materia de Matemáticas Discretas nocturno - Unicomfacauca
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Tablas de Verdad</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="calculator-container">
        <h2>Calculadora de Tablas de Verdad</h2>
        <input type="text" id="expression" readonly>

        <div class="button-container">
            <button class="btn-symbol" onclick="addToExpression('P')">P</button>
            <button class="btn-symbol" onclick="addToExpression('Q')">Q</button>
            <button class="btn-symbol" onclick="addToExpression('R')">R</button>
            <button class="btn-symbol" onclick="addToExpression('¬')">¬</button>
            <button class="btn-symbol" onclick="addToExpression('∧')">∧</button>

            <button class="btn-symbol" onclick="addToExpression('∨')">∨</button>
            <button class="btn-symbol" onclick="addToExpression('→')">→</button>
            <button class="btn-symbol" onclick="addToExpression('↔')">↔</button>
            <button class="btn-symbol" onclick="addToExpression('(')">(</button>
            <button class="btn-symbol" onclick="addToExpression(')')">)</button>

            <button class="btn-delete" onclick="deleteLast()">←</button>
            <button class="btn-delete" onclick="clearExpression()">Borrar</button>
        </div>

        <button class="btn-calculate" onclick="calculateTruthTable()">Generar Tabla</button>

        <div id="truth-table"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>