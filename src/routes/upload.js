const express = require('express');
const multer = require('multer');
const router = express.Router();
const { processCSVUpload } = require('../controllers/uploadController');

// Middleware that handles uploading form
const upload = multer();

// HTML for allowing uploading of file
router.get('/', (req, res) => {
    res.send(`
      <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="file" />
          <button type="submit">Upload CSV</button>
      </form>
    `);
});

// Handles form submission
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const result = await processCSVUpload(req.file.buffer.toString());
        if (result.success) {
            res.json({ success: 1 });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exports router for use
module.exports = router;
