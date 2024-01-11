import Breadcrumbs from "../../component/common/breadcrumbs";

import styles from './index.module.css';
import Catalog from "../../component/catalog";

const CatalogPage = () => {
    return (
        <div className={`global_container ${styles.container}`}>
            <Breadcrumbs/>
            <h2 className={styles.header}>Каталог</h2>
            <Catalog/>
        </div>
    );
};

export default CatalogPage;