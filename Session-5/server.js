const express = require("express");
const admin = require("firebase-admin");

// Load Firebase service account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

// SIMPLE API to send notification
app.post("/send", async (req, res) => {
  const token = req.body.token;

  const message = {
    token: token,
    notification: {
      title: "Hello!",
      body: "This is my first FCM message"
    }
  };

  try {
    await admin.messaging().send(message);
    res.send("Notification sent!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
