const faker = require('faker');
const _ = require('lodash');

const makeUniq = (arr) => {
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        obj[str] = true;
    }

    return Object.keys(obj);
};

const toFill = (n) => {
    let arr = [];
    _.times(n, () => {
        arr.push(
            faker.random.number(1000000) +
      faker.lorem.word() +
      faker.random.number(1000000),
        );
    });
    return arr;
};

module.exports = (n) => {

    let arr = toFill(n);
    arr = makeUniq(arr);

    while (arr.length < n) {
        const delta = n - arr.length;
        if (delta > 0) {
            arr = arr.concat(toFill(delta));
            arr = makeUniq(arr);
        }
        else {
            return arr;
        }
    }

    return arr;

};
