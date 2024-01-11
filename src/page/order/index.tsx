import styles from "./index.module.css";
import Order from "../../component/order";


const OrderPage = () => {
    return (
        <>
            <div className={`global_container ${styles.container}`}>
                <h2 className={styles.header}>Оформление заказа</h2>
                <Order/>
            </div>
        </>
    );
}

export default OrderPage;
