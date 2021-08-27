
const dollarToRuble = function (dollar, course) {
    return parseFloat((Math.round(dollar * course * 100) / 100).toFixed(2))
}

const fixedNum = function (num) {
    return parseFloat((Math.round(num * 100) / 100).toFixed(2))
}


export default {
    dollarToRuble,
    fixedNum
}
