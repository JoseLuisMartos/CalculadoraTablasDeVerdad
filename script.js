let expressionInput = document.getElementById('expression');
let truthTableDiv = document.getElementById('truth-table');

function addToExpression(value) {
    expressionInput.value += value;
}

function deleteLast() {
    expressionInput.value = expressionInput.value.slice(0, -1);
}

function clearExpression() {
    expressionInput.value = '';
    truthTableDiv.innerHTML = '';
}

function calculateTruthTable() {
    let expression = expressionInput.value;
    
    if (!isValidExpression(expression)) {
        alert("Expresión no válida. Por favor, ingrese una expresión lógica válida.");
        return;
    }

    let variables = getVariables(expression);
    let truthTable = generateTruthTable(expression, variables);

    displayTruthTable(truthTable, variables, expression);
}

function isValidExpression(expression) {
    // Validar que la expresión solo contenga P, Q, R, ∧, ∨, ¬, →, ↔, (, )
    const validChars = /^[PQR∧∨¬→↔()\s]*$/;
    if (!validChars.test(expression)) return false;

    // Validar paréntesis balanceados
    let stack = [];
    for (let char of expression) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}

function getVariables(expression) {
    let variables = new Set();
    for (let char of expression) {
        if (['P', 'Q', 'R'].includes(char)) {
            variables.add(char);
        }
    }
    return Array.from(variables);
}

function generateTruthTable(expression, variables) {
    let truthTable = [];
    let numRows = Math.pow(2, variables.length);

    for (let i = 0; i < numRows; i++) {
        let row = {};
        for (let j = 0; j < variables.length; j++) {
            row[variables[j]] = !!(i & (1 << (variables.length - 1 - j)));
        }
        row['Result'] = evaluateExpression(expression, row);
        truthTable.push(row);
    }

    return truthTable;
}

function evaluateExpression(expression, row) {
    let expr = expression;
    for (let variable in row) {
        expr = expr.replace(new RegExp(variable, 'g'), row[variable]);
    }
    expr = expr.replace(/∧/g, '&&').replace(/∨/g, '||').replace(/¬/g, '!').replace(/→/g, '<=')
               .replace(/↔/g, '===');
    return eval(expr);
}

function displayTruthTable(truthTable, variables, expression) {
    let table = '<table border="1"><tr>';
    
    // Mostrar las variables
    for (let variable of variables) {
        table += `<th>${variable}</th>`;
    }

    // Extraer y mostrar subexpresiones (como ¬Q, ¬R, P∧¬Q, etc.)
    const subExpressions = extractSubExpressions(expression);
    for (let subExpr of subExpressions) {
        table += `<th>${subExpr}</th>`;
    }

    table += '<th>Resultado</th></tr>';

    // Mostrar los valores de verdad y el resultado
    for (let row of truthTable) {
        table += '<tr>';
        
        // Mostrar valores de las variables
        for (let variable of variables) {
            table += `<td>${row[variable] ? 'V' : 'F'}</td>`;
        }

        // Mostrar valores de las subexpresiones
        for (let subExpr of subExpressions) {
            table += `<td>${evaluateExpression(subExpr, row) ? 'V' : 'F'}</td>`;
        }

        // Mostrar el resultado final
        table += `<td>${row['Result'] ? 'V' : 'F'}</td></tr>`;
    }
    table += '</table>';

    truthTableDiv.innerHTML = table;
}

function extractSubExpressions(expression) {
    const subExpressions = new Set();
    
    // Buscar subexpresiones como ¬Q, ¬R, P∧¬Q, etc.
    const regex = /¬[PQR]|[PQR][∧∨→↔][PQR]|\([PQR∧∨¬→↔]+\)/g;
    let match;
    while ((match = regex.exec(expression)) !== null) {
        subExpressions.add(match[0]);
    }

    // Asegurarse de que las subexpresiones estén en el orden correcto
    const sortedSubExpressions = Array.from(subExpressions).sort((a, b) => expression.indexOf(a) - expression.indexOf(b));

    return sortedSubExpressions;
}