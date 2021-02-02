var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseSecretKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-e42a1.firebaseio.com",
});

module.exports = admin;
