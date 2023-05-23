pipeline {
    agent {
        label 'ssh_slave'//'kiofteta-slave'
    }
    tools {
        nodejs 'nodeJs'
    }
    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/PANCHEVMATEY/nodejs-my-proj.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm ci' // This is for building the Node.js project
            }
        }
        stage('test') {
            steps {
                sh 'npm test' // This is for testing the Node.js modules
            }
        }
        stage('Deploy') {
            steps {
                sh "npm install -g forever"
                sh 'forever start src/index.js'
            }
        }
    }
    post {
        always {
            cleanWs() // Clean workspace after the pipeline finishes
        }
    }
}
