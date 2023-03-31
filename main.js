let operator = ''
let previousValue = ''
let currentValue = ''

document.addEventListener("DOMContentLoaded", function() {
    //store all components on HTML in our JS
    let clear = document.querySelector("#clear-btn")
    let equal = document.querySelector(".equal")
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number")
    let operators = document.querySelectorAll(".operator")

    let previousScreen = document.querySelector(".previous")
    let currentScreen = document.querySelector(".current")
    console.log(numbers)

    numbers.forEach((number) => number.addEventListener('click',function(e) {
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue
    }))

    operators.forEach((op) => op.addEventListener('click', function(e) {
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator
        currentScreen.textContent = currentValue
    }))

    equal.addEventListener('click', () => {
       if(currentValue != '' && previousValue != "") {
        calculate()
        previousScreen.textContent = '';
        if(previousValue.length <= 5) {
            currentScreen.textContent = previousValue
        } else {
            currentScreen.textContent = previousValue.slice(0,5) + '...'
        }
       }
    })

    decimal.addEventListener("click", () => {
        addDecimal()
    })

    clear.addEventListener("click", function() {
        previousValue = "";
        currentValue = '';
        operator = '';
        previousScreen.textContent = '';
        currentScreen.textContent = ''
    })

})


function handleNumber(num) {
    //doesnt allow for more than 5 entries/clicks
    if(currentValue.length <= 5) {
        currentValue += num;
    }
}

function handleOperator(op) {
    operator = op
    previousValue = currentValue
    currentValue = ''
}

function calculate() {
    previousValue = Number(previousValue) //convert strings to numbers
    currentValue = Number(currentValue) //...

    if(operator === "+") {
        previousValue += currentValue;
    } else if(operator === "-") {
        previousValue -= currentValue;
    } else if (operator === 'x') {
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue
    }
    console.log(previousValue)
    previousValue = roundNumber(previousValue)
    previousValue = previousValue.toString()
    currentValue = previousValue.toString();

}

function roundNumber(num) { //rounds a given number , removes exess decimal zeros
    return Math.round(num * 1000) / 1000
}


//check current value if it contains a decimal
//if not append a decimal to it 
function addDecimal() {
    if(!currentValue.includes(".")) {  
        return currentValue += '.'
    }
}