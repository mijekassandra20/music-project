const {
    twoSum,
    fetchProfile,
    removeNumberFromArray,
    addNewProperty,
    sortArray,
    upperCaseWords,
} = require("./sandbox2");

const axios = require("axios");

// ##########################################################################################

describe('tests twoSum function', () => {

    test('should return an array of the index position of two numbers that is equal to the target', () => {
        const numbers = [1, 2, 3];
        const target = 5;

        expect(twoSum(numbers, target)).toEqual([1, 2]);
    });

    test('should return undefined, if there are no pair of numbers that sums up to the target value', () => {
        const numbers = [1, 2, 3];
        const target = 9;

        expect(twoSum([], 5)).toBeUndefined();
        expect(twoSum(numbers, target)).toBeFalsy();
    });
});

// ##########################################################################################

describe('tests fetchProfile function', () => {

    test('should return an email of `Shanna@melissa.tv` ', async () => {
        const fetchData = await fetchProfile();

        expect(fetchData.data.email).toEqual('Shanna@melissa.tv');
    });

    test('should return the city of `Wisokyburgh` ', async () => {
        const fetchData = await fetchProfile();

        expect(fetchData.data.address.city).toEqual('Wisokyburgh');
    });

    test('should return a company name of `Deckow-Crist` ', async () => {
        const fetchData = await fetchProfile();

        expect(fetchData.data.company.name).toEqual('Deckow-Crist');
    });

    test('should return false if it DOES NOT have a zipcode of `90388-2220` ', async () => {
        const fetchData = await fetchProfile();

        expect(fetchData.data.address.zipcode).not.toEqual('90388-2220');
    });
});

// ##########################################################################################

describe('tests removeNumberFromArray function', () => {

    test('should return an error that says `Missing Array!`, if no array was passed', () => {
        expect(() => removeNumberFromArray([], 0)).toThrow(Error);
    });

    test('should return a new array excluding the number that was removed', () => {
        numbers = [10, 20, 30, 40, 50];
        removeNumber = 30;

        expect(removeNumberFromArray(numbers, removeNumber)).toEqual([10, 20, 40, 50]);
    });

    test('should return an error, if a number that was supposed to be removed did not exists in the array', () => {
        numbers = [10, 20, 30, 40, 50];
        removeNumber = 60;

        expect(() => removeNumberFromArray(numbers, removeNumber).toThrow(Error)
        );
    });
});

// ##########################################################################################

describe('tests addNewProperty function', () => {

    test('should return an error, if property and value are undefined', () => {
        expect(() => addNewProperty({}, '', '').toThrow(Error));
    })

    test('should return the new key-value pair that was added in your object', () => {

        object = { firstName: 'Tony' }
        property = 'lastName'
        value = 'Kim'

        expect(addNewProperty(object, property, value)).toEqual({ firstName: 'Tony', lastName: 'Kim' })

    })
});

// ##########################################################################################

describe('test sortArray function', () => {

    test('should return an error message, if no array was passed', () => {
        expect(() => sortArray()).toThrow(Error)
    })

    test('should return the sorted array', () => {
        numbers = [8, 2, 6, 4]

        expect(sortArray(numbers)).toEqual([2, 4, 6, 8])
    })

})

// ##########################################################################################

describe('tests upperCaseWords function', () => {

    test('should return an error message, if no error message was passed', () => {
        expect(() => upperCaseWords().toThrow(Error))
    })

    test('should return the capitalized version of ther words passed in an array', () => {
        expect(upperCaseWords(['cat','dog'])).toEqual(['CAT','DOG'])
    })
})
