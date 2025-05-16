# Simple Book Management API with User Authentication

This is a basic web application built with Express.js that provides user registration, login, and access to a book list with review functionality.

## Features

* **User Authentication:**
    * User registration.
    * User login with JWT-based session management.
    * User logout.
* **Book Listing:**
    * Retrieves a list of available books.
    * Allows searching/filtering of books based on query parameters.
* **Book Reviews:**
    * Retrieves reviews for a specific book.
    * Allows logged-in users to post and delete their reviews for a book.

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Minimalist web application framework for Node.js.
* **express-session:** Middleware for creating and managing user sessions.
* **jsonwebtoken:** Library for creating and verifying JSON Web Tokens for authentication.
* **ejs:** Embedded JavaScript templates for rendering views.

## Setup Instructions

Follow these steps to get the application running on your local machine:

1.  **Prerequisites:**
    * [Node.js](https://nodejs.org/) (version 14 or higher recommended).
    * [npm](https://www.npmjs.com/) (usually installed with Node.js).

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    This command will install all the necessary packages listed in the `package.json` file.

3.  **Run the Server:**
    ```bash
    npm start
    ```
    or
    ```bash
    node server.js
    ```
    The server will start and listen on port `3000`. You should see the message `Server is running on port 3000` in your console.

## API Endpoints

### User Routes (`/user`)

* **`GET /user`**: Serves the `user.html` file (likely the login/registration page).
* **`POST /user/register`**: Registers a new user. Expects a JSON body with `username` and `password`.
* **`POST /user/login`**: Logs in an existing user. Expects a JSON body with `username` and `password`. Upon successful authentication, a JWT access token is stored in the session, and the user is redirected to `/book`. Returns a 401 status code for unauthorized access.
* **`GET /user/logout`**: Logs out the current user by destroying the session and redirects to `/user`.

### Book Routes (`/book`)

* **`GET /book`**: Serves the `book.html` file (likely the book listing page). **Requires authentication.**
* **`GET /book/search`**: Retrieves a list of all books as JSON. **Requires authentication.**
* **`POST /book/search`**: Filters the book list based on query parameters provided in the URL (e.g., `/book/search?author=author1&title=book1`). Expects query parameters and returns a filtered list of books as JSON. **Requires authentication.**
* **`USE /book/review`**: Mounts the `reviewRouter` for handling book reviews. **Requires authentication for all sub-routes.**

### Review Routes (`/book/review/:bookID`)

* **`GET /book/review/:bookID`**: Retrieves the reviews for a specific `bookID`. Renders the `review.ejs` template, passing the `bookID` and the JSON string of the reviews for that book. **Requires authentication.**
* **`POST /book/review/:bookID`**: Posts a new review for the specified `bookID`. Expects a JSON body with the `review` content. The review is associated with the logged-in user's ID (extracted from the JWT in the session).
* **`DELETE /book/review/:bookID`**: Deletes the logged-in user's review for the specified `bookID`.

## Important Notes

* **Security:** This application uses a simple in-memory array (`userList`) for storing user credentials, which is **not suitable for production**. In a real application, you would use a secure database and proper password hashing (e.g., bcrypt).
* **JWT Secret Key:** The secret key (`"secret"`) used for signing JWTs is hardcoded. **In a production environment, you should use a strong, randomly generated, and securely stored secret key.**
* **Session Store:** The application uses `session.MemoryStore()`, which is intended for development and **not recommended for production** as it will lose session data when the server restarts and can lead to memory leaks. Consider using a persistent session store like Redis or MongoDB.
* **HTTPS:** The `cookie.secure` option in the session middleware is set to `false`. **In a production environment, you should always use HTTPS
