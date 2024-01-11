interface ApiStatus {
    loading: boolean;
    success: boolean;
    error: string;
}

interface Slider {
    readonly imgId: string;
    readonly title: string;
    readonly sort: number;
}

interface IProductCardShort {
    readonly productId: string;
    readonly imageIds: Array<string>;
    readonly title: string;
    readonly article: string;
    readonly commentCount: number;
    readonly isLicensedProduct: boolean;
    readonly rating: number;
    readonly priceNew: number | null;
    readonly priceOld: number;
    readonly categoryId: string;
    readonly purchasesCount: number;
    readonly attributes: Array<IProductCardAttribute>;
}

interface Feedback {
    readonly name: string;
    readonly time: string;
    readonly rating: number;
    readonly advantages: string;
    readonly disadvantages: string;
    readonly comment: string;
    readonly likeCount: number;
    readonly dislikeCount: number;
}

interface IProductCardAttribute {
    readonly name: string;
    readonly value: string;
}

interface IProductCard extends IProductCardShort {
    readonly description: string;
    readonly feedbacks: Array<Feedback>;
}

interface ICategoryV2 {
    readonly categoryId: string;
    readonly parentCategoryId: string | null;
    readonly imageId: string;
    readonly title: string;
    readonly productCount: number;
}

interface ErrorResponse {
    code: string
    errorMsq: string
}


interface ApiResponse<T> {
    data: T | null;
    status: Status;
    error: ErrorResponse | null;
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';