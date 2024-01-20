# Trialshopy Backend - Getting Started Guide

Welcome to the Trialshopy Backend project! This guide will walk you through the process of creating a fork, cloning the repository, and setting up the project for development. This backend is developed using TypeScript and Node.js.

## Pre-requisites

Before you begin, make sure you have the following prerequisites installed on your system:

1. **Git**: You'll need Git to clone the repository and manage version control.
2. **Node.js and npm**: The project is built using Node.js, so you'll need them installed to run the code.
3. **TypeScript**: The project uses TypeScript for development.

## Fork the Repository

1. **Fork the Repository**: Click the "Fork" button at the top right corner of the repository page. This creates a copy of the repository in your GitHub account.

## Clone the Fork

1. **Clone the Forked Repository**: Open your terminal and navigate to the directory where you want to store the project. Then run the following command to clone the repository:
   ```bash
   git clone https://github.com/your-username/trialshopy-backend.git

**NOTE**: Replace the URL with your forks' git URL 

2. **Navigate to the Project Directory**: Move into the project directory using the following command:
    ```bash 
    cd trialshopy-backend

## Setup the Project
1. Install Dependencies: In the project directory, run the following command to install the required dependencies:
    ```bash
    npm install

## Start Development


1. **Start the Server**: Run the following command to start the development server:
    ```bash
    npm start
  
2. If above command doesn't work you can try to compile and run server using below commands:
    ```bash
    tsc
    node dist/server.js

The server will start and be accessible at: http://localhost:7000, and you'll see console logs indicating that the server is running.

3. **Work on the Code**: You can now start working on the project! The source code is located in the src directory. Make changes, add features, fix bugs, etc.

## Contributing and Pull Requests
1. **Create a New Branch**: Before making changes, create a new branch to work on. This helps keep your changes isolated from the main codebase:
    ```bash
    git checkout -b feature/new-feature
2. **Commit Your Changes**: As you make changes, commit them with meaningful messages:

    ```bash
    git add .
    git commit -m "Add new feature: XYZ"

3. **Push Changes and Create Pull Request**: Push your changes to **your forked repository** and then create a pull request from your fork to the original repository.

## Keeping Your Fork Updated
1. The original repository might receive updates. To keep your fork up-to-date, you can set the original repository as an upstream remote and fetch changes.

    ```bash
    git remote add upstream https://github.com/original-author/trialshopy-backend.git
    git fetch upstream
    git checkout main
    git merge upstream/main

**NOTE**: Replace the URL in above with the original repository URL

This guide should help you get started with contributing to the Trialshopy Backend project. Happy coding!


If you encounter any issues or need further assistance, please feel free to reach out to us or create an issue in the repository.


## Deployment 
The project is Deployed at :- https://trialshopy-backend-rk8d.onrender.com/