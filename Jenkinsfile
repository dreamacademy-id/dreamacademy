pipeline {
    agent any
    stages {
        stage('Build') { 
            agent {
                docker {
                    image 'node:18-alpine' 
                    args '-p 3000:3000' 
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('build-docker') {
            steps {
                sh 'pwd'
                sh 'docker ps'
            }
        }
    }
}