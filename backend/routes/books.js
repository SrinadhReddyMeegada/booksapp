const express = require('express');
const axios = require('axios');
const router = express.Router();

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

router.get('/', async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const start = Date.now();
        const response = await axios.get(GOOGLE_BOOKS_API, {
            params: {
                q: query,
                startIndex,
                maxResults: limit,
                key: process.env.GOOGLE_BOOKS_API_KEY,
            },
        });
        const elapsed = Date.now() - start;

        const books = response.data.items || [];
        const authors = books.flatMap(book => book.volumeInfo.authors || []);
        const authorFrequency = authors.reduce((acc, author) => {
            acc[author] = (acc[author] || 0) + 1;
            return acc;
        }, {});

        const mostCommonAuthor = Object.keys(authorFrequency).reduce((a, b) =>
            authorFrequency[a] > authorFrequency[b] ? a : b,
        );

        const publicationDates = books
            .map(book => book.volumeInfo.publishedDate)
            .filter(Boolean)
            .sort();

        res.json({
            books: books.map(book => ({
                id: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors || [],
                description: book.volumeInfo.description || 'No description available.',
            })),
            totalItems: response.data.totalItems,
            mostCommonAuthor,
            earliestDate: publicationDates[0],
            latestDate: publicationDates[publicationDates.length - 1],
            responseTime: `${elapsed}ms`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Google Books API' });
    }
});

module.exports = router;
