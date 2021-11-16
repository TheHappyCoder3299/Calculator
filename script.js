class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.allClear();
    }

    allClear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined;
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return ;
        this.currentOperand=this.currentOperand.toString()+number;
    }

    chooseOperation(operation){
        if(this.currentOperand==='') return;
        if(this.previousOperand!==''){
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }

    compute(){
        let computation;
        const prev=parseFloat(this.previousOperand);
        const curr=parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation=prev + curr;
                break;
            case '-':
                computation=prev - curr;
                break;
            case '*':
                computation=prev * curr;
                break;
            case '÷':
                computation=prev / curr;
                break;
            default:
                return;
        }

        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand='';
    }

    getDisplayNumber(number){
        const stringNumber=number.toString();
        const integerPart=parseFloat(stringNumber.split('.')[0]);
        const decimalPart=stringNumber.split('.')[1];
        
        let integerDisplay;
        if(isNaN(integerPart)){
            integerDisplay='';
        }
        else{
            integerDisplay=integerPart.toLocaleString('en',{maximumFractionDigits : 0});
        }
        if(decimalPart!=null) return `${integerDisplay}.${decimalPart}`;
        else return integerDisplay;
        
    }

    updateDisplay(){
         this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand);
         if(this.operation!=null){
             this.previousOperandTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
         }
         else
            this.previousOperandTextElement.innerText=this.previousOperand;
    }

}








const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const allClearButton=document.querySelector('[data-all-clear]');
const deleteButton=document.querySelector('[data-delete]');
const equalsButton=document.querySelector('[data-equals]');
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');


const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});


allClearButton.addEventListener('click',()=>{
    calculator.allClear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
});

document.addEventListener('keydown',(event)=>{
    switch(event.key){
        case '=':
        case 'Enter':
            calculator.compute();
            calculator.updateDisplay();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            calculator.chooseOperation(event.key);
            calculator.updateDisplay();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            calculator.appendNumber(event.key);
            calculator.updateDisplay();
            break;
        case 'Delete':
        case 'Backspace':
            calculator.delete();
            calculator.updateDisplay();
            break;
        default:
            return ;
    }
});