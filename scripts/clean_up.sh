#!/bin/bash

# Script: cleanup.sh
# Description: Perform cleanup tasks to remove build artifacts, dependencies, and
#              cached files in an iOS project. This script is intended to be used
#              as part of a development workflow to ensure a clean environment for
#              rebuilding the project.
# Author: Ocean Dawy
# Date: September 29, 2023

set -e           # Exit script if any command fails
set -o pipefail  # Exit script if any command in a pipeline fails

# Function to prompt for yes/no confirmation with a default value
confirm() {
    local prompt="${1:-}"
    local default="${2:-yes}"
    local response

    read -p "$prompt [$default]: " response
    response="${response:-$default}"

    case "$response" in
        [Yy]|[Yy][Ee][Ss]) return 0;;
        [Nn]|[Nn][Oo]) return 1;;
        *) echo "Invalid response. Please answer yes or no."; confirm "$prompt" "$default";;
    esac
}

# Function to prompt for yes confirmation with a default value
confirm_yes() {
    confirm "$1" "yes"
}

# Function to perform the cleanup tasks
perform_cleanup() {
    echo "Performing cleanup..."

    watchman watch-del-all
    rm -rf ios/build/
    rm -rf node_modules/

    if ! command -v yarn &> /dev/null; then
        echo "Yarn is not installed. Please install yarn and try again."
        exit 1
    fi

    yarn cache clean
    yarn install --frozen-lockfile
    cd ios
    xcodebuild clean
    rm -rf ~/Library/Caches/CocoaPods
    rm -rf Pods
    rm -rf ~/Library/Developer/Xcode/DerivedData/*
    pod cache clean --all
    pod deintegrate
    pod setup
    pod install
    cd ..

    echo "Cleanup completed successfully."
}


# Main script execution
main() {
    if confirm_yes "This script will perform cleanup tasks. Are you sure you want to proceed?"; then
        perform_cleanup
    else
        echo "Cleanup canceled."
    fi
}

# Call the main function to start the script execution
main