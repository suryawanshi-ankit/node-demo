//using callback
// getUserCallback(1, (user) => {
//   console.log('callback result', user);

//   //get the repositiries
//   getRepositories((repolist) => {
//     console.log('repolist', repolist);
//   })
// });

//this aproch will make a callbackHell situation.
// getUserCallback(1, (user) => {
//   getRepositories((user, repolist) => {
//     getComments(repolist, () => {
      
//     })
//   })
// });

// solution to this callback problem
//Named functions to resuce
getUserCallback(1, getRepositories);

function getRepositories(user) {
  getRepositoriess(user.gitHubUserName, getCommits);
}

function getCommits(repolist) {
  getCommitss(repolist, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
};


// callback example functions.
function getUserCallback(id, callback) {
  setTimeout(() => {
    console.log('Reading a user form a database... in callback example');
    callback({
      id: id,
      gitHubUserName: 'Mosh'
    });
  }, 2000);
}

const getRepositoriess = (username, callback) => {
  console.log('get repos')
  const repolist = ['repo1', 'repo2', 'repo3'];
  setTimeout(() => {
    callback(repolist);
  }, 2000);
}

const getCommitss = (repoList, callback) => {
  console.log('no commit for this repo');
}
