import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './components/BookCard';
import Pagination from './components/Pagination';

const App = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books', {
                params: { query, page, limit },
            });
            setBooks(response.data.books);
            setStats({
                totalItems: response.data.totalItems,
                mostCommonAuthor: response.data.mostCommonAuthor,
                earliestDate: response.data.earliestDate,
                latestDate: response.data.latestDate,
                responseTime: response.data.responseTime,
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        if (query) fetchBooks();
    }, [query, page, limit]);

    return (
        <div className="app">
            <h1>Google Books Search</h1>
            <input
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <select value={limit} onChange={e => setLimit(e.target.value)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
            <div>
                {books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
            <Pagination
                pageCount={Math.ceil(stats.totalItems / limit)}
                onPageChange={({ selected }) => setPage(selected + 1)}
            />
            <div>
                <p>Total Results: {stats.totalItems}</p>
                <p>Most Common Author: {stats.mostCommonAuthor}</p>
                <p>Earliest Date: {stats.earliestDate}</p>
                <p>Latest Date: {stats.latestDate}</p>
                <p>Server Response Time: {stats.responseTime}</p>
            </div>
        </div>
    );
};

export default App;
