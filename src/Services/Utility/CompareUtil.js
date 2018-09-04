import { isNullOrUndefined } from "./Util";
import QuestionnaireMap from "../Constants/QuestionnaireMap";
import { RouteUrls } from "Services/Constants/RouteUrls";
export function GetCompareUrl(id) {
    if (!isNullOrUndefined(id) ) {
        const slug = GetCompareSlug(id);
        if (slug!=="")
            return "/" + slug;
    }  
    return "";
}
export function GetCompareSlug(id) {
    if (!isNullOrUndefined(id) ) {
        const url = QuestionnaireMap.ProductTypeList.find(m => m.Id === id);
        if (!isNullOrUndefined(url))
            return url.Slug;
    }
    return "";
}




export function GetCompareType(id) {
    if (!isNullOrUndefined(id)) {
        const url = QuestionnaireMap.ProductTypeList.find(m => m.Id === id);
        if (!isNullOrUndefined(url))
            return url.Type;
    }
    return "";
}





export function GetProductIdBySlug(slug) {
    if (!isNullOrUndefined(slug) ) {
        const productType = QuestionnaireMap.ProductTypeList.find(m => m.Slug === slug);
        if (!isNullOrUndefined(productType))
            return productType.Id;
    }
    return 1;
}


export function GetCompareUrlByPreference(productType) {
    switch (productType) {
    case 0:
            return RouteUrls.compareHomeLoans;

    case 1:
        return RouteUrls.compareCreditCards;

    case 2:
        return RouteUrls.compareCarPersonalLoans;

    case 4:
        return RouteUrls.compareSavingProducts;

    case 5:
        return RouteUrls.compareBusinessLoans;

    default:
            return RouteUrls.compareCreditCards;
    }
}


export function GetProductTypeBySlug(slug) {
    if (!isNullOrUndefined(slug)) {
        const productType = QuestionnaireMap.ProductTypeList.find(m => m.Slug === slug);
        if (!isNullOrUndefined(productType))
            return productType.Type;
    }
    return "";
}

export function GetProductOtherNameBySlug(slug) {
    if (!isNullOrUndefined(slug)) {
        const productType = QuestionnaireMap.ProductTypeList.find(m => m.Slug === slug);
        if (!isNullOrUndefined(productType))
            return productType.OtherName;
    }
    return "";
}
export function GetCompareName(id) {
    if (!isNullOrUndefined(id)) {
        const url = QuestionnaireMap.ProductTypeList.find(m => m.Id === id);
        if (!isNullOrUndefined(url))
            return url.OtherName;
    }
    return "";
}



export function GetFilterKeyBySlug(slug, preference) {
    const productType = GetProductTypeBySlug(slug);
    let filterType = "";
    const filterValue= preference[productType + "CategoryFilterValue"];
    if (productType.length > 0 && !isNullOrUndefined(filterValue))
        filterType = QuestionnaireMap.ProductCategoryList.
            find(m => m.Type === productType + "CategoryFilterValue").Data.find(m => m.Value === filterValue).Key;    
    return filterType;
}