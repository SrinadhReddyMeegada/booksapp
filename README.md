# BooksApp

BooksApp is a web application that allows users to search for books using the Google Books API. The application is built with a React frontend and an Express backend.

## Features

- Search for books by title or author
- View book details including title, authors, description, and publication date
- Pagination controls to navigate through search results
- Statistics section displaying total items, most common author, earliest and latest publication dates, and response time

## Installation

1. Clone the repository:

```sh
git clone https://github.com/SrinadhReddyMeegada/booksapp.git
cd booksapp
```

2. Install dependencies for both frontend and backend:
```sh
npm install
npm install --prefix frontend
npm install --prefix backend
```
3. Create a .env file in the backend directory and add your Google Books API key:
```sh
GOOGLE_BOOKS_API_KEY=your_api_key_here
```
## Usage
To start the development server, run:
```sh
npm run dev
```
## Test
To run the tests, execute:
```sh
npm run test
```
This will start both the backend server on http://localhost:5411 and the frontend development server.