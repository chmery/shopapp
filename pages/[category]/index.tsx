import { useRouter } from "next/router";

const Category = () => {
    const router = useRouter();
    const { category } = router.query;

    return <h1>Category Page for {category}</h1>;
};

export default Category;
