import React from "react";

import LeftSlider from "./components/left-slider";
import RightSlider from "./components/right-slider";

import styles from "./index.module.css";


const Sliders = (): React.JSX.Element => {
    return (
        <section className={`${styles.section__sliders}`}>
            <div className={`global_container`}>
                <div className={`${styles.wrapper}`}>
                    <LeftSlider/>
                    <RightSlider/>
                </div>
            </div>
        </section>
    );
};

export default Sliders;