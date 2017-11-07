document.forms.calculation.addEventListener("submit", doCalculation);

function doCalculation(e) {
    e.preventDefault();
    var str = document.getElementById("expression").value;
    var result_element = document.getElementById("result");
    try {
        result_element.innerHTML = calculate(str);
        result_element.style.color = "#507299";
    }
    catch (e) {
        result_element.innerHTML = "Неверное выражение!";
        result_element.style.color = "red";
    }
    return false;
}


function calculate(expression) {
    var incorrectSymbols,
        operands,
        operandsPattern,
        operators,
        operatorsPattern,
        result;

    incorrectSymbols = /[^=0-9.+*\-/ ]/g;
    if (incorrectSymbols.exec(expression)) {
        throw "Unknown symbol";
    }
    if (expression[expression.length - 1] != "=") {
        throw "Not expression";
    }

    operandsPattern = /[0-9]+(\.[0-9]+)*/g;
    operands = expression.match(operandsPattern);

    operatorsPattern = /[\-*/+]/g;
    operators = expression.match(operatorsPattern);


    if (operands.length == operators.length + 1) {
        result = +operands[0];
    }
    else if (operands.length == operators.length) {
        if (operators[0] == "+") {
            result = +operands[0];
        }
        else if (operators[0] == "-") {
            result = -operands[0];
        }
        else
            throw ("Invalid expression");

        operators = operators.slice(1);
    }
    else
        throw ("Invalid expression");

    for (var i = 0; i < operators.length; i++) {
        switch (operators[i]) {
            case "+": {
                result += +operands[i + 1];
                break;
            }
            case "-": {
                result -= operands[i + 1];
                break;
            }
            case "*": {
                result *= operands[i + 1];
                break;
            }
            case "/": {
                result /= operands[i + 1];
                break;
            }
        }
    }
    return result.toFixed(2);
}