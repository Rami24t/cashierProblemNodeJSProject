// Rami Al-Saadi                        The Cashier Problem - DCI Project                               Sep 6 2022

// Problem:
// Create a program that helps a cashier give adequate change to customers.
// The program should return the amount of notes and coins for the customer's change.
// Example: If the price is €3.75 and the paid amount is €50, then the client should receive €46.25 back in change.
//     The expected output should be:
//     2 x €20
//     1 x €5
//     1 x €1
//     1 x €0.2
//     1 x €0.05
// Example: Price: €4.50, Paid amount: €20, Change: 15.50
//     Expected output:
//     1 x €10
//     1 x €5
//     1 x €0.5
//     Note: Include outputs for exceptions


// My implemented JS Solution:
'use strict';
const readline = require("readline-sync");
function processAmountInput(input) {
    if (typeof input == typeof '1')
        input = input.replaceAll(',', '.')
    if (+input !== +input) {
        input = input.trim();
        if (+input[0] === +input[0])
            input = parseFloat(input);
        else if (+input[1] === +input[1])
            input = parseFloat(input.slice(1));
        else
            for (let i in input) {
                if (+input[i] === +input[i] && input[i] !== ' ') {
                    input = parseFloat(input.slice(i));
                    break;
                }
            }
    }
    if (+input === +input) {
        return +input;
    }
    else
        return -1;
}
function getChange(price = Infinity, paidAmount = 0) {
    price = processAmountInput(price);
    paidAmount = processAmountInput(paidAmount);
    if (price === -1 || paidAmount === -1)
        return 'Invalid input!';
    let output = `\n                             ${(new Date()).toString().slice(4, 21)}\n`;
    let amount = (paidAmount * 100 - price * 100);
    if (price > paidAmount)
        return `\nPrice is greater than the paid amount!\n (Price: ${price.toFixed(2)} EUR, Paid amount: only ${paidAmount.toFixed(2)} EUR.)\nPlease increase the paid amount by at least: ${(price - paidAmount).toFixed(2)} EUR.\n`;
    else
        output += 'Price: €' + price.toFixed(2) + '\nReceived: €' + paidAmount.toFixed(2) + '\nChange: €' + (amount / 100).toFixed(2) + '\n';
    if (price !== paidAmount)
        output += (amount > 5 ? '' : 'Coins ') + 'To Return:\n';
    const changesEuro = [
        50000, 20000, 10000, 5000, 2000, 1000, 500,
        200, 100,
        50, 20, 10, 5, 2, 1
    ];
    changesEuro.forEach((change, idx) => {
        let number = Math.floor(amount / change);
        amount -= number * change;
        if (number > 0)
            output += ' - ' + number + ' x €' + (idx > 8 ? (changesEuro[idx] / 100).toFixed(2) : changesEuro[idx] / 100) + (idx > 6 ? ' coin' : ' note') + (number > 1 ? 's' : '') + '\n';
    });
    return output;
}
function main() {
    let paidAmount = 0;
    let price;
    while (paidAmount !== -1 && paidAmount !== 'Q' && paidAmount !== 'q') {
        price = readline.question('Enter Total Price: (or \'Q\' to quit) €');
        if (price === 'Q' || price === 'q' || price === -1)
            break;
        else if (price === '')
            continue;
        paidAmount = readline.question('Enter Total of Received Amount: (or input \'Q\' to quit.) €');
        if (paidAmount !== -1 && paidAmount !== 'Q' && paidAmount !== 'q')
            console.log(getChange(price, paidAmount));
        else if (paidAmount === '')
            continue;
    }
}
// Examples:
console.log(getChange(3.75, 50));
// console.log(getChange(4.50, 20));
// console.log(getChange(4, 3));

// console.log(getChange(23, 23));






// Examples (bonus):



// console.log(getChange('3.75', '50'));






// console.log(getChange('€4.50', '€20'));







// console.log(getChange('4Euros', '3Euros'));


// console.log(getChange(' Purriceo izzo 4 Euros pleazo ', ' this guyy paid me 500 EUROS. MAMMAMIAAAAA        !!! '));


//console.log(getChange('11131.11 EUR', '12000 EUR'));

main();
// console.log(getChange('23,43', '23,99'));
