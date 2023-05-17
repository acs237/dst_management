import { category, data, item, quantity, unit, log } from './types';
import { getData, setData } from './data';

export function importItems(itemCode: string, quantity: number, isPiece: boolean) {
    const data: data = getData();
    const itemIndex = data.items.findIndex(item => item.code === itemCode.toUpperCase());
    if (itemIndex === -1) {
        return {error: 'no item with that code'};
        //throw HTTPError(400, 'no item with that code');
    }
    if (quantity <= 0) {
        return {error: 'quantity should be greater than zero'};
    }
    const item = data.items[itemIndex];
    if (isPiece) {
        const numberItemsPerUnit = data.units[data.units.findIndex(unit => unit.unitId === item.unitId)].numberItems;
        item.remainingStockPieces += quantity;
        if (item.remainingStockPieces >= numberItemsPerUnit) {
            item.remainingStock += 1;
            item.remainingStockPieces %= numberItemsPerUnit;
        }
    }
    else {
        item.remainingStock += quantity;
    }
    
    let id: number;
    if (data.logs.length === 0) {
        id = 1;
    }
    else {
        id = data.logs[data.logs.length - 1].logId + 1;
    }
    const log: log = {logId: id, itemCode: item.code, itemName: item.name, importTime: Date.now(), exportTime: -1, quantity: {quantity: quantity, isPiece: isPiece}};
    data.logs.push(log);
    setData(data);
    return {logId: id};
}

export function exportItems(itemCode: string, quantity: number, isPiece: boolean) {
    const data: data = getData();
    const itemIndex = data.items.findIndex(item => item.code === itemCode.toUpperCase());
    if (itemIndex === -1) {
        return {error: 'no item with that code'};
        //throw HTTPError(400, 'code already exists');
    }
    if (quantity <= 0) {
        return {error: 'quantity should be greater than zero'};
    }
    const item = data.items[itemIndex];
    if (isPiece) {
        if (item.remainingStockPieces < quantity) {
            if (item.remainingStock <= 0) {
                return {error: `not enough stock. remaining stock: ${item.remainingStockPieces} pieces`};
            }
            else {
                const numberItemsPerUnit = data.units[data.units.findIndex(unit => unit.unitId === item.unitId)].numberItems;
                let q = quantity;
                while (q > numberItemsPerUnit) {
                    q -= numberItemsPerUnit;
                    item.remainingStock -= 1;
                }
                item.remainingStock -= 1;
                item.remainingStockPieces += numberItemsPerUnit;
                item.remainingStockPieces -= q;
            }
        }
        else {
            item.remainingStockPieces -= quantity;
        }
        
    }
    else {
        if (item.remainingStock < quantity) {
            const unitName = data.units[data.units.findIndex(unit => unit.unitId === item.unitId)].name;
            return {error: `not enough stock. remaining stock: ${item.remainingStock} ${unitName}`};
        }
        item.remainingStock -= quantity;
    }

    let id: number;
    if (data.logs.length === 0) {
        id = 1;
    }
    else {
        id = data.logs[data.logs.length - 1].logId + 1;
    }
    const log: log = {logId: id, itemCode: item.code, itemName: item.name, importTime: -1, exportTime: Date.now(), quantity: {quantity: quantity, isPiece: isPiece}};
    data.logs.push(log);
    setData(data);
    return {logId: id};
}

export function singleItemLog(code: string) {
    const data: data = getData();
    const itemIndex = data.items.findIndex(item => item.code === code.toUpperCase());
    if (itemIndex === -1) {
        return {error: 'error'};
        //throw HTTPError(400, 'code already exists');
    }
    let resultLogs = [];
    for (const log of data.logs) {
        if (log.itemCode === code.toUpperCase()) {
            resultLogs.push(log);
        }
    }
    const item = data.items[itemIndex];
    const unitName = data.units[data.units.findIndex(unit => unit.unitId === item.unitId)].name;
    const remainingStockGeneral = `${item.remainingStock} ${unitName} and ${item.remainingStockPieces} Pieces`;
    return {logs: resultLogs, remainingStock: remainingStockGeneral};
}

export function multipleItemsLog() {
    const data: data = getData();
    let resultLogs = [];
    for (const item of data.items) {
        const unitName = data.units[data.units.findIndex(unit => unit.unitId === item.unitId)].name;
        const remainingStockGeneral = `${item.remainingStock} ${unitName} and ${item.remainingStockPieces} Pieces`;
        resultLogs.push({itemCode: item.code, itemName: item.name, remainingStock: remainingStockGeneral});
    }
    return {logs: resultLogs};
}