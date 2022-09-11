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
const fs = require('fs');
const goodbye = require('./goodbye')

const banner = `
██████╗  █████╗ ███╗   ███╗██╗█╗███████╗     ██████╗ █████╗ ███████╗██╗  ██╗██╗███████╗██████╗      █████╗ ██████╗ ██████╗ 
██╔══██╗██╔══██╗████╗ ████║██║╚╝██╔════╝    ██╔════╝██╔══██╗██╔════╝██║  ██║██║██╔════╝██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗
██████╔╝███████║██╔████╔██║██║  ███████╗    ██║     ███████║███████╗███████║██║█████╗  ██████╔╝    ███████║██████╔╝██████╔╝
██╔══██╗██╔══██║██║╚██╔╝██║██║  ╚════██║    ██║     ██╔══██║╚════██║██╔══██║██║██╔══╝  ██╔══██╗    ██╔══██║██╔═══╝ ██╔═══╝ 
██║  ██║██║  ██║██║ ╚═╝ ██║██║  ███████║    ╚██████╗██║  ██║███████║██║  ██║██║███████╗██║  ██║    ██║  ██║██║     ██║     
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚══════╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝     ╚═╝     
`;

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
    input = (+input).toFixed(2)
    return +input;
  }
  else
    return -1;
}
function getChange(price = Infinity, paidAmount = 0) {
  price = processAmountInput(price);
  paidAmount = processAmountInput(paidAmount);
  if (price === -1 || paidAmount === -1)
    return '\x1b[91mInvalid input!\x1b[39m';
  const timeStamp = (new Date()).toString().slice(4, 21)
  let output = `\n                             ${timeStamp}\n `;
  let amount = (paidAmount * 100 - price * 100);
  const priceString = price.toFixed(2), paidString = paidAmount.toFixed(2);
  const priceLength = priceString.length, paidLength = paidString.length;
  if (price > paidAmount)
    return `\n${`                             ${timeStamp}`}\n \x1b[91mPrice is greater than the paid amount!\x1b[39m\n  \x1b[3mPrice:   ${priceLength < paidLength ? ' '.repeat(paidLength - priceLength) : ''} ${priceString} EUR\n  Received: ${paidLength < priceLength ? ' '.repeat(priceLength - paidLength) : ''}${paidString} EUR only!\x1b[23m\n Please increase the paid amount by at least: \x1b[91m\x1b[1m${(price - paidAmount).toFixed(2)} EUR\x1b[22m\x1b[39m.\n `;
  else
    output += '\x1b[91mPrice:    € ' + (priceLength < paidLength ? ' '.repeat(paidLength - priceLength) : '') + priceString + '\x1b[39m\n \x1b[32mReceived: € ' + paidString + '\x1b[89m\n \x1b[97mChange:   \x1b[1m€ ' + (amount / 100).toFixed(2) + '\x1b[22m\n ';
  if (price !== paidAmount)
    output += (amount > 5 ? '' : 'Coins ') + '\x1b[3mTo Return:\x1b[23m\n ';
  const changesEuro = [
    50000, 20000, 10000, 5000, 2000, 1000, 500,
    200, 100,
    50, 20, 10, 5, 2, 1
  ];
  changesEuro.forEach((change, idx) => {
    let number = Math.floor(amount / change);
    amount -= number * change;
    if (number > 0)
      output += '  - ' + '\x1b[1m' + number + '\x1b[22m' + ' x \x1b[1m\x1b[3m€' + (idx > 8 ? (changesEuro[idx] / 100).toFixed(2) : changesEuro[idx] / 100) + '\x1b[22m' + (idx > 6 ? ' coin' : ' note') + (number > 1 ? 's' : '') + '\x1b[23m\n ';
  });
  return output + '\x1b[39m';
}
function main() {
  let bStyle = 9;
  console.log("\x1b[0m\x1b[33m[Rami's Cashier App] 1.8.18\x1b[39m");
  function showFunction() {
    bStyle > 200 ? bStyle = 0 : bStyle++;
    return console.log(`\x1b[5m\x1b[53m\x1b[${bStyle}m${banner}\x1b[89m\x1b[25m\x1b[55m`);
  }
  //  setInterval(showFunction(), 40);
  console.log(`\x1b[5m\x1b[19m\x1b[32m\x1b[53m\x1b[${bStyle}m${banner}\x1b[21m\x1b[89m\x1b[25m\x1b[55m\x1b[24m\x1b[29m`);
  let paidAmount = 0;
  let price;
  while (paidAmount !== -1 && paidAmount !== 'Q' && paidAmount !== 'q') {
    console.log("\x1b[33m\n [Rami's Cashier App] to restart, press 'Enter' key without entering any value\n [Rami's Cashier App] to read history enter 'r'\n [Rami's Cashier App] to delete history enter 'del'\n [Rami's Cashier App] to quit at any time, enter 'q'\x1b[39m\n ")
    price = readline.question(' Enter Total Price: (or \'Q\' to quit) \x1b[96m€');
    console.log('\x1b[39m');
    if (price === 'Q' || price === 'q' || price === -1)
      break;
    else if (price === '')
      continue;
    else if (price === 'r' || price === 'R') {
      console.log(openFile());
      continue;
    }
    else if (price.toString().toLowerCase() === 'del') {
      console.log(deleteHistory());
      continue;
    }
    paidAmount = readline.question(' Enter Total of Received Amount: (or input \'Q\' to quit.) \x1b[92m€');
    console.log('\x1b[39m');
    if (paidAmount === '')
      continue;
    else if (paidAmount === 'r' || paidAmount === 'R') {
      console.log(openFile());
      continue;
    }
    else if (paidAmount.toString().toLowerCase() === 'del') {
      console.log(deleteHistory());
      continue;
    }
    if (paidAmount !== -1 && paidAmount !== 'Q' && paidAmount !== 'q') {
      const gc = getChange(price, paidAmount);
      console.log(`\x1b[40m${gc}\x1b[49m`);
      if (!(gc === '\x1b[91mInvalid input!\x1b[39m'))
        save(gc);
    }
  }

  async function playGoodbye() {
    console.log('\x1b[92m');
    const crop = goodbye[2].length / 2;
    console.log('\n'.repeat(31));
    const frames = goodbye.length;
    for (let i = 0; i < frames; i++) {
      console.log(goodbye[i].slice(crop));
      await new Promise(r => setTimeout(r, 100));
      console.clear();
    }
    console.log('\x1b[39m');
  }
  playGoodbye();
  console.log('\n ')
}
main();

function openFile(saveFile = 'Default.rcs') {
  return fs.readFileSync(saveFile, 'utf8');
}
function save(content, saveFile) {
  fs.appendFileSync(saveFile || 'Default.rcs', content || getChange(3.75, 50), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
function deleteHistory(saveFile = 'Default.rcs') {
  const answer = readline.question('/!\\Are you sure you want to delete all history?/!\\ (\'Yes\' | \'No\') \n');
  if (answer.toLowerCase().includes('yes')) {
    try {
      fs.writeFileSync(saveFile, '');
      return 'History Deleted Successfully.';
    } catch (err) {
      return err;
    }
  }
  else return 'Action Cancelled.'
}

// Examples:
// console.log(getChange(3.75, 50));
// console.log(getChange(4.50, 20));
// console.log(getChange(4, 3));

// console.log(getChange(23, 23));


// console.log(getChange('€65778.88', '€45698765,876'));
// console.log(getChange(0.32, 43));


// Examples (bonus):



// console.log(getChange('3.75', '50'));






// console.log(getChange('€4.50', '€20'));







// console.log(getChange('4Euros', '3Euros'));


// console.log(getChange(' Purriceo izzo 4 Euros pleazo ', ' this guyy paid me 500 EUROS. MAMMAMIAAAAA        !!! '));


// console.log(getChange('11131.12 EUR', '12000 EUR'));

// console.log(getChange('23,43', '23,99'));
