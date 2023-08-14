#!/bin/bash

# Exit on error
set -e

# Defining bash script-level environment variables. The Twilio CLI will auto-magically pickup the variables
export TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID
export TWILIO_API_KEY=$TWILIO_API_KEY
export TWILIO_API_SECRET=$TWILIO_API_SECRET
export SERVERLESS_FOLDER="serverless"
export SERVERLESS_SERVICE_NAME="ado-pipeline"
export ENV_FILE_LOCATION=".env.example"

# Check if running on a Debian-based system
if ! command -v apt >/dev/null 2>&1; then
  echo "This script requires a Debian-based system with 'apt' package manager."
  exit 1
fi

# Update package list
echo "Updating package list..."
sudo apt update

# Install Twilio CLI if not already installed
if ! command -v twilio >/dev/null 2>&1; then
  echo "Installing Twilio CLI with 'apt'..."
  curl -s https://twilio-cli-prod.s3.amazonaws.com/twilio_pub.asc | sudo apt-key add -
  echo "deb https://twilio-cli-prod.s3.amazonaws.com/apt/ /" | sudo tee /etc/apt/sources.list.d/twilio.list
  sudo apt update
  sudo apt install -y twilio
fi

# Install the Twilio Serverless CLI
echo "Installing the Twilio Serverless CLI..."
twilio plugins:install @twilio-labs/plugin-serverless

# Navigate to the Flex Serverless folder
echo "Entering Serverless folder..."
cd $SERVERLESS_FOLDER

# Install npm plugin dependencies
echo "Installing NPM dependencies..."
npm i

# Deploy the Twilio Serverless Functions
echo "Deploying Twilio Serverless Functions..."
twilio serverless:deploy -n $SERVERLESS_SERVICE_NAME --override-existing-project --env $ENV_FILE_LOCATION
