# Book Store API

This is a RESTful API for managing books. It supports the following operations:

## POST /books

Add a new book.

### Request Body

* `title`: The title of the book (string)
* `author`: The author of the book (string)
* `year`: The year the book was published (integer)

### Response

* `id`: The ID of the newly created book (integer)
* `title`: The title of the book (string)
* `author`: The author of the book (string)
* `year`: The year the book was published (integer)

## GET /books

Retrieve all books.

### Response

* An array of book objects, each with the following properties:
	+ `id`: The ID of the book (integer)
	+ `title`: The title of the book (string)
	+ `author`: The author of the book (string)
	+ `year`: The year the book was published (integer)

## GET /books/:id

Retrieve a book by its ID.

### Path Parameters

* `id`: The ID of the book to retrieve (integer)

### Response

* The book object with the following properties:
	+ `id`: The ID of the book (integer)
	+ `title`: The title of the book (string)
	+ `author`: The author of the book (string)
	+ `year`: The year the book was published (integer)

## PUT /books/:id

Update a book by its ID.

### Path Parameters

* `id`: The ID of the book to update (integer)

### Request Body

* `title`: The new title of the book (string)
* `author`: The new author of the book (string)
* `year`: The new year the book was published (integer)

### Response

* The updated book object with the following properties:
	+ `id`: The ID of the book (integer)
	+ `title`: The title of the book (string)
	+ `author`: The author of the book (string)
	+ `year`: The year the book was published (integer)

## DELETE /books/:id

Delete a book by its ID.

### Path Parameters

* `id`: The ID of the book to delete (integer)

### Response

* An empty response body with a 204 status code.
