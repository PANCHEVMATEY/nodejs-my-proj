pipeline {
    agent {
        label 'dev-group'//'ssh_slave' //'kiofteta-slave'
    }
    tools {
        nodejs 'nodeJs'
    }
    triggers {
        githubPush()
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
                sh 'pkill node | true'
                sh 'npm install -g forever'
                sh 'forever start src/index.js'
           }
        }
    }
}