"use client";

import newInStore from "@/models/new-in-store/Computer";
import { useContext, useEffect, useState, useRef } from "react";
import { TheContext } from "@/components/context-provider";

const Products = ({ params }) => {
    const [id, setId] = useState(null);

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        getId();
    }, [params]);

    useEffect(() => {
        id && fetchProducts();
    }, [id]);

    // const { _id } = useParams();
    const [products, setProducts] = useState([]);
    // const { localDataBank, dispatch } = useContext(TheContext);
    // const navi = useNavigate();

    // const fetchProducts = async () => {
    //     const res = await fetch(`/api/new-in-store`);
    //     const data = await res.json();
    //     console.log("fetchProducts data", data);

    //     setProducts(data.products);
    // };
    return (
        <div>
            <h1>Products</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {products.map((product) => (
                    <div
                        key={product._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            width: "200px",
                            textAlign: "center",
                        }}
                    >
                        {/* <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "100%", height: "auto" }}
                        /> */}
                        <h3>{product.model}</h3>
                        <p>Manufacturer: {product.manufacturer}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
