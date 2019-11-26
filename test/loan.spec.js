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
        assert.equal(loan.invest('user 1', 600, '30/13/2015', 'A'), false);
    })

    it('test - invalid loan dates - before', () => {
        assert.equal(loan.invest('user 1', 600, '30/09/2015', 'A'), false);
    })

    it('test - invalid tranche id', () => {
        assert.equal(loan.invest('user 1', 600, '30/09/2015', 'X'), false);
    })

    it('test - invalid loan dates - after', () => {
        assert.equal(loan.invest('user 1', 600, '16/11/2015', 'A'), false);
    })

    it('test - valid loan dates', () => {
        assert.equal(loan.invest('user 1', 600, '1/11/2015', 'A'), true);
    })

    it('test - invalid interest date - before start', () => {
        loan.invest('user 1', 1000, '1/11/2015', 'A');
        assert.equal(loan.getInterest('user 1', '1/10/2015', 'A'), 0.00);
    })

    it('test - valid interest date', () => {
        loan.invest('user 1', 600, '03/10/2015', 'A');
        assert.equal(loan.getInterest('user 1', '1/11/2015', 'A').toFixed(2), '16.84');
    })

    it('test - invalid interest date - before end', () => {
        loan.invest('user 1', 600, '03/10/2015', 'A');
        assert.equal(loan.getInterest('user 1', '31/10/2015', 'A'), 0.00);
    })

    it('test - invalid interest date', () => {
        loan.invest('user 1', 600, '03/10/2015', 'A');
        assert.equal(loan.getInterest('user 1', '31/13/2015', 'A'), 0.00);
    })

    it('test - invalid user id', () => {
        loan.invest('user 1', 600, '03/10/2015', 'A');
        assert.equal(loan.getInterest('user 2', '1/11/2015', 'A'), 0.00);
    })
})