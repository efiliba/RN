import { ContentActions } from "./ContentActions";
import { StateProperty } from "../../Models/StateProperty";
import { StatePropertyDictionary } from "../../Models/StatePropertyDictionary";

const initialState = {
    privacyPolicy: new StateProperty(),
    termsOfUse: new StateProperty(),
    archives: new StateProperty(),
    articles: new StatePropertyDictionary(),
    articlesByTag: new StatePropertyDictionary(),    
    blogArticles: new StateProperty(),
    articleGroup: new StateProperty(),
    leadArticles: new StateProperty(),
    popularArticles: new StateProperty(),
    productArticles: new StateProperty(),
    creditScoreArticles: new StateProperty(),
    faqs: new StateProperty(),
    ccrs: new StateProperty(),
    calculatorArticles: new StateProperty(),
    dashboardArticles: new StateProperty(),
    creditReportSummaryArticles: new StateProperty(),
    personalLoanArticles: new StateProperty(),
    creditCardArticles: new StateProperty(),
    homeLoanArticles: new StateProperty(),
    businessLoanArticles: new StateProperty(),
    pressCentreArticles: new StateProperty(),
    tag: new StateProperty()
}

const ContentReducer = function (state = initialState, action) {

    switch (action.type) {



        default:
            if (action.actionDefinition !== undefined) {
                return action.actionDefinition.reducer(action, state);    
            }
    }

    return state;
}

export default ContentReducer;