export interface data {
    items: item[];
    categories: category[];
    units: unit[];
    logs: log[];
}

export interface item {
    code: string;
    name: string;
    categoryId: number;
    unitId: number;
    price: number;
    remainingStock: number;
    remainingStockPieces: number;
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
    itemCode: string;
    itemName: string;
    importTime: number;
    exportTime: number;
    quantity: quantity;
}