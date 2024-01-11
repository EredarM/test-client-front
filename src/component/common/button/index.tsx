import React, {FC} from "react";
import {ReactComponent as CartIcon} from "../../../assets/button/cart.svg";
import styles from './index.module.css';

type TIcon = 'cart' | 'trash';

interface Props extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
    productId: string;
    isActive: boolean;
    icon?: TIcon;
    text?: string;
}

const getIcon = (icon: TIcon, isActive: boolean) => {
    const style = isActive ? styles.btn__icon_active : styles.btn__icon;
    switch (icon) {
        case "cart":
            return (<CartIcon className={style}/>);
        case "trash":
            return (<CartIcon className={style}/>);
    }
}

const Button: FC<Props> = (props) => {
    const icon = props.icon && getIcon(props.icon, props.isActive);
    const style = props.isActive ? styles.btn__active : styles.btn;

    return (
        <button
            type={'button'}
            className={`${style} ${props.className} ${icon && styles.btn_content}`}
            onClick={props.onClick}
        >
            {icon}
            {props.text && (<span>{props.text}</span>)}
        </button>
    );
}

export default React.memo(Button);
