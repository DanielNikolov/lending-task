import Tranche from './tranche';

let tranche  = new Tranche(1000.00, 0.03);
if (tranche.tryInvest('user1', '03/10/2015', 500)) {
    console.log(tranche);
}