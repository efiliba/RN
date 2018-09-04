import Validator from "validator";
import { BadWords } from "Services/Utility/BadWords";
export class ValidationRules {
    
    static isEmail(value) {
        return Validator.isEmail(value);
    }

    static isValidPassword(value) {
        return Validator.isLength(value, { min: 8, max: undefined }) && Validator.matches(value, /(\d\D)|(\D\d)/);
    }

    static isPostcode(value) {
        return Validator.isLength(value, { min: 4, max: 4 }) && Validator.matches(value, /\d{4}/);
    }

    static isMedicareNumber(value) {
        if (!value)
            return false;

        return Validator.isLength(value, { min: 10, max: 10 }) && Validator.matches(value, /\d{10}/);
    }

    static isValidMedicareNumberChecksum(value) {
        let valid = false;

        const pattern = /^(\d{8})(\d)/;

        const matches = pattern.exec(value);
        if (matches && matches.length === 3) {
            const base = matches[1];
            const checkDigit = matches[2];
            const multipliers = [1, 3, 7, 9, 1, 3, 7, 9];
            let total = 0;

            for (let i = 0; i < multipliers.length; i++) {
                total += base[i] * multipliers[i];
            }

            valid = (total % 10) === Number(checkDigit);
        }

        return valid;
    }

    static isPrice(value) {
        return Validator.matches(value, /^\d{1,8}(\.\d{0,2})?$/);
    }
    static isPhoneNumber(value) {

        return Validator.matches(value, /\d{10}/);
    }

    static isValidDateFormat(value, dateFormat = null) {
        if (dateFormat === "MM/YYYY") {
            return Validator.matches(value, /^\d{2}\/\d{4}$/);
        }

        return Validator.matches(value, /^\d{2}\/\d{2}\/\d{4}$/);
    }

    static isNumber(value) {
        return Validator.matches(value, /^[1-9][0-9]?$|^100$/);
    }

    static isInteger(value, options) {
        return Validator.isInt(value, options);
    }

    static isAlphabetsOnly(value) {
        return Validator.matches(value, /^[a-zA-Z]*$/);
    }

    static isAlphabetsAndSpaceOnly(value) {
        return Validator.matches(value, /^[a-zA-Z\s]*$/);
    }
    static isAlphabetsNumberAndSpaceOnly(value) {
        return Validator.matches(value, /^[a-zA-Z0-9\s]*$/);
    }

    static isAlphabetsHyphenSpaceOnly(value) {
        return Validator.matches(value, /^[a-zA-Z\s\-]*$/);
    }

    static isAlphabetsHyphenOnly(value) {
        return Validator.matches(value, /^[a-zA-Z\-]*$/);
    }

    static isValidName(value) {
        return Validator.matches(value, /^[a-zA-Z'’‘\s\-]*$/);
    }

    static isLessThanLength(value, maxLength) {
        if (!value)
            return false;

        return Validator.trim(value).length <= maxLength;
    }

    static isAustralianPassportNumber(value) {
        return Validator.matches(value, /^[a-zA-Z0-9]{1,9}$/);
    }

    static isForeignPassportNumber(value) {
        return Validator.matches(value, /^[a-zA-Z0-9]{1,14}$/);
    }

    static isDrivingLicenceNumber(value) {
        return Validator.matches(value, /^[a-zA-Z0-9]{1,10}$/);
    }

    static validatePassword(value) {
        if (!value) {
            return "Password is required.";
        }

        if (!this.isValidPassword(value)) {
            return "Password must have at least 8 characters and have at least 1 number.";
        }
    }

    static isBadWords(value) {
        return BadWords.isProfaneLike(value);
    }

}