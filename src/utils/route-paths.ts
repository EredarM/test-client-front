export const catalog = '/catalog';
export const product = '/product';

export const order = '/order';
export const profilePath = '/profile';
export const wishlistRoutePath = '/wishlist';
export const compareRoutePath = '/compare';
export const cartRoutePath = '/cart';

export const rootRoutePath = '/';
export const productRoutePath = `${product}/:productId`;
export const catalogRoutePath = `${catalog}/:catalogId`;
export const searchRoutePath = '/search';


export const infoRoutePath = `/info/`;
export const infoAboutCompanyRoute = `about-company`;
export const infoCertificateRoute = `certificate`;
export const infoDeliveryRoute = `delivery`;
export const infoPaymentRoute = `payment`;
export const infoLicensedProductRoute = `licensed-product`;

export const infoAboutCompanyRoutePath = `${infoRoutePath}${infoAboutCompanyRoute}`;
export const infoCertificateRoutePath = `${infoRoutePath}${infoCertificateRoute}`;
export const infoDeliveryRoutePath = `${infoRoutePath}${infoDeliveryRoute}`;
export const infoPaymentRoutePath = `${infoRoutePath}${infoPaymentRoute}`;
export const infoLicensedProductRoutePath = `${infoRoutePath}${infoLicensedProductRoute}`;


export const productByCatalogRoutePath = `${catalog}/:catalogId${product}`;

export const getCatalogPath = (categoryId: string, isLastCatalog: boolean) => {
    return isLastCatalog ? `${catalog}/${categoryId}${product}` : `${catalog}/${categoryId}`;
}