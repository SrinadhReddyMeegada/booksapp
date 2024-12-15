const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/books', booksRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
