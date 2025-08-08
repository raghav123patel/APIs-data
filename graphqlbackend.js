Skip to content
You said:
give me the complete backend code of graphql in nodejs along with the proper folder structure with any project example for learning and practicing
ChatGPT said:
Sure! Here's a complete GraphQL backend project in Node.js using Express, Apollo Server, and MongoDB (via Mongoose). This example is beginner-friendly and structured for learning and practicing.

📁 Project: Book Management API
Features:
Add, update, delete books

Get all books or a single book

GraphQL schema with types, queries, and mutations

🗂 Folder Structure
graphql-nodejs-backend/
│
├── src/
│   ├── models/           # Mongoose models
│   │   └── book.js
│   │
│   ├── resolvers/        # GraphQL resolvers
│   │   └── bookResolver.js
│   │
│   ├── schema/           # GraphQL type definitions
│   │   └── typeDefs.js
│   │
│   ├── config/           # DB config
│   │   └── db.js
│   │
│   └── index.js          # Main server entry
│
├── .env
├── .gitignore
├── package.json
└── README.md
🔧 Step-by-Step Backend Code
1. package.json
{
  "name": "graphql-nodejs-backend",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "nodemon src/index.js"
  },
  "dependencies": {
    "apollo-server-express": "^3.12.0",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "graphql": "^16.8.0",
    "mongoose": "^8.0.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.3"
  }
}
2. .env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/graphqlbooks
3. src/index.js (Entry point)
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/bookResolver');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
4. src/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
5. src/models/book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  publishedYear: Number,
});

module.exports = mongoose.model('Book', BookSchema);
6. src/schema/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String
    publishedYear: Int
  }

  type Query {
    getBooks: [Book]
    getBook(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String, publishedYear: Int): Book
    updateBook(id: ID!, title: String, author: String, publishedYear: Int): Book
    deleteBook(id: ID!): Book
  }
`;

module.exports = typeDefs;
7. src/resolvers/bookResolver.js
const Book = require('../models/book');

const resolvers = {
  Query: {
    getBooks: async () => await Book.find(),
    getBook: async (_, { id }) => await Book.findById(id),
  },

  Mutation: {
    addBook: async (_, { title, author, publishedYear }) => {
      const newBook = new Book({ title, author, publishedYear });
      return await newBook.save();
    },
    updateBook: async (_, { id, title, author, publishedYear }) => {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, publishedYear },
        { new: true }
      );
      return updatedBook;
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
8. .gitignore
node_modules
.env
✅ How to Run
1. Install dependencies
npm install
2. Start MongoDB (Ensure it's running locally)
3. Start the server
npm start
🔍 Try Queries in Apollo Playground
Go to http://localhost:4000/graphql

Sample Queries:
# Add a book
mutation {
  addBook(title: "1984", author: "George Orwell", publishedYear: 1949) {
    id
    title
  }
}

# Get all books
query {
  getBooks {
    id
    title
    author
    publishedYear
  }
}
Would you like this in a downloadable GitHub repo or ZIP file? I can generate that for you too.


By messaging ChatGPT, you agree to our Terms and have read our Privacy Policy. See Cookie Preferences.
Don't share sensitive info. Chats may be reviewed and used to train our models. Learn more



Attach

Search

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

