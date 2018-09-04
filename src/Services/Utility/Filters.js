
//
// Filter functions to be used in the formatting of text/values
//
export function formatDateSimple(dateText) {
    var date = new Date(dateText);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + '-' + monthIndex + '-' + year;
}


export function formatMonthsIntToString(value) {
    if (!value) {
        return "-";
    }
    if (value  > 12) {
        var years = value / 12;
        return formatToDecimalPlace(years, 1) + " year" + (years !== 1 ? "s" : "")
    }
    else {
        return formatToDecimalPlace(value, 1) + " month" + (value !== 1 ? "s" : "")
    }
}


export function formatToDecimalPlace(value, decimalPlaces = 2) {
    if (value > 0)
        return parseFloat(Math.round(value * 100) / 100).toFixed(decimalPlaces);
    else return "0";
}
export function formatRemoveZeroDecimalPlace(value, decimalPlaces = 2) {
    return formatToDecimalPlace(value, decimalPlaces).replace(".00", "");
}


export function formatPositiveCurrency(value) {
    return "$" + (value > 0 ? value : 0);
}

