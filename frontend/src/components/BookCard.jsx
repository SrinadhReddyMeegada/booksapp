import React, { useState } from 'react';

const BookCard = ({ book }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="book-card" onClick={() => setExpanded(!expanded)}>
            <h3>{book.authors.join(', ')} - {book.title}</h3>
            {expanded && <p>{book.description}</p>}
        </div>
    );
};

export default BookCard;
