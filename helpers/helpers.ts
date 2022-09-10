export const getProductsData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
};

export const capitalize = (word: string) => {
    const capitalized = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    return capitalized;
};
