const admin = require("firebase-admin");
const serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kids-tracker-c447b-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();
const rdb = admin.database();

module.exports = { db, rdb };
