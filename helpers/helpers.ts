export const getProductsData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
};

export const getProductsByCategory = (data: ProductData[], category: string, amount: number) => {
    if (category === "bestsellers") return data.slice(0, amount);
    const products = data.filter((product) => product.category === category);
    return products.slice(0, amount);
};

export const capitalize = (word: string) => {
    const capitalized = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    return capitalized;
};
