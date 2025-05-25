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

        stage('Generate Allure Report') {
            steps {
                // Make sure allure CLI is installed or download it temporarily
                sh '''
                if ! command -v allure &> /dev/null; then
                  wget https://github.com/allure-framework/allure2/releases/download/2.21.0/allure-2.21.0.tgz
                  tar -zxvf allure-2.21.0.tgz
                  export PATH=$PATH:$PWD/allure-2.21.0/bin
                fi

                ./allure-2.21.0/bin/allure generate allure-results --clean -o allure-report
                '''
            }
        }
    }
}
