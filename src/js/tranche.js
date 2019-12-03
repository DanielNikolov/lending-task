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
        const parsedDate = moment(investmentDate, 'DD/MM/YYYY');
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
                timeStamp: parsedDate.valueOf(),
                periodStart: parsedDate.startOf('month').valueOf()
            };
        }
        this._userInvestments[userId].amount = this._userInvestments[userId].amount + amountToBeInvested;
        this._totalInvestedAmount += amountToBeInvested;
        return true;
    }

    /**
     * Calculates the user's interest based on interest rate, amount and period
     * @param {string} userId user identifier
     * @param {string} interestDateStr date of interest payment
     * @returns {number} interest amount
     */
    getUserInterest(userId, interestDateStr) {
        const userInvestment = this._userInvestments[userId];
        if (!userInvestment) {
            return 0.00;
        }
        let interestDate = moment(interestDateStr, 'DD-MM-YYYY');
        if (!interestDate.isValid()) {
            return 0.00;
        }
        interestDate = interestDate.startOf('month');
        const startPeriod = moment(userInvestment.timeStamp).startOf('month');
        if (interestDate.diff(startPeriod, 'm') < 1) {
            return 0.00;
        }
        const diffDays = interestDate.diff(moment(userInvestment.timeStamp), 'd');
        return ((userInvestment.amount * this._interestRate * diffDays) / interestDate.diff(startPeriod, 'd'));
    }
}