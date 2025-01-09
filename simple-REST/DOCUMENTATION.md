# Simple RESTful API Project

This project is a simple RESTful API built with Node.js, Express, and MongoDB. It demonstrates basic CRUD (Create, Read, Update, Delete) operations on a collection of documents stored in a MongoDB database. The project also includes a basic HTML frontend to interact with the API.

## Project Structure

- **server.js**: The main server file that sets up the Express application, connects to MongoDB, and defines the API endpoints.
- **public/index.html**: The HTML file that provides a basic user interface for interacting with the API.
- **public/**: The directory that contains static files served by the Express application.

## API Endpoints

The API provides the following endpoints to perform CRUD operations on the `random` collection in the `testing` database:

- **GET /random**: Retrieve all documents in the collection.
- **GET /random/:id**: Retrieve a single document by its ID.
- **POST /random**: Create a new document.
- **PUT /random/:id**: Update an existing document by its ID.
- **DELETE /random/:id**: Delete a document by its ID.

## Frontend

The frontend is a simple HTML page that allows users to interact with the API. It includes forms to create and update documents, and a table to display and delete documents.

### Features

1. **Create Document**: A form to create a new document by entering a title and content.
2. **Display Documents**: A table that displays all documents retrieved from the API.
3. **Update Document**: A form to update an existing document by entering its ID, new title, and new content.
4. **Delete Document**: A button to delete a document by its ID.

### JavaScript Functions

The frontend includes JavaScript functions to handle form submissions and update the table:

- **fetchDocuments()**: Fetches all documents from the API and updates the table.
- **createForm**: Handles the form submission to create a new document.
- **updateForm**: Handles the form submission to update an existing document.
- **deleteDocument(id)**: Sends a request to delete a document by its ID and updates the table.

## How to Run the Project

1. **Start MongoDB**: Ensure that MongoDB is installed and running on your system. You can start the MongoDB server using the following command:
   ```bash
   mongod
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies:
   ```bash
   npm install
   ```

3. **Start the Server**: Start the Node.js server:
   ```bash
   node server.js
   ```

4. **Access the Frontend**: Open your web browser and navigate to `http://localhost:3000/` to access the frontend.

## Conclusion

This project demonstrates how to build a simple RESTful API with Node.js, Express, and MongoDB, and how to create a basic HTML frontend to interact with the API. It provides a foundation for building more complex applications with similar technologies.
