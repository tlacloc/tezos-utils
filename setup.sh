#!/usr/bin/env bash

echo "=== Start of First Time Setup ==="

# Change to Script's Dir
cd "$(dirname "$0")"
SCRIPTPATH="$( pwd -P )"

# Make sure Docker and Node.js are installed
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v npm)" ]; then
    echo ""
    echo -e "\033[0;31m[Error with Exception]\033[0m"
    echo "Please make sure Docker and Node.js are Installed"
    echo ""
    echo "Install Docker: https://docs.docker.com/docker-for-mac/install/"
    echo "Install Node.js: https://nodejs.org/en/"
    echo ""
    exit
fi

echo "*** Create ouput folders"

mkdir -p ../build

mkdir -p ../test_results

mkdir -p ../scripts

mkdir -p ../src

mkdir -p ../include

echo "**** Copy scripts"

cp -r scripts/* ../scripts

echo "**** Download packages"

cp package.json ../package.json

cp .env.example ../.env

cd ..

npm install

echo "Project ready to run now!"