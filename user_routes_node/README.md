# User Routes API

This project implements simple user routes using Node.js and Express. The following routes are available:

## Routes

### GET /users/get

- **Description**: Responds with dummy details of a single user.
- **Response**: JSON object containing dummy user details.

### GET /users/list

- **Description**: Responds with dummy details of three users.
- **Response**: JSON array containing three user objects.

### Undefined Routes

- **Description**: Any undefined route will return a 404 Not Found message.
- **Response**: Plain text message "404 Not Found".

## Setup

1. Ensure you have Node.js and npm installed.
2. Clone the repository.
3. Run `npm install` to install dependencies.
4. Start the server using `npm start`.

## Usage

Once the server is running, you can access the routes using a tool like Postman or your web browser by visiting `http://localhost:3000/users/get` or `http://localhost:3000/users/list`. For any other routes, you will receive a 404 Not Found message.
