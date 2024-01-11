import ReactDOM from "react-dom";

import React, {FC, ReactNode, useCallback, useState} from "react";
import ModalOverlay from "./overlay/modal-overlay";

import styles from "./index.module.css";


export interface IModalInternal {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
}

export interface IModalExternal {
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<IModalExternal> = ({children, onClose}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const modalRoot: any = document.getElementById("modal");

    const onEscClose = useCallback(
        (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    React.useEffect(
        () => {
            document.addEventListener("keydown", onEscClose);
            return () => {
                document.removeEventListener("keydown", onEscClose);
            };
        },
        [onEscClose]
    );

    const handleIcon = React.useCallback(
        () => setIsHovered(!isHovered),
        [isHovered]
    );

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClick={onClose}/>
                <div className={styles.modal}>
                    <div className={`${styles.modal__head} ml-10 mr-10 mt-10 mb-8`}>
                        <div className={styles.modal__button} onClick={onClose} onMouseEnter={handleIcon}
                             onMouseLeave={handleIcon}>
                            {/*<CloseIcon type={isHovered ? "secondary" : "primary"}/>*/}
                        </div>
                    </div>
                    {children}
                </div>
            </>
        ),
        modalRoot
    )
};

export default Modal;