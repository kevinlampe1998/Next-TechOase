"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { TheContext } from "@/components/context-provider/component";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { SubCategories } from "../set-used-item/page";

const Products = () => {
    const router = useRouter();
    const [ userDeals, setUserDeals ] = useState();
    const [ firstSection, setFirstSection ] = useState({
        one: [], two: [], three: {}, four: {},
    });
    const [ secondSection, setSecondSection ] = useState({
        one: [], two: [], three: {}, four: {},
    });
    const [ thirdSection, setThirdSection ] = useState();
    const [ computers, setComputers ] = useState();
    const [ slideShow, setSlideShow ] = useState('0%');
    const slidePics = useRef();
    const slideLeftButton = useRef();
    const slideRightButton = useRef();

    
    const fetchUserDeals = async () => {
        const res = await fetch('/api/used-items/all-items');
        const data = await res.json();

        setUserDeals(data.products);
        setComputers(data.products.slice(data.products.length - 10, data.products.length));
    };

    useEffect(() => {
        fetchUserDeals();
    }, []);

    useEffect(() => {
        if (userDeals) {

            setFirstSection(prev => ({ ...prev, one: [ ...prev.one, userDeals[1] ] }));
            setFirstSection(prev => ({ ...prev, one: [ ...prev.one, userDeals[2] ] }));
            setFirstSection(prev => ({ ...prev, one: [ ...prev.one, userDeals[3] ] }));
            setFirstSection(prev => ({ ...prev, one: [ ...prev.one, userDeals[4] ] }));

// ----------------------------------------------------------------------------------------------

            let i = 0;

            const firstSectionCardTwo = userDeals.filter((deal) => {
                if ((i < 4) && deal.category === 'Smart Home') {
                    i++;
                    return true;
                } else {
                    return false;
                }
            });

            setFirstSection(prev => ({ ...prev, two: firstSectionCardTwo }));

// ----------------------------------------------------------------------------------------------

            const firstSectionCardThree = userDeals.filter((deal) => deal.category === 'Audio & Video');
            
            let j = Math.floor(Math.random() * firstSectionCardThree.length);
            
            setFirstSection(prev => ({ ...prev, three: firstSectionCardThree[j] }));

// ----------------------------------------------------------------------------------------------

            const firstSectionCardFour = userDeals.filter((deal) => deal.category === 'Gaming');
            
            let k = Math.floor(Math.random() * firstSectionCardFour.length);

            setFirstSection(prev => ({ ...prev, four: firstSectionCardFour[k] }));

// ----------------------------------------------------------------------------------------------

            let l = 0;

            const secondSectionCardOne = userDeals.filter((deal) => {
                if ((l < 4) && deal.category === 'Mobile Devices') {
                    l++;
                    return true;
                } else {
                    return false;
                }
            });

            setSecondSection(prev => ({ ...prev, one: secondSectionCardOne }));

// ----------------------------------------------------------------------------------------------

            let m = 0;

            const secondSectionCardTwo = userDeals.filter((deal) => {
                if ((m < 4) && deal.category === 'Networking') {
                    m++;
                    return true;
                } else {
                    return false;
                }
            });

            setSecondSection(prev => ({ ...prev, two: secondSectionCardTwo }));

// ----------------------------------------------------------------------------------------------

            const secondSectionCardThree = userDeals.filter((deal) => deal.category === 'Peripherals');
            
            let n = Math.floor(Math.random() * secondSectionCardThree.length);
            
            setSecondSection(prev => ({ ...prev, three: secondSectionCardThree[n] }));

// ----------------------------------------------------------------------------------------------

            const secondSectionCardFour = userDeals.filter((deal) => deal.category === 'Components');
                        
            let o = Math.floor(Math.random() * secondSectionCardFour.length);

            setSecondSection(prev => ({ ...prev, four: secondSectionCardFour[o] }));

// ----------------------------------------------------------------------------------------------

            const preThirdSection = userDeals.filter((deal) => deal.category === 'Gaming');

            const thirdSectionData = preThirdSection.slice(0, 6);

            setThirdSection(thirdSectionData);

        }
    }, [ userDeals ]);

    // const fetchComputers = async () => {
    //     const res = await fetch('/api/home/computer-samples');
    //     const data = await res.json();
    //     console.log(data);
    //     setComputers(data.computers);
    // };

    // useEffect(() => {
    //     fetchComputers();
    // }, []);

    const slideToRight = () => {
        const newSlideValue = `${Number(slideShow.split('').slice(0, slideShow.length - 1).join('')) - 100}%`;
        console.log('newSlideValue', newSlideValue);

        slidePics.current.style.left = newSlideValue;

        setSlideShow(newSlideValue);
    };

    const slideToLeft = () => {
        const newSlideValue = `${Number(slideShow.split('').slice(0, slideShow.length - 1).join('')) + 100}%`;
        console.log('newSlideValue', newSlideValue);

        slidePics.current.style.left = newSlideValue;

        setSlideShow(newSlideValue);
    };

    useEffect(() => {
        slideShow === '0%' && (slideLeftButton.current.style.display = 'none');
        slideShow !== '0%' && (slideLeftButton.current.style.display = 'block');

        slideShow === '-900%' && (slideRightButton.current.style.display = 'none');
        slideShow !== '-900%' && (slideRightButton.current.style.display = 'block');
    }, [slideShow]);

    const seeAllUserDeals = () => {
        dispatch({ type: 'user-deals-see-all-items' });
    };

    return (
        <div className={styles.products}>

                            
                    <div>
                        <section className={styles.slideShow}>

                            <div>
                                <div ref={slidePics}>
                                {
                                    computers ?
                                    
                                    computers.map(computer => (
                                        <img src={computer?.main_picture?.url} key={computer._id}/>
                                    ))
        
                                    : <div>... loading</div>
                                }
                                </div>
                                <button onClick={slideToLeft} ref={slideLeftButton} className={styles.slideLeftButton}>{'Prev'}</button>
                                <button onClick={slideToRight} ref={slideRightButton} className={styles.slideRightButton}>{'Next'}</button>
                            </div>
                        </section>
                        <section className={styles.homeSectionSpace50}></section>
                        <section className={styles.seeAllUserDealsButton}>
                            <button onClick={() => router.push('/pages/used-items/all-items')}>See All User Deals</button>
                        </section>
                        <section className={styles.homeSectionSpace50}></section>

                        <section className={styles.homeFirstSection}>
                            {
                                userDeals ?
                                    
                                <div className={styles.homeFourProducts}>
                                    <h2>User Deals</h2>
                                    <div>
                                        <img src={firstSection.one[0]?.main_picture?.url} />
                                        <img src={firstSection.one[1]?.main_picture?.url} />
                                        <img src={firstSection.one[2]?.main_picture?.url} />
                                        <img src={firstSection.one[3]?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                            {
                                userDeals ?
                                    
                                <div className={styles.homeFourProducts}>
                                    <h2>Smart Home</h2>
                                    <div>
                                        <img src={firstSection.two[0]?.main_picture?.url} />
                                        <img src={firstSection.two[1]?.main_picture?.url} />
                                        <img src={firstSection.two[2]?.main_picture?.url} />
                                        <img src={firstSection.two[3]?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                            {
                                userDeals ?
                                    
                                <div className={styles.homeOneProduct}>
                                    <h2>Audio & Video</h2>
                                    <div>
                                        <img src={firstSection.three?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                                            {
                                userDeals ?
                                    
                                <div className={styles.homeOneProduct}>
                                    <h2>Gaming</h2>
                                    <div>
                                        <img src={firstSection.four?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                        </section>
                        <section className={styles.homeFirstSection}>
                            {
                                userDeals ?
                                    
                                <div className={styles.homeFourProducts}>
                                    <h2>Mobile Devices</h2>
                                    <div>
                                        <img src={secondSection.one[0]?.main_picture?.url} />
                                        <img src={secondSection.one[1]?.main_picture?.url} />
                                        <img src={secondSection.one[2]?.main_picture?.url} />
                                        <img src={secondSection.one[3]?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                            {
                                userDeals ?
                                    
                                <div className={styles.homeFourProducts}>
                                    <h2>Networking</h2>
                                    <div>
                                        <img src={secondSection.two[0]?.main_picture?.url} />
                                        <img src={secondSection.two[1]?.main_picture?.url} />
                                        <img src={secondSection.two[2]?.main_picture?.url} />
                                        <img src={secondSection.two[3]?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                            {
                                userDeals ?
                                    
                                <div className={styles.homeOneProduct}>
                                    <h2>Peripherals</h2>
                                    <div>
                                        <img src={secondSection.three?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                                            {
                                userDeals ?
                                    
                                <div className={styles.homeOneProduct}>
                                    <h2>Components</h2>
                                    <div>
                                        <img src={secondSection.four?.main_picture?.url} />
                                    </div>
                                </div> : <div>... loading</div>
                            }
                        </section>
                        <section className={styles.thirdSection}>
        
                            <h2>For our Gamers</h2>
        
                            <div>
                                {
                                    thirdSection && thirdSection.map(deal => (
                                        <img key={deal._id} src={deal?.main_picture?.url}/>
                                    ))
                                }
                            </div>
        
                        </section>
                    </div>


        </div>
    );
};

export default Products;
