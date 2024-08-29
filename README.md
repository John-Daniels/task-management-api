# Task Management API

This is a Task Management API built with Node.js, Express, and MongoDB. It provides user authentication and allows authenticated users to manage their tasks.

## Features

-   **User Authentication**: Sign up and sign in users.
-   **Profile Management**: Access user profile details.
-   **Task Management**:
    -   **Create Task**: Add a new task with a title, description, status, and due date.
    -   **Get Tasks**: Retrieve all tasks associated with the logged-in user.
    -   **Update Task**: Modify an existing task’s details.
    -   **Delete Task**: Remove a task from the system.

## Postman Documentation

You can find the detailed API documentation [here](https://documenter.getpostman.com/view/29881481/2sAXjKYrPU#29a45912-9abf-4cdb-abda-6573792526ad).

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [MongoDB](https://www.mongodb.com/)
-   [Postman](https://www.postman.com/) (for API testing)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/John-Daniels/task-management-api.git
    cd task-management-api
    ```

2. Install dependencies:

    ```bash
    yarn
    ```

3. Set up your environment variables in a `.env` file:

    ```bash
    MONGODB_URI=your-mongodb-connection-string
    PORT=your-port-number
    JWT_SECRET=your-jwt-secret
    ```

4. Start the server:
    ```bash
    yarn dev
    ```

### API Endpoints

#### User Authentication

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| POST   | `/users/signup` | Register a new user      |
| POST   | `/users/signin` | Sign in an existing user |

#### User Profile (Authenticated)

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/users/profile` | Get logged-in user info |

#### Task Management (Authenticated)

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/tasks`     | Retrieve all tasks |
| POST   | `/tasks`     | Create a new task  |
| PUT    | `/tasks/:id` | Update a task      |
| DELETE | `/tasks/:id` | Delete a task      |

### Sample Task Object

```json
{
    "title": "Complete project",
    "description": "Finish the Node.js project",
    "completed": false
}
```

### Authentication Middleware

The API uses JWT for authentication. After signing in, you must include the token in the `Authorization` header for authenticated routes:

```bash
Authorization: Bearer <your-token>
```

### Testing the API

Use the Postman collection linked above to explore the routes and test the API.
