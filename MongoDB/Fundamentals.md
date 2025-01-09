# MongoDB

This folder contains resources and examples for learning MongoDB.

## What is MongoDB?
MongoDB is a NoSQL database that uses a document-oriented data model. It stores data in flexible, JSON-like documents, which means fields can vary from document to document and data structure can be changed over time.

## Key Concepts
- **Database**: A container for collections.
- **Collection**: A group of MongoDB documents. Collections are similar to tables in relational databases like MySQL.
- **Document**: A record in a MongoDB collection. Documents are similar to rows in relational databases, but they are more flexible because they can have different fields.

## Collections vs. Tables
In MongoDB, collections are analogous to tables in MySQL. However, there are some key differences:
- Collections do not enforce a schema, meaning documents within a collection can have different fields.
- Documents in a collection are stored in a flexible, JSON-like format called BSON (Binary JSON).

## Schema Flexibility
One of the advantages of MongoDB is that you don't need to define the columns (schema) for collections in advance. This is beneficial because:
- **Flexibility**: You can store different types of data in the same collection without worrying about schema constraints.
- **Easier Iteration**: You can easily add or remove fields from documents as your application evolves without needing to alter the schema.
- **Faster Development**: You can quickly prototype and develop applications without the overhead of defining and managing schemas.

## Getting Started with MongoDB
To get started with MongoDB, you need to install MongoDB on your system and start the MongoDB server. You can then use the MongoDB shell or a GUI tool like MongoDB Compass to interact with your databases.

### Basic Commands
- **Show Databases**: List all databases.
  ```bash
  show dbs
  ```
- **Use Database**: Switch to a specific database.
  ```bash
  use <database-name>
  ```
- **Show Collections**: List all collections in the current database.
  ```bash
  show collections
  ```
- **Insert Document**: Insert a new document into a collection.
  ```javascript
  db.<collection-name>.insert({ key: "value" })
  ```
- **Find Documents**: Retrieve documents from a collection.
  ```javascript
  db.<collection-name>.find()
  ```

## Resources
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)

## License
This project is licensed under the MIT License.
