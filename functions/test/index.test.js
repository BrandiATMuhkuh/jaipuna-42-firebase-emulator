// START with: yarn firebase emulators:exec "yarn test --exit"
// important, project ID must be the same as we currently test

// At the top of test/index.test.js
require("firebase-functions-test")();

const assert = require("assert");
const firebase = require("@firebase/testing");

// must be the same as the project ID of the current firebase project.
// I belive this is mostly because the AUTH system still has to connect to firebase (googles servers)
const projectId = "jaipuna-42-firebase-emulator";
const admin = firebase.initializeAdminApp({ projectId });

beforeEach(async function() {
    this.timeout(0);
    await firebase.clearFirestoreData({ projectId });
});

async function snooz(time = 3000) {
    return new Promise(resolve => {
        setTimeout(e => {
            resolve();
        }, time);
    });
}

it("Add Crew Members", async function() {
    this.timeout(0);

    const heartOfGold = admin
        .firestore()
        .collection("spaceShip")
        .doc("Heart-of-Gold");

    const trillianRef = admin
        .firestore()
        .collection("characters")
        .doc("Trillian");

    // init crew members of the Heart of Gold
    await heartOfGold.set({
        crew: [],
        crewCount: 0,
    });

    // save the character Trillian to the DB
    const trillianData = { name: "Trillian", inSpace: false };
    await trillianRef.set(trillianData);

    // wait until the CF is done.
    await snooz();

    // check if the crew size has change
    const heart = await heartOfGold.get();
    const trillian = await trillianRef.get();

    console.log("heart", heart.data());
    console.log("trillian", trillian.data());

    // at this point the Heart of Gold has one crew member and trillian is in space
    assert.deepStrictEqual(heart.data().crewCount, 1, "Crew Members");
    assert.deepStrictEqual(trillian.data().inSpace, true, "In Space");
});
