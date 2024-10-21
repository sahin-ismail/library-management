# Library Management API

This project is a library management system API built using **Express.js**, **Sequelize** (with **PostgreSQL** as the database), and **TypeScript**.

## Introduction

This API allows you to manage a library system where users can borrow and return books. It includes basic CRUD functionality for both users and books, and tracks borrowing history with ratings.

### Features:

- Add new books and users
- Fetch lists of books and users
- Borrow and return books
- Calculate average book ratings

## Requirements

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **PostgreSQL** database

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/library-management.git
   cd library-management
   ```

2. Install dependencies:

   ```bash
    npm install

   ```

3. Construct a .env and .env.local file:

   ```bash
    touch .env
   ```

4. If you will run on Docker environment .env should be same with below. If you want to run locally, you should configure .env file according to database and run init-db.sql script:

   ```bash
    DB_HOST=db
    DB_PORT=5432
    DB_NAME=library_db
    DB_USER=library_user
    DB_PASSWORD=library_pass

   ```

## Running the Application

### Docker Environment

If you prefer to run the app on docker environment, run following command. ( Do not need to cofigure anything, just start and send requests )

```bash
 docker-compose up --build -d

```

### Local Environment

If you prefer to run the app locally using ts-node

```bash
 npm run local

```

## API Endpoints

The following are the key endpoints provided by the library management API.

### Books

- `GET /books`: Fetch a list of all books.
- `GET /books/:id`: Fetch a specific book by its ID.
- `POST /books`: Create a new book.
- `PUT /books/:id`: Update a book by its ID.
- `DELETE /books/:id`: Delete a book by its ID.

### Users

- `GET /users`: Fetch a list of all users.
- `GET /users/:id`: Fetch a specific user by their ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update a user by their ID.
- `DELETE /users/:id`: Delete a user by their ID.

### Borrowing Books

- `POST /users/:userId/borrow/:bookId`: Borrow a book by a user.
- `PUT /users/:userId/return/:bookId`: Return a borrowed book by a user and optionally provide a score.
