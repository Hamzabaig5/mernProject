const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/reservations', require('./routes/api/reservations'));
//app.use('/api/loyaltyPoints', require('./routes/api/loyaltyPoints'));
const PORT = 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
