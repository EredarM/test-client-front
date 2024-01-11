import Breadcrumbs from "../../component/common/breadcrumbs";
import ProductCardInfo from "../../component/product-card-info";
import styles from "./index.module.css";
import {useAppDispatch, useAppSelector} from "../../service/hooks";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getProduct} from "../../service/reducers/product";

const ProductCardPage = () => {
    const dispatch = useAppDispatch();
    const {productId} = useParams<{ productId: string }>();
    const fullProductStore = useAppSelector((state) => state.products.fullProductData);

    useEffect(() => {
        if (productId) {
            dispatch(getProduct(productId))
        } else {
            // TODO: Handle 404 error
        }
    }, [productId, dispatch]);


    return (
        <div className={`global_container ${styles.container}`}>
            <Breadcrumbs/>
            {
                fullProductStore.data && (
                    <ProductCardInfo productId={fullProductStore.data.productId}
                                     description={fullProductStore.data.description}
                                     feedbacks={fullProductStore.data.feedbacks}
                                     imageIds={fullProductStore.data.imageIds}
                                     title={fullProductStore.data.title}
                                     article={fullProductStore.data.article}
                                     commentCount={fullProductStore.data.commentCount}
                                     isLicensedProduct={fullProductStore.data.isLicensedProduct}
                                     rating={fullProductStore.data.rating}
                                     priceNew={fullProductStore.data.priceNew}
                                     priceOld={fullProductStore.data.priceOld}
                                     categoryId={fullProductStore.data.categoryId}
                                     purchasesCount={fullProductStore.data.purchasesCount}
                                     attributes={fullProductStore.data.attributes}/>
                )
            }
        </div>
    );
};

export default ProductCardPage;