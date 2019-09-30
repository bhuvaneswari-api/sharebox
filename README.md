# sharebox
API Automation for sharebox application.
This basically follows a Mocha Test Framework.
To run the code in your local machine you will need the following set up:
Node version 8.12.0 or above.
Npm version 6.4.1 or above.
Run the code with the command: npm test.

# folder structure
config folder: contains data folder and a default.json file.
Helpers folder: contains reusableFetchCalls.js file.
shareBoxTests folder: contains Testcases.spec.js file
# default.json:
This file contains:
The Base Url of the application(baseUrl).
The token of two users(tokenUser1, tokenUser2).
Before running the testcase replace both the tokens with tokens of two different users.
# data/*.json:
This folder contains four files that has all the data needed to pass through the endpoints during runtime as request json.
The file postShareTo.json contains the user id that needs to be replaced by the user id of the user for which the file will be shared. 
This user id can be obtained through network logs(form-data) in the browser when the share file is hit along with the user selected and share is done successfully.
# Helpers Folder:
This folder contains a [.js] file that has implementation of all the reusable functions throughout the testcases.
The implementation of post, put, get and del methods with node-fetch promise calls.
This file also has a configuration to handle proxy tunneling.
# shareBoxTests Folder:
This folder contains a file that holds all the testcases for each point.
These testcases call the reusable functions from helpers folder, read files from data folder and validate the response code along with the response json obtained in each testcase respectively.

# package.json:
This file specifies all the configurations and dependencies needed to run the testcases.
The file contains:
Test command to run the npm test.
GitHub url of the project.
# dependencies:
Following are the dependencies used:
chai - BDD purpose.
config - to have/import test configuration details defined by user.
fs - read files input json files.
mocha - the test framework used.
node-fetch - promise call to fetch responses for API methods.



