import React from "react";
import { isWindowsUndefined, Util, isNullOrEmpty, isNullOrUndefined } from "Services/Utility/Util";
import { RouteUrls } from "Services/Constants/RouteUrls";

export class StringUtil {

    static normalizeCurrency(value){
        if (!value) {
            return value;
        }
        const onlyNums = StringUtil.removeComma(value).replace(/[^\d]/g, '');
        return StringUtil.formatNumber(onlyNums);
    }

    static toCurrency(value, fixedNum) {
        value = (value > 0 ? value : 0);
        if (fixedNum > 0)
            return StringUtil.formatNumber('$' + value.toFixed(fixedNum).toString());
        else return StringUtil.formatNumber('$' + value.toFixed().toString());
    }
    static toCurrencyRemoveZeroDecimalPoint(value, fixedNum) {
        let currency = StringUtil.toCurrency(value, fixedNum);
        return currency.replace(".00", "");
    }
    static formatNumber(value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    static toBoolean(value) {
        if (!value)
            return false;

        return value.toLowerCase() === "true";
    }

    static removeComma(value) {
        if (isNullOrEmpty(value))
            return value;
        return value.replace(/,/g, '');
    }


    static stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }

    static getYearText(value) {
        if (value < 2)
            return value + " year";
        else return value + " years";
    }
    static renderMultipleItemsInColumn = (markups, size = 2) => {
        var arrays = [];
        while (markups.length > 0)
            arrays.push(markups.splice(0, size));
        return arrays.map((p, index) => StringUtil.renderSubItems(p, index));
    }
    static renderSubItems = (markup, index) => {
        return (<div className="row" key={index}>
            {markup}
        </div>
        );
    }

    static InsertHyphenbeforeCapitalLetters = (str) => {
        return str.replace(/([A-Z])/g, ' $1').trim().replace(' ', '-');
    }


}

