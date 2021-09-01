const { Octokit, App, Action } = require("octokit");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV || 'development'}`) });

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: process.env.GIT_PAT });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
async function mergeAllPullRequests() {
  const { data } = await octokit.rest.users.getAuthenticated();
  console.log("Hello", data);
  
} 

mergeAllPullRequests();
