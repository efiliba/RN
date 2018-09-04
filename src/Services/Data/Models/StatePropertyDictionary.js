export class StatePropertyDictionary {
    constructor() {

    }

    static getItem = (items, key) => {
        return items[StatePropertyDictionary.sanitizeKey(key)];
    }

    //aim is to remove characters that may not be valid in JS variable
    //also try to make them easy to read
    static sanitizeKey = (key) => {
        //lowercase firt character and replace anything non alphabet except hyphen(-)
        //replace forward slash(/) with _
        const result = key.replace(/(\b)\w/, x => x.toLowerCase()).replace(/(\/)/g, "_").replace(/[^a-zA-Z_\-]/g, "");

        //remove hyphen and upper case the following character. Example: my-name becomes myName
        return result.replace(/(-)\w/g, l => l.toUpperCase().replace("-", ""));
    }
}