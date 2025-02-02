const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});