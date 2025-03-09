const express = require('express');
const app = express();
const port = 3000
const userRoutes = require('./src/routes/users');
const uploadRoutes = require('./src/routes/upload');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/upload', uploadRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
