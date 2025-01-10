// Import required modules
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
    const path = require("path");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db, collection;

console.log("Attempting to connect to MongoDB...");
client.connect()
  .then(() => {
    db = client.db("Blog");
    collection = db.collection("posts");
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

// GET: Retrieve all documents
app.get("/posts", async (req, res) => {
  try {
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve documents" });
  }
});

// Serve the login page
app.get("/login", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "login.html"));
  } catch (error) {
    res.status(500).json({ error: "Failed to load login page" });
  }
});

// GET: Retrieve a single document by ID
app.get("/posts/:id", async (req, res) => {
  try {
    const document = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve document" });
  }
});

// POST: Create a new document
app.post("/posts", async (req, res) => {
  try {
    const result = await collection.insertOne(req.body);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create document" });
  }
});

// PUT: Update an existing document
app.put("/posts/:id", async (req, res) => {
  try {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!result.value) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: "Failed to update document" });
  }
});

// DELETE: Delete a document
app.delete("/posts/:id", async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete document" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});