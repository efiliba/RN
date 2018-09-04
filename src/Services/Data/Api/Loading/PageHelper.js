import { PageApi } from "./PageApi";

const api = new PageApi();
export class PageHelper {

    static showTransparentBar() {
        api.showTransparentNavigationBar();
    }

    static hideTransparentBar() {
        api.hideTransparentNavigationBar();
    }

    static toggleFooterLinks() {
        api.toggleFooterLinks();
    }

    static toggleMinimalHeader() {
        api.toggleMinimalHeader();
    }
}