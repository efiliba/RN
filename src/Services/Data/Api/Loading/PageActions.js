import { BaseActions } from "../Base/BaseActions";
import { StateProperty } from "Services/Data/Models/StateProperty";

export class PageActions extends BaseActions {
    constructor() {
        super();
    }

    showTransparentNavigationBar() {
        return super.getSuccessActionDefition(null, "showTransparentNavigationBar");
    }

    hideTransparentNavigationBar() {
        return super.getSuccessActionDefition(null, "hideTransparentNavigationBar");
    }

    toggleMobileMenu() {
        return super.getSuccessActionDefition(null, "toggleMobileMenu");
    }

    toggleFooterLinks() {
        return super.getSuccessActionDefition(null, "toggleFooterLinks");
    }

    showBackButton() {
        return super.getSuccessActionDefition(null, "showBackButton");
    }

    toggleMinimalHeader() {
        return super.getSuccessActionDefition(null, "toggleMinimalHeader");
    }
};