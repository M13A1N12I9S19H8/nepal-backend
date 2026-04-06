const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// 🔴 IMPORTANT: put your real password
const uri = process.env.MONGO_URI;

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("myDB");
  console.log("MongoDB Connected");
}

app.get("/places", async (req, res) => {
  try {
    const data = await db.collection("places").find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
