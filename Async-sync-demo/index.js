//Synchronous or blocking
console.log('before');
console.log('after');

//ASynchronous or non-blocking
console.log('before');
const user = getUser(1);
console.log('user', user); // this will print undefined
// to deal with this(asynch operation) we have
//Callbacks
//Promises
//Async-await

console.log('after');

function getUser(id) {
  setTimeout(() => {
    console.log('Reading a user form a database...');
    return {
      id: id,
      gitHubUserName: 'Mosh'
    };
  }, 2000);
}


