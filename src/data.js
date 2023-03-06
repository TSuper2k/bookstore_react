import axios from "axios";
import { useEffect, useState } from "react";

const Data = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/books")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return products;
};

export default Data;
