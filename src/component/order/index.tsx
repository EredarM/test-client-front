import styles from './index.module.css';
import React, {FC, FormEvent, useState} from 'react';


interface IRadioValue {
    name: string;
    value: string;
    title: string;
    defaultChecked: boolean;
    disable?: boolean;
}

const RadioValue: FC<IRadioValue> = (props): React.JSX.Element => {
    return (
        <label className={`${styles.form__value_wrapper}`}>
            <input className={`${styles.form__value_input}`}
                   disabled={props.disable}
                   name={props.name}
                   type={'radio'}
                   value={props.value}
                   defaultChecked={props.defaultChecked}/>
            <span className={`${styles.form__value} ${props.disable ? styles.form__value_disable : ''}`}>
                {props.title}
            </span>
        </label>
    );
};

const OrderStep = () => {
    const formId = 'orderSubmit';
    // eslint-disable-next-line
    const [isAuth, setAuth] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <form id={formId} className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.form__values_wrapper}>
                        <h3 className={styles.values_wrapper_header}>Способ оплаты</h3>
                        <div className={styles.values_wrapper}>
                            {<RadioValue name={'payment'} value={'1'} title={'Онлайн'} defaultChecked={true}/>}
                            {<RadioValue name={'payment'} value={'2'} title={'При получении'} defaultChecked={false}/>}
                        </div>
                    </div>
                    <div className={styles.form__values_wrapper}>
                        <h3 className={styles.values_wrapper_header}>Способ доставки</h3>
                        <div className={styles.values_wrapper}>
                            {<RadioValue name={'delivery'} value={'1'} title={'Самовывоз'} defaultChecked={true}/>}
                            {<RadioValue name={'delivery'} value={'2'} title={'Куръером'} defaultChecked={false} disable={true}/>}
                            {<RadioValue name={'delivery'} value={'3'} title={'Доставка'} defaultChecked={false} disable={true}/>}
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className={styles.form__values_wrapper}>
                        <h3 className={styles.values_wrapper_header}>Ваши данные</h3>
                        {
                            !isAuth && (
                                <div className={styles.sign_in}>
                                    <p className={styles.sign_in__label}>
                                        Для заказа товаров требуется регистрация. Если вы уже зарегистрированы, войдите в
                                        свою учетную запись.
                                    </p>
                                    <button className={styles.sign_in__btn} type={'button'}>Войти</button>
                                </div>
                            )
                        }
                        <div className={styles.contact__wrapper}>
                            <label className={styles.contact__label} htmlFor='name'>
                                Имя*
                                <input className={styles.contact__input} id={'name'} type='text' required/>
                            </label>
                            <label className={styles.contact__label} htmlFor='surname'>
                                Фамилия*
                                <input className={styles.contact__input} id={'surname'} type='text' required/>
                            </label>
                            <label className={styles.contact__label} htmlFor='phone'>
                                Телефон*
                                <input className={styles.contact__input} id={'phone'} type='tel' required/>
                            </label>
                            <label className={styles.contact__label} htmlFor='email'>
                                E-mail*
                                <input className={styles.contact__input} id={'email'} type='email'/>
                            </label>
                        </div>
                        <div className={styles.conversion__wrapper}>
                            <label className={styles.conversion__label__container}>
                                Получать эксклюзивные скидки в email‑рассылке от ООО "ПРОСТОР"
                                <input className={styles.conversion__label__input}
                                       type="checkbox"
                                       value={'1'}/>
                                <span className={styles.conversion__label__checkmark}></span>
                            </label>
                            <label className={styles.conversion__label__container}>
                                Согласен с условиями Правил пользования торговой площадкой и правилами возврата
                                <input className={styles.conversion__label__input}
                                       type="checkbox"
                                       value={'2'}/>
                                <span className={styles.conversion__label__checkmark}></span>
                            </label>
                        </div>
                    </div>
                </form>

            </div>
            <div className={styles.container__right}>
                <div className={styles.info__top}>
                    <div className={styles.info__top_wrapper}>
                        <span className={styles.info__top_header}>Итого</span>
                        <span className={styles.info__top_header}>30 979 ₽</span>
                    </div>
                    <div className={styles.info__top_wrapper}>
                        <span className={styles.info__top_main}>Товары, 4 шт.</span>
                        <span className={styles.info__top_main}>30 979 ₽</span>
                    </div>
                    <div className={styles.info__top_wrapper}>
                        <span className={styles.info__top_main}>Скидка</span>
                        <span className={styles.info__top_main}>-10 979 ₽</span>
                    </div>
                </div>
                <div className={styles.info__bottom}>
                    <div className={styles.info__bottom_wrapper}>
                        <span className={styles.info__bottom_header}>Доставка: </span>
                        <span className={styles.info__bottom_main}>Самовызов</span>
                    </div>
                    <div className={styles.info__bottom_wrapper}>
                        <span className={styles.info__bottom_header}>Оплата:   </span>
                        <span className={styles.info__bottom_main}>При получении</span>
                    </div>
                </div>

                <button className={styles.info__btn} form={formId} type={'submit'}>Оплатить11</button>
            </div>
        </div>
    );
};

export default OrderStep;