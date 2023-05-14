import { addItem, addCategory, addUnit } from "./dataInput";

describe ("tests for data input", () => {
    test("valid add category", () => {
        expect(addCategory('drink')).toStrictEqual({categoryId: expect.any(Number)});
    });
    test("valid add unit", () => {
        expect(addUnit('PK', 12)).toStrictEqual({unitId: expect.any(Number)});
    });
    test("valid add item", () => {
        const category1 = addCategory('drink');
        const unitIn12 = addUnit('PK', 12);
        expect(addItem('DCCJ', 'coconut juice', category1, unitIn12, 150)).toStrictEqual({code: 'DCCJ'});
    });
});