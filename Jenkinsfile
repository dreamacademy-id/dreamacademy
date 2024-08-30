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
        stage('Deploy') { 
            steps {
                input message: 'Sudah selesai menggunakan React App? (Klik "Proceed" untuk mengakhiri)'
            }
        }
    }
}