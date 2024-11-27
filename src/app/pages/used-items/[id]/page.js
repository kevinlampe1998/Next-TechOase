'use client'

import React, { useEffect, useState, useContext } from "react";
import styles from './page.module.css';


const Product = ({ params }) => {

    const [id, setId] = useState(null);

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        getId();
    }, [params]);

    useEffect(() => {
        id && fetchProduct();
    }, [id]);

    // const { _id } = useParams();
    const [product, setProduct] = useState();
    // const { localDataBank, dispatch } = useContext(TheContext);
    // const navi = useNavigate();

    const fetchProduct = async () => {
        const res = await fetch(`/api/used-items/${id}`);
        const data = await res.json();
        console.log('fetchProduct data', data);

        setProduct(data.product);
    };

    // const naviMailSystem = (id) => {
    //     navi(`/mail-system/${id}`);
    //     return;
    // };


    return (
        <section className={styles.singleProduct}>
            <div>
                {product && (
                    <div>
                        <h3>{product.seller_name}</h3>
                        <h4>{product.product_name}</h4>
                        <img src={product.main_picture.url} />
                        <div>Category: {product.category}</div>
                        <div>Subcategory: {product.subcategory}</div>
                        <div>Description: {product.description}</div>
                        <div>Price: {product.price}</div>
                    </div>
                )}

                <button>Add to wishlist</button>
                <button>Buy</button>
                <button
                    // onClick={() => naviMailSystem(product._id)}
                >
                    Contact Seller
                </button>

                <div className={styles.productComments}>
                    <h5>Comments and Ratings</h5>

                    {[1, 2, 3].map((index) => (
                        <div key={index} className={styles.singleProductComment}>
                            <span>Username who comments</span>
                            <span>I like this product</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Product;