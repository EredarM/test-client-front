import {
    getBannersMock,
    getCategories,
    getProductArray,
    getProductFull,
    getProductMonth
} from "../../mock/service/ApiMock";
import {API_V1, BACKEND_CORE, GET_CATEGORIES, GET_PRODUCT, GET_SLIDER} from "./api-paths";
import {urlBuilderV2} from "../../utils/url-builder";
import {convertParams} from "../../utils/formatter";


interface IRequestOptions {
    method: string;
    headers: {
        "Content-Type"?: string;
        "Accept"?: string;
        "Access-Control-Allow-Origin"?: string;
        authorization?: string;
    };
    body?: string;
}

interface IAttributeRequest {
    key: string;
    values: string[];
}

interface IProductRequest {
    isMonthProduct?: boolean;
    isSalesHits?: boolean;
    isSeasonalOffer?: boolean,
    categoryId?: string;
    priceMin?: number;
    priceMax?: number;
    text?: string | null;
    attributes?: Array<IAttributeRequest>;
}

export const fetchProduct = async (productId: string): Promise<IProductCard> => {
    return fetchWithMockFallback(getProductFull, `${GET_PRODUCT}/${productId}`, undefined, undefined);
};


export const fetchBanners = async (): Promise<Array<Slider>> => {
    return fetchWithMockFallback(getBannersMock, GET_SLIDER, undefined, undefined);
};

export const fetchMonthProducts = async (): Promise<Array<IProductCardShort>> => {
    const body: IProductRequest = {
        isMonthProduct: true,
    };
    return fetchWithMockFallback(getProductMonth, GET_PRODUCT, undefined, body);
};

export const fetchSalesHitsProducts = async (): Promise<Array<IProductCardShort>> => {
    const body: IProductRequest = {
        isSalesHits: true,
    };
    return fetchWithMockFallback(getProductArray, GET_PRODUCT, undefined, body);
};

export const fetchSeasonalOfferProducts = async (): Promise<Array<IProductCardShort>> => {
    const body: IProductRequest = {
        isSeasonalOffer: true,
    };
    return fetchWithMockFallback(getProductArray, GET_PRODUCT, undefined, body);
};

export const fetchSearchProducts = async (
    { params, catalogId, text }: { params: URLSearchParams; catalogId?: string; text?: string }
): Promise<IProductCardShort[]> => {
    const priceMin = params.get("priceMin") ? Number(params.get("priceMin")) : undefined;
    const priceMax = params.get("priceMax") ? Number(params.get("priceMax")) : undefined;
    const attributes = convertParams(params);

    const body: IProductRequest = {
        categoryId: catalogId,
        priceMin: priceMin,
        priceMax: priceMax,
        text: text,
        attributes: attributes,
    };
    return fetchWithMockFallback(getProductArray, GET_PRODUCT, undefined, body);
};

export const fetchCategories = async (): Promise<Array<ICategoryV2>> => {
    return fetchWithMockFallback(getCategories, GET_CATEGORIES);
};

const fetchWithMockFallback = async (mockFn: Function, url: string, params?: URLSearchParams, postBody?: any): Promise<any> => {
    if (process.env.REACT_APP_ENABLE_API_MOCK === "true") {
        return mockFn();
    }


    const requestOptions: IRequestOptions = {
        method: "GET",
        headers: {"Accept": "application/json"}
    };
    if (postBody) {
        requestOptions.method = "POST";
        requestOptions.headers = {
            ...requestOptions.headers,
            "Content-Type": "application/json"
        };
        requestOptions.body = JSON.stringify(postBody);
    } else {
        requestOptions.method = "GET";
    }

    const executeUrl = urlBuilderV2(`${BACKEND_CORE}${API_V1}${url}`, params)
    return await fetch(executeUrl, requestOptions).then(checkResponse);
};

const checkResponse = (res: Response): Promise<any> => {
    return res.ok
        ? res.json() : res.json().then(err => {
            const error: ErrorResponse = {
                code: err.status,
                errorMsq: err.message
            };
            return Promise.reject(error);
        });
};



// eslint-disable-next-line
async function fetchDataWithAuthorization(): Promise<any> {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh-token");

    if (!token || !refreshToken) {
        throw new Error("Tokens not found in localStorage");
    }

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch("https://test.ru", { headers });

        if (response.status === 401) {
            const refreshTokenResponse = await fetch("https://test.ru/refreshToken", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (refreshTokenResponse.status === 200) {
                const newToken = await refreshTokenResponse.text();
                localStorage.setItem("token", newToken);
                return fetchDataWithAuthorization();
            }

            throw new Error("Failed to refresh token");
        }

        // Handle other response statuses here if needed
        // ...

        return await response.json();
    } catch (error: any) {
        throw new Error("Failed to fetch data: " + error.message);
    }
}

