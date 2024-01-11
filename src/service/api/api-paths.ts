export const BACKEND_CORE = 'http://localhost:8082';
const LOCALHOST = 'http://localhost:3000';
const HOST = process.env.REACT_APP_ENABLE_API_MOCK ? LOCALHOST : BACKEND_CORE;

export const API_V1 = '/api/v1';
export const GET_CATEGORIES = '/categories';
export const GET_SLIDER = '/banners';
export const GET_PRODUCT = '/products';


export const API_IMG_PATH = process.env.REACT_APP_ENABLE_API_MOCK ? HOST : `${HOST}${API_V1}/image/`;