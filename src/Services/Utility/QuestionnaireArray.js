import React from "react";
import QuestionnaireMap from "Services/Constants/QuestionnaireMap";
import { isNullOrUndefined } from "Services/Utility/Util";
import Category from "Pages/Components/Questionnaire/Category/Category";
import BorrowStatus from "Pages/Components/Questionnaire/BorrowStatus/BorrowStatus";
import PersonalBorrowStatus from "Pages/Components/Questionnaire/PersonalBorrowStatus/PersonalBorrowStatus";
import BusinessBorrowStatus from "Pages/Components/Questionnaire/BusinessBorrowStatus/BusinessBorrowStatus";
import RangeSliderSelect from "Pages/Components/Questionnaire/RangeSliderSelect/RangeSliderSelect";
import NumberInput from "Pages/Components/Questionnaire/NumberInput/NumberInput";
import { ProductChoiceQLeft } from "Pages/Components/Questionnaire/ProductChoiceQLeft/ProductChoiceQLeft";
import { StringUtil } from "Services/Utility/StringUtil";
export class QuestionnaireArray {
    //shared
    static getQuestionsById(preferenceId) {
        if (!isNullOrUndefined(preferenceId)) {
            return QuestionnaireMap.QuestionnaireList.find(m => m.Id === preferenceId).TypeList;
        }
        return [];
    }

    //question list
    static getSpecificProductQuestions(preference) {
        return QuestionnaireMap.ProductTypeList.reduce(function (acc, curr) {
            if (curr.Id != 100) {
                if (preference[`${curr.Type}InterestLevel`] > 0)
                    acc= acc.concat(QuestionnaireArray.getQuestionsById(curr.Id));
            }
            return acc;
        }, []);      
    }
    static getInterestedLevelQuestionList=() =>{
        return QuestionnaireMap.ProductTypeList.reduce(function (acc, curr) {
            if (curr.Id != 100)
                acc.push(`${curr.Type}InterestLevel`);
            return acc;
        },[])
    }
    static getQuestionList(preference) {
        let questionList = [];
        questionList = questionList.concat(QuestionnaireArray.getQuestionsById(100));
        questionList = questionList.concat(QuestionnaireArray.getInterestedLevelQuestionList());
        questionList = questionList.concat(QuestionnaireArray.getSpecificProductQuestions(preference));       
        return [...new Set(questionList)]; //return unique array
    }

    //filter question list
    static filterQuestionList(preference, questionList) {
        return questionList.reduce((acc,m) => {
            if (m === "BorrowStatus" &&
                isNullOrUndefined(preference["CurrentHomeLoanAmount"]) &&
                isNullOrUndefined(preference["CurrentValueOfProperty"]))
                 acc.push(m);
            else if (m === "CreditCardCategoryFilterValue" &&
                (isNullOrUndefined(preference[m]) && (isNullOrUndefined(preference["IsInterestedInAllCreditCards"])
                || preference["IsInterestedInAllCreditCards"]===false)))
                 acc.push(m);             
            else if (m === "PersonalBorrowStatus" &&
                isNullOrUndefined(preference["PersonalLoanAmount"]) &&
                isNullOrUndefined(preference["PersonalLoanPeriod"]))
                 acc.push(m);          
            else if (m === "CarLoanTypeId" && isNullOrUndefined(preference["CarLoanTypeId"])
                && !isNullOrUndefined(preference["PersonalLoanInterestLevel"]) && preference["PersonalLoanInterestLevel"] > 0 //interested level
                && !isNullOrUndefined(preference["PersonalLoanCategoryFilterValue"]) && preference["PersonalLoanCategoryFilterValue"]===2 //car loan
                )
                acc.push(m);
            else if ((m === "IncomeLevel" | m === "PersonalLoanIncomeLevel") && isNullOrUndefined(preference["IncomeLevel"]))
                acc.push(m);
            else if (QuestionnaireArray.notSepecificeQuestions(m) && isNullOrUndefined(preference[m]))
                acc.push(m);
            return acc;
        },[]);
        return filteredQuestionList;
    }
    static notSepecificeQuestions(question) {
        return !["BorrowStatus", "PersonalBorrowStatus", "CreditCardCategoryFilterValue", "CarLoanTypeId", "IncomeLevel","PersonalLoanIncomeLevel"].includes(question);
        
    }

    static  getNextQ(preference, questionList, isLoadWithValue) {
        if (questionList.length > 0)
            return QuestionnaireMap.QuestionnaireSettingList.find(m => questionList[0] === m.Type);
        return null;
    }

    static shouldLoad(preference) {
        const list = QuestionnaireArray.filterQuestionList(preference, QuestionnaireArray.getQuestionList(preference));
        if (list.length > 0)
            return false;
        return true;
    }    

    static loadNextComponent(preference, questionnaireSetting, btnText, onCategoryUpdate) {
        if (isNullOrUndefined(btnText))
            btnText = "Next question";
        if (questionnaireSetting.Component === "Category") {
            let type = questionnaireSetting.Type;
            if (type === "PersonalLoanIncomeLevel")
                type = "IncomeLevel";
            return <Category categoryType={type} titleLabel={questionnaireSetting.Title}
                btnText={btnText} onUpdate={onCategoryUpdate}/>;
        }

        if (questionnaireSetting.Component === "BorrowStatus") {
            return <BorrowStatus titleLabel={questionnaireSetting.Title}
                productPreference={preference} btnText={btnText} onUpdate={onCategoryUpdate}/>;
        }

        if (questionnaireSetting.Component === "RangeSliderSelect") {
            return <RangeSliderSelect categoryType={questionnaireSetting.Type} titleLabel={questionnaireSetting.Title}
                btnText={btnText} onUpdate={onCategoryUpdate}/>;
        }
        if (questionnaireSetting.Component === "NumberInput") {
            return <NumberInput titleLabel={questionnaireSetting.Title}
                productPreference={preference} btnText={btnText} />;
        }

        if (questionnaireSetting.Component === "PersonalBorrowStatus") {
            return <PersonalBorrowStatus titleLabel={questionnaireSetting.Title}
                productPreference={preference} btnText={btnText} onUpdate={onCategoryUpdate} />;
        }
        if (questionnaireSetting.Component === "BusinessBorrowStatus") {
            return <BusinessBorrowStatus titleLabel={questionnaireSetting.Title}
                productPreference={preference} btnText={btnText} onUpdate={onCategoryUpdate} />;
        }      


    }   
    
    static loadQuestionnaireSetting(preference, qustionList, questionType) {        
        if (!isNullOrUndefined(questionType) && questionType.length > 0) {
            return QuestionnaireArray.getNextQ(preference, [questionType], true);
        }
        else {
            return QuestionnaireArray.getNextQ(preference, qustionList, false);
        }     
    }

    static filterForCompare(questionList) {
        return questionList.reduce(function (acc, curr) {
            if (curr !== "HomeLoanMonthToGet" && curr !== "PersonalLoanMonthToGet" && curr!="CarLoanTypeId") {
                acc.push(curr);
            }
            return acc;
        }, []); 
    }

    static loadLeftComponent(id) {
        const productType = QuestionnaireMap.ProductTypeList.
            find(m => m.Id === id);
        if (id===100)
            return <ProductChoiceQLeft title={productType.OtherName}
                content="Let us know what you're looking for and we'll send you exclusive offers and deals that you're interested in"
                cssClass={productType.CssClass} />
        else {
            return <ProductChoiceQLeft title={productType.Description} cssClass={" product-choice-q-left-base "+ productType.CssClass} />
        }
    }

    //post build button   
    static renderButton(type, title, subTitle, index,preloadQuestion) {
        return <button key={index} className="btn btn-savvy-preference" onClick={preloadQuestion}><div>{title}
            <span>{subTitle}</span></div><div className="badge"><i className="fa fa-pencil"></i></div></button>;
    }
    static renderRaidoChoiceButton(type, value, index, preloadQuestion) {
        console.log(type);
        const title = QuestionnaireMap.ProductCategoryList
            .find(m => type.includes(m.Type)).Data.find(m => m.Value === value).Description;
        const subTitle = QuestionnaireMap.QuestionnaireSettingList.find(m => m.Type === type).Description;
        return QuestionnaireArray.renderButton(type, title, subTitle, index, preloadQuestion);
    }

    static renderSettingButton(type, value, index, preloadQuestion) {      
        const subTitle = QuestionnaireMap.QuestionnaireSettingList.find(m => m.Type === type).Description;
        return QuestionnaireArray.renderButton(type, value, subTitle, index, preloadQuestion);
    } 

    static buildButton(preference, question, index, preloadQuestion) {
        if (!isNullOrUndefined(preference.CurrentValueOfProperty) && question === "BorrowStatus" && !isNullOrUndefined(preference.CurrentHomeLoanAmount))
            return <span key={index}>
                {QuestionnaireArray.renderButton(question, StringUtil.toCurrency( preference.CurrentValueOfProperty), "Property Price", 300, preloadQuestion)}
                {QuestionnaireArray.renderButton(question, StringUtil.toCurrency(preference.CurrentHomeLoanAmount), "Loan Amount", 100, preloadQuestion)}
                {QuestionnaireArray.renderButton(question, StringUtil.getYearText(preference.CurrentHomeLoanPeriod), "Loan Period", 200, preloadQuestion)}
            </span>;

        if (!isNullOrUndefined(preference.PersonalLoanAmount) && question === "PersonalBorrowStatus" && !isNullOrUndefined(preference.PersonalLoanPeriod))
            return <span key={index}>
                {QuestionnaireArray.renderButton(question, StringUtil.toCurrency(preference.PersonalLoanAmount), "Loan Amount", 100, preloadQuestion)}
                {QuestionnaireArray.renderButton(question, StringUtil.getYearText(preference.PersonalLoanPeriod), "Loan Period", 200, preloadQuestion)}
            </span>;
        if (!isNullOrUndefined(preference.BusinessLoanAmount) && question === "BusinessLoanAmount" )
            return QuestionnaireArray.renderSettingButton(question, StringUtil.toCurrency(preference.BusinessLoanAmount), index, preloadQuestion);

        if (!isNullOrUndefined(preference.NoOfDependents) && question === "NoOfDependents")
            return QuestionnaireArray.renderSettingButton(question, preference.NoOfDependents, index, preloadQuestion);

        if (question === "CreditCardCategoryFilterValue" && preference["IsInterestedInAllCreditCards"]===true) {
            return QuestionnaireArray.renderRaidoChoiceButton(question, 0, index, preloadQuestion);
        }

        if (!isNullOrUndefined(preference[question]))
            return QuestionnaireArray.renderRaidoChoiceButton(question, preference[question], index, preloadQuestion);
        if (question === "PersonalLoanIncomeLevel" && !isNullOrUndefined(preference["IncomeLevel"]))
            return QuestionnaireArray.renderRaidoChoiceButton(question, preference["IncomeLevel"], index, preloadQuestion);
        return null;
    }
}