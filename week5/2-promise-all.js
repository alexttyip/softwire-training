// Original
// let p1 = Promise.resolve(4);
// let p2 = Promise.resolve(8);
//
// p1.then(function (result1) {
//     return p2.then(function (result2) {
//         console.log(result1 + result2);
//     });
// });

let p1 = Promise.resolve(4);
let p2 = Promise.resolve(8);

Promise.all([p1, p2]).then(([r1, r2]) => console.log(r1 + r2));
