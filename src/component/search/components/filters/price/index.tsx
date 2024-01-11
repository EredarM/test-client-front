import ReactSlider from "react-slider";
import React, {FC, useCallback, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";

import styles from './index.module.css';
import './index.css'


const PriceFilter: FC<{
    currentPriceMin: string | null,
    currentPriceMax: string | null;
    priceMin: string,
    priceMax: string
}> = ({currentPriceMin, currentPriceMax, priceMin, priceMax}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const leftInputRef = useRef<HTMLInputElement>(null);
    const rightInputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState<{ x1: string; x2: string }>({
        x1: currentPriceMin ? currentPriceMin : priceMin,
        x2: currentPriceMax ? currentPriceMax : priceMax
    });
    const [rangeValue, setRangeValue] = useState<number[]>([
        Number(currentPriceMin ? currentPriceMin : priceMin),
        Number(currentPriceMax ? currentPriceMax : priceMax)
    ]);

    const setPriceUrlParam = useCallback((priceMin: string, priceMax: string) => {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.set('priceMin', priceMin);
        updatedSearchParams.set('priceMax', priceMax);
        setSearchParams(updatedSearchParams);
    }, [searchParams, setSearchParams]);

    const handleSliderChange = useCallback((currentValue: number[]) => {
        setRangeValue(currentValue);
        setValue({x1: currentValue[0].toString(), x2: currentValue[1].toString()});
    }, []);

    const handleInputBlur = useCallback((inputRef: React.RefObject<HTMLInputElement>, valueKey: 'x1' | 'x2') => {
        const n = inputRef.current?.value;
        if (!isNaN(Number(n))) {
            const newValue = [valueKey === 'x1' ? Number(n) : rangeValue[0], valueKey === 'x2' ? Number(n) : rangeValue[1]];
            setRangeValue(newValue);
            setValue({x1: newValue[0].toString(), x2: newValue[1].toString()});
            setPriceUrlParam(newValue[0].toString(), newValue[1].toString());
        }
    }, [rangeValue, setPriceUrlParam]);

    return (
        <div className={styles.container}>
            <span className={styles.title}>Цена</span>
            <div className={styles.wrapper}>
                <>
                    <div className={styles.input__container}>
                        <div onClick={() => leftInputRef.current?.focus()} className={styles.input__container_left}>
                            <p className={styles.label}>От</p>
                            <input
                                ref={leftInputRef}
                                className={styles.input}
                                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur(leftInputRef, 'x1')}
                                onBlur={() => handleInputBlur(leftInputRef, 'x1')}
                                type="text"
                                name="priceMin"
                                value={value.x1}
                                onChange={(e) => setValue({...value, x1: e.target.value})}
                            />
                        </div>
                        <div onClick={() => rightInputRef.current?.focus()} className={styles.input__container_right}>
                            <p className={styles.label}>До</p>
                            <input
                                ref={rightInputRef}
                                className={styles.input}
                                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur(rightInputRef, 'x2')}
                                onBlur={() => handleInputBlur(rightInputRef, 'x2')}
                                type="text"
                                name="priceMax"
                                value={value.x2}
                                onChange={(e) => setValue({...value, x2: e.target.value})}
                            />
                        </div>
                    </div>
                </>
                <>
                    <ReactSlider
                        className={styles.slider__container}
                        thumbClassName={`price__thumb`}
                        trackClassName={`price__track`}
                        onChange={(value) => handleSliderChange(value)}
                        onAfterChange={(value) => setPriceUrlParam(value[0].toString(), value[1].toString())}
                        value={rangeValue}
                        min={Number(priceMin)}
                        max={Number(priceMax)}
                    />
                </>
            </div>
        </div>
    );
};

export default PriceFilter;
