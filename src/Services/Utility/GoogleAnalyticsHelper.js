const GoogleAnalyticsHelper = {

    push(data) {
        window.dataLayer.push(data);
    },

    trackPageView(landingPage) {
        this.push({
            'event': "savView",
            'landingPage': landingPage,
            'currentPagePath': `${window.location.pathname}${window.location.search}`
        });    
    },

    trackProductClick(product) {
        this.push({ 'ProductType': product.ProductType.ProductTypeID });
        this.push({ 'event': "savProductClick" });
    },

    trackLogin(membershipState) {
        this.push({
            'event': "memberLogin",
            'membershipState': membershipState
        });
    }
}

module.exports = GoogleAnalyticsHelper;