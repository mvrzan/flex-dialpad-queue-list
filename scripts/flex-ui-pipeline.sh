#!/bin/bash

# Exit on error
set -e

# Defining bash script-level environment variables. The Twilio CLI will auto-magically pickup the variables
export TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID
export TWILIO_API_KEY=$TWILIO_API_KEY
export TWILIO_API_SECRET=$TWILIO_API_SECRET
export BUILD_NUMBER=$BUILD_BUILDNUMBER
export PLUGIN_NAME="flex-dialpad-queue-list"
export FLEX_UI_FOLDER="flex-dialpad-queue-list"
export REACT_APP_TWILIO_SERVERLESS_SERVICE=$REACT_APP_TWILIO_SERVERLESS_SERVICE

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

# Install the Twilio Flex plugin to the Twilio CLI
echo "Installing the Twilio Flex plugin to the Twilio CLI..."
twilio plugins:install @twilio-labs/plugin-flex

# Navigate to the Flex plugin UI folder
echo "Entering Flex Plugin UI folder..."
cd $FLEX_UI_FOLDER

# Install npm plugin dependencies
echo "Installing NPM dependencies..."
npm i

# Deploy the Flex plugin
echo "Deploying the Flex plugin..."
twilio flex:plugins:deploy --version "1.0.0-$BUILD_NUMBER" --description "Flex Dialpad Customization" --changelog "CI/CD initatied changes"

# Release the Flex plugin
echo "Releasing the Flex plugin..."
twilio flex:plugins:release --plugin "$PLUGIN_NAME@1.0.0-$BUILD_NUMBER" --name "Autogenerated Release $BUILD_NUMBER" --description "Flex Dialpad CI/CD release"
