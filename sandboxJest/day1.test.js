const {
    twoNumbers,
    stringTest,
    arrayTest,
    objectTest
} = require('./day1')

let name = 't'

beforeAll(() => {
    name = 'ti'
})

afterAll(() => {
    name = 'done!'
})

test('should expect to check if the value of the name is NOT equal to ti before running this test', () => {
    name = 'tin'
    expect(name).not.toBe('ti')
})


// ############################################

describe('test two numbers function', () => {

    test('should return a test that says two numbers are equal, if num1 and num2 are equal', () => {
        expect(twoNumbers(10, 10)).toBe('two numbers are equal')
        expect(twoNumbers(10,10)).toBeTruthy()
    })

    test('should return the difference of num1 and num2, if num1 is greater than num2', () => {
        expect(twoNumbers(8, 4)).toBe(4)
        expect(twoNumbers(8, 4)).not.toBeNull()
    })
    test('should return the sum of num1 and num2, if num1 is less than num2', () => {
        expect(twoNumbers(3, 6)).toBe(9)
        expect(twoNumbers(3, 6)).toBeGreaterThan(0)
    })
    test('should return a test that says missing numbers if num1 or num2 are missing', () => {
        expect(twoNumbers(10)).toBe('missing numbers')
    })
})

// ############################################

describe('test stringTest function', () => {

    test('should return false if string is undefined or empty', () => {
        expect(stringTest()).toBeFalsy()
        expect(stringTest()).not.toBeTruthy()
    })

    test('should expect to return the index of t, if it is included in a string', () => {
        expect(stringTest('yuta')).toBe(2)
        expect(stringTest('yuta')).toBeGreaterThan(0)
    })
    test('should expect to return a test that says letter t was not found, if a string does not include letter t', () => {
        expect(stringTest('joshua')).toBe(`Letter 't' was not found`)
    })


})

// ############################################

describe('test arrayTest function', () => {

    test('should return false if an array is undefined or empty', () => {
        expect(arrayTest().length).toBeFalsy()
    })

    test('should return true if an array contains a 5', () => {
        expect(arrayTest([1, 3, 5])).toBeTruthy()
    })

    test('should return a new array that is a double value of each element', () => {
        expect(arrayTest([2, 4, 6, 8])).toEqual([4, 8, 12, 16])
    })


})

// ############################################

describe('test objectTest function', () => {

    test('should return false if object is undefined or empty', () => {
        expect(objectTest({}).length).toBeFalsy()
    })

    test(`should return true if an object contains a key-value pair name === 'tony' `, () => {
        expect(objectTest({name: 'tony'})).toBeTruthy()
    })

    test(`should throw and error if an object does not contain a key-value pair name === 'tony' `, () => {
        expect(() => objectTest({name: 'joshua', age: 27})).toThrow(Error)
    })
    
})