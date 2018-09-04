import { BaseActions } from "../Base/BaseActions";
import QueryString from "query-string";
import { StateProperty } from "Services/Data/Models/StateProperty";
import { StatePropertyDictionary } from "Services/Data/Models/StatePropertyDictionary";
export class MemberActions extends BaseActions {
    constructor() {
        super();
    }

    _getLoginActionDefinition(url) {
        return super.getSuccessActionDefition(url, "loginInfo");
    }

    login = () => {
        return this._getLoginActionDefinition("/api/account/login");
    }

    socialLogin = () => {
        return this._getLoginActionDefinition("/api/social/login");
    }

    getLoginInfo = () => {
        return this._getLoginActionDefinition("/api/account/loginInfo");
    }

    verifyEmail() {
        const url = "/api/member/verify-email";
        return super.getSuccessActionDefition(url, "verifyEmail");
    }

    verifyExistEmail() {
        const url = "/api/member/verify-exist-email";
        return super.getSuccessActionDefition(url, "verifyExistEmail");
    }

    logout() {
        const url = "/api/account/logout";
        return super.getSuccessActionDefition(url, "LOG_OUT");
    }

    clearToken() {
        return super.getSuccessActionDefition(null, "token");
    }

    saveToken() {
        return super.getSuccessActionDefition(null, "token");
    }

    getCreditScore() {
        const url = "/api/member/score-info";
        return super.getSuccessActionDefition(url, "scoreInfo");
    }

    register() {
        const url = "/api/account/register";
        return super.getSuccessActionDefition(url, "register");
    }

    forgotPassword() {
        const url = "/api/account/forgot-password";
        return super.getSuccessActionDefition(url, "forgotPassword");
    }

    resetPassword() {
        const url = "/api/account/reset-password";
        return super.getSuccessActionDefition(url, "resetPassword");
    }

    getProfile() {
        const url = "/api/member/profile";
        return super.getSuccessActionDefition(url, "profile");
    }

    getDashboardProducts(type, options) {
        const url = `/api/${type}?${QueryString.stringify(options)}`;
        return super.getSuccessActionDefition(url, "dashboardProducts");
    }

    getDashboardFeaturedProducts() {
        const url = "/api/member/dashboard-featured-products";
        return super.getSuccessActionDefition(url, "dashboardFeaturedProducts");
    }

    verifyPrimaryId() {
        const url = "/api/Signup/VerifyUser";

        return super.getSuccessActionDefition(url, "verifyMember");
    }

    saveNotUsableIdentification() {
        return super.getSuccessActionDefition(null, "notUsableIdentifications");
    }

    getNotifications() {
        const url = "/api/Member/Notifications";
        return super.getSuccessActionDefition(url, "notifications");
    }

    getDashboardPreferredProduct() {
        const url = "/api/Member/preferred-product?includeBusinessLoans=false";
        return super.getSuccessActionDefition(url, "dashboardPreferredProduct");
    }

    getComparePreferredProduct() {
        const url = "/api/Member/preferred-product?includeBusinessLoans=true";
        return super.getSuccessActionDefition(url, "comparePreferredProduct");
    }
    
    getCountries() {
        const url = "/api/Signup/GetCountries";
        return super.getSuccessActionDefition(url, "countries");
    }

    getMemberProfile() {
        const url = "/api/member/profile";
        return super.getSuccessActionDefition(url, "profile");
    }

    getCreditIndex() {
        const url = "/api/member/credit-index";
        return super.getSuccessActionDefition(url, "creditIndex");
    }
   

    getCreditIndexByPostcode (postcode) {
        return super.getSuccessActionDefition(`/api/member/credit-index-postcode/${postcode}`, "postcodeCreditIndex");
    }

    getTotalScoreRetrived() {
        const url = "/api/member/total-score-retrived";
        return super.getSuccessActionDefition(url, "totalScoreRetrived");
    }

    saveProductPreference() {
        const url = "/api/member/product-preference";
        return super.getSuccessActionDefition(url, "productPreference");
    }
    saveLastProductType() {
        const url = "/api/member/update-last-product-type";
        return super.getSuccessActionDefition(url, "lastProductType");
    }



    getProductPreference() {
        const url = "/api/member/product-preference";
        return super.getSuccessActionDefition(url, "productPreference");
    }
 
    saveQuestionType() {
        return super.getSuccessActionDefition(null, "questionType");
    }

  


    saveShowQuestionnaireFinish() {
        return super.getSuccessActionDefition(null, "showQuestionnaireFinish");
    }

    checkIfExistingSocialUser(externalAccessToken, provider) {
        const url = `/api/Social/Exists?externalAccessToken=${externalAccessToken}&provider=${provider}`;
        return super.getSuccessActionDefition(url, "existingSocialUser");
    }

    linkSocialAccount() {
        const url = "/api/social/link";
        return super.getSuccessActionDefition(url, "linkSocialAccount");
    }

    createSocialAccount() {
        const url = "/api/social/create";
        return super.getSuccessActionDefition(url, "createSocialAccount");
    }

    getReferralDetails() {
        const url = "/api/referral/details";
        return super.getSuccessActionDefition(url, "referralDetails");
    }

    sendReferFriendsEmail() {
        const url = "/api/referral/sendEmail";
        return super.getSuccessActionDefition(url, "sendReferEmail");
    }


    saveProductRating(key) {
        const url = `/api/member/rate-product/${key}`;
        return super.getSuccessActionDefition(url, "productRating");
    }

    getProductRating(key) {
        const url = `/api/member/rate-product/${key}`;
        return super.getSuccessActionDefition(url, "productRating");
    }

    deleteAccount()
    {
        return super.getSuccessActionDefition("/api/member/delete-account", "deleteAccountReason");
    }

    resendVerificationEmail() {
        const url = `/api/account/resend-email`;
        return super.getSuccessActionDefition(url, "resendVerificationEmail");
    }


    changeAddress() {
        return super.getSuccessActionDefition("/api/member/Address", "settings");
    }

    resetSettingPassword() {
        return super.getSuccessActionDefition("/api/member/settings/password", "settingPassword");
    }
    resetSettingEmail() {
        return super.getSuccessActionDefition("/api/member/settings/email", "settingEmail");
    }
    resetSettingNickname() {
        return super.getSuccessActionDefition("/api/member/settings/nickname", "settingNickname");
    }
    getMemberNotificationSettings() {
        return super.getSuccessActionDefition("/api/member/settings/notifications", "notificationSettings");
    }

    saveMemberNotificationSettings() {
        return super.getSuccessActionDefition("/api/member/settings/notifications", "notificationSettings");
    }

    getMemberSettings() {
        return super.getSuccessActionDefition("/api/member/settings", "settings");
    }

    savePartnerWithUs() {
        return super.getSuccessActionDefition("/api/partner-with-us", "partnerWithUs");
    }

    postAcceptTerms() {
        return super.getSuccessActionDefition("/api/member/accept-terms", "acceptTerms");
    }

    getMemberEmailSettings(memberId, token) {
        const url = `/api/member/${memberId}/notification/${token}`;
        return super.getSuccessActionDefition(url, "emailSettings");
    }

    saveMemberEmailSettings(memberId, token) {
        const url = `/api/member/${memberId}/notification/${token}`;
        return super.getSuccessActionDefition(url, "saveEmailSettings");
    }

  

    getAdAttribute() {
        const url = "/api/member/ad-attribute";
        return super.getSuccessActionDefition(url, "adAttribute");
    }
    updateLastNotificationViewed() {
        const url = "/api/member/update-last-notification-viewed";
        return super.getSuccessActionDefition(url, "lastNotificationViewed");
    }

    updateLastReportViewed() {
        const url = "/api/member/update-last-report-viewed";
        return super.getSuccessActionDefition(url, "lastReportViewed");
    }

    getNewInReport() {
        const url = "/api/member/new-in-report";
        return super.getSuccessActionDefition(url, "newInReport");
    }

    saveProductToEmail() {
        const url = `/api/member/save-product-to-email`;
        return super.getSuccessActionDefition(url, "saveProductToEmail");
    }

   saveShortlistToEmail() {
       return super.getSuccessActionDefition("/api/member/save-shortlist-to-email", "saveShortlistToEmail");
    }

    getEmailSnoozeExpiry() {
        const url = `/api/member/snooze-expiry`;
        return super.getSuccessActionDefition(url, "emailSnoozeExpiry");
    }

    saveEmailSnoozeExpiry() {
        const url = `/api/member/save-snooze-expiry`;
        return super.getSuccessActionDefition(url, "emailSnoozeExpiry");
    }


    clearObj(objName) {
        const actionDefinition = super.getSuccessActionDefition(null, "clearObj");

        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, objName)) {
                return state;
            }
            if (objName === "products")
                return super.updateState(state, {
                    [objName]: new StatePropertyDictionary()
                });
            else 
            return super.updateState(state, {
                [objName]: new StateProperty()
            });
        };
        return actionDefinition;
    }

    addMemberAnswer() {
        const url = "/api/member/add-answer";
        return super.getSuccessActionDefition(url, "addAnswer");
    }

    getMemberAnswers() {
        const url = "/api/member/answer-list";
        return super.getSuccessActionDefition(url, "answerList");
    }

    getAllQuizzes() {
        const url = "/api/member/quiz-list";
        return super.getSuccessActionDefition(url, "quizList");
    }

    addToMemberAnswerList() {
        const actionDefinition = super.getSuccessActionDefition(null, "addToMemberAnswerList");

        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "answerList")) {
                return state;
            }

            const answer = action.payload;
            let answerList;

            if (!state.answerList.data) {
                answerList = [];
            } else {
                answerList = [...state.answerList.data];
            }

            //this will remove the product if it was already shortlisted
            const filteredAnswerList = answerList.filter((item) => item.QustionId !== answer.QuestionId);

            //if nothing was removed, then it means we're adding the product to shortlist
            if (filteredAnswerList.length === answerList.length) {
                filteredAnswerList.push(answer);
            }

            return super.updateState(state, {
                answerList: new StateProperty(filteredAnswerList, state.answerList.isLoading)
            });
        };

        return actionDefinition;
    }

    removeFromMemberAnswerList() {
        const actionDefinition = super.getSuccessActionDefition(null, "removeFromMemberAnswerList");

        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "answerList")) {
                return state;
            }
            const values = action.payload;
            let answerList;

            if (!state.answerList.data) {
                answerList = [];
            } else {
                answerList = [...state.answerList.data];
            }
            let filteredAnswerList = answerList.reduce(function (acc, curr) {
                if (!values.includes(curr.QuestionId))
                    acc.push(curr);
                return acc;                  
            }, []);
            return super.updateState(state, {
                answerList: new StateProperty(filteredAnswerList, state.answerList.isLoading)
            });
        };
        return actionDefinition;
    }
    refreshNewInNotification() {
        const actionDefinition = super.getSuccessActionDefition(null, "refreshNewInNotification"); 
        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "notifications")) {
                return state;
            }           
            let notifications;
            if (!state.notifications.data ) {
                notifications = {};
            } else {
                notifications = state.notifications.data;
            }
            if (notifications.MergedNotifications && notifications.MergedNotifications.length > 0) {
                notifications.MergedNotifications = notifications.MergedNotifications.reduce((acc, curr) => {
                    curr.IsNew = false;
                    acc.push(curr);
                    return acc;
                }, []);     
            }
            return super.updateState(state, {
                notifications: new StateProperty(notifications, state.notifications.isLoading)
            });
        };
        return actionDefinition;
    }
    refreshNewInReport() {
        const actionDefinition = super.getSuccessActionDefition(null, "refreshNewInReport");
        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "newInReport")) {
                return state;
            }
            let newInReport;
            if (!state.newInReport.data) {
                newInReport = {};
            } else {
                newInReport = state.newInReport.data;
            }
            newInReport.NewInAccounts = false;
            newInReport.NewInEnquiries = false;
            newInReport.NewInNegativeEvents = false;
            newInReport.NewInRepayments = false;
            newInReport.ReportActivitieCount = 0;

            return super.updateState(state, {
                newInReport: new StateProperty(newInReport, state.newInReport.isLoading)
            });
        };
        return actionDefinition;
    }

    updateNicknameInSettings() {
        const actionDefinition = super.getSuccessActionDefition(null, "updateNicknameInSettings");

        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "settings")) {
                return state;
            }
            const values = action.payload;
            let settings;

            if (!state.settings.data) {
                settings = {};
            } else {
                settings = state.settings.data;
            }
            settings.Nickname = values;

            return super.updateState(state, {
                settings: new StateProperty(settings, state.settings.isLoading)
            });
        };
        return actionDefinition;
    }

    updateNicknameInLoginInfo() {
        const actionDefinition = super.getSuccessActionDefition(null, "updateNicknameInLoginInfo");

        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "loginInfo")) {
                return state;
            }
            const values = action.payload;
            let loginInfo;

            if (!state.loginInfo.data) {
                loginInfo = {};
            } else {
                loginInfo = state.loginInfo.data;
            }
            loginInfo.data.Nickname = values;

            return super.updateState(state, {
                loginInfo: new StateProperty(loginInfo, state.settings.isLoading)
            });
        };
        return actionDefinition;
    }

    getPersonalLoanQuote() {
        return super.getSuccessActionDefition("/api/personal-loans/quote", "personalLoanQuote");
    }

    savePersonalLoanEnquiry() {
        return super.getSuccessActionDefition("/api/personal-loans/enquiry", "personalLoanEnquiry");
    }
}