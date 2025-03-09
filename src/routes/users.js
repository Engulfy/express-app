const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

// Handles GET request and give default if no results
router.get('/', async (req, res) => {
    try {
        const { min = 0.0, max = 4000.0, offset = 0, limit, sort } = req.query;
        const users = await getUsers({
            min: parseFloat(min),
            max: parseFloat(max),
            offset: parseInt(offset),
            limit: limit ? parseInt(limit) : undefined,
            sort: sort ? sort.toUpperCase() : undefined,
        });
        res.json({ results: users });
    // Show error message if error occurs
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Exports router for use
module.exports = router;
