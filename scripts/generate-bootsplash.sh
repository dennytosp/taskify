#!/bin/bash

# Script: generate_bootsplash.sh
# Description: Generate bootsplash using yarn react-native command
# Author: Ocean Dawy
# Date: September 24, 2023

# Permission
# chmod +x scripts/generate-bootsplash.sh

# Exit script on any command failure
set -e

# Define variables
logo_file="src/assets/icons/logo.png"
background_color="FAFAFA"
logo_width=110
assets_output="src/assets/icons/bootsplash_logo"
flavor="main"
html_file="index.html"

# Function to display error message and exit
display_error() {
  echo "Error: $1"
  exit 1
}

# Check if yarn command is available
if ! command -v yarn &> /dev/null; then
  display_error "Yarn is not installed. Please install Yarn before running this script."
fi

# Check if logo file exists
if [ ! -f "$logo_file" ]; then
  display_error "Logo file '$logo_file' not found."
fi

# Generate bootsplash
echo "Generating bootsplash..."

yarn react-native generate-bootsplash "$logo_file" \
  --platforms=android,ios,web \
  --background="$background_color" \
  --logo-width="$logo_width" \
  --assets-output="$assets_output" \
  --flavor="$flavor" \
  --html="$html_file"

echo "Bootsplash generation completed."