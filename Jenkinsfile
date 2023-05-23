pipeline {
    agent {
        label 'dev-group'//'ssh_slave' //'kiofteta-slave'
    }
    tools {
        nodejs 'nodeJs'
        dockerTool 'Docker'
    }
    triggers {
        githubPush()
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials(my_dockerhub_creds)
        IMAGE_NAME = mateyp/mynodejsapp
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
        stage('Docker login'){
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        stage('Docker build and tag'){
            steps{
                sh 'docker build -t $IMAGE_NAME -f Dockerfile .'
                sh 'docker tag $IMAGE_NAME $IMAGE_NAME:${BUILD_NUMBER}'
            }
        }
        stage('Docker Push'){
            steps {
              sh 'docker push ${IMAGE_NAME}:${BUILD_NUMBER}'
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