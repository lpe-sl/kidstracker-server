const { db, rdb } = require("./firebase");

async function processMessage(message) {
  // Split the message into data fields
  const data = message.split(",");

  // Extract and process data
  const header = data[0];
  const deviceId = data[1];
  const command = data[2];
  const timestamp = data[3];
  const validity = data[4];
  const latitude =
    parseFloat(data[5].slice(0, 2)) + parseFloat(data[5].slice(2) / 60);
  const latitudeDirection = data[6];
  const longitude =
    parseFloat(data[7].slice(0, 3)) + parseFloat(data[7].slice(3) / 60);
  const longitudeDirection = data[8];
  const speed = parseFloat(data[9]);
  const direction = parseFloat(data[10]);
  const date = data[11];

  // console.log(`Header: ${header}`);
  // console.log(`Device ID: ${deviceId}`);
  // console.log(`Command: ${command}`);
  // console.log(`Timestamp: ${timestamp}`);
  // console.log(`Validity: ${validity}`);
  // console.log(`Latitude: ${latitude} ${latitudeDirection}`);
  // console.log(`Longitude: ${longitude} ${longitudeDirection}`);
  // console.log(`Speed: ${speed}`);
  // console.log(`Direction: ${direction}`);
  // console.log(`Date: ${date}`);

  // Save the data to Firebase
  const docRef = db.collection("gps_data").doc(); // Change 'gps_data' to the desired Firestore collection name
  await docRef.set({
    deviceId: deviceId,
    timestamp: Date.now(),
    latitude: latitude,
    latitudeDirection: latitudeDirection,
    longitude: longitude,
    longitudeDirection: longitudeDirection,
    speed: speed,
    direction: direction,
    rawData: message,
    validity: validity,
    Date: date,
  });
  await rdb.ref(`trackers/${deviceId}`).update({
    coordinate: {
      latitude: latitude,
      longitude: longitude,
    },
  });
}

module.exports = { processMessage };
