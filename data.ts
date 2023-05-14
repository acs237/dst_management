import { readFileSync, writeFileSync, existsSync } from 'fs';
let data = {};

export function getData() {
    if (existsSync('./data.json')) {
        data = JSON.parse(readFileSync('./data.json').toString()) ;
    }
}

export function setData() {
    writeFileSync('./data.json', JSON.stringify(data));
}