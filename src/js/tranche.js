import moment from 'moment';

export default class Tranche {
    constructor(maxAmount, interestRate) {
        this._maxAmount = maxAmount;
        this._interestRate = interestRate;
        this._userInvestments = {};
        this._totalInvestedAmount = 0.00;
    }

    /**
     * Adds user's investment to the tranche.
     * @param {string} userId user identifier
     * @param {string} investmentDate date of the investment (the first investment)
     * @param {number} amountToBeInvested amount to be invested
     * @returns {boolean} true if investment is accepted, otherwise false
     */
    tryInvest(userId, investmentDate, amountToBeInvested) {
        let parsedDate = moment(investmentDate, 'DD/MM/YYYY');
        if (!parsedDate.isValid()) {
            return false;
        }
        if (amountToBeInvested < 0 ||
            (this._totalInvestedAmount + amountToBeInvested > this._maxAmount)) {
            return false;
        }
        if (!this._userInvestments[userId]) {
            this._userInvestments[userId] = {
                amount: 0.00,
                timestamp: parsedDate.valueOf()
            };
        }
        this._userInvestments[userId].amount = this._userInvestments[userId].amount + amountToBeInvested;
        return true;
    }

    getUserInterest(userId) {
        if (!this._userInvestments[userId]) {
            return 0.00;
        }
    }

}