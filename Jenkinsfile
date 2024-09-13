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

    stage('Build Docker Image') {
      steps {
        sh 'pwd'
        sh "docker build -t ${IMAGE_NAME}:${TAG} ."
      }
    }

    stage('Deploy') {
      steps {
        script {
          sh """
          if [ \$(docker ps -q -f name=dreamacademy) ]; then
          docker stop dreamacademy
          docker rm dreamacademy
          fi
          """
          // Run the new container
          sh "docker run -d -p 3000:3000 --name dreamacademy ${IMAGE_NAME}:${TAG}"
        }

      }
    }

  }
  environment {
    IMAGE_NAME = 'dreamacademy'
    TAG = "${env.GIT_COMMIT}" // Menggunakan commit hash sebagai tag
  }
}
