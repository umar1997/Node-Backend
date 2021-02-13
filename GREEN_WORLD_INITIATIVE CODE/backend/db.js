let admin = require("firebase-admin");

const projectId = process.env["PROJECT_ID"];
const serviceAccount = require("./../green-world-initiative-firebase-adminsdk-uikrx-bbbf5971b8.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${projectId}.firebaseio.com`,
    storageBucket: "green-world-initiative.appspot.com",
  });
} else {
  console.log("Database Initiallization Error");
}

const db = admin.firestore();

module.exports = { db, admin };
