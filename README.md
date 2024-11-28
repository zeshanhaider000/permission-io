# ui-automation
Permission IO Auotmation

## Install and run automation

1. Install node==16.17.0
If you don't have node installed use node version manager (nvm) to manage different node versions.

To install nvm run following command

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
Close and re-open the terminal for nvm to become available.

Install node using nvm

```bash
nvm install 16.17.0
```

2. Install node dependencies for the project

```bash
npm install
```
3. create a file named as cypress.env.json and place actual values that are available in sample.cypress.env.json.

4. Open cypress dashboard using following command to run test cases manually.

```bash
npx cypress open
```

###

- you can click test case on dashboard it will start executing

#

- Execute following command to run all cases as headless it will generate a html report as well and the videos

      npm run run_test_cases

- After running the above command we will get 2 new folders videos and reports


## basic Setup for reporting

- Execute following command to install reporting dependencies

    - npm install mocha
    - npm install mochawesome
    - npm install mochawesome-merge
    - npm install mochawesome-report-generator

- if devs want to run test cases in headless mode at their end use below command

      cypress run --spec cypress/e2e/permission-io/01_login_flows.ts --env DASHBOARD_URL=https://search.permission.io/ --browser chrome
    
    - spec will be the file having certain test cases we will execute only the test cases that ara available in that
    - DASHBOARD_URL is basically the instance url 
    - browser we can select any browser
