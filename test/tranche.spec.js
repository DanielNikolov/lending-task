import assert from 'assert';
import Tranche from '../src/js/tranche';

let tranche;

describe('Tranche', function () {
    this.beforeEach(() => {
        tranche = new Tranche(1000, 0.03);
    })

    this.afterEach(() => {
        tranche = null;
    })

    it('test - invalid investment date', () => {
        assert.equal(tranche.tryInvest('user 1', '12/13/2015', 600), false);
    })

    it('test - investment amounts', () => {
        assert.equal(tranche.tryInvest('user 1', '03/10/2015', 1001), false);
        assert.equal(tranche.tryInvest('user 1', '03/10/2015', 600), true);
        assert.equal(tranche.tryInvest('user 1', '03/10/2015', 402), false);
    })

    it('test - get interest', () => {
        assert.equal(tranche.tryInvest('user 1', '03/10/2015', 1000), true);
        assert(tranche.getUserInterest('user 2', '01/11/2015') < 1);
        assert(tranche.getUserInterest('user 2', '01/13/2015') < 1);
        assert(tranche.getUserInterest('user 2', '29/10/2015') < 1);
        assert(tranche.tryInvest('user 1', '01/11/2015') > 0);
    })
})