pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    docker.image('node:18-alpine').inside {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('build-docker') {
            steps {
                sh 'pwd'
                sh 'docker build -t dreamacademy .'
            }
        }
    }
}
