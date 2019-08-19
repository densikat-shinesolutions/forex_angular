pipeline{
  agent { label 'slave' }
  stages{
    stage ('checkout'){
      steps{
        checkout scm
      }
    }
    stage ('install modules'){
      steps{
        sh '''
          npm install --verbose -d 
          npm install --save classlist.js
        '''
      }
    }
    stage ('build') {
      steps{
        sh '$(npm bin)/ng build'
      }
    }
    stage ('build image') {
      steps{
        sh '''
          rm -rf node_modules
          docker build .
        '''
      }
    }
  }
}