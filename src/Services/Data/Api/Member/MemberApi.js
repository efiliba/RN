import { BaseApi } from "../Base/BaseApi";
import { MemberActions } from "./MemberActions";

export class MemberApi extends BaseApi {
    constructor() {
        super();
        this.memberActions = new MemberActions();
   }

    _login(actionDefinition, value, callback) {
        super.sendPostRequest(actionDefinition, value, callback);        
    }

    login = (value, callback) => {
        this._login(this.memberActions.login(), value, callback, false);
    }

    socialLogin = (value, callback) => {
        this._login(this.memberActions.socialLogin(), value, callback);
    }

    getLoginInfo = (callback) => {
        super.sendGetRequest(this.memberActions.getLoginInfo(), callback);
    }

    verifyEmail(token) {
        super.sendPostRequest(this.memberActions.verifyEmail(), token);
    }

    verifyExistEmail(token,emailId) {
        super.sendPostRequest(this.memberActions.verifyExistEmail(), { token, emailId });
    }

    logout() {
        super.sendGetRequest(this.memberActions.logout());
        super.sendLocalRequest(this.memberActions.clearToken());
    }

    saveToken(token) {
        super.sendLocalRequest(this.memberActions.saveToken(), token);
    }

    register = (value) => {
        super.sendPostRequest(this.memberActions.register(), value);
    }

    forgotPassword = (value) => {
        super.sendPostRequest(this.memberActions.forgotPassword(), value);
    }

    resetPassword = (value) => {
        super.sendPostRequest(this.memberActions.resetPassword(), value);
    }

    getProfile() {
        super.sendGetRequest(this.memberActions.getProfile());
    }

    getCreditScore(callback) {
        super.sendGetRequest(this.memberActions.getCreditScore(), callback);
    }

    getDashboardProducts(type, options) {
        super.sendGetRequest(this.memberActions.getDashboardProducts(type, options));
    }

    getDashboardFeaturedProducts() {
        super.sendGetRequest(this.memberActions.getDashboardFeaturedProducts());
    }

    saveNotUsableIdentification(type) {
        super.sendLocalRequest(this.memberActions.saveNotUsableIdentification(), type);
    }

    verifyPrimaryId(value) {
        super.sendPostRequest(this.memberActions.verifyPrimaryId(), value);
    }

    getNotifications() {
        super.sendGetRequest(this.memberActions.getNotifications());
    }

    getDashboardPreferredProduct(callback) {
        super.sendGetRequest(this.memberActions.getDashboardPreferredProduct(), callback);
    }

    getComparePreferredProduct(callback) {
        super.sendGetRequest(this.memberActions.getComparePreferredProduct(), callback);
    }

    getCountries() {
        super.sendGetRequest(this.memberActions.getCountries());
    }

    getMemberProfile() {
        super.sendGetRequest(this.memberActions.getMemberProfile());
    }

    getCreditIndex() {
        super.sendGetRequest(this.memberActions.getCreditIndex());
    }

   
    getCreditIndexByPostcode = (postcode) => {
        super.sendGetRequest(this.memberActions.getCreditIndexByPostcode(postcode));
    }


    getTotalScoreRetrived() {
        super.sendGetRequest(this.memberActions.getTotalScoreRetrived());
    }

    saveProductPreference = (value, callback) => {
        super.sendPutRequest(this.memberActions.saveProductPreference(), value, callback);
        this.saveQuestionType("");
    }
    saveLastProductType = (value) => {
        super.sendPutRequest(this.memberActions.saveLastProductType(), { PreferredProductType:value});
       
    }



    postAcceptTerms() {
        super.sendPostRequest(this.memberActions.postAcceptTerms());
      
    }

    saveQuestionType = (value) => {
        super.sendLocalRequest(this.memberActions.saveQuestionType(), value);
    }
    saveShowQuestionnaireFinish = (value) => {
        super.sendLocalRequest(this.memberActions.saveShowQuestionnaireFinish(), value);
    }

    getProductPreference = (callback) => {
        super.sendGetRequest(this.memberActions.getProductPreference(), callback);
    }

    checkIfExistingSocialUser(externalAccessToken, provider, callback) {
        super.sendGetRequest(this.memberActions.checkIfExistingSocialUser(externalAccessToken, provider), callback);
    }

    linkSocialAccount(value, callback) {
        super.sendPostRequest(this.memberActions.linkSocialAccount(), value, callback);
    }

    createSocialAccount(value, callback) {
        super.sendPostRequest(this.memberActions.createSocialAccount(), value, callback);
    }

    getReferralDetails() {
        super.sendGetRequest(this.memberActions.getReferralDetails());
    }

    sendReferFriendsEmail(emails) {
        super.sendPostRequest(this.memberActions.sendReferFriendsEmail(), { emails });
    }

    saveProductRating(key, productRating) {
        super.sendPostRequest(this.memberActions.saveProductRating(key), productRating);
    }

    getProductRating(key) {
        super.sendGetRequest(this.memberActions.getProductRating(key));
    }

    deleteAccount(deleteAccountReason, callback) {
        super.sendPostRequest(this.memberActions.deleteAccount(), deleteAccountReason, callback);
    }

    resendVerificationEmail() {
        super.sendPostRequest(this.memberActions.resendVerificationEmail());
    }

    changeAddress(value) {
        super.sendPostRequest(this.memberActions.changeAddress(), value);
    }
    resetSettingPassword(value) {
        super.sendPostRequest(this.memberActions.resetSettingPassword(), value);
    }
    resetSettingEmail(value) {
        super.sendPostRequest(this.memberActions.resetSettingEmail(), value);
    }
    resetSettingNickname(value,callback) {
        super.sendPostRequest(this.memberActions.resetSettingNickname(), value, callback);
    }
    getMemberSettings() {
        super.sendGetRequest(this.memberActions.getMemberSettings());
    }

    getMemberNotificationSettings() {
        super.sendGetRequest(this.memberActions.getMemberNotificationSettings());
    }

    saveMemberNotificationSettings(value) {
        super.sendPostRequest(this.memberActions.saveMemberNotificationSettings(), value);
    }

    savePartnerWithUs(value) {
        super.sendPostRequest(this.memberActions.savePartnerWithUs(), value);
    }

    getMemberEmailSettings(memberId, token) {
        super.sendGetRequest(this.memberActions.getMemberEmailSettings(memberId, token));
    }

    saveMemberEmailSettings(memberId, token, settings, callback) {
        super.sendPostRequest(this.memberActions.saveMemberEmailSettings(memberId, token),
            {
                userId: memberId,
                token,
                notifications: settings
            },  callback);
    }

   

    getAdAttribute=(callback)=> {
        super.sendGetRequest(this.memberActions.getAdAttribute(), callback);
    }

    updateLastNotificationViewed = () => {
        super.sendPutRequest(this.memberActions.updateLastNotificationViewed());
    }

    updateLastReportViewed = () => {
        super.sendPutRequest(this.memberActions.updateLastReportViewed());
    }
    getNewInReport= () => {
        super.sendGetRequest(this.memberActions.getNewInReport());
    }

    saveProductToEmail = (key,slug) => {
        super.sendPostRequest(this.memberActions.saveProductToEmail(), {Key:key,Slug:slug});
    }

    getEmailSnoozeExpiry() {
        super.sendGetRequest(this.memberActions.getEmailSnoozeExpiry());
    }

    saveEmailSnoozeExpiry() {
        super.sendPostRequest(this.memberActions.saveEmailSnoozeExpiry(), null);
    }

    saveShortlistToEmail(slug) {
        super.sendPostRequest(this.memberActions.saveShortlistToEmail(),{Slug: slug });

    }
    clearObj(objName) {
        super.sendLocalRequest(this.memberActions.clearObj(objName));
    }

    addMemberAnswer(answer) {
        super.sendPostRequest(this.memberActions.addMemberAnswer(), answer);
    }

    getMemberAnswers() {
        super.sendGetRequest(this.memberActions.getMemberAnswers());
    }

    getAllQuizzes() {
        super.sendGetRequest(this.memberActions.getAllQuizzes());
    }

    addToMemberAnswerList(answer) {
        super.sendLocalRequest(this.memberActions.addToMemberAnswerList(), answer);
    }
    removeFromMemberAnswerList = (values) => {
        super.sendLocalRequest(this.memberActions.removeFromMemberAnswerList(), values);
    }

    updateNicknameInSettings = (values) => {
        super.sendLocalRequest(this.memberActions.updateNicknameInSettings(), values);
    }

    updateNicknameInLoginInfo = (values) => {
        super.sendLocalRequest(this.memberActions.updateNicknameInLoginInfo(), values);
    }

    refreshNewInNotification() {
        super.sendLocalRequest(this.memberActions.refreshNewInNotification());
    }
    refreshNewInReport() {
        super.sendLocalRequest(this.memberActions.refreshNewInReport());
    }

    getPersonalLoanQuote(request) {
        return super.sendPostRequest(this.memberActions.getPersonalLoanQuote(), request);
    }

    savePersonalLoanEnquiry(enquiry) {
        return super.sendPostRequest(this.memberActions.savePersonalLoanEnquiry(), enquiry);
    }
}