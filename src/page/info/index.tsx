import Breadcrumbs from "../../component/common/breadcrumbs";

import styles from './index.module.css';
import Info from "../../component/info";

const InfoPage = () => {
    return (
        <div className={`global_container ${styles.container}`}>
            <Breadcrumbs/>
            <Info/>
        </div>
    );
};

export default InfoPage;