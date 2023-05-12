describe ("test stock management", () => {

    test("valid add category", () => {
        expect(addCategory('drink')).toStrictEqual({categoryId: expect.any(Number)});
    });
    test("valid add unit", () => {
        expect(addUnit('PK', 12)).toStrictEqual({unitId: expect.any(Number)});
    });
    test("valid add item", () => {
        const category1 = addCategory('drink');
        const unitIn12 = addUnit('PK', 12);
        expect(addItem('DCCJ', 'coconut juice', category1, unitIn12, 150)).toStrictEqual({itemCode: 'DCCJ'});
    });
    test("valid search item with code", () => {
        const category1 = addCategory('drink');
        const unitIn12 = addUnit('PK', 12);
        const item = addItem('DCCJ', 'coconut juice', category1, unitIn12, 150);
        expect(searchItem(item.itemCode)).toStrictEqual({found: true});
    });
    test("valid import items", () => {
        const category1 = addCategory('drink');
        const category2 = addCategory('biscuit');
        const unitIn12 = addUnit('PK', 12);
        const unitIn24 = addUnit('PK', 24);
        const item1 = addItem('DCCJ', 'coconut juice', category1, unitIn12, 150);
        const item2 = addItem('BLMB', 'lemon biscuit', category2, unitIn24, 50);
        expect(importItems([
            {item: item1, quantity: {quantity: 5, isPiece: false}}, 
            {item: item2, quantity: {quantity: 10, isPiece: true}}])).toStrictEqual({});
    });
    test("valid export items", () => {
        const category1 = addCategory('drink');
        const category2 = addCategory('biscuit');
        const unitIn12 = addUnit('PK', 12);
        const unitIn24 = addUnit('PK', 24);
        const item1 = addItem('DCCJ', 'coconut juice', category1, unitIn12, 150);
        const item2 = addItem('BLMB', 'lemon biscuit', category2, unitIn24, 50);
        importItems([
            {item: item1, quantity: {quantity: 5, isPiece: false}}, 
            {item: item2, quantity: {quantity: 10, isPiece: true}}
        ]);

        expect(exportItems([{item: item1, quantity: {quantity: 2, isPiece: false}}, 
            {item: item2, quantity: {quantity: 10, isPiece: true}}])).toStrictEqual({});
    });
    test("valid request stock data for single item", () => {
        const category1 = addCategory('drink');
        const unitIn12 = addUnit('PK', 12);
        const item = addItem('DCCJ', 'coconut juice', category1, unitIn12, 150);
        importItems([
            {item: item, quantity: {quantity: 5, isPiece: false}}
        ]);
        expect(singleItemLog(item.itemCode)).toStrictEqual({
            itemCode: item.itemCode,
            itemName: 'coconut juice',
            log: [
                { importTime: expect.any(Number), quantity: {quantity: 5, isPiece: false} }
            ],
            remainingQuantity: 5 + 'PK' + 'and' + 0 + 'PC'
        });
    });
    test("valid request for multiple items", () => {
        const category1 = addCategory('drink');
        const category2 = addCategory('biscuit');
        const unitIn12 = addUnit('PK', 12);
        const unitIn24 = addUnit('PK', 24);
        const item1 = addItem('DCCJ', 'coconut juice', category1, unitIn12, 150);
        const item2 = addItem('BLMB', 'lemon biscuit', category2, unitIn24, 50);
        importItems([
            {item: item1, quantity: {quantity: 5, isPiece: false}}, 
            {item: item2, quantity: {quantity: 10, isPiece: true}}
        ]);
        expect(multipleItemsLog()).toStrictEqual([
            {itemCode: item1.itemCode, itemName: 'coconut juice', remainingQuantity: 5 + 'PK' + 'and' + 0 + 'PC'},
            {itemCode: item2.itemCode, itemName: 'lemon biscuit', remainingQuantity: 0 + 'PK' + 'and' + 10 + 'PC'}
        ]);
    });
});