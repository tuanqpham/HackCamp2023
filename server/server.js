const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app= express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/signup', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    saveUsersToFile();
    res.json({ success: true });
});

function saveUsersToFile() {
    const usersData = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', usersData);
    console.log('Users data saved successfully.');
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});