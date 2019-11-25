import assert from 'assert';
import Loan from '../src/js/loan';

let loan;

describe('Loan', function () {
    this.beforeEach(() => {
        loan = new Loan('01/10/2015', '15/11/2015');
    })

    this.afterEach(() => {
        loan = null;
    })

    it('test - invalid loan dates', () => {
        assert.equal(loan.invest('user 1', 600, '30/09/2015', 'A'), false);
    })
})