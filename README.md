# Express Web Application

## Description
This project is a web application for managing a database of names and salaries. The system allows users to:
- Upload a CSV file to add or update database.
- Retrieve information from database with filtering, sorting, and pagination.
- The CSV upload process ensures that only valid data is accepted (i.e., correct number of columns and valid salary values).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Error Handling](#error-handling)

## Installation

### Prerequisites
Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Express.js
- Multer for handling file uploads

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/engulfy/express-app.git
   ```
2. Navigate to the project directory:
    ```bash
   cd express-app
   ```
3. Install the dependencies
   ```bash
   npm install
   ```
# Usage
### Running the Server
To start the server, use the following command:
   ```bash
   node index.js
   ```
The server will be accessible at http://localhost:3000.

### Accessible Routes
1. GET /users: Retrieve a list of users.
   * Query Parameters:
     *  min: Minimum salary to filter by (default: 0).
     *  max: Maximum salary to filter by (default: 4000).
     *  offset: The number of records to skip (default: 0).
     *  limit: The number of records to return (optional).
     *  sort: Sort the results by NAME or SALARY.
   * Example Request:
        ```bash
        GET http://localhost:3000/users?sort=NAME&min=2000&max=4000&limit=10
        ```
2. POST /upload: Upload a CSV file to add or update database.
   * The CSV should contain two columns: Name and Salary.
   * Example CSV Format:
        ```csv
        Name,Salary
        Alex,3000
        Bryan,3500
        ```
   * Example Requests:
       ```bash
        POST http://localhost:3000/upload
        ```
3. Stopping the Server
* To stop the server, press Ctrl + C in your terminal where the server is running.

# Error Handling
The application will validate the CSV file and provide appropriate error messages for:
* Missing name or salary column in the CSV.
* Invalid salary values (e.g., non-numeric values).
* Rows with salary values less than 0.0 are skipped without affecting the entire file.

### Example Error Responses:
* Missing Name or Salary:
    ```json
    { "error": "CSV header must contain 'Name' and 'Salary' columns." }
    ```
* Invalid Salary Value:
    ```json
    { "error": "CSV file contains invalid rows (incorrect number of columns or invalid salary format)" }
    ```