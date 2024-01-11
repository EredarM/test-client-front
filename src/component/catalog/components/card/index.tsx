import {FC} from "react";
import {Link} from "react-router-dom";

import {textFormat} from "../../../../utils/formatter";

import styles from './index.module.css';
import {ICatalog} from "../../../../service/reducers/catalog";
import {API_IMG_PATH} from "../../../../service/api/api-paths";
import {getCatalogPath} from "../../../../utils/route-paths";


const CategoryCard:FC<Omit<ICatalog, | 'isRoot'>> = (props) => {
    return (
        <div className={styles.container}>
            <Link to={getCatalogPath(props.categoryId, props.childCategories.isEmpty())} className={styles.wrapper}>
                <img src={`${API_IMG_PATH}${props.imageId}`} alt={props.title} />
                <div className={styles.title_wrapper}>
                    <h3 className={styles.header}>{props.title}</h3>
                    <p className={styles.description}>{props.productCount} {textFormat(props.productCount, 'category')}</p>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;