# Sociogram Backend

## Introduction

The Sociogram Backend is responsible for handling the server-side logic and data management for the Sociogram project. It provides the necessary APIs and services to support the frontend application and facilitate communication with the database.

## Features

- User Authentication: The backend handles user registration, login, and authentication using secure methods such as hashing and token-based authentication.
- Post Management: Users can create, read, update, and delete posts. The backend ensures proper validation and authorization for these operations.
- Comment System: Users can comment on posts, and the backend manages the storage and retrieval of comments.
- User Profile: The backend provides endpoints to manage user profiles, including updating profile information and retrieving user details.

## Technologies Used

- Node.js: The backend is built using Node.js, a JavaScript runtime environment.
- Express.js: Express.js is used as the web application framework for handling HTTP requests and routing.
- MongoDB: The backend uses MongoDB as the database to store user information, posts, and comments.
- Mongoose: Mongoose is an Object Data Modeling (ODM) library for MongoDB, used to define schemas and interact with the database.

## Getting Started

To run the Sociogram Backend locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/sociogram-backend.git`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file and configure the required variables (e.g., database connection string, JWT secret).
4. Start the server: `npm start`
