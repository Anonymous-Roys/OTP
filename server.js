const express = require('express');
const appRoute = require('./routes/routes.js');

const app = express();
const port = process.env.port || 5000

app.use(express.json());

// routes
app.use('/api', appRoute)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})