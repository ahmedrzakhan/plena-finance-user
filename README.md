# Plena Finance User

## Overview
This project provides a robust API for managing user operations and interactions within the Plena Finance system. It offers functionalities for user creation, retrieval, updating, deletion, blocking, unblocking, and searching, ensuring comprehensive user management capabilities.

## Features
- User Management:
Create, Read, Update, Delete User (CRUD operations).
- Block/Unblock User:
Block or unblock users to manage access and interactions.
- Search Users:
Search for users based on specified criteria.
  
## Technology Stack
- **Backend**: Node.js, NestJS
- **Database**: MongoDB (for user data), Redis (for caching)
- **Others**: Postman (for API testing and documentation)

## Installation

### Prerequisites
- Node.js
- MongoDB
- Redis
- NestJS

### Steps
1. Clone the repository:
```bash
git clone https://github.com/ahmedrzakhan/plena-finance-user.git
```

Navigate to the project directory:
```bash
cd plena-finance-user
```

Install the dependencies:
```bash
npm install
```

Set up the environment variables:
Create a .env file in the root directory.
Add the following environment variables:
```bash
MONGODB_URI=your_mongodb_uri
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
```

Start the server:
```bash
npm start
```

## Postman Collection

You can find the Postman collection with all the API endpoints
> **🔗 [Postman Collection Link](https://www.postman.com/grey-capsule-23433/workspace/github-projects/folder/11844553-383662fa-c1ae-455f-917a-5c051fd98004?action=share&creator=11844553&ctx=documentation)**


### API Documentation

The Postman collection includes all necessary endpoints for the project. Each endpoint is documented with:
- HTTP method
- Request URL
- Required headers
- Request body (if applicable)
- Example responses

## API Endpoints

### User Management:
```bash
GET /api/user/:id - Get user by ID
CREATE /api/user - Create user by unique username
PUT /api/user/:id - Update user by ID
DELETE /api/user/:id - Delete user by ID
```

###  Block User:
```bash
POST blocked-users/:userId/block - Blocks a user specified by userId.
```

### Unblock User:
```
POST blocked-users/:userId/unblock - Unblocks a user specified by userId.
```

### Search Users:
```bash
GET user/:userId/actions/search - Retrieves users filtered by the provided criteria, excluding those who have been blocked.
Parameters:
username: Specifies the username to search for.
minAge (optional): Specifies the minimum age for filtering users.
maxAge (optional): Specifies the maximum age for filtering users.
```

## Running Tests
To ensure the quality and functionality of the application, have implemented various test cases. You can run these tests using the following command:
```bash
npm test
```

Contact
* Author: [Ahmed Raza Khan](https://github.com/ahmedrzakhan)
* Email: khanahmed925@gmail.com
* LinkedIn: [Ahmed Raza Khan](https://www.linkedin.com/in/ahmedrza/)

