export interface item {
    code: string;
    name: string;
    category: category;
    unit: unit;
    price: number;
}

export interface category {
    categoryId: number;
    name: string;
}

export interface unit {
    unitId: number;
    name: string;
}

export interface quantity {
    quantity: number;
    unit: unit;
}

export interface log {
    logId: number;
    item: item;
    importTime: number;
    exportTime: number;
    quantity: quantity;
}