console.log('before');
// Promise-based approch
// we can simplify it with async and await approach.
// getUser(1)
//   .then(user => getRepositories(user.gitHubUserName))
//   .then(repoList => getCommits(repoList[0]))
//   .then(commits => console.log('commits', commits))
//   .catch(err => console.log('Error', err.message));

// async and await approach
async function displayCommits() {

  // we don't have catch here so need to keep this code inside try and catch to handle rejection
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserName);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch(err) {
    console.log('error is herconst user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserName);
    ce...', err)
  }
}

displayCommits();

console.log('after');

// callback example functions.
function getUser(id) {
  return new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
      console.log('Reading a user form a database async and await...');
      resolve({ id: id, gitHubUserName: 'Mosh'});
    }, 2000);
  })
}

const getRepositories = (username) => {
  const repolist = ['repo1', 'repo2', 'repo3'];
  return new Promise((resolve, reject) => {
    console.log('get repos')
    setTimeout(() => {
      resolve(repolist);
    }, 2000);
  })
}

const getCommits = (repoList, callback) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('calling github API...')
      resolve(['commits']);
    }, 2000);
  })
}
