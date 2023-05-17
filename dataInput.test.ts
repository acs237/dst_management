
import { clearData } from "./data";
import { addItem, addCategory, addUnit } from "./dataInput";

describe ("tests for data input", () => {
    beforeEach(() => {
        clearData();
    })
    test("valid add category", () => {
        expect(addCategory('drink')).toStrictEqual({categoryId: expect.any(Number)});
        expect(addCategory('biscuit')).toStrictEqual({categoryId: expect.any(Number)});
    });
    test("valid add unit", () => {
        expect(addUnit('PK12', 12)).toStrictEqual({unitId: expect.any(Number)});
        expect(addUnit('PK24', 24)).toStrictEqual({unitId: expect.any(Number)});

    });
    test("valid add item", () => {
        const category1 = addCategory('drink');
        const unitIn12 = addUnit('PK', 12);

        expect(addItem('DCCJ', 'coconut juice', category1.categoryId, unitIn12.unitId, 150)).toStrictEqual({code: 'DCCJ'});
        expect(addItem('BLMB', 'lemon biscuit', category1.categoryId, unitIn12.unitId, 50)).toStrictEqual({code: 'BLMB'});

    });
});