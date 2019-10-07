const functions = require("firebase-functions");
const admin = require("firebase-admin");

// init the database
admin.initializeApp(functions.config().firebase);
let fsDB = admin.firestore();

const heartOfGoldRef = admin
    .firestore()
    .collection("spaceShip")
    .doc("Heart-of-Gold");

exports.addCrewMemeber = functions.firestore.document("characters/{characterId}").onCreate(async (snap, context) => {
    console.log("characters", snap.id);

    // before doing anything we need to make sure no other cloud function worked on the assignment already
    // don't forget, cloud functions promise an "at least once" approache. So it could be multiple
    // cloud functions work on it. (FYI: this is called "idempotent")

    return fsDB.runTransaction(async t => {
        // Let's load the current character and the ship
        const [characterSnap, shipSnap] = await t.getAll(snap.ref, heartOfGoldRef);

        // Let's get the data
        const character = characterSnap.data();
        const ship = shipSnap.data();

        // set the crew members and count
        ship.crew = [...ship.crew, context.params.characterId];
        ship.crewCount = ship.crewCount + 1;

        // update character space status
        character.inSpace = true;

        // let's save to the DB
        await Promise.all([t.set(snap.ref, character), t.set(heartOfGoldRef, ship)]);
    });
});
