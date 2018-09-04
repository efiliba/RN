import Raven from "raven-js";

export class Logger {

    static isRavenDefined() {
        return Raven.isSetup();
    }

    static setContext(data) {
        if (this.isRavenDefined()) {
            Raven.setUserContext({
                id: data.UserId
            });
        }
    }

    static removeContext() {
        if (this.isRavenDefined()) {
            Raven.setUserContext();
        }
    }

    static logError(error, extraInfo) {
        if (this.isRavenDefined()) {
            Raven.captureException(error, { extra: extraInfo });
        } else {
            console.error(error, extraInfo);
        }
    }
}