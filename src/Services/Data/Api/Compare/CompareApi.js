import { BaseApi } from "../Base/BaseApi";
import { CompareActions } from "./CompareActions";

export class CompareApi extends BaseApi {

    constructor() {
        super();
        this.actions = new CompareActions();

    }

    getValiantUrl() {
        super.sendGetRequest(this.actions.getValiantUrl());
    }

    getBusinessLoanTypes() {
        super.sendGetRequest(this.actions.getBusinessLoanTypes());
    }

    saveBusinessLoanEnquiry(enquiry) {
        return super.sendPostRequest(this.actions.saveBusinessLoanEnquiry(), enquiry);
    }

    getProducts(type, options) {
        super.sendGetRequest(this.actions.getProducts(type, options));
    }

    extendProducts(type, options) {
        super.sendGetRequest(this.actions.extendProducts(type, options));
    }

    getProductMetaData(type) {
        super.sendGetRequest(this.actions.getProductMetaData(type));
    }

    getProductDetails(product, callback) {
        super.sendGetRequest(this.actions.getProductDetails(product),  callback);
    }

    shortlistProduct(product) {
        super.sendPostRequest(this.actions.shortlistProduct(), product);
    }

    removeShortlistProduct(key) {
        super.sendDeleteRequest(this.actions.removeShortlistProduct(key));
    }

    addToShortlistBar(product) {
        super.sendLocalRequest(this.actions.addToShortlistBar(), product);
    }

    getShortlistedProducts() {        
        super.sendGetRequest(this.actions.getShortlistedProducts());
    }

    getProductColumns(type) {
        super.sendGetRequest(this.actions.getProductColumns(type));
    }

    getCreditCardsCuratedList(curatedListedName) {
        super.sendGetRequest(this.actions.getCreditCardsCuratedList(curatedListedName));
    }

    getHomeLoansCuratedList(curatedListedName) {
        super.sendGetRequest(this.actions.getHomeLoansCuratedList(curatedListedName));
    }

    getPersonalLoansCuratedList(curatedListedName) {
        super.sendGetRequest(this.actions.getPersonalLoansCuratedList(curatedListedName));
    }

    getCarLoansCuratedList(curatedListedName) {
        super.sendGetRequest(this.actions.getCarLoansCuratedList(curatedListedName));
    }

    getCreditEnquiry(placement, key) {
        super.sendGetRequest(this.actions.getCreditEnquiry(placement, key));
    }
    saveCreditEnquiry(creditEnquiry) {
        return super.sendPostRequest(this.actions.saveCreditEnquiry(), creditEnquiry);
    }

    saveProductFilters(filters) {
        super.sendLocalRequest(this.actions.saveProductFilters(), filters);
    }
}