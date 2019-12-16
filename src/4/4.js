/*
--- Day 4: Secure Container ---
You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?

To play, please identify yourself via one of these services:
*/

function checkFoDoubleAndDecreasing(input) {
    const array = input.split('');
    let checkForDecreasing = true;
    let checkDouble = true;
    const checkDoubleObj = { key: null, count: 0 };

    for (let index = 0; index < array.length; index++) {
        const current = array[index];
        const next = array[index + 1];

        if (current > next) {
            checkForDecreasing = false;
            break;
        }
        if (current == next) {
            if (checkDoubleObj.key === current) {
                checkDoubleObj.count++;
            } else {
                checkDoubleObj.count = 2;
                checkDoubleObj.key = current;
            }
        } else {
            if (checkDoubleObj.count > 2 && checkDoubleObj.count % 2 !== 0) {
                checkDouble = false;
                break;
            }
            checkDoubleObj.key = null;
            checkDoubleObj.count = 0;
        }
    }

    return checkForDecreasing && checkDouble;
}

function main() {
    const results = [];
    const fails = [];
    const init = 256310;
    const end = 732736;
    for (let current = init; current <= end; current++) {
        const strInput = `${current}`;
        if (checkFoDoubleAndDecreasing(strInput)) {
            results.push(strInput);
        } else {
            fails.push(strInput);
        }
    }
    // console.log(JSON.stringify(results, null, 0));
    // console.log(JSON.stringify(fails, null, 0));
    const total = results.length + fails.length;
    console.log(`[${results.length}][${fails.length}][${total}][${end - init + 1}]`);
}

module.exports = main();
