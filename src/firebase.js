const admin = require("firebase-admin");
const serviceAccount = require("../path/to/your/firebase-private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
