export class Util {
    static isEmptyString(value) {
        if (this.isNullOrUndefined(value)) {
            return true;
        }

        return value.trim() === "";
    }

    static isRelativeUrl(value) {
        return value && value.startsWith("/");
    }

    static isNullOrUndefined(value) {
        return value === null || value === undefined;
    }

    static getCurrentUrl() {
        if (!this.isWindowDefined()) {
            return null;
        }

        return window.location.pathname;
    }

    static isWindowDefined() {
        return typeof window !== "undefined";
    }
    static isLocalStorageDefined() {
        return typeof localStorage  !== "undefined";
    }
}


export function ConvertAuthErrorCode(errorCode) {
    switch (errorCode) {
        case "user_not_found":
            return "There is no such user in our database";
        default:
            return errorCode;
    }
}

export function GetSocialLoginUrl(provider) {    
    return "/social/login?provider=" + provider;
}

/**
 * Given a grade value, convert it into a hex colour code
 * @param {any} gradeValue
 */
export function convertGradeToHEX(gradeValue) {
    switch (gradeValue) {
        case 1: return "#bf4167";
        case 2: return "#e17514";
        case 3: return "#e6b44c";
        case 4: return "#009478";
        case 5: return "#0c863c";
        default:
            return "#fff";
    }
}

export function isWindowsUndefined() {
    return  typeof window === 'undefined';
}
export function isNullOrUndefined(value) {
    return value === null || value === undefined || typeof value === 'undefined';
}

export function isNullOrEmpty(value) {
    return isNullOrUndefined(value) || value === '';
}
export function isNumberLargeThanZero(value) {
    return !isNullOrUndefined(value) && value >= 0;
}


export function filterList(source, callback) {
    if (isNullOrUndefined(source)) {
        return [];
    }

    return source.filter(callback);
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    // If we get a 401, redirect to login
    //else if (response && (response.status === 401 || response.statusText === "Unauthorized")) {
    //    console.log("Failed login", response);
    //    // Logout and redirect to Login/Timeout
    //    //browserHistory.push('/beta/login');

    //}
    else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

/**
 * Use this for formatting Content Article text
 * @param {any} content
 */
export function parseContentHtml(content) {
    if (content === null || content === undefined) {
        return content;
    }

    // Replace all of the Angular directives with their corresponding tags
    // We'll only handle calculators at this point
    return content
        .replace("<borrowing-power-calculator></borrowing-power-calculator>",
            '<iframe id="calcIframe" src="/calculators/borrowing_power.htm" width="100%" height="1230px" frameBorder="0" scrolling="no"></iframe>')
        .replace("<honeymoon-calculator></honeymoon-calculator>",
            '<iframe id="calcIframe" src="/calculators/honeymoon.htm" width="100%" height="1230px" frameBorder="0" scrolling="no"></iframe>')
        .replace("<loan-comparison-calculator></loan-comparison-calculator>",
            '<iframe id="calcIframe" src="/calculators/loan_comparison.htm" width="100%" height="1230px" frameBorder="0" scrolling="no"></iframe>')
        .replace("<loan-repayment-calculator></loan-repayment-calculator>",
            '<iframe id="calcIframe" src="/calculators/loan_repayment.htm" width="100%" height="1230px" frameBorder="0" scrolling="no"></iframe>')
        .replace("<personal-loan-calculator></personal-loan-calculator>",
            '<iframe id="calcIframe" src="/calculators/personal_loan.htm" width="100%" height="1230px" frameBorder="0" scrolling="no"></iframe>');
}

export function trimContentToLength(text, length) {
    return text.length > length ? text.substring(0, length) + "..." : text;
}

export function arrayContains(haystack, needle, comparisonFn) {
    for (var i = 0; i < haystack.length; i++) {
        if (comparisonFn(haystack[i], needle)) {
            return true;
        }
    }
    return false;
}

