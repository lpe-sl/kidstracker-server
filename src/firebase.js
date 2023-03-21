const admin = require("firebase-admin");
const serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const rdb = admin.database();

module.exports = { db, rdb };
