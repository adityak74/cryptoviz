const { Octokit } = require("octokit");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV || 'development'}`) });

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: process.env.GIT_PAT });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
async function mergeAllPullRequests() {
  await octokit.rest.users.getAuthenticated();
  octokit.rest.pulls.list({
    owner: "adityak74",
    repo: "cryptoviz",
    state: "open"
  }).then(async ({ data }) => {
    for(let i = 0; i < data.length; i++) {
      console.info('Merging PR', data[i].number);
      const mergeData = await octokit.rest.pulls.merge({
        owner: "adityak74",
        repo: "cryptoviz",
        pull_number: data[i].number,
        merge_method: "squash"
      });
      console.info(`${mergeData.data.message} with hash : ${mergeData.data.sha}`);
    }
  }).catch(err => {
    console.error('Error listing pull requests', err);
  });
} 

mergeAllPullRequests();
