import moment from 'moment';
import Tranche from './tranche';

export default class Loan {
    constructor(startDate, endDate) {
        this._startDate = moment(startDate, 'DD-MM-YYYY').valueOf();
        this._endDate = moment(endDate, 'DD-MM-YYYY').valueOf();
        this._tranches = {
            'A': new Tranche(1000, 0.03),
            'B': new Tranche(1000, 0.06)
        }
    }

    /**
     * Invest user's money in a specified tranche
     * @param {string} userId user identifier
     * @param {number} amount amount to be invested
     * @param {string} date date of investment
     * @param {string} trancheId tranch id to be used for investing
     * @returns {boolean} true if investment passes fine, otherwise false
     */
    invest(userId, amount, date, trancheId) {
        const tranche = this._tranches[trancheId];
        if (!tranche) {
            return false;
        }
        const timeStamp = moment(date, 'DD-MM-YYYY');
        if (!timeStamp.isValid()) {
            return false;
        }
        if (timeStamp < this._startDate || timeStamp > this._endDate) {
            return false;
        }
        const result = tranche.tryInvest(userId, date, amount);
        this._tranches[trancheId] = tranche;
        return result;
    }

    /**
     * Get interest for user on specific date
     * @param {string} userId user identifier
     * @param {string} date date for the interest to be paid
     * @returns {number} interest to be paid
     */
    getInterest(userId, date) {
        let arrayTranches = Object.values(this._tranches);
        return arrayTranches.reduce((total, element) => total + element.getUserInterest(userId, date), 0);
    }
}