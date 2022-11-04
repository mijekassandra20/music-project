const {
    twoSum,
    fetchProfile,
    removeNumberFromArray,
    addNewProperty,
    sortArray,
    upperCaseWords

} = require('./sandbox2')

const axios = require('axios')

// ##########################################################################################

describe('twoSum', () => {

    test('should return an array of the index position of two numbers that is equal to the target', () => {
        const numbers = [1, 2, 3]
        const target = 5

        expect(twoSum(numbers, target)).toEqual([1,2]);
    })

    test('should return undefined, if there are no pair of numbers that sums up to the target value', () => {
        const numbers = [1, 2, 3]
        const target = 9
        
        expect(twoSum([], 5)).toBeUndefined();
        expect(twoSum(numbers, target)).toBeFalsy();

    })

})

// ##########################################################################################

describe('fetchProfile', () => {
    
    test('', () => {
        // fetch data
        
    })


})


