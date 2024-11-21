'use client';

import styles from './page.module.css';
import { useContext, useEffect, useState, useRef } from "react";
import { TheContext } from '@/components/context-provider';
import { useRouter } from 'next/navigation';

const SubCategories = {
    "Computers & Laptops":
    ['Gaming Laptops', 'Ultrabooks', 'MacBooks', 'Business Laptops', '2-in-1 Laptops',
    'Desktop PCs', 'All-in-One PCs'],

    "Components":
    ['Processors', 'Graphics Cards', 'Motherboards', 'RAM', 'Storage Drives', 'Power Supplies',
    'Cooling Systems', 'PC Cases', 'Optical Drives'],

    "Peripherals":
    ['Monitors', 'Keyboards', 'Mice', 'Headsets', 'Webcams', 'Printers', 'External Hard Drives',
    'Docking Stations', 'Game Controllers'],

    "Networking":
    ['Routers', 'Modems', 'NAS Systems', 'Wi-Fi Extenders', 'Network Switches', 'Access Points',],

    "Mobile Devices":
    ['Smartphones', 'Tablets', 'Smartwatches', 'Phone Accessories', 'Chargers', 'Power Banks',
    'Phone Cases', 'Screen Protectors'],

    "Gaming":
    ['Consoles', 'VR Headsets', 'Gaming Chairs', 'Gaming Desks', 'Gaming Mice', 'Gaming Keyboards',
    'Gaming Headsets', 'Graphics Cards', 'Game Bundles'],

    "Audio & Video":
    ['TVs', 'Soundbars', 'Microphones', 'Speakers', 'Earphones', 'Headphones', 'Projectors',
    'Cameras', 'Action Cameras', 'Drones'],

    "Smart Home":
    ['Smart Speakers', 'Smart Bulbs', 'Security Cameras', 'Smart Thermostats', 'Smart Plugs',
    'Smart Locks', 'Smart Sensors', 'Smart Displays',]
};

const MyProduct = ({props: props}) => {
    const productContainer = useRef();
    const [ product, setProduct ] = useState({
        id: '',
        user_who_sells: '',
        seller_name: '',
        product_name: '',
        main_picture: null,
        description: '',
        price: '',
        condition: '',
        category: '',
        subcategory: '',
    });
    const [ updateForm, setUpdateForm ] = useState(false);
    const conditionRef = useRef();
    const categoryRef = useRef();
    const subcategoryRef = useRef();
    const [ select, setSelect ] = useState(false);
    const [ image, setImage ] = useState();
    const router = useRouter();

    const correctPrice = (event) => {
        const value = event.target.value;
    
        if (value.length < 4) {
            const removedComma = value.replace(',', '');
            const unshiftZeroComma = removedComma.split('');
            unshiftZeroComma.unshift('0,');
            setProduct((prev) => ({ ...prev, price: unshiftZeroComma.join('')}));
            return;
        }
    
        
        const numbers = '0123456789'.split('');
        
        const lastChar = value.slice(-1);
        
        if (!numbers.includes(lastChar)) {
            setProduct((prev) => ({ ...prev, price: value.slice(0, -1)}));
            return;
        }
        
        const removedComma = value.replace(',', '');
        
        const numberArray = removedComma.split('');
        numberArray.splice(numberArray.length - 2, 0, ',');
        
        const under2Digits = numberArray.length < 4 && numberArray.join('').replace(',', '');
        
        const prePrice = under2Digits ? under2Digits : numberArray.join('');
        
        if (prePrice.length > 4 && prePrice[0] === '0') {
            const removedZero = prePrice.split('');
            removedZero.shift();
            setProduct((prev) => ({ ...prev, price: removedZero.join('')}));
    
            return;
        }
    
        setProduct(prev => ({ ...prev, price: prePrice }));
      };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const deleteProduct = async (_id) => {
        const res = await fetch(`/api/used-items/see-my-products/${_id}`, { method: 'DELETE' });
        const data = await res.json();

        console.log(data);
        data.success && router.push('/pages/see-my-products/delete-success');
    };

    const changeToForm = () => {
        setUpdateForm(true);
        setSelect(true);
        
    };
    
    useEffect(() => {
        if (select) {
            const conditionChildren = conditionRef.current.children;
            
            Object.values(conditionChildren).map((child) => {
                if (child.value === props.condition) {
                    // conditionRef.current.value = props.condition;
                    setProduct(prev => ({ ...prev, condition: child.value }));
                }
            });
            
            const categoryChildren = categoryRef.current.children;

            Object.values(categoryChildren).map((child) => {

                if (child.value === props.category) {
                    setProduct(prev => ({ ...prev, category: child.value }));
                }
            });

            console.log('props._id', props._id);
            
            setProduct(prev => ({
                ...prev,
                product_name: props.product_name,
                description: props.description,
                price: props.price,
                id: props._id
            }));
        }
    }, [select]);
    
    useEffect(() => {
        if (product.category) {
            const subcategoryChildren = subcategoryRef.current.children;
            
            Object.values(subcategoryChildren).map((child) => {
                
                if (child.value === props.subcategory) {
                    setProduct(prev => ({ ...prev, subcategory: child.value }));
                }
            });
        }
    }, [product.category]);
    
    const handleUpload = async () => {
    
        const response = await fetch('/api/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: image }),
        });
        const data = await response.json();
        console.log(data);

        data.success && setProduct(prev => ({ ...prev, main_picture: data.image }));
      };


    const connectBackend = async () => {
        console.log('product shown in connectBackend', product);
        const res = await fetch('/api/used-items/see-my-products', {
            method: 'PATCH',
            body: JSON.stringify(product),
            headers: { 'content-type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);

        data.success && router.push('/pages/see-my-products/update-success');
    };

    const updateProduct = async (event) => {
        event.preventDefault();

        console.log('updateProduct executed!');
        console.log('product', product);

        image ? handleUpload() : connectBackend();
    };

    useEffect(() => {
        if (product.main_picture) {
            connectBackend();
        }
    }, [product.main_picture]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {
                updateForm ?
                    <div ref={productContainer} className={styles.seeMyProductContainer}>
                            <h5>Product Name</h5>
                            <input type='text' value={product.product_name}
                                onChange={e => setProduct(prev => ({ ...prev, product_name: e.target.value }))}
                            />

                            <img src={props.main_picture?.url} alt={product.product_name} />

                            <h5>Main Picture</h5>
                            <input
                                type='file'
                                onChange={handleFileChange}
                            />

                            <h5>Condition:</h5>
                            <div>
                                <select ref={conditionRef} id="category" name="category"
                                    value={product.condition}
                                    onChange={(e) => setProduct((prev) => ({ ...prev, condition: e.target.value }))}
                                >
                                    <option value='New'>New</option>
                                    <option value='Used'>Used</option>
                                </select>
                            </div>

                            <h5>Category:</h5>
                            <div>
                                <select ref={categoryRef} id="category" name="category" value={product.category} onChange={(e) => setProduct((prev) => ({ ...prev, category: e.target.value }))}
                                    // required
                                >
                                    {
                                        [ 'Computers & Laptops', 'Components', 'Peripherals', 'Networking',
                                            'Mobile Devices', 'Gaming', 'Audio & Video', 'Smart Home',
                                            ].map((option, index) => <option value={option} key={index}>{option}</option>)
                                    }
                                </select>
                            </div>

                            <h5>Subcategory</h5>
                            {
                                product.category !== '' ? (

                                    <div>
                                        <select ref={subcategoryRef} id="category" name="category" value={product.subcategory} onChange={(e) => setProduct((prev) => ({ ...prev, subcategory: e.target.value }))}
                                        >
                                            {
                                                SubCategories[product.category].map((option, index) => <option value={option} key={index}>{option}</option>)
                                            }
                                        </select>
                                    </div>
                                )

                                :

                                (
                                    <div>
                                        <select ref={subcategoryRef} id="category" name="category" value={product.subcategory} onChange={(e) => setProduct((prev) => ({ ...prev, subcategory: e.target.value }))}
                                        >
                                        <option value='' disabled>Select a main category first</option>
                                        </select>
                                    </div>
                                )
                            }

                            <h5>Description:</h5>
                            <textarea name="" id="" value={product.description} onChange={(e) => setProduct((prev) => ({ ...prev, description: e.target.value }))}></textarea>            

                            <h5>Price:</h5>
                            <input type="text" value={product.price} onChange={(e) => correctPrice(e)}/>

                            <div>

                                <button
                                    onClick={updateProduct}
                                >Update</button>

                            </div>
                    </div>

                    :
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
                                    onClick={changeToForm}
                                >Change</button>
                                <button
                                    onClick={() => deleteProduct(props._id)}
                                >Delete</button>
                            </div>

                        </div>


            }
        </>
    );
};

const SeeMyProducts = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const [ myProducts, setMyProducts ] = useState();

    const fetchMyProducts = async () => {
        const res = await fetch(`/api/used-items/see-my-products/${localDataBank.user._id}`);
        const data = await res.json();

        setMyProducts(data.usedItems);
    };

    useEffect(() => {
        localDataBank.user && fetchMyProducts();
    }, [localDataBank]);

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