const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 5500;

app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const userData = req.body;

    // Read existing data from the file, if any
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    } catch (error) {
        console.error('Error reading existing data:', error);
    }

    // Add the new data to the array
    existingData.push(userData);

    // Write the updated data back to the file
    try {
        fs.writeFileSync('users.json', JSON.stringify(existingData, null, 2), 'utf-8');
        console.log('User data saved successfully.');
    } catch (error) {
        console.error('Error writing data to file:', error);
    }

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});