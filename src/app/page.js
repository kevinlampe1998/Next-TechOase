'use client';

import LandingPage from "./pages/landing-page/page";
// import ThreeDExample from "@/components/three-d/component";
import { useState, useEffect } from "react";
import styles from './page.module.css';
import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();
    const [ userDeals, setUserDeals ] = useState();
    const [ firstSection, setFirstSection ] = useState({
        one: [], two: [], three: {}, four: {},
    });
    const [ secondSection, setSecondSection ] = useState({
        one: [], two: [], three: {}, four: {},
    });
    
    const fetchUserDeals = async () => {
        const res = await fetch('/api/used-items/all-items');
        const data = await res.json();

        console.log(data);
        setUserDeals(data.products);
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
            console.log('j',j);
            
            console.log('firstSectionCardThree[j]', firstSectionCardThree[j]);

            setFirstSection(prev => ({ ...prev, three: firstSectionCardThree[j] }));

// ----------------------------------------------------------------------------------------------

            const firstSectionCardFour = userDeals.filter((deal) => deal.category === 'Gaming');
            
            let k = Math.floor(Math.random() * firstSectionCardFour.length);
            console.log('k',k);
            
            console.log('firstSectionCardFour[k]', firstSectionCardFour[k]);

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
            console.log('n',n);
            
            console.log('secondSectionCardThree[n]', secondSectionCardThree[n]);

            setSecondSection(prev => ({ ...prev, three: secondSectionCardThree[n] }));

// ----------------------------------------------------------------------------------------------

            const secondSectionCardFour = userDeals.filter((deal) => deal.category === 'Components');
                        
            let o = Math.floor(Math.random() * secondSectionCardFour.length);
            console.log('o',o);

            console.log('secondSectionCardFour[o]', secondSectionCardFour[o]);

            setSecondSection(prev => ({ ...prev, four: secondSectionCardFour[o] }));


        }
    }, [ userDeals ]);

    return (
        <main className={styles.home}>
            <LandingPage/>
            {/* <ThreeDExample/> */}
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
        </main>
    );
};

export default Home;