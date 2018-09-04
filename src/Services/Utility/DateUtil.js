import Moment from "moment";

export class DateUtil {

    static getCurrentMoment() {
        return Moment();
    }

    static getMoment(dateString, format = "DD/MM/YYYY") {
        return Moment(dateString, format);
    }

    static isMomentValid(moment) {
        return moment.isValid();
    }

    static isDateValid(dateString, format = "DD/MM/YYYY") {
        const moment = this.getMoment(dateString, format);
        return this.isMomentValid(moment);
    }

    static isPastMoment(sourceMoment) {
        return this.isBeforeYears(sourceMoment, 0);
    }

    static isBeforeYears(sourceMoment, numberOfYears) {
        return sourceMoment.isBefore(this.subtractYearsFromCurrent(numberOfYears));
    }

    static isAfterYears(sourceMoment, numberOfYears) {
        return sourceMoment.isAfter(this.addYearsToCurrent(numberOfYears));
    }

    static addYearsToCurrent(numberOfYears) {
        return this.addYears(this.getCurrentMoment(), numberOfYears);
    }

    static subtractYearsFromCurrent(numberOfYears) {
        return this.subtractYears(this.getCurrentMoment(), numberOfYears);
    }

    static addYears(sourceMoment, numberOfYears) {
        return sourceMoment.add(numberOfYears, "years");
    }

    static subtractYears(sourceMoment, numberOfYears) {
        return sourceMoment.subtract(numberOfYears, "years");
    }

    static parseDate(dateString, formatString = "DD MMMM YYYY") {
        if (dateString) {
            return Moment(dateString).format(formatString);
        }

        return "";
    }

    static parseShortDate(dateString) {
        return this.parseDate(dateString, "DD/MM/YY");
    }

    static daydiff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
}

