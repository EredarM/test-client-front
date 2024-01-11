import leftSlider1 from '../img/left-slider-1.png';
import leftSlider2 from '../img/left-slider-2.png';
import leftSlider3 from '../img/left-slider-3.png';
import rightSlider1 from '../img/right-slider-1.png';
import rightSlider2 from '../img/right-slider-2.png';
import rightSlider3 from '../img/right-slider-3.png';
import rightSlider4 from '../img/right-slider-4.png';
import rightSlider5 from '../img/right-slider-5.png';
import categoryGun from '../img/category.png';

import BannerGun from "../../assets/banner/banner-gun.png";
import BannerFishing from "../../assets/banner/banner-fishing.png";
import BannerHunting from "../../assets/banner/banner-hunting.png";
import BannerTourism from "../../assets/banner/banner-tourism.png";

import {v4 as uuid} from "uuid";


export const getBannersMock = async (): Promise<Array<Slider>> => {
    return [
        {
            title: 'Навзание 1',
            imgId: leftSlider1,
            sort: 2
        },
        {
            title: 'Навзание 2',
            imgId: leftSlider2,
            sort: 1
        },
        {
            title: 'Навзание 3',
            imgId: leftSlider3,
            sort: 3
        },
        {
            title: 'Навзание 4',
            imgId: leftSlider1,
            sort: 4
        },
        {
            title: 'Навзание 5',
            imgId: leftSlider3,
            sort: 5
        }
    ];
};

export const getProduct = async (): Promise<Array<IProductCardShort>> => {
    return [
        {
            productId: uuid(),
            article: "7534234131",
            imageIds: [rightSlider1],
            title: "Бинокль Nikon Aculon T02 10x21 черный",
            commentCount: 11,
            rating: 4.5,
            isLicensedProduct: true,
            priceNew: 143400000,
            priceOld: 1434000000,
            categoryId: "g4v3t3t3ct3",
            purchasesCount: 10,
            attributes: [
                {
                    name: "Тип ружья",
                    value: "Одноствольное",
                },
                {
                    name: "Калибр",
                    value: "12х76",
                },
                {
                    name: "Масса, кг",
                    value: "2,8",
                },
                {
                    name: "Материал приклада",
                    value: "Дуб",
                }
            ]
        },
        {
            productId: uuid(),
            article: "635241",
            imageIds: [rightSlider1],
            title: "Бинокль Nikon Aculon T02 10x21 черный",
            commentCount: 11,
            rating: 4.3,
            isLicensedProduct: false,
            priceNew: null,
            priceOld: 100,
            categoryId: "wdq324124",
            purchasesCount: 10,
            attributes: [
                {
                    name: "Тип ружья",
                    value: "Двустовльное",
                },
                {
                    name: "Калибр",
                    value: "12х777",
                },
                {
                    name: "Масса, кг",
                    value: "5",
                },
                {
                    name: "Материал приклада",
                    value: "Дерево",
                }
            ]
        },
        {
            productId: uuid(),
            article: "dqwdqw",
            imageIds: [rightSlider1],
            title: "Бинокль Nikon Aculon T02 10x21 черный",
            commentCount: 11,
            isLicensedProduct: true,
            rating: 4.3,
            priceNew: null,
            priceOld: 6000,
            categoryId: "wdq324124",
            purchasesCount: 10,
            attributes: [
                {
                    name: "Тип ружья",
                    value: "Крутое",
                },
                {
                    name: "Масса, кг",
                    value: "1",
                },
                {
                    name: "Материал приклада",
                    value: "Металл",
                }
            ]
        }
    ]
};

export const getProductMonth = async (): Promise<Array<IProductCardShort>> => {
    return [
        {
            productId: uuid(),
            article: "7534234131",
            imageIds: [rightSlider1],
            title: "Бинокль Nikon Aculon T02 10x21 черный",
            commentCount: 11,
            rating: 4.5,
            isLicensedProduct: false,
            priceNew: 8340,
            priceOld: 14340,
            categoryId: "g4v3t3t3ct3",
            purchasesCount: 10,
            attributes: [
                {
                    name: "Тип ружья",
                    value: "Одноствольное",
                },
                {
                    name: "Калибр",
                    value: "12х76",
                },
                {
                    name: "Масса, кг",
                    value: "2,8",
                },
                {
                    name: "Материал приклада",
                    value: "Дуб",
                }
            ]
        },
        {
            productId: uuid(),
            article: "635241",
            imageIds: [rightSlider1],
            title: "Бинокль Nikon Aculon T02 10x21 черный",
            commentCount: 11,
            isLicensedProduct: true,
            rating: 4.3,
            priceNew: 832,
            priceOld: 14340,
            categoryId: "g4v3t3t3ct3",
            purchasesCount: 10,
            attributes: [
                {
                    name: "Тип ружья",
                    value: "Двустовльное",
                },
                {
                    name: "Масса, кг",
                    value: "5",
                },
                {
                    name: "Материал приклада",
                    value: "Дерево",
                }
            ]
        },
        {
            productId: uuid(),
            article: "dqwdqw",
            imageIds: [rightSlider1],
            title: "Бинокль Nikon Aculon T02 10x21 черный",
            commentCount: 11,
            isLicensedProduct: true,
            rating: 4.3,
            priceNew: 8340,
            priceOld: 14340,
            categoryId: "wdq324124",
            purchasesCount: 10,
            attributes: [
                {
                    name: "Тип ружья",
                    value: "Крутое",
                },
                {
                    name: "Масса, кг",
                    value: "1",
                },
                {
                    name: "Материал приклада",
                    value: "Металл",
                }
            ]
        }
    ]
};

export const getProductArray = async (): Promise<Array<IProductCardShort>> => {
    return getProduct();
};

export const getProductFull = async (): Promise<IProductCard> => {
    return {
        productId: uuid(),
        article: "7534234131",
        imageIds: [rightSlider1, rightSlider2, rightSlider3, rightSlider4, rightSlider5],
        title: "Бинокль Nikon Aculon T02 10x21 черный",
        commentCount: 11,
        rating: 4.5,
        priceNew: 143400000,
        priceOld: 1434000000,
        categoryId: "e21ex1e1",
        isLicensedProduct: true,
        purchasesCount: 150,
        description: "Всемирно известное ружье для настоящих ценителей классической охоты, привыкших попадать в цель с первого выстрела.Всемирно известное ружье для настоящих ценителей классической охоты, привыкших попадать в цель с первого выстрела.Всемирно известное ружье для настоящих ценителей классической охоты, привыкших попадать в цель с первого выстрела.Всемирно известное ружье для настоящих ценителей классической охоты, привыкших попадать в цель с первого выстрела.Всемирно известное ружье для настоящих ценителей классической охоты, привыкших попадать в цель с первого выстрела. Модель производится на ФГУП \"ИМЗ\" многие годы и завоевала признание в России и за рубежом.",
        feedbacks: [
            {
                name: "Миша",
                time: "Вчера, 20:53",
                rating: 3.0,
                advantages: "Мне все понравилось!",
                disadvantages: "Нет",
                comment: "Вначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсации. Сразу обозначается проблема потенциального клиента (ЦА) и намек на способ ее решить.",
                likeCount: 3,
                dislikeCount: 1,
            },
            {
                name: "Миша",
                time: "Вчера, 20:53",
                rating: 4.3,
                advantages: "Мне все понравилось!",
                disadvantages: "Нет",
                comment: "Вначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсации. Сразу обозначается проблема потенциального клиента (ЦА) и намек на способ ее решить.",
                likeCount: 3,
                dislikeCount: 1,
            },
            {
                name: "Миша",
                time: "Вчера, 20:53",
                rating: 1.5,
                advantages: "Мне все понравилось!",
                disadvantages: "Нет",
                comment: "Вначале выдается основная новость, суть статьи в виде заманчивого предложения," +
                    " Вначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсацииВначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсацииВначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсацииВначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсацииВначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсацииВначале выдается основная новость, суть статьи в виде заманчивого предложения, интригующего вопроса, сенсацииинтригующего вопроса, сенсации. Сразу обозначается проблема потенциального клиента (ЦА) и намек на способ ее решить.",
                likeCount: 3,
                dislikeCount: 1,
            },
            {
                name: "Миша",
                time: "Вчера, 20:53",
                rating: 5.0,
                advantages: "Мне все понравилось!",
                disadvantages: "Нет",
                comment: "Вначале выдается основная новость, суть статьи в виде заманчивого предложения," +
                    " интригующего вопроса, сенсации. Сразу обозначается проблема потенциального клиента (ЦА) и намек на способ ее решить.",
                likeCount: 3,
                dislikeCount: 1,
            }
        ],
        attributes: [
            {
                name: "Тип ружья",
                value: "Одноствольное",
            },
            {
                name: "Материал приклада",
                value: "Дуб",
            }
        ]
    };
}

export const getCategories = (): Array<ICategoryV2> => {
    return [
        {
            categoryId: "12e12e1231e",
            parentCategoryId: null,
            imageId: BannerGun,
            title: "Оружие и патроны",
            productCount: 12
        },
        {
            categoryId: "f23fcr23",
            parentCategoryId: null,
            imageId: BannerFishing,
            title: "Рыбалка",
            productCount: 12
        },
        {
            categoryId: "e21ex1e1",
            parentCategoryId: null,
            imageId: BannerHunting,
            title: "Охота",
            productCount: 12
        },
        {
            categoryId: "ad32dx2d23",
            parentCategoryId: null,
            imageId: BannerTourism,
            title: "Туризм",
            productCount: 12
        },
        {
            categoryId: "2131231",
            parentCategoryId: null,
            imageId: categoryGun,
            title: "Категория 1",
            productCount: 12
        },
        {
            categoryId: "wdq324124",
            parentCategoryId: "12e12e1231e",
            imageId: categoryGun,
            title: "Категори 2",
            productCount: 12
        },
        {
            categoryId: "3r2r2r11e",
            parentCategoryId: "12e12e1231e",
            imageId: categoryGun,
            title: "Категори 3",
            productCount: 12
        },
        {
            categoryId: "ec2erd2",
            parentCategoryId: "3r2r2r11e",
            imageId: categoryGun,
            title: "Категори 4",
            productCount: 12
        },
        {
            categoryId: "3x121ex12",
            parentCategoryId: "3r2r2r11e",
            imageId: categoryGun,
            title: "Категори 5",
            productCount: 12
        },
        {
            categoryId: "g34vg3vg34g3",
            parentCategoryId: "3r2r2r11e",
            imageId: categoryGun,
            title: "Категори 6",
            productCount: 12
        },
        {
            categoryId: "g4v3t3t3ct3",
            parentCategoryId: "e21ex1e1",
            imageId: categoryGun,
            title: "Категори 7",
            productCount: 12
        }
    ]
};
