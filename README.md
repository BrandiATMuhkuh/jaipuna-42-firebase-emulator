# Basic setup of a Firestore/Cloud function Test Suit for Node.js

## setup
-   clone this repository  `git clone https://github.com/BrandiATMuhkuh/jaipuna-42-firebase-emulator.git`
-   Create a firebase project. This is needed since firebase always wants to authenticate. Remember the `<project-id>`!
-   replace `jaipuna-42-firebase-emulator` in this Repo with your `<project-id>`. The places you need to look at are `.firebaserc`, `package.json` and `functions\test\index.test.js`. 
-   navigate to `functions` (`cd function`)
-   run `yarn` to install all dependencies

## run the tests
-   to start the emulator and run everything at once use this command: `yarn firebase emulators:exec "yarn test --exit"`


## trouble shooting
In case it's not working, try running `yarn deploy` from the root directory. This should deploy the cloud functions to your actuall project and allows you to play around with it. I had the experience that the server (google server) has to be setup to. Even though we work localy
