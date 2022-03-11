// Original
// let p1 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     if (Math.random() < 0.5) {
//       resolve("success");
//     } else {
//       reject(new Error("promise rejected"));
//     }
//   }, 500);
// });
//
// let p2 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve();
//   }, 1000);
// }).then(function () {
//   if (Math.random() < 0.5) {
//     return "success";
//   } else {
//     throw new Error("error thrown");
//   }
// });
//
// p1.then(function (result) {
//   return p2;
// });

let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (Math.random() < 0.5) {
      resolve("success");
    } else {
      reject(new Error("promise rejected"));
    }
  }, 500);
});

let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve();
  }, 1000);
}).then(function () {
  if (Math.random() < 0.5) {
    return "success";
  } else {
    throw new Error("error thrown");
  }
});

// p1.catch(({ message }) => {
//   console.log(`p1 threw an error: ${message}`);
// })
//   .then((r1) => {
//     if (r1) console.log(r1);
//     return p2;
//   })
//   .catch(({ message }) => {
//     console.log(`p2 threw an error: ${message}`);
//   })
//   .then((r2) => {
//     if (r2) console.log(r2);
//   });

Promise.all([
  p1.catch(({ message }) => {
    console.log(`p1 threw an error: ${message}`);
  }),
  p2.catch(({ message }) => {
    console.log(`p2 threw an error: ${message}`);
  }),
]).then(([r1, r2]) => {
  if (r1) console.log(r1);
  if (r2) console.log(r2);
});
