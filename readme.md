# Vidly App

## Overview
Vidly is a web application designed to manage a database of movie genres, movies, customers, and rentals. It is built with Node.js, Express, and MongoDB, following best practices in coding, including Object-Oriented Programming (OOP) principles, to ensure reusability and maintainability.

## Features
- **Authentication & Authorization**: Implemented using JSON Web Tokens (JWT).
- **User Roles**: Regular users and Admin users with different levels of access.
- **Error Handling**: User-friendly error messages and robust error logging.
- **Password Security**: Passwords are hashed before storing in the database.
- **CRUD Operations**: Full CRUD functionality for genres, movies, customers, and rentals.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose** (for MongoDB object modeling)
- **jsonwebtoken** (for JWT handling)
- **bcrypt** (for password hashing)
- **config** (for managing configuration settings)
- **winston** (for logging)
- **express-async-errors** (for handling async errors in Express)
- **Joi** (for input validation)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Datamaverik/vidly-app.git
    cd vidly-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    NODE_ENV=development
    PORT=3000
    JWT_PRIVATE_KEY=yourSecureKey
    DB_CONNECTION_STRING=mongodb://localhost:27017/vidly
    ```

### Running the Application
1. Start MongoDB server (if not already running):
    ```bash
    mongod
    ```

2. Start the application:
    ```bash
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Genres
- **GET /api/genres**: Get all genres.
- **GET /api/genres/:id**: Get a genre by ID.
- **POST /api/genres**: Create a new genre (Admin only).
- **PUT /api/genres/:id**: Update a genre by ID (Admin only).
- **DELETE /api/genres/:id**: Delete a genre by ID (Admin only).

### Movies
- **GET /api/movies**: Get all movies.
- **GET /api/movies/:id**: Get a movie by ID.
- **POST /api/movies**: Create a new movie (Admin only).
- **PUT /api/movies/:id**: Update a movie by ID (Admin only).
- **DELETE /api/movies/:id**: Delete a movie by ID (Admin only).

### Customers
- **GET /api/customers**: Get all customers.
- **GET /api/customers/:id**: Get a customer by ID.
- **POST /api/customers**: Create a new customer.
- **PUT /api/customers/:id**: Update a customer by ID.
- **DELETE /api/customers/:id**: Delete a customer by ID.

### Rentals
- **GET /api/rentals**: Get all rentals.
- **GET /api/rentals/:id**: Get a rental by ID.
- **POST /api/rentals**: Create a new rental.
- **PUT /api/rentals/:id**: Update a rental by ID.
- **DELETE /api/rentals/:id**: Delete a rental by ID.

## Security
- **Authentication**: JWT tokens are used for authenticating users.
- **Authorization**: Admin privileges are required for certain operations such as deleting documents.
- **Password Hashing**: User passwords are hashed using bcrypt before storing them in the database.

## Logging
- **Winston**: Used for logging errors and important events.
- **express-async-errors**: Used for handling asynchronous errors in Express routes.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Acknowledgements
- Inspiration from the [Node Course](https://codewithmosh.com/p/the-complete-node-js-course) by [Mosh Hamedani].
- [Mosh Hamedani](https://codewithmosh.com/) for excellent tutorials and resources.
