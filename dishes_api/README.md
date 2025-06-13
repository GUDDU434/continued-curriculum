# Dishes API

This project implements simple CRUD operation for dishes API using Node.js, Express and local db. The following routes are available:

## Routes

### GET /dishes

- **Description**: Responds with List of dishes.
- **Response**: JSON object containing array of dishes.

### Post /dishes

- **Description**: Responds with success message stating dish added successfully.
- **Response**: Send a Success message.

### Get /dishes/:id

- **Description**: Responds with details of the dish.
- **Response**: JSON object with the details of dish.

### PUT /dishes/:id

- **Description**: Responds with success message and updated details of the dish.
- **Response**: JSON object with the details of dish.


### DELETE /dishes/:id

- **Description**: Responds with success message and Delete the dish by id.
- **Response**: Send a Success message.

### Undefined Routes

- **Description**: Any undefined route will return a 404 Not Found message.
- **Response**: Plain text message "404 Not Found".

## Setup

1. Ensure you have Node.js and npm installed.
2. Clone the repository.
3. Run `npm install` to install dependencies.
4. Start the server using `npm start`.

## Usage

Once the server is running, you can access the routes using a tool like Postman or your web browser by visiting `http://localhost:3000/dishes`. For any other routes, you will receive a 404 Not Found message.
