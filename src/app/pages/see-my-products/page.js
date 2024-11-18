'use client';

import styles from './page.module.css';

import { useContext, useEffect, useState, useRef } from "react";
import { TheContext } from '@/components/context-provider';

const MyProduct = ({props: props}) => {
    const productContainer = useRef();

    const deleteProduct = async (_id) => {
        const res = await fetch(`http://localhost:3000/used-items/${_id}`, { method: 'DELETE' });
        const data = await res.json();

        console.log(data);

        location.reload();
    };

    const updateProduct = async (event) => {
        event.preventDefault();

    };

    // const changeToForm = () => {

    //     productContainer.current.children[1].innerHTML = 'Main Picture';

    //     const oldDivTag = productContainer.current.children[2];
    //     const newPictureInput = document.createElement('input');
    //     newPictureInput.setAttribute('type', 'file');
    //     oldDivTag.replaceWith(newPictureInput);
        
    //     const oldName = productContainer.current.children[4];
    //     const newNameInput = document.createElement('input');
    //     newPictureInput.innerHTML = 'Hello';
    //     // newNameInput.setAttribute('placeholder', oldName.innerHTML);
    //     oldName.replaceWith(newNameInput);

    //     const oldDescription = productContainer.current.children[6];
    //     const newDescriptionInput = document.createElement('input');
    //     newDescriptionInput.setAttribute('placeholder', oldDescription.innerHTML);
    //     oldDescription.replaceWith(newDescriptionInput);

    //     const oldPrice = productContainer.current.children[8];
    //     const newPriceInput = document.createElement('input');
    //     newPriceInput.setAttribute('placeholder', oldPrice.innerHTML);
    //     oldPrice.replaceWith(newPriceInput);

    //     const deleteButton = productContainer.current.children[9].
    //         children[1];
    //     deleteButton.style.display = 'none';

    //     const changeButton = productContainer.current.children[9].
    //     children[0];
    //     changeButton.innerHTML = 'Update';
    // };

    return (
        <div ref={productContainer} className={styles.seeMyProductContainer}>

            <h5>Product Name</h5>
            <h4>{props.product_name}</h4>

            <img src={props.main_picture?.url} alt={props.product_name} />

            <h5></h5>
            <div></div>

            <h5>Condition:</h5>
            <div>{props.condition}</div>

            <h5>Category:</h5>
            <div>{props.category}</div>

            <h5>Subcategory</h5>
            <div>{props.subcategory}</div>

            <h5>Description:</h5>
            <div>{props.description}</div>

            <h5>Price:</h5>
            <div>{props.price}</div>

            <div>
                <button
                    // onClick={changeToForm}
                >Change</button>
                <button
                    // onClick={() => deleteProduct(props._id)}
                >Delete</button>
            </div>

        </div>
    );
};

const SeeMyProducts = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const [ myProducts, setMyProducts ] = useState();

    const fetchMyProducts = async () => {
        const res = await fetch(`/api/used-items/see-my-products/${localDataBank.user._id}`);
        const data = await res.json();
        console.log(data);

        setMyProducts(data.usedItems);
    };

    useEffect(() => {
        localDataBank.user && fetchMyProducts();
    }, [localDataBank.user]);

    useEffect(() => {
        console.log(localDataBank);
    });

    return (
        <section className={styles.seeMyProducts}>
            
            <h2>See My Products</h2>

            {
                myProducts && 
                myProducts.map(product => (
                    <MyProduct props={product} key={product._id}/>
                ))
            }
        </section>
    );
};

export default SeeMyProducts;