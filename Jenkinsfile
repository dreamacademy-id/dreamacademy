pipeline {
    agent any
    stages {
        stage('Build') { 
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