import styles from "./index.module.css";
import Cart from "../../component/cart";


const CartPage = () => {
    return (
        <>
            <div className={`global_container ${styles.container}`}>
                <h2 className={styles.header}>Корзина</h2>
                <Cart/>
            </div>
        </>
    );
}

export default CartPage;
