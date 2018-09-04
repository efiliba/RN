import queryString from "query-string"; // Parsing objects into query string

import { BaseActions } from "../Base/BaseActions";
import { StateProperty } from "Services/Data/Models/StateProperty";
import { CompareHelper } from "./CompareHelper";
import {StateDictionaryKeys} from "../../Models/StateDictionaryKeys";
import { StatePropertyDictionary } from "../../Models/StatePropertyDictionary";

export class CompareActions extends BaseActions {
    constructor() {
        super();
    }

    getValiantUrl() {
        const url = "/api/product/valiantUrl";

        return super.getSuccessActionDefition(url, "valiantUrl");
    }

    getBusinessLoanTypes() {
        const url = "/api/business-loan/types";

        return super.getSuccessActionDefition(url, "businessLoanTypes");
    }

    saveBusinessLoanEnquiry() {
        return super.getSuccessActionDefition("/api/business-loan/enquiry", "businessLoanEnquiry");
    }

    getProducts(type, options) {
        const url = `/api/${type}?${queryString.stringify(options)}`;
        return super.getSuccessActionDefition(url, "products", type);
    }

    getProductMetaData(type) {
        const url = `/api/${type}/meta`;
        return super.getSuccessActionDefition(url, "productMetaData", type);
    }

    extendProducts(type, options) {
        const url = `/api/${type}?${queryString.stringify(options)}`;
        const actionDefinition = super.getSuccessActionDefition(url, "extendProducts");

        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "extendProducts")) {
                return state;
            }
            
            const stateProducts = { ...state.products };
            const currentProducts = { ...StatePropertyDictionary.getItem(stateProducts, type) };
            
            currentProducts.data.List = currentProducts.data.List.concat(action.payload.List);
            currentProducts.data.HasMoreResults = action.payload.HasMoreResults;

            return super.updateState(state, {
                products: stateProducts,
                extendProducts: new StateProperty()
            });
        };

        return actionDefinition;
    }

    getProductDetails(product) {
        const url = `/api/product/${product.ProductType.Slug}/${product.ProviderCode}/${product.Slug}/${product.ExternalKey}`;
        return super.getSuccessActionDefition(url, "productDetails", StateDictionaryKeys.getProductKey(product));
    }

    shortlistProduct() {
        const url = "/api/product/shortlist";
        return super.getSuccessActionDefition(url, "shortlistProduct");
    }

    removeShortlistProduct(key) {
        const url = "/api/product/shortlist/" + key;
        return super.getSuccessActionDefition(url, "removeShortlistProduct");
    }

    getShortlistedProducts() {
        const url = "/api/product/shortlist";
        return super.getSuccessActionDefition(url, "shortlistedProducts");
    }

    addToShortlistBar() {
        const actionDefinition = super.getSuccessActionDefition(null, "addToShortlistBar");

        actionDefinition.onSuccess = (state, action) => {
            if (!super.stateHasProperty(state, "shortlistedProducts")) {
                return state;
            }

            const product = action.payload;
            let shortlistedProducts;

            if (!state.shortlistedProducts.data) {
                shortlistedProducts = [];
            } else {
                shortlistedProducts = [...state.shortlistedProducts.data];
            }

            //this will remove the product if it was already shortlisted
            const filteredShortlist = shortlistedProducts.filter((item) => item.Key !== product.Key);

            //if nothing was removed, then it means we're adding the product to shortlist
            if (filteredShortlist.length === shortlistedProducts.length) {
                filteredShortlist.push(product);
            }

            return super.updateState(state, {
                shortlistedProducts: new StateProperty(filteredShortlist, state.shortlistedProducts.isLoading)
            });
        };

        return actionDefinition;
    }

    getProductColumns(type) {
        const url = `/api/product/columns/${type}`;
        return super.getSuccessActionDefition(url, "productColumns");
    }

    getCreditCardsCuratedList(curatedListedName) {
        return this.getCuratedList("credit-cards", curatedListedName);
    }
    
    getHomeLoansCuratedList(curatedListedName) {
        return this.getCuratedList("home-loans", curatedListedName);
    }

    getCarLoansCuratedList(curatedListedName) {
        return this.getCuratedList("personal-loans", curatedListedName);
    }

    getPersonalLoansCuratedList(curatedListedName) {
        return this.getCuratedList("personal-loans", curatedListedName);
    }

    getCuratedList(type, curatedListedName) {
        return super.getSuccessActionDefition(`/api/${type}?CuratedListName=${curatedListedName}`, "curatedProductLists", curatedListedName);
    }

    getCreditEnquiry(placement, key) {
        return super.getSuccessActionDefition(`/api/product/enquiry/${placement}/${key}`, "creditEnquiry");
    }

    saveProductFilters() {
        return super.getSuccessActionDefition(null, "productFilters");
    }

    saveCreditEnquiry() {
        return super.getSuccessActionDefition("/api/product/enquiry", "creditEnquiry");
    }
};