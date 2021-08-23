echo "Stopping contianer"
docker stop $(docker ps | grep cryptoviz | awk '{print $1}')
echo "Removing containers"
docker rm $(docker ps -a | grep cryptoviz | awk '{print $1}')
echo "Creating docker network"
docker network create -d bridge cryptoviz-network
echo "Pulling docker images"
cat git.token.txt | docker login ghcr.io -u adityak74 --password-stdin
docker pull ghcr.io/adityak74/cryptoviz:latest
echo "Pulled docker image"
echo "Deploying image"
docker run --name cryptoviz-app -p 3001:5000 -d --network=cryptoviz-network ghcr.io/adityak74/cryptoviz
echo "Deployed images"