pipeline {
    agent {
        docker {
            image 'node:18-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
            }
        }
        stage('build-docker') {
            steps {
                sh 'pwd'
            }
        }
    }
}