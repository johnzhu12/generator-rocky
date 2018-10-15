

// var getRadomKey = function () {
//     let str = '';
//     //64位随机数字,大写字母或小写字母ASCII 48-122
//     let arr = [];
//     for (let i = 0; i < 32; i++) {
//         let radNum = Math.ceil(Math.random() * 25)
//         let strCh = String.fromCharCode(97 + radNum)
//         arr.push(strCh)
//     }
//     str += arr.join('');
//     return str;
// }
var getRadomKey = function () {
    let str = '';
    //64位随机数字
    let arr = [];
    for (let i = 0; i < 64; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str;
}
export default {
    getRadomKey
}