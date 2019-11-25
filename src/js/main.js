import Loan from './loan';

let loan  = new Loan('01/10/2015', '15/11/2015');
console.log('Investing 1000.00 by Investor 1 on 03/10/2015');
console.log(`Investment result (true/false): ${loan.invest('user 1', 1000, '03/10/2015', 'A')}`);
console.log('Investing 1.00 by Investor 2 on 04/10/2015');
console.log(`Investment result (true/false): ${loan.invest('user 2', 1, '04/10/2015', 'A')}`);
console.log('Investing 500.00 by Investor 3 on 10/10/2015');
console.log(`Investment result (true/false): ${loan.invest('user 3', 500, '10/10/2015', 'B')}`);
console.log('Investing 1100.00 by Investor 4 on 25/10/2015');
console.log(`Investment result (true/false): ${loan.invest('user 4', 1100, '25/10/2015', 'B')}`);

console.log(`Interest for Investor 1 on 01/11/2015: ${loan.getInterest('user 1', '01/11/2015').toFixed(2)}`);
console.log(`Interest for Investor 2 on 01/11/2015: ${loan.getInterest('user 2', '01/11/2015').toFixed(2)}`);
console.log(`Interest for Investor 3 on 01/11/2015: ${loan.getInterest('user 3', '01/11/2015').toFixed(2)}`);
console.log(`Interest for Investor 4 on 01/11/2015: ${loan.getInterest('user 4', '01/11/2015').toFixed(2)}`);
