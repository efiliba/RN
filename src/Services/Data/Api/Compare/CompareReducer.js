import { StateProperty } from "../../Models/StateProperty";
import { BaseReducer } from "../Base/BaseReducer";
import { StatePropertyDictionary } from "../../Models/StatePropertyDictionary";

const initialCompareState = {
    productList: null,
    productListIsLoading: false,

    activeProduct: null,
    activeProductIsLoading: false,

    //shouldn't be there but is a hack to sync the shortlist across dashboard and compare sections
    //ideally there should be seprate reducer for the shortlist or products, which is shared across the site
    dashboardProducts: new StateProperty(),
    productFilters: new StateProperty(),
    productMeta: null,
    productMetaIsLoading: false,
    valiantUrl: new StateProperty(),
    products: new StatePropertyDictionary(),
    extendProducts: new StateProperty(),
    productMetaData: new StatePropertyDictionary(),
    productDetails: new StatePropertyDictionary(),
    rHcCreditCards: new StateProperty(),
    shortlistedProducts: new StateProperty(),
    productColumns: new StateProperty(),
    creditEnquiry: new StateProperty(),
    curatedProductLists: new StatePropertyDictionary(),
    businessLoanTypes: new StateProperty(),
    businessLoanEnquiry: new StateProperty()
}



/**
 * Helper function to merge the product list container and update
 * all references of the given item in the old lists
 * @param {any} list
 * @param {any} item
 */
function toggleAllProductInstancesFromList(list, item) {
    if (list === null || item === null) {
        return list;
    };

    return Object.assign({}, list, {
        // Featured product needs to be updated
        Featured: list.Featured.ExternalKey === item.ExternalKey ?
            Object.assign({}, list.Featured, { IsShortListed: item.IsShortListed }) :
            list.Featured,
        // Product list needs to be updated too
        List: list.List.map((content, index) => {
            // If we come across our product, toggle the shortlisted boolean
            if (content.ExternalKey === item.ExternalKey) {
                content.IsShortListed = item.IsShortListed;
            }
            return content;
        })
    });
}

const CompareReducer = function (state = initialCompareState, action) {

    switch (action.type) {
        case 'SHORTLIST_TOGGLE':          
            var productType = action.payload.ProductType.Slug.replace("-", "");
            var existingShortlistedProducts = state.shortlistedProducts[productType];

            // Skip if we are maxed out and trying to add one
            if (!action.payload.IsShortListed && existingShortlistedProducts.length >= 4) {
                return state;
            }

            // If it is currently shortlisted
            if (action.payload.IsShortListed) {
                // Set the bool flag to false and remove it from the list
                action.payload.IsShortListed = false;
                existingShortlistedProducts = existingShortlistedProducts.filter(element => element.ExternalKey !== action.payload.ExternalKey);
            }
            // If it is not shortlisted
            else {
                // Add it to our list and set its IsShortListed value to true
                action.payload.IsShortListed = true;
                existingShortlistedProducts = [...existingShortlistedProducts, action.payload]
            }

            // Try and merge the state with the new shortlist AND the new productlist with the
            // modified product
            return Object.assign({}, state, {
                shortlistedProducts: Object.assign({}, state.shortlistedProducts, {
                    [productType]: existingShortlistedProducts
                }),
                productList: toggleAllProductInstancesFromList(state.productList, action.payload),
                dashboardProducts: toggleAllProductInstancesFromList(state.dashboardProducts, action.payload)

            });

        case 'PRODUCT_DETAILS_REQUEST':
            return Object.assign({}, state, { activeProduct: null, activeProductIsLoading: true });
        case 'PRODUCT_DETAILS_FAILURE':
            return Object.assign({}, state, { activeProduct: null, activeProductIsLoading: false });
        case 'PRODUCT_DETAILS_SUCCESS':
            return Object.assign({}, state, { activeProduct: action.payload, activeProductIsLoading: false });

        case 'SHORTLIST_REQUEST':
            return Object.assign({}, state, { shortlistedProducts: null, shortlistIsLoading: true });
        case 'SHORTLIST_FAILURE':
            return Object.assign({}, state, { shortlistedProducts: null, shortlistIsLoading: false });
        case 'SHORTLIST_SUCCESS':

            // foreach item in the new shortlistedProducts
            var shortlistedProducts = action.payload.creditcards.concat(action.payload.homeloans).concat(action.payload.personalloans);
            var resultantProductList = state.productList;
            var resultantDashboardItems = state.dashboardProducts;
            console.log(shortlistedProducts);
            shortlistedProducts.forEach(function (item) {
                resultantProductList = toggleAllProductInstancesFromList(state.productList, item);
                resultantDashboardItems = toggleAllProductInstancesFromList(state.dashboardProducts, item);
            });

            return Object.assign({}, state, {
                shortlistedProducts: action.payload,
                productList: resultantProductList,
                dashboardProducts: resultantDashboardItems,
                shortlistIsLoading: false
            });

        case 'PRODUCT_LIST_REQUEST':
            return Object.assign({}, state, { productList: null, productListIsLoading: true });
        case 'PRODUCT_LIST_FAILURE':
            return Object.assign({}, state, { productList: null, productListIsLoading: false });
        case 'PRODUCT_LIST_SUCCESS':
            return Object.assign({}, state, { productList: action.payload, productListIsLoading: false });


        case 'DASHBOARD_PRODUCTS_REQUEST':
            return Object.assign({}, state, { dashboardProducts: null, dashboardProductsIsLoading: true });
        case 'DASHBOARD_PRODUCTS_FAILURE':
            return Object.assign({}, state, { dashboardProducts: null, dashboardProductsIsLoading: false });
        case 'DASHBOARD_PRODUCTS_SUCCESS':
            return Object.assign({}, state, { dashboardProducts: action.payload, dashboardProductsIsLoading: false });


        case 'PRODUCT_LIST_EXTEND_REQUEST':
            return Object.assign({}, state, { productListIsExtending: true });
        case 'PRODUCT_LIST_EXTEND_FAILURE':
            return Object.assign({}, state, { productListIsExtending: false });
        case 'PRODUCT_LIST_EXTEND_SUCCESS':
            return Object.assign({}, state,
            {
                productList: Object.assign(state.productList,
                {
                    List: state.productList.List.concat(action.payload.List),
                    HasMoreResults: action.payload.HasMoreResults
                }), 
                productListIsExtending: false
            });


        case 'PRODUCT_META_REQUEST':
            return Object.assign({}, state, { productMeta: null, productMetaIsLoading: true });
        case 'PRODUCT_META_FAILURE':
            return Object.assign({}, state, { productMeta: null, productMetaIsLoading: false });
        case 'PRODUCT_META_SUCCESS':
            return Object.assign({}, state, { productMeta: action.payload, productMetaIsLoading: false });
        default:
            return BaseReducer.updateState(state, action);
    }

    return state;
}

export default CompareReducer;