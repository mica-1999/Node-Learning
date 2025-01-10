const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db, collection;

client.connect()
  .then(() => {
    db = client.db("Blog");
    collection = db.collection("posts");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

exports.getAllPosts = async (req, res) => {
  try {
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve documents" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const document = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve document" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const result = await collection.insertOne(req.body);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create document" });
  }
};

exports.updatePost = async (req, res) => {
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
};

exports.deletePost = async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete document" });
  }
};
