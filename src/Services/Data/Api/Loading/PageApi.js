import { BaseApi } from "../Base/BaseApi";
import { PageActions } from "./PageActions";

export class PageApi extends BaseApi {
    constructor() {
        super();
        this.actions = new PageActions();
    }

    showTransparentNavigationBar() {
        super.sendLocalRequest(this.actions.showTransparentNavigationBar());
    }

    hideTransparentNavigationBar() {
        super.sendLocalRequest(this.actions.hideTransparentNavigationBar());
    }

    toggleMobileMenu() {
        super.sendLocalRequest(this.actions.toggleMobileMenu());
    }

    toggleFooterLinks() {
        super.sendLocalRequest(this.actions.toggleFooterLinks());
    }

    showBackButton() {
        super.sendLocalRequest(this.actions.showBackButton());
    }

    toggleMinimalHeader() {
        super.sendLocalRequest(this.actions.toggleMinimalHeader());
    }
}