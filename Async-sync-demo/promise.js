// Promise -it's a object which Holds the eventual result of an asynchronous operation.
// asynchronous operation complete is will either give value or error.
// three state of promises - pending, fullfilled, rejected.

const p = new Promise((resolve, reject) => {
  // kick off some async work
  //...
  setTimeout(() => {
    // resolve(1);
    reject(new Error('Message'));
  }, 2000)
})

// to consume this promise  

p
  .then(result =>console.log('result', result))
  .catch(err => console.log('Error', err.message));