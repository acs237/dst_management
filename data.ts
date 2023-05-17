import { readFileSync, writeFileSync, existsSync } from 'fs';
import { item, data, category, unit, log } from './types';
let data = {items: [] as item[], categories: [] as category[], units: [] as unit[], logs: [] as log[]};

export function getData() {
    if (existsSync('./data.json')) {
        data = JSON.parse(readFileSync('./data.json').toString());
    }
    return data;
}

export function setData(data: data) {
    writeFileSync('./data.json', JSON.stringify(data));
}

export function clearData() {
    data = {items: [] as item[], categories: [] as category[], units: [] as unit[], logs: [] as log[]};
    writeFileSync('./data.json', JSON.stringify(data));
}