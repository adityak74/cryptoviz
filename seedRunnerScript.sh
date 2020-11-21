#!/bin/sh
printf -- 'Wazirx: Coins Data Runner v0.1 \n';

echo "\n 1. Start the runner\n 2. Stop the runner\n 3. Exit\n Enter your choice: "
read selection

if [ $selection = 1 ]; then
  printf -- '\033[37m Starting Runner \033[0m\n';
  NODE_ENV=staging ./node_modules/.bin/forever start ./utils/runners/coinsData-runner.js
  printf -- '\033[32m SUCCESS: Started Coins Data Runner \033[0m\n';
elif [ $selection = 2 ]; then
  printf -- '\033[37m Stopping Runner \033[0m\n';
  ./node_modules/.bin/forever stop ./utils/runners/coinsData-runner.js
  printf -- '\033[32m SUCCESS: Stoppped Coins Data Runner \033[0m\n';
elif [ $selection = 3 ]; then
  exit 0
else
  echo "Invalid input"
fi
