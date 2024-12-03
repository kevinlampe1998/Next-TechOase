'use client';

import { useEffect, useState, useContext, useRef } from "react";
import { TheContext } from "@/components/context-provider/component";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { SubCategories } from "../../set-used-item/page";

const AllProducts = () => {

    const router = useRouter();
    const [products, setProducts] = useState();
    const { localDataBank, dispatch } = useContext(TheContext);
    const [ filter, setFilter ] = useState({
        query: '',
        category: '',
        subcategory: '',
        page: 0
    });
    const prevButton = useRef();
    const nextButton = useRef();
    const [ categoryNav, setCategoryNav ] = useState(false);
    const [ subCategoryNav, setSubcategoryNav ] = useState(false);

    // if (
    //     filter.query !== '' ||
    //     filter.category !== '' ||
    //     filter.subcategory !== '' ||
    //     filter.page !== 0
    // ) {

        const getProducts = async () => {
            const res = await fetch(`/api/used-items/query`, {
                method: 'POST',
                body: JSON.stringify(filter)
            });
            const data = await res.json();
            console.log('getProducts data', data);
    
            setProducts(data.products);
        };
    
        useEffect(() => {
            getProducts();
        }, []);
    
        useEffect(() => {
            setProducts(null);
            getProducts();
            window.scrollTo(0, 0);
        }, [filter]);
    
        useEffect(() => {
            console.log(filter);
            console.log(products);
            console.log(SubCategories[filter.category]);
        });
    
        // useEffect(() => {
        //     console.log(prevButton.current);
        //     filter.page < 1 ? 
        //         (prevButton.current.style.display = 'none')
        //         : (prevButton.current.style.display = 'block');
    
        // }, [filter.page]);
    
        useEffect(() => {
            setFilter(prev => ({ ...prev, subcategory: '' }));
        }, [filter.category]);
    // }

    return (
        <>
            <div className={styles.products}>
                <div className={styles.search}>
                    <input onChange={(e) => setFilter(prev => ({ ...prev, query: e.target.value }))}/>
                    <button>Search</button>
                </div>

                <div className={styles.searchByCategory}>
                    <button onClick={() => setCategoryNav(!categoryNav)}>Search by category</button>
                </div>
                {
                    categoryNav && 
                        <nav className={styles.userDealsCategories}>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Computers & Laptops' }))}
                            >Computers & Laptops</button>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Components' }))}
                            >Components</button>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Peripherals' }))}
                            >Peripherals</button>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Networking' }))}
                            >Networking</button>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Mobile Devices' }))}
                            >Mobile Devices</button>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Gaming' }))}
                            >Gaming</button>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Audio & Video' }))}
                            >Audio & Video</button>
                            <button
                                onClick={(e) => setFilter(prev => ({ ... prev, category: 'Smart Home' }))}
                            >Smart Home</button>
                        </nav>
                }

                {
                    filter.category !== '' &&
                        <nav>
                            {
                                SubCategories[filter.category]?.map((subcategory, index) => (
                                    <button
                                        onClick={() => setFilter(prev => ({ ...prev, subcategory }))}
                                        key={index}>{subcategory}</button>
                                ))
                            }
                        </nav> 
                }

                <div className={styles.usedItemsSpace}></div>

                {products ?
                    products.map((product) => (
                        <div key={product._id} className={styles.productContainer}>
                            <h4>{product.product_name}</h4>
                            <img
                                src={`${product?.main_picture?.url}`}
                                alt={`product ${product.product_name}`}
                            />

                            <div>
                                <div>
                                    Seller:{" "}
                                    {product.seller_name
                                        ? product.seller_name
                                        : "Anonym"}
                                </div>
                                <div>Condition: {product.condition}</div>
                                <div>Category: {product.category}</div>
                                <div>
                                    Subcategory:{" "}
                                    {product.subcategory && product.subcategory}
                                </div>
                                <div>Description: {product.description}</div>
                                <div>Price: {product.price}</div>
                                <div>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/pages/used-items/${product._id}`
                                            )
                                        }
                                    >
                                        Show me the product
                                    </button>
                                    <button>Add to wishlist</button>
                                    <button
                                        // onClick={() =>
                                            // addToUsedShoppingCart(product._id)
                                        // }
                                    >
                                        Add to shopping cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        ))
                
                        : <h3>... loading</h3>
                    }

                    {/* <div className={styles.prevNext}>
                        <button ref={prevButton} onClick={() => setFilter(prev => ({ ...prev, page: filter.page - 10 }))}>Prev</button>
                        <button ref={nextButton} onClick={() => setFilter(prev => ({ ...prev, page: filter.page + 10 }))}>Next</button>
                    </div> */}

            </div>
        </>
    );
};

export default AllProducts;