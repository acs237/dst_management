import { category, data, item, quantity, unit } from './types';
import { getData, setData } from './data';
//import { HttpError } from 'http-errors';

export function addItem(code: string, name: string, categoryId: number, unitId: number, price: number) {
    const data: data = getData();
    if (data.items.findIndex(item => item.code === code.toUpperCase()) !== -1) {
        return {error: 'code already exists'};
        //throw HTTPError(400, 'code already exists');
    }
    if (data.categories.findIndex(category => category.categoryId === categoryId) === -1) {
        return {error: 'category id does not exist'};
        //throw HTTPError(400, 'category id does not exist');
    }
    if (data.units.findIndex(unit => unit.unitId === unitId) === -1) {
        return {error: 'unit id does not exist'};
        //throw HTTPError(400, 'unit id does not exist');
    }
    if (price < 0) {
        return {error: 'price should be positive number'};
        //throw HTTPError(400, 'price should be positive number');
    }
    const item: item = {code: code.toUpperCase(), name: name, categoryId: categoryId, unitId: unitId, price: price, remainingStock: 0, remainingStockPieces: 0};
    data.items.push(item);
    setData(data);
    return {code: code};
}

export function addCategory(name: string) {
    const data: data = getData();
    let id: number;

    if (data.categories.findIndex(category => category.name === name.toUpperCase()) !== -1) {
        return {error: 'error'};
        //throw HTTPError(400, 'existing category');
    }
    if (data.categories.length === 0) {
        id = 1;
    }
    else {
        id = data.categories[data.categories.length - 1].categoryId + 1;
    }
    
    const category: category = {categoryId: id, name: name.toUpperCase()};
    data.categories.push(category);
    setData(data);
    return {categoryId: id};
}

export function addUnit(name: string, numberItems: number) {
    const data: data = getData();
    let id: number;
    if (data.units.findIndex(unit => unit.name === name.toUpperCase()) !== -1) {
        return {error: 'error'};
        //throw HTTPError(400, 'existing category');
    }
    if (data.units.length === 0) {
        id = 1;
    }
    else {
        id = data.units[data.units.length - 1].unitId + 1;
    }
    
    const unit: unit = {unitId: id, name: name.toUpperCase(), numberItems: numberItems};
    data.units.push(unit);
    setData(data);
    return {unitId: id};
}
