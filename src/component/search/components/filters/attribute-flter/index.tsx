import React, {ChangeEvent, FC, useCallback, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {ReactComponent as Arrow} from "../../../../../assets/common/arrow-filter.svg";

import styles from "./index.module.css";


export const AttributeCommonFilter: FC<{ name: string; values: Array<string> }> = React.memo((props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeItem = useMemo(
        () => searchParams.getAll(props.name),
        [searchParams, props.name]
    );

    const [isOpen, setOpen] = useState(activeItem.length > 0);
    const toggleHandler = () => {
        setOpen(!isOpen);
    };

    const handleChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
        let filteredArray: Array<[string, string]> = Array.from(searchParams);
        if (checked) {
            filteredArray.push([name, value]);
        } else {
            filteredArray = filteredArray.filter(([k, v]) => k !== name || v !== value);
        }
        setSearchParams(new URLSearchParams(filteredArray));
    }, [searchParams, setSearchParams]);

    return (
        <>
            <div onClick={toggleHandler} className={`${styles.wrapper} ${styles.pointer}`}>
                <span className={styles.title}>{props.name}</span>
                <Arrow className={isOpen ? styles.icon_open : styles.icon_close}/>
            </div>
            <div className={`${styles.values} ${isOpen ? styles.values_open : styles.values_close}`}>
                <ul className={styles.values__list}>
                    {props.values.map((j, index) => (
                        <li key={index}>
                            <label className={styles.label__container}>
                                {j}
                                <input onChange={handleChecked}
                                       className={styles.label__input}
                                       type="checkbox"
                                       name={props.name}
                                       value={j}
                                       checked={activeItem.includes(j)}
                                />
                                <span className={styles.label__checkmark}></span>
                            </label>
                        </li>)
                    )}
                </ul>
            </div>
        </>
    )
});

export const AttributeToggleFilter: FC<{ name: string }> = React.memo((props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeItem = searchParams.get(props.name);

    const handleChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const updatedSearchParams = new URLSearchParams(searchParams);
        if (checked) {
            updatedSearchParams.append(name, String(true));
        } else {
            updatedSearchParams.delete(name);
        }
        setSearchParams(updatedSearchParams);
    }, [searchParams, setSearchParams]);

    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>{props.name}</span>
            <label className={`${styles.switch} ${styles.pointer}`}>
                <input className={styles.switch__input}
                       name={props.name}
                       type="checkbox"
                       onChange={handleChecked}
                       checked={activeItem !== null}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    );
});