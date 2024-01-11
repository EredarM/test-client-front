import React from "react";
import Breadcrumbs from "../../component/common/breadcrumbs";
import styles from './index.module.css';
import Search from "../../component/search";
import { useParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useAppSelector } from "../../service/hooks";

const SearchPage = () => {
    const category = useAppSelector(state => state.catalog.data);
    const [searchParams] = useSearchParams();
    const param = useParams<{ catalogId: string }>();

    const header = useMemo(() => {
        if (param.catalogId && category) {
            const selectedCategory = category.find(i => i.categoryId === param.catalogId);
            return selectedCategory ? selectedCategory.title : "";
        }
        const title = searchParams.get("text");
        if (title) {
            return `По запросу «${title}» найдено:`;
        }
        return "";
    }, [searchParams, param, category]);

    return (
        <>
            <div className={`global_container ${styles.container}`}>
                <Breadcrumbs />
                <h2 className={styles.header}>{header}</h2>
                <Search />
            </div>
        </>
    );
};

export default SearchPage;
