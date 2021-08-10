#!/bin/bash

echo "Building server app"
docker build -f Dockerfile . -t cryptoviz-app
echo "Built Server app."

echo "Tagging server app"
docker tag cryptoviz-app ghcr.io/adityak74/cryptoviz:latest
echo "Tagged server app"

echo "Authenticating to ghcr"
cat git.token.txt | docker login ghcr.io -u adityak74 --password-stdin

echo "Pushing server app"
docker push ghcr.io/adityak74/cryptoviz:latest
echo "Pushed to ghcr."
