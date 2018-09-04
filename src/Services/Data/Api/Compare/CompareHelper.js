export class CompareHelper {
    static filterProductsByType(products, type) {
        if (!products) {
            return [];
        }

        return products.filter((product) => {
            return product.ProductType.Slug === type;
        });
    }
}