'use client';

import { useState, useEffect } from "react";
import styles from './page.module.css';

const NewInStoreSingleProduct = ({ params }) => {

    const [ computerId, setComputerId ] = useState(null);
    const [ product, setProduct ] = useState(null);
    const [ computer, setComputer ] = useState();
    const [ image, setImage ] = useState();
    const [ imagePreview, setImagePreview ] = useState();
    const [ imageId, setImageId ] = useState();
    const [ otherPics, setOtherPics ] = useState();
    const [ noOtherPics, setNoOtherPics ] = useState(false);

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setComputerId(resolvedParams.id);
        };

        getId();
    }, [params]);

    useEffect(() => {
        console.log('computerId',computerId);
    });

    const fetchProduct = async () => {
        const res = await fetch(`/api/new-in-store/${computerId}`);
        const data = await res.json();

        console.log(data);
        setComputer(data);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

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

    useEffect(() => {
        if (computerId) {
            fetchProduct();
        }
    }, [computerId]);

    const postImage = async (event) => {
        event.preventDefault();

        if (!image) {
            alert('image not in input');
        }

        const res = await fetch("/api/image", {
            method: "POST",
            body: JSON.stringify({ data: image }),
        });
        const data = await res.json();
        console.log("imageData", data);
        
        setImageId(data.image._id);
    };

    const postOtherPic = async () => {
        const res = await fetch('/api/admin/add-other-pics', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ computerId, imageId })
        });
        const data = await res.json();

        console.log('postOtherPic data', data);

        if (data.maxSize) {
            alert('Limit of images is reached!');
            return;
        }

        location.reload();
    };

    useEffect(() => {
        if (imageId) {
            console.log('image', imageId);
            postOtherPic();
        }
    }, [imageId]);

    const fetchCurrentOtherPics = async () => {
        const res = await fetch('/api/admin/get-other-pics', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ computerId })
        });
        const data = await res.json();

        console.log('fetchCurrentOtherPics data', data);

        if (data.noPics) {
            setNoOtherPics(true);

            return;
        }

        setOtherPics(data.otherPics);
    };

    useEffect(() => {
        computerId && fetchCurrentOtherPics();
    }, [computerId]);

    // const fetchImagePerDoc = async () => {
    //     const res = await fetch();
    //     const data = await res.json();

    //     console.log('', data);
    // };

    // useEffect(() => {
    //     if (otherPics) {

    //     }
    // }, [otherPics]);

    const removeAllOtherPics = async () => {
        const res = await fetch('/api/admin/delete-other-pics', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ computerId })
        });
        const data = await res.json();

        console.log('removeAllOtherPics data', data);
        location.reload();
    };

    return (
        <main className={styles.newInStoreSingleProduct}>

            {
                computer ?
                
                    <section key={computer._id}>
                        <h2>{computer.manufacturer}</h2>
                        <h3>{computer.model}</h3>
                        <img src={computer?.main_picture?.url} />
                        <div>
                            <input type="file" name="image" onChange={handleImageChange} />
                            {imagePreview && <img src={imagePreview} alt="Preview" />}
                            <button onClick={postImage}>Submit other pic</button>
                        </div>
                        <div className={styles.currentOtherPics}>
                            {
                                otherPics ?

                                otherPics.map((pic) => (
                                    <img src={pic?.url} key={pic._id}/>
                                )) 
                                : noOtherPics ? <div>No other Pics</div>
                                : <div>... loading</div>
                            }
                        </div>
                        <div>
                            <button onClick={removeAllOtherPics}>Remove pic set</button>
                        </div>
                    </section>
                 : <div>...loading</div>
            }
        </main>
    );
};

export default NewInStoreSingleProduct;