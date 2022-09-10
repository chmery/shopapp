export const getMatchingProducts = (keyword: string, products: ProductData[]) => {
    const matchingProducts = products.filter((product) =>
        product.title.toLowerCase().includes(keyword.trim().toLowerCase())
    );

    return matchingProducts;
};
