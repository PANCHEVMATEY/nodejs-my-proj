pipeline {
    agent {
        label 'dev-group' //'ssh_slave' //'kiofteta-slave'
    }
    tools {
        nodejs 'nodeJs'
        dockerTool 'Docker'
    }
    triggers {
        githubPush()
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('my_dockerhub_creds')
        IMAGE_NAME = 'mateyp/mynodejsapp'
    }
    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/PANCHEVMATEY/nodejs-my-proj.git'
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
        stage('Docker Login') {
            steps {
                sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
            }
        }
        stage('Docker build and tag') {
            steps {
                sh 'docker build -t $IMAGE_NAME -f Dockerfile .'
                // Builds the Docker image with the specified name and Dockerfile
                sh 'docker tag $IMAGE_NAME $IMAGE_NAME:${BUILD_NUMBER}'
                // Tags the Docker image with the build number
            }
        }
        stage('Docker Push') {
            steps {
                sh 'docker push ${IMAGE_NAME}:${BUILD_NUMBER}'
                // Pushes the Docker image to Docker Hub with the tagged version
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker container rm -f mynodejsapp || true'
                // Removes any existing container with the name 'mynodejsapp' if it exists
                sh 'docker container run -d -p 3000:3000 --name mynodejsapp mateyp/mynodejsapp'
                // Runs a new container named 'mynodejsapp' with the image 'mateyp/mynodejsapp'
                // The container is detached (-d) and maps port 3000 on the host to port 3000 in the container
            }
        }
    }
}
