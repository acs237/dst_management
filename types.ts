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
    numberItems: number;
}

export interface quantity {
    quantity: number;
    isPiece: boolean;
}

export interface log {
    logId: number;
    item: item;
    importTime: number;
    exportTime: number;
    quantity: quantity;
}