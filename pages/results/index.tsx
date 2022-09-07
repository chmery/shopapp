import { useRouter } from "next/router";

const Results = () => {
    const router = useRouter();
    const { keyword } = router.query;

    return <h1>Results for {keyword}</h1>;
};

export default Results;
