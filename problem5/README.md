# Express TypeScript Mongoose CRUD API with Clean Architecture

This project is a CRUD API built with ExpressJS, TypeScript, and Mongoose, following Clean
Architecture principles. It allows users to create, read, update, and delete resources in
a MongoDB database.

## Requirements

- Node.js
- MongoDB

## Project Setup

### 1. Install dependencies:

```
cd your-repo
npm install
```

### 2. Configure the MongoDB connection:

The default database connection URI is `mongodb://localhost:27017` or it can be configured
in the `.env` file. For example: `MONGO_URL=mongodb://localhost:27018`.

### 3. Start the development server:

```
npm run dev
```

The server will be running at http://localhost:3000.
