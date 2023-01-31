// always fulfullied promise
// const p = Promise.resolve({id : 1});
// p.then((result) => console.log(result));

// // always rejected promise
// const ps = Promise.reject(new Error('reason for rejection...'));
// ps.catch((err) => console.log(err));



//to call multiple promise at the same time

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 1...');
    resolve(1);
    // reject(new Error('from p1 error'));
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 2...');
    resolve(2);
  }, 2000);
});

// this promise will return a new promise that will be resolve when each promise in this array is resolved.
// if any of the promise falls from the listed in Promise.all then it will give error.
Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log('Error', err.message));

// sometimes we need some operation to be happen as soon as any of the promise get fullfilled.
// we don't want to  wait for all promise.
// Promise.race([p1, p2])
//   .then(result => console.log(result))
//   .catch(err => console.log('Error', err.message));
