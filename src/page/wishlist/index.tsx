import styles from "./index.module.css";
import Wishlist from "../../component/wishlist";


const WishlistPage = () => {
    return (
        <>
            <div className={`global_container ${styles.container}`}>
                <h2 className={styles.header}>Избранное</h2>
                <Wishlist/>
            </div>
        </>
    );
}

export default WishlistPage;
