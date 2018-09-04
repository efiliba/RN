export class ProductPreferenceUtil {

    /**
     * 
     * HomeLoan = 0,

        [Description("Credit card")]
        CreditCard = 1,

        [Description("Personal loan")]
        PersonalLoan = 2,

        [Description("Car loan")]
        CarLoan = 3,

        Other = 4,

        BusinessLoan = 5
     */

    static productTypeToControllerAction(productType, score) {
        switch (productType) {
            case 0:
                return "home-loans";

            case 1:
                return "credit-cards";

            case 2:
                return "personal-loans";
            case 4:
                return "saving-products";
            default:
                return "credit-cards";
        }
    }    


}