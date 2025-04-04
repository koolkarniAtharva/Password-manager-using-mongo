// server.js
import express from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
await client.connect();

const dbName = process.env.DB_NAME;
const db = client.db(dbName);
const collection = db.collection("passwords");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// GET: All passwords
app.get("/", async (req, res) => {
  const data = await collection.find().toArray();
  res.json(data);
});

// POST: Add a password
app.post("/", async (req, res) => {
  const password = req.body;
  const result = await collection.insertOne(password);
  res.json({ success: true, result });
});

// PUT: Update a password
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  res.json({ success: true, result });
});

// DELETE: Delete a password
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  res.json({ success: true, result });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
