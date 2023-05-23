pipeline {
    agent {
        label 'my-second-slave'//'ssh_slave' //'kiofteta-slave'
    }
    tools {
        nodejs 'nodeJs'
    }
    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/PANCHEVMATEY/nodejs-my-proj.git'
                // Clones the Git repository using the provided URL and branch
            }
        }
        stage('Build') {
            steps {
                sh 'npm ci'
                // Runs 'npm ci' to install the project dependencies
                // This step is for building the Node.js project
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
                // Runs 'npm test' to execute tests
                // This step is for testing the Node.js modules
            }
        }
        stage('Deploy') {
           steps {
                sh 'npm install -g forever'
                // Installs Forever process manager globally using npm
                sh 'forever start src/index.js'
                // Starts the application's entry point (index.js) using Forever
                // Forever ensures the application keeps running even after the Jenkins job finishes
           }
        }
    }
}
