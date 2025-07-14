const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all books
router.get('/', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get single book
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM books WHERE b_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Add new book
router.post('/', (req, res) => {
  const book = req.body;
  db.query('INSERT INTO books SET ?', book, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book added successfully', id: result.insertId });
  });
});

// Update book
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const book = req.body;
  db.query('UPDATE books SET ? WHERE b_id = ?', [book, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book updated successfully' });
  });
});

// Delete book
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE b_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book deleted successfully' });
  });
});

module.exports = router;