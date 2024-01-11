import styles from "./index.module.css";
import Compare from "../../component/compare";


const ComparePage = () => {
    return (
        <>
            <div className={`global_container ${styles.container}`}>
                <h2 className={styles.header}>Сравнение</h2>
                <Compare/>
            </div>
        </>
    );
}

export default ComparePage;
