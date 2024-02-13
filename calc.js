const add = 'add'
const subtract = 'subtract'
const multiply = 'multiply'
const divide = 'divide'
const equal = 'equal'

let currentNumber = '0'
const operationArray = [0]
const buttonNumber = document.querySelectorAll('#numbers button')
const buttonOperate = document.querySelectorAll('#operations button')
const buttonEqual = document.querySelector('#equal')
const buttonEscape = document.querySelector('#escape')
const buttonDelete = document.querySelector('#delete')
const screen = document.querySelector('#screen')
screen.textContent = currentNumber

const isFloat = n => n % 1 !== 0

const fixFloat = (numberFirst, numberSecond, operation) => {
    const a = numberFirst.toString().length
    const b = numberSecond.toString().length
    const n = a > b ? a : b

    if ( operation === add ) return parseFloat((numberFirst + numberSecond).toFixed(n - 2))
    else if ( operation === subtract ) return parseFloat((numberFirst - numberSecond).toFixed(n - 2))
    else return parseFloat((numberFirst * numberSecond).toFixed(a + b))
}

const reset = () => {
    currentNumber = '0'
    screen.textContent = currentNumber
    operationArray[0] = 0
    if ( operationArray[1] ) {
        operationArray.pop()
        buttonOperate.forEach(btn => {
            btn.classList.remove('active')
        })
    }
}

const backSpace = () => {
    if ( operationArray[1] ) {
        operationArray.pop()
        buttonOperate.forEach(btn => {
            btn.classList.remove('active')
        })
        currentNumber = screen.textContent
        return
    }
    
    if ( currentNumber.length === 1 ) {
        currentNumber = '0'
    } else {
        currentNumber = currentNumber.slice(0, -1)
    }
    screen.textContent = currentNumber
}

const operationTrigger = operation => {
    if ( operationArray.length === 1 ) {
        operationArray[0] = parseFloat(currentNumber)
        operationArray.push(operation)
    } else {
        operationArray.push(parseFloat(currentNumber))
        operationArray[0] = operate(operationArray)
        screen.textContent = operationArray[0]
        operationArray[1] = operation
        buttonOperate.forEach(btn => {
            btn.classList.remove('active')
        })
        operationArray.pop()
    }
    operation !== equal && buttonOperate.forEach(btn => {
        btn.id === operation && btn.classList.add('active')
    })
    currentNumber = '0'
}

const operate = (operationArray) => {
    const numberFirst = operationArray[0]
    const numberSecond = operationArray[2]
    const operation = operationArray[1]
    let result

    switch ( operation ) {
        case add:
            if( isFloat(numberFirst) || isFloat(numberSecond) ) {
                result = fixFloat(numberFirst, numberSecond, add)
            } else {
                result = (numberFirst + numberSecond)
            }
            break
        case subtract:
            if( isFloat(numberFirst) || isFloat(numberSecond) ) {
                result = fixFloat(numberFirst, numberSecond, subtract)
            } else {
                result = (numberFirst - numberSecond)
            }
            break
        case multiply:
            if( isFloat(numberFirst) || isFloat(numberSecond) ) {
                result = fixFloat(numberFirst, numberSecond, multiply)
            } else {
                result = (numberFirst * numberSecond)
            }
            break
        case divide:
            if ( numberSecond === 0 ) {
                alert('You have found the infinity! Start over your calculations.')
                result = 0
                operationArray.pop()
                break
            }
            result = numberFirst / numberSecond
            break
        case equal:
            result = numberFirst
        default:
            break
    }

    return result
}

const assignNumber = (n) => {
    if ( operationArray[1] === equal ) {
        operationArray[0] = parseFloat(n)
    }

    if ( currentNumber.length === Number.MAX_SAFE_INTEGER.toString().length ) return currentNumber

    if ( currentNumber === '0' ) {
        currentNumber = n
    } else if ( n === '.' && currentNumber.includes('.')) {
        return currentNumber
    } else if ( n === '.' && currentNumber === 0 ) {
        currentNumber = '0' + n
    } else {
        currentNumber = currentNumber + n
    }

    return currentNumber
}

buttonNumber.forEach(btn => btn.addEventListener('click', () => {
    screen.textContent = assignNumber(btn.textContent)
}))

buttonOperate.forEach(btn => btn.addEventListener('click', () => {
    operationTrigger(btn.id)
}))

buttonEscape.addEventListener('click', () => {
    reset()
})

buttonDelete.addEventListener('click', () => {
    backSpace()
})

document.onkeyup = e => {
    switch ( e.key ) {
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
            screen.textContent = assignNumber(e.key)
            buttonNumber.forEach(btn => {
                btn.textContent === e.key && btn.classList.add('active')
                setInterval(() => {
                    btn.classList.remove('active')
                }, 100)
            })
            break
        case '+':
            operationTrigger(add)
            break
        case '-':
            operationTrigger(subtract)
            break
        case '*':
            operationTrigger(multiply)
            break
        case '/':
            operationTrigger(divide)
            break
        case '=':
        case 'Enter':
            operationTrigger(equal)
            buttonEqual.classList.add('active')
            setInterval(() => {
                buttonEqual.classList.remove('active')
            }, 100)
            break
        case 'c':
        case 'Escape':
            reset()
            buttonEscape.classList.add('active')
            setInterval(() => {
                buttonEscape.classList.remove('active')
            }, 100)
            break
        case 'Backspace':
            backSpace()
            buttonDelete.classList.add('active')
            setInterval(() => {
                buttonDelete.classList.remove('active')
            }, 100)
            break
        default:
            break
    }
}