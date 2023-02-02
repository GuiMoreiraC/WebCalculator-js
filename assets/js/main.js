const calculator = {
    //Attributes
    display: document.querySelector('.calculator-display'),
    displayMessage: document.querySelector('.calculator-message'),

    //Methods
    init() {
        this.clearDisplay();
        this.clickEvent();
        this.keyPress();
    },
    clickEvent() {
        document.addEventListener('click', e => {
            if (this.btnClick(e, 'btn-num', 'btn-ope')) this.toDisplay(e);
            if (this.btnClick(e, 'btn-clear')) this.clearDisplay();
            if (this.btnClick(e, 'btn-del')) this.backspace();
            if (this.btnClick(e, 'btn-eq')) this.result();
            if (this.btnClick(e, 'calculator-message')) this.expressionHistory();
        });
    },
    result() {
        const input = this.display.value;
        let result = input;
        let expression = input;

        this.displayMessage.classList.remove('error');

        try {
            if (!this.validateInput(input)) {
                this.displayMessage.innerText = 'invalid expression';
                this.displayMessage.classList.add('error');
                return;
            }

            if (input) result = eval(input);
            this.display.value = result;
            this.displayMessage.innerText = expression;
        } catch (error) {
            this.displayMessage.innerText = 'invalid expression';
            this.displayMessage.classList.add('error');
        }
    },
    btnClick(element, ...className) {
        for (const i of element.target.classList) {
            if (className.some(cn => cn === i)) return true
        }
        return false
    },
    toDisplay(element) {
        const isMobile = window.innerWidth <= 600;

        this.display.value += element.target.innerText;
        if (!isMobile) this.display.focus();
    },
    clearDisplay() {
        this.display.value = '';
        this.displayMessage.innerText = '';
        this.displayMessage.classList.remove('error');

    },
    backspace() {
        this.display.value = this.display.value.slice(0, -1);
    },
    keyPress() {
        this.display.addEventListener('keyup', e => {
            if (e.keyCode === 13) this.result();
            if (e.keyCode === 38) this.expressionHistory();
        });
    },
    expressionHistory(){
        if (this.displayMessage.classList.contains('error')) return
        if (this.displayMessage.innerText === '') return
        this.display.value = this.displayMessage.innerText;
        this.displayMessage.innerText = '';
    },
    validateInput(input) {
        let validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', '/', '*', '+', '-', '.'];

        for (const char of input.split('')) {
            const valid = validChars.some(validChars => validChars === char);
            if (!valid) return false;
        }
        return true;
    },
};

calculator.init();
