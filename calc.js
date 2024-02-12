let currentNumber = '0'
const operationArray = [0]
const buttonNumber = document.querySelectorAll('#numbers button')
const buttonOperate = document.querySelectorAll('#operations button')
const buttonEscape = document.querySelector('#escape')
const buttonDelete = document.querySelector('#delete')
const screen = document.querySelector('#screen')
screen.textContent = currentNumber

const isFloat = n => n % 1 !== 0

const fixFloat = (numberFirst, numberSecond, operation) => {
    const a = numberFirst.toString().length
    const b = numberSecond.toString().length
    const n = a > b ? a : b

    if ( operation === 'add' ) return parseFloat((numberFirst + numberSecond).toFixed(n - 2))
    else if ( operation === 'subtract') return parseFloat((numberFirst - numberSecond).toFixed(n - 2))
    else return parseFloat((numberFirst * numberSecond).toFixed(a + b))
}

const operate = (operationArray) => {
    const numberFirst = operationArray[0]
    const numberSecond = operationArray[2]
    const operation = operationArray[1]
    let result

    switch (operation) {
        case 'add':
            if( isFloat(numberFirst) || isFloat(numberSecond) ) {
                result = fixFloat(numberFirst, numberSecond, 'add')
            } else {
                result = (numberFirst + numberSecond)
            }
            break
        case 'subtract':
            if( isFloat(numberFirst) || isFloat(numberSecond) ) {
                result = fixFloat(numberFirst, numberSecond, 'subtract')
            } else {
                result = (numberFirst - numberSecond)
            }
            break
        case 'multiply':
            if( isFloat(numberFirst) || isFloat(numberSecond) ) {
                result = fixFloat(numberFirst, numberSecond, 'multiply')
            } else {
                result = (numberFirst * numberSecond)
            }
            break
        case 'divide':
            if ( numberSecond === 0 ) {
                alert('You have found the infinity! Start over your calculations.')
                result = 0
                operationArray.pop()
                break
            }
            result = numberFirst / numberSecond
            break
        case 'equal':
            result = numberFirst
        default:
            break
    }

    return result
}

const assignNumber = (n) => {
    if ( operationArray[1] === 'equal' ) {
        operationArray[0] = parseFloat(n)
    }

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
    if ( operationArray.length === 1 ) {
        operationArray[0] = parseFloat(currentNumber)
        operationArray.push(btn.id)
        currentNumber = '0'
    } else {
        operationArray.push(parseFloat(currentNumber))
        operationArray[0] = operate(operationArray)
        screen.textContent = operationArray[0]
        operationArray[1] = btn.id
        operationArray.pop()
        currentNumber = '0'
    }
}))

buttonEscape.addEventListener('click', () => {
    currentNumber = '0'
    screen.textContent = currentNumber
    operationArray[0] = 0
    if ( operationArray[1] ) operationArray.pop()
})

buttonDelete.addEventListener('click', () => {
    if (operationArray[1]) operationArray.pop()
    if (currentNumber.length === 1) {
        currentNumber = '0'
        screen.textContent = currentNumber
    } else {
        currentNumber = currentNumber.slice(0, -1)
        screen.textContent = currentNumber
    }
})