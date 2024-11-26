'use client';

import { useState, useRef, useContext, useEffect } from 'react';
import { TheContext } from '@/components/context-provider/component';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

 export const SubCategories = {
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

const SetUsedItem = () => {
    const docMessage = useRef();
    const picMessage = useRef();
    const [ usedItem, setUsedItem ] = useState({
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
    const { localDataBank, dispatch } = useContext(TheContext);
    const [ imageUploadSuccess, setImageUploadSuccess ] = useState(false);
    const [ image, setImage ] = useState(null);
    const router = useRouter();
    const [ imagePreview, setImagePreview ] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }

        if (!file) setImagePreview(null); 

        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
    
        setUsedItem(prev => ({ ...prev, seller: localDataBank.user._id }));
    
        const response = await fetch('/api/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: image }),
        });
        const data = await response.json();
        console.log(data);
    
        data.success && setUsedItem(prev => ({ ...prev, main_picture: data.image._id }));
        data.success && setImageUploadSuccess(true);
    
        data.error && (picMessage.current.style.color = 'red');
        data.error && (picMessage.current.innerHTML = data.message);
    
      };
    
      const postProduct = async () => {
        console.log('postProduct executed');
    
        const res = await fetch('/api/used-items/set-used-item', {
          method: 'POST', body: JSON.stringify(usedItem)
        });
        const data = await res.json();
        console.log(data);
    
        data.error && (docMessage.current.style.color = 'red');
        data.error && (docMessage.current.innerHTML = data.message);
    
        data.success && router.push('/pages/set-used-item/success');
    
        data.error && setImageUploadSuccess(false);
    
      };

      const correctPrice = (event) => {
        const value = event.target.value;
    
        if (value.length < 4) {
            const removedComma = value.replace(',', '');
            const unshiftZeroComma = removedComma.split('');
            unshiftZeroComma.unshift('0,');
            setUsedItem((prev) => ({ ...prev, price: unshiftZeroComma.join('')}));
            return;
        }
    
        
        const numbers = '0123456789'.split('');
        
        const lastChar = value.slice(-1);
        
        if (!numbers.includes(lastChar)) {
            setUsedItem((prev) => ({ ...prev, price: value.slice(0, -1)}));
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
            setUsedItem((prev) => ({ ...prev, price: removedZero.join('')}));
    
            return;
        }
    
        setUsedItem(prev => ({ ...prev, price: prePrice }));
      };

      useEffect(() => {
        console.log(usedItem);
      });

      useEffect(() => {
        localDataBank.user && setUsedItem(prev => ({ ...prev,
            user_who_sells: localDataBank.user._id,
            seller_name: `${localDataBank.user.firstName} ${localDataBank.user.lastName}`
        }));
      }, [localDataBank]);

      useEffect(() => {
        usedItem.main_picture && imageUploadSuccess && postProduct();
      }, [imageUploadSuccess]);
    
    return (
        <form className={styles.setProduct} onSubmit={handleUpload}>
            <h2>Set product to sell</h2>

            <label htmlFor="">Product name</label>
            <input type="text" value={usedItem.product_name} onChange={(e) => setUsedItem((prev) => ({ ...prev, product_name: e.target.value }))}/>

            <label htmlFor="" className={styles.fileLabel}>Main Picture</label>
            <input type="file" onChange={handleFileChange}/>

            {imagePreview && (
                <img 
                    src={imagePreview} 
                    alt="Preview"
                    className={styles.imagePreviewClass}
                />
            )}

            <div>
                <label>Condition</label>
                <select id="category" name="category" value={usedItem.condition} onChange={(e) => setUsedItem((prev) => ({ ...prev, condition: e.target.value }))}
                    // required
                >
                    <option value='' disabled>Choose a condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Used</option>
                </select>
            </div>

            <div>
                <label>Category</label>
                <select id="category" name="category" value={usedItem.category} onChange={(e) => setUsedItem((prev) => ({ ...prev, category: e.target.value }))}
                    // required
                >
                    <option value='' disabled>Choose a category</option>
                    {
                        [ 'Computers & Laptops', 'Components', 'Peripherals', 'Networking',
                            'Mobile Devices', 'Gaming', 'Audio & Video', 'Smart Home',
                            ].map((option, index) => <option value={option} key={index}>{option}</option>)
                    }
                </select>
            </div>

            {
                usedItem.category !== '' ? (

                    <div>
                        <label>Subcategory</label>
                        <select id="category" name="category" value={usedItem.subcategory} onChange={(e) => setUsedItem((prev) => ({ ...prev, subcategory: e.target.value }))}
                            // required
                        >
                            <option value='' disabled>Choose a subcategory</option>
                            {
                                SubCategories[usedItem.category].map((option, index) => <option value={option} key={index}>{option}</option>)
                            }
                        </select>
                    </div>
                )

                :

                (
                    <div>
                        <label>Subcategory</label>
                        <select id="category" name="category" value={usedItem.subcategory} onChange={(e) => setUsedItem((prev) => ({ ...prev, subcategory: e.target.value }))}
                            // required
                        >
                            <option value='' disabled>Select a main category first</option>
                        </select>
                    </div>
                )
            }


            <label htmlFor="">Description</label>
            <textarea name="" id="" value={usedItem.description} onChange={(e) => setUsedItem((prev) => ({ ...prev, description: e.target.value }))}></textarea>

            <label htmlFor="">Price</label>
            <input type="text" value={usedItem.price} onChange={(e) => correctPrice(e)}/>

            <button className={styles.submitButton} type='submit'>Submit</button>
            <h3 ref={docMessage}></h3>
            <h3 ref={picMessage}></h3>
        </form>
    );
};

export default SetUsedItem;