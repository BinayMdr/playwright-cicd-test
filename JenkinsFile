pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npm run test:bdd'
            }
        }
    }

    post {
        always {
            junit 'playwright-report/*.xml'   // Adjust if you generate JUnit reports
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
