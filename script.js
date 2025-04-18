const display = document.getElementById("display");
const previousOperand = document.getElementById("previous-operand");

function appendValue(value) {
    // Prevent multiple decimals in a number
    if (value === '.' && display.value.includes('.')) {
        const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
        if (lastNumber.includes('.')) return;
    }
    
    // If the display is empty or after calculation, start new input for operators
    if (display.value === "" && "+-*/".includes(value)) {
        if (previousOperand.textContent) {
            display.value = previousOperand.textContent + value;
        } else {
            return;
        }
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "";
    previousOperand.textContent = "";
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        if (display.value === "") return;
        
        // Store the current expression before calculating
        previousOperand.textContent = display.value;
        
        // Replace × with * for proper evaluation
        const expression = display.value.replace(/×/g, '*');
        const result = eval(expression);
        
        // Display the result with proper formatting
        display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch (error) {
        alert("Invalid expression!");
        clearDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9\.\+\-\*\/]/.test(key)) {
        event.preventDefault();
        appendValue(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    } else if (key === 'x' || key === 'X') {
        event.preventDefault();
        appendValue('*');
    }
});