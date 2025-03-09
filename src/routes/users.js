const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

// Handles GET request and set defaults
router.get('/', async (req, res) => {
    try {
        const { min = 0.0, max = 4000.0, offset = 0, limit, sort } = req.query;

        const minSalary = parseFloat(min);
        const maxSalary = parseFloat(max);
        const offsetValue = parseInt(offset);
        const limitValue = limit ? parseInt(limit) : undefined;

        // Validate 'min' and 'max' are valid numbers
        if (isNaN(minSalary) || isNaN(maxSalary) || minSalary < 0 || maxSalary < 0) {
            return res.status(400).json({ error: 'Invalid min or max salary values.' });
        }

        // Validate 'offset' and 'limit' values
        if (isNaN(offsetValue) || (limitValue && isNaN(limitValue))) {
            return res.status(400).json({ error: 'Invalid offset or limit values.' });
        }

        // Handle sorting (case-insensitive)
        const validSortOptions = ['NAME', 'SALARY'];
        const sortBy = sort && validSortOptions.includes(sort.toUpperCase()) ? sort.toUpperCase() : undefined;

        const users = getUsers({
            min: minSalary,
            max: maxSalary,
            offset: offsetValue,
            limit: limitValue,
            sort: sortBy
        });

        res.json({ results: users });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Exports router for use
module.exports = router;
