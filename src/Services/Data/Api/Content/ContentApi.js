import { BaseApi } from "../Base/BaseApi";
import { ContentActions } from "./ContentActions";

export class ContentApi extends BaseApi {

    constructor() {
        super();
        this.contentActions = new ContentActions();
    }

    getTermsOfUse() {
        super.sendGetRequest(this.contentActions.getTermsOfUse());
    }

    getPrivacyPolicy() {
        super.sendGetRequest(this.contentActions.getPrivacyPolicy());
    }

   

    getBlogArticles() {
        super.sendGetRequest(this.contentActions.getBlogArticles());
    }

    getArchives() {
        super.sendGetRequest(this.contentActions.getArchives());
    }

    getArticle(section, slug,callback) {
        super.sendGetRequest(this.contentActions.getArticle(section, slug), callback);
    }

    getArticlesByTag(tag, callback) {
        super.sendGetRequest(this.contentActions.getByTag(tag), callback);
    }

    getArticleById(id, callback) {
        super.sendGetRequest(this.contentActions.getArticleById(id), callback);
    }

    getArticleGroup(section) {
        super.sendGetRequest(this.contentActions.getArticleGroup(section));
    }

    getLeadArticles() {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-learn-lead-carousel", "leadArticles"));
    }

    getPopularArticles() {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-learn-popular-articles", "popularArticles"));
    }

    getCreditProductArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("credit-products", "productArticles", count));
    }

    getLearnFaqArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("credit-faq", "faqs", count));
    }

    getLearnCcrArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("comprehensive-credit-reporting-ccr", "ccrs", count));
    }

    getCreditScoreArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("credit-score", "creditScoreArticles", count));
    }

    getCalculatorsArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("calculators", "calculatorArticles", count));
    }

    getHomeLoanArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-home-loan-articles", "homeLoanArticles", count));
    }

    getCreditCardArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-credit-card-articles", "creditCardArticles", count));
    }

    getPersonalLoanArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-personal-loan-articles", "personalLoanArticles", count));
    }

    getBusinessLoanArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-business-loan-articles", "businessLoanArticles", count));
    }

    getCreditReportSummaryArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-credit-report-summary-articles", "creditReportSummaryArticles", count));
    }

    getDashboardArticles(count) {
        super.sendGetRequest(this.contentActions.getArticlesByTag("curated-dashboard-articles", "dashboardArticles", count));
    }

    getPressCentreArticles() {
        super.sendGetRequest(this.contentActions.getPressCentreArticles());
    }

    getTagBySlug(slug) {
        super.sendGetRequest(this.contentActions.getTagBySlug(slug));       
    }
}