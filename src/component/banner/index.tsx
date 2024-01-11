import {Link} from "react-router-dom";
import React, {useMemo} from "react";

import {useAppSelector} from "../../service/hooks";
import {getCatalogPath} from "../../utils/route-paths";
import {API_IMG_PATH} from "../../service/api/api-paths";

import styles from './banners.module.css';


const Banners = (): React.JSX.Element => {
    const catalogStore = useAppSelector((state) => state.catalog);
    const rootItems = useMemo(
        () => catalogStore.data?.filter(item => item.isRoot),
        [catalogStore.data]
    );

    return (
        <>
            {
                rootItems && (
                    <section className={`${styles.banner}`}>
                        <div className={`global_container`}>
                            <ul className={`${styles.list}`}>
                                {
                                    rootItems.map((i, index) => {
                                        return (
                                            <li key={index} className={`${styles.item}`}>
                                                <Link to={getCatalogPath(i.categoryId, i.childCategories.isEmpty())}>
                                                    <img className={`${styles.item__img}`} src={`${API_IMG_PATH}${i.imageId}`} alt={i.title}
                                                         loading="lazy" width="100%" height="100%"/>
                                                </Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </section>
                )
            }
        </>
    );
};

export default Banners;