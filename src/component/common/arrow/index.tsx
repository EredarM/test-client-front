import React, {FC} from "react";
import ReactDOM from "react-dom";

import {ReactComponent as ArrowLeft} from "../../../assets/common/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/common/arrow-right.svg";

import styles from './index.module.css';
import {useSwiper} from "swiper/react";

interface IProps extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
    type: 'left' | 'right';
    idContainer: 'left_main_slider' | 'right_main_slider' | 'sales_hits_slider' | 'season_offer';
}

const Arrow: FC<IProps> = (props) => {
    const container: any = document.getElementById(props.idContainer);

    const swiper = useSwiper();
    const handleClickPrev = React.useCallback(
        () => swiper.slidePrev(),
        [swiper]
    );
    const handleClickNext = React.useCallback(
        () => swiper.slideNext(),
        [swiper]
    );
    const arrowStyle = props.type === 'left' ? styles.left : styles.right;
    const arrowContent = props.type === 'left' ? <ArrowLeft/> : <ArrowRight/>;
    const arrowClick = props.type === 'left' ? handleClickPrev : handleClickNext;

    return container && ReactDOM.createPortal(
        (
            <button className={`${props.className} ${styles.wrapper} ${arrowStyle}`} onClick={arrowClick}>
                {arrowContent}
            </button>

        ),
        container
    );
};

export default Arrow;