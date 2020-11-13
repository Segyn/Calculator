class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.currentTextElement = currentTextElement
        this.previousTextElement = previousTextElement
        this.reset = false
        this.clear()
    }
    clear() {

        this.current = ''
        this.previous = ''
        this.operation = undefined
    }


    delete() {
        this.current = this.current.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) return;
        this.current = this.current.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.current === '') return;
        if (this.previous !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const cur = parseFloat(this.current)
        if (isNaN(prev) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case '*':
                computation = prev * cur
                break
            case '/':
                computation = prev / cur
                break
            default:
                return
        }
        this.reset = true
        this.current = computation
        this.operation = undefined
        this.previous = ''

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentTextElement.innerText =
            this.getDisplayNumber(this.current)
        if (this.operation != null) {
            this.previousTextElement.innerText =
                `${this.getDisplayNumber(this.previous)} ${this.operation}`
        } else {
            this.previousTextElement.innerText = ''
        }
    }
}



const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const eqalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previous === "" &&
            calculator.current !== "" &&
            calculator.reset) {
            calculator.current = "";
            calculator.reset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

eqalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})