export class StateDictionaryKeys {
    constructor() {

    }

    static getArticleKey(section, slug) {
        return `${section}-${slug}`;
    }

    static getLearnArticleKey(slug) {
        return this.getArticleKey("learn", slug);
    }

    static getCreditScoreArticleKey(slug) {
        return this.getArticleKey("credit-score", slug);
    }


    static getProductKey(product) {
        return `${product.ProductType.Slug}-${product.ProviderCode}-${product.Slug}-${product.ExternalKey}`;
    }
}