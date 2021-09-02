const { Octokit } = require("octokit");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV || 'development'}`) });

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: process.env.GIT_PAT });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
(async function mergeAllPullRequests() {
  const repo = 'cryptoviz';
  await octokit.rest.users.getAuthenticated();
  octokit.rest.pulls.list({
    owner: "adityak74",
    repo,
    state: "open"
  }).then(async ({ data }) => {
    let pullRequestMergeQueue = [];
    pullRequestMergeQueue = data.map(pullRequest => pullRequest.number);
    if (!pullRequestMergeQueue.length) process.exit(0);
    console.log('Attempting to merge pull requests: ', pullRequestMergeQueue.length);
    while (pullRequestMergeQueue.length > 0) {
      const pullRequestNumber = pullRequestMergeQueue.shift();
      console.info('Merging PR', pullRequestNumber);
      try {
        const mergeData = await octokit.rest.pulls.merge({
          owner: "adityak74",
          repo,
          pull_number: pullRequestNumber,
          merge_method: "squash"
        });
        console.info(`${mergeData.data.message} with hash : ${mergeData.data.sha}`);
      } catch (error) {
        console.error(error);
        pullRequestMergeQueue = pullRequestMergeQueue.concat(pullRequestNumber);
        continue;
      }
      console.log('Remaining PRs: ', pullRequestMergeQueue.length);
    }
  }).catch(err => {
    console.error('Error listing pull requests', err);
  });
})();
