'use strict';

// Rami Al-Saadi                        The Cashier Problem - DCI Project                               Sep 6 2022

// Problem:
// Create a program that helps a cashier give adequate change to customers. The program should return the amount of notes and coins for the customer's change.
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
//     Notes
//     Include outputs for exceptions e.g. price: €4, paid amount: €3.


// My implemented JS Solution:

const getChange = (price = Infinity, paidAmount = 0) => {
    if (+price !== +price) {
        price = price.trim();
        if (+price[0] === +price[0])
            price = parseFloat(price)
        else if (+price[1] === +price[1])
            price = parseFloat(price.slice(1));
        else
            for (let i in price) {
                if (+price[i] === +price[i] && price[i] !== ' ') {
                    price = parseFloat(price.slice(i));
                    break;
                }
            }
    }
    if (+paidAmount !== +paidAmount) {
        paidAmount = paidAmount.trim();
        if (+paidAmount[0] === +paidAmount[0])
            paidAmount = parseFloat(paidAmount)
        else if (+paidAmount[1] === +paidAmount[1])
            paidAmount = parseFloat(paidAmount.slice(1));
        else
            for (let i in paidAmount) {
                if (+paidAmount[i] === +paidAmount[i] && paidAmount[i] !== ' ') {
                    paidAmount = parseFloat(paidAmount.slice(i));
                    break;
                }
            }
    }
    price = +price; paidAmount = +paidAmount;
    let output = '\n';
    let amount = (paidAmount - price) * 100;
    if (price > paidAmount)
        return '\nPrice is greater than the paid amount!\n (Price: ' + price.toFixed(2) + ' EUR, Paid amount: only ' + paidAmount.toFixed(2) + ' EUR.)\nPlease increase the paid amount by at least: ' + (price - paidAmount).toFixed(2) + ' EUR.\n';
    else
        output += 'Price: €' + price.toFixed(2) + '\nReceived: €' + paidAmount.toFixed(2) + '\nChange: €' + (amount / 100).toFixed(2) + '\n';
    if (price !== paidAmount)
        output += (amount > 5 ? '' : 'Coins ') + 'To Return:\n';
    const changesEuro = [
        50000, 20000, 10000, 5000, 2000, 1000, 500,
        200, 100,
        50, 20, 10, 5, 2, 1
    ]
    const notesAndCoins = changesEuro.map(change => {
        let amountChange = Math.floor(amount / change);
        amount -= amountChange * change;
        return amountChange
    })
    for (const idx in notesAndCoins) {
        const number = notesAndCoins[idx]
        if (number > 0)
            output += ' - ' + number + ' x €' + (idx > 8 ? (changesEuro[idx] / 100).toFixed(2) : changesEuro[idx] / 100) + (idx > 6 ? ' coin' : ' note') + (number > 1 ? 's' : '') + '\n';
    }
    return output;
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
