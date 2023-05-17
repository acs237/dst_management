import { clearData } from "./data";
import { addCategory, addUnit, addItem } from "./dataInput";
import { importItems, exportItems, singleItemLog, multipleItemsLog } from "./stockManagement";

describe ("test stock management", () => {
    beforeEach(() => {
        clearData();
    })
    test("test import items", () => {
        const category1 = addCategory('drink');
        const category2 = addCategory('biscuit');
        const unitIn12 = addUnit('PK12', 12);
        const unitIn24 = addUnit('PK24', 24);
        const item1 = addItem('DCCJ', 'coconut juice', category1.categoryId, unitIn12.unitId, 150);
        const item2 = addItem('BLMB', 'lemon biscuit', category2.categoryId, unitIn24.unitId, 50);
        expect(importItems(item1.code, 5, false)).toStrictEqual({logId: expect.any(Number)});
        expect(importItems(item2.code, 10, true)).toStrictEqual({logId: expect.any(Number)});
        expect(importItems(item1.code, 6, true)).toStrictEqual({logId: expect.any(Number)});
    });
    test("test export items", () => {
        const category1 = addCategory('drink');
        const category2 = addCategory('biscuit');
        const unitIn12 = addUnit('PK12', 12);
        const unitIn24 = addUnit('PK24', 24);
        const item1 = addItem('DCCJ', 'coconut juice', category1.categoryId, unitIn12.unitId, 150);
        const item2 = addItem('BLMB', 'lemon biscuit', category2.categoryId, unitIn24.unitId, 50);
        importItems(item1.code, 5, false);
        importItems(item2.code, 10, true);
        expect(exportItems(item1.code, 2, false)).toStrictEqual({logId: expect.any(Number)});
        expect(exportItems(item2.code, 10, true)).toStrictEqual({logId: expect.any(Number)});
        expect(exportItems(item2.code, 3, false)).toStrictEqual({error: expect.any(String)});
    });
            
    test("test request stock data for single item", () => {
        const category1 = addCategory('drink');
        const unitIn12 = addUnit('PK12', 12);
        const item = addItem('DCCJ', 'coconut juice', category1.categoryId, unitIn12.unitId, 150);
        importItems(item.code, 5, false);
        exportItems(item.code, 20, true);
        expect(singleItemLog(item.code)).toStrictEqual({
            logs: [
                {logId: expect.any(Number), itemCode: item.code, itemName: 'coconut juice', importTime: expect.any(Number), exportTime: -1, quantity: {quantity: 5, isPiece: false}},
                {logId: expect.any(Number), itemCode: item.code, itemName: 'coconut juice', importTime: -1, exportTime: expect.any(Number), quantity: {quantity: 20, isPiece: true}}
            ],
            remainingStock: '3 PK12 and 4 Pieces'
        });
    });
    test("test request for multiple items", () => {
        const category1 = addCategory('drink');
        const category2 = addCategory('biscuit');
        const unitIn12 = addUnit('PK12', 12);
        const unitIn24 = addUnit('PK24', 24);
        const item1 = addItem('DCCJ', 'coconut juice', category1.categoryId, unitIn12.unitId, 150);
        const item2 = addItem('BLMB', 'lemon biscuit', category2.categoryId, unitIn24.unitId, 50);
        importItems(item1.code, 5, false);
        importItems(item2.code, 10, true);
        importItems(item2.code, 24, true);
        exportItems(item1.code, 10, true);
        importItems(item1.code, 7, true);
        expect(exportItems(item1.code, 6, false)).toStrictEqual({error: expect.any(String)});
        expect(multipleItemsLog()).toStrictEqual({
            logs: [
                {itemCode: item1.code, itemName: 'coconut juice', remainingStock: '4 PK12 and 9 Pieces'},
                {itemCode: item2.code, itemName: 'lemon biscuit', remainingStock: '1 PK24 and 10 Pieces'}
            ]});
    });
});