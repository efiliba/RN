import { StateProperty } from "../../Models/StateProperty";

export class MemberHelper {
    static isAuthenticated(state) {
        return StateProperty.isLoaded(state.member.token) && !this.hasTokenExpired(state.member.token.data);
    }

    static isVerified(state) {
        if (!this.isAuthenticated(state)) {
            return false;
        }

        if (!StateProperty.isLoaded(state.member.loginInfo)) {
            return false;
        }

        const loginInfo = state.member.loginInfo.data.data;
        return loginInfo.MembershipState > 4;
    }

    static getTokenExpiry(token) {
        const expiryInMilliSeconds = new Date(token.expires).getTime();
        const currentTimeInMilliSeconds = new Date().getTime();
        const timeRemaining = expiryInMilliSeconds - currentTimeInMilliSeconds;

        return timeRemaining;
    }

    static hasTokenExpired(token) {
        const timeRemaining = this.getTokenExpiry(token);

        return timeRemaining <= 0;
    }
}