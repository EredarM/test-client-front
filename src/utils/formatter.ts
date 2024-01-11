import {ICompare} from "../service/reducers/compare";

export const priceFormat = (price: number) => {
    return `${price.toLocaleString('ru')} ₽`;
}

export const textFormat = (num: number, type: 'category') => {
    switch (type) {
        case "category":
            return formatForCategory(num);
    }
};

const formatForCategory = (num: number) => { //TODO
    return 'Товаров'
}

export const groupAttribute = (items: Array<IProductCardAttribute>) => {
    const groupedItems: Array<{ name: string; values: Array<string> }> = [];

    for (const item of items) {
        const {name, value} = item;
        const existingGroup = groupedItems.find((group) => group.name === name);
        if (existingGroup) {
            existingGroup.values.push(value);
        } else {
            groupedItems.push({name, values: [value]});
        }
    }
    return groupedItems;
}

export const groupCategory = (items: Array<ICompare>) => {
    const groupedByCategory: Array<{ categoryId: string; items: Array<ICompare> }> = [];

    items.forEach(item => {
        const existingGroup = groupedByCategory.find(group => group.categoryId === item.categoryId);
        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            groupedByCategory.push({ categoryId: item.categoryId, items: [item] });
        }
    });

    return groupedByCategory;
}

export const convertParams = (params: URLSearchParams): { key: string; values: string[] }[] | undefined => {
    const filteredParams = new URLSearchParams(params);
    filteredParams.delete('text');
    filteredParams.delete('priceMin');
    filteredParams.delete('priceMax');

    const attributes: { key: string; values: string[] }[] = Array.from(filteredParams).reduce(
        (acc: { key: string; values: string[] }[], [key, value]) => {
            const existingIndex = acc.findIndex((entry) => entry.key === key);
            if (existingIndex !== -1) {
                acc[existingIndex].values.push(value);
            } else {
                acc.push({key, values: [value]});
            }
            return acc;
        },
        []
    );

    return attributes.length > 0 ? attributes : undefined;
};