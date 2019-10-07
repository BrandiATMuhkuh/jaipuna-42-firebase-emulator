# jaipuna-42-firebase-emulator-tests

## setup

-   clone repo
-   navigate to `functions` (`cd function`)
-   run `yarn` to install all dependencies
-   create an actuall firebase project with name `<project-id>`
-   replace `projectId` inside `functions/test/index.test.js` with yours
-   replace `jaipuna-42-firebase-emulator` inside `.firebaserc` with your projectID `<project-id>`

## run the tests

-   to start the emulator and run everything at once use this command: `yarn firebase emulators:exec "yarn test --exit"`
