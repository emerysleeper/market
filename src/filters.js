
const dollarToRuble = function (dollar, course) {
    return parseFloat((Math.round(dollar * course * 100) / 100).toFixed(2))
}

//Filter for numbers, that were not changed by parseFloat and toFixed
const fixedNum = function (num) {
    return parseFloat((Math.round(num * 100) / 100).toFixed(2))
}


export default {
    dollarToRuble,
    fixedNum
}
