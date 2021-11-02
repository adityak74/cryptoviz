#!/bin/bash

# This script deploys the AWS setup script to the instance
# Install git and update
echo "Update Instance"
sudo yum update -y
echo "Installing git"
sudo yum install -y git
echo "Installed git"

# Install Docker
echo "Installing Docker"
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
echo "Docker installed"

# Install Docker Compose
echo "Installing Docker Compose"
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
source ~/.bash_profile
source ~/.bashrc
echo "Docker Compose installed"

# Deploy cryptoviz app
echo "Deploying cryptoviz app"
git clone https://github.com/adityak74/cryptoviz.git
aws s3 cp s3://nakshatra-config/.env.production cryptoviz/.env.production
docker-compose -f cryptoviz/docker-compose.yml up -d
echo "Cryptoviz app deployed"

# Deploy breaking changes notifier app
echo "Stopping contianer"
docker stop $(docker ps | grep bcn | awk '{print $1}')
echo "Removing containers"
docker rm $(docker ps -a | grep bcn | awk '{print $1}')
echo "Creating docker network"
docker network create -d bridge bcp-network
echo "Pulling docker images"
# Pull git token from S3
aws s3 cp s3://nakshatra-config/git.token.txt .
cat git.token.txt | docker login ghcr.io -u adityak74 --password-stdin
docker pull ghcr.io/adityak74/bcn-client-app:latest
docker pull ghcr.io/adityak74/bcn-server-app:latest
echo "Pulled docker images"
echo "Deploying images"
docker run --name bcn-app-client -p 5000:80 -d --network=bcp-network ghcr.io/adityak74/bcn-client-app
docker run --name bcn-app-server -p 3000:3000 -d -e PORT='3000' --network=bcp-network ghcr.io/adityak74/bcn-server-app
echo "Deployed images"

# Install and configure httpd
echo "Installing httpd"
sudo yum -y install httpd
sudo systemctl start httpd
sudo systemctl enable httpd
echo "httpd installed"
