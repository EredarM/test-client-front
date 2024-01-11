import React, {FC} from "react";
import ReactDOM from "react-dom";

import {ReactComponent as ArrowSvg} from "../../../../assets/common/arrow-product-card.svg";

import styles from './index.module.css';
import {useSwiper} from "swiper/react";

interface IProps extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
    type: 'top' | 'bottom';
}

const Arrow: FC<IProps> = (props) => { //TODO слить с обычной стрелкой
    const container: any = document.getElementById(`card__slider`);

    const swiper = useSwiper();
    const handleClickPrev = React.useCallback(
        () => swiper.slidePrev(),
        [swiper]
    );
    const handleClickNext = React.useCallback(
        () => swiper.slideNext(),
        [swiper]
    );
    const arrowStyle = props.type === 'top' ? styles.top : styles.bottom;
    const arrowClick = props.type === 'top' ? handleClickPrev : handleClickNext;

    return container && ReactDOM.createPortal(
        (
            <button className={`${props.className} ${styles.wrapper} ${arrowStyle}`} onClick={arrowClick}>
                <ArrowSvg/>
            </button>

        ),
        container
    );
};

export default Arrow;