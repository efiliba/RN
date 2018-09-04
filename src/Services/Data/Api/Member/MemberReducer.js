import { ConvertAuthErrorCode } from "../../../Utility/Util";
import {StateProperty} from "../../Models/StateProperty";

const initialMemberState = {
    token: new StateProperty(),
    loginInfo: new StateProperty(),
    scoreInfo: new StateProperty(),
    verifyMember: new StateProperty(),
    notUsableIdentifications: new StateProperty(),
    countries: new StateProperty(),
    profile: new StateProperty(),
    dashboardProducts: new StateProperty(),
    creditIndex: new StateProperty(),
    postcodeCreditIndex: new StateProperty(),
    totalScoreRetrived: new StateProperty(),
    register: new StateProperty(),
    productPreference: new StateProperty(),
    questionType: new StateProperty(),
    showQuestionnaireFinish: new StateProperty(),
    settings: new StateProperty(),
    notificationSettings: new StateProperty(),
    notifications: new StateProperty(),
    acceptTerms: new StateProperty(),
    productRating: new StateProperty(),
    partnerWithUs: new StateProperty(),
    lastNotificationViewed: new StateProperty(),
    saveProductToEmail: new StateProperty(),
    saveShortlistToEmail: new StateProperty(),
    lastReportViewed: new StateProperty(),
    lastProductType: new StateProperty(),
    newInReport: new StateProperty(),
    interactions: {
        creditHistoryMonths: 6,
        compareRankBy: "Country",
        subCompareRankBy: "Country",
    },

    forgotPassword: new StateProperty(),
    resetPassword: new StateProperty(),
    settingPassword: new StateProperty(),
    settingEmail: new StateProperty(),
    settingNickname: new StateProperty(),
    existingSocialUser: new StateProperty(),
    verifyEmail: new StateProperty(),
    verifyExistEmail: new StateProperty(),
    referralDetails: new StateProperty(),
    sendReferEmail: new StateProperty(),
    deleteAccountReason: new StateProperty(),
    resendVerificationEmail: new StateProperty(),
    emailSettings: new StateProperty(),
    saveEmailSettings: new StateProperty(),
    dashboardPreferredProduct: new StateProperty(),
    comparePreferredProduct: new StateProperty(),
    dashboardFeaturedProducts: new StateProperty(),
    adAttribute: new StateProperty(),
    linkSocialAccount: new StateProperty(),
    createSocialAccount: new StateProperty(),
    emailSnoozeExpiry: new StateProperty(),

    addAnswer: new StateProperty(),
    answerList: new StateProperty(),
    quizList: new StateProperty(),
    localAnswerList: new StateProperty(),
    personalLoanQuote: new StateProperty(),
    personalLoanEnquiry: new StateProperty()
}

const MemberReducer = function (state = initialMemberState, action) {
    //console.log(action);

    if (action.actionDefinition !== undefined) {
        return action.actionDefinition.reducer(action, state);
    }

    switch (action.type) {  

        case "CREDITHISTORY_MONTHS_CHANGED":
            return Object.assign({}, state, {
                interactions: Object.assign({}, state.interactions, {
                    creditHistoryMonths: action.payload
                })
        });

        case "RANK_BY_CHANGED":
            return Object.assign({}, state, {
                interactions: Object.assign({}, state.interactions, {
                    compareRankBy: action.payload
                })
            });
        case "RANK_BY_CHANGED_SUB":
            return Object.assign({}, state, {
                interactions: Object.assign({}, state.interactions, {
                    subCompareRankBy: action.payload
                })
            });

      
        
    }

    return state;
}

export default MemberReducer;