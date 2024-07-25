const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

let users = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

app.post('/users', (req, res) => {
    const { name, phone, password, username } = req.body;
    const newUser = { id: users.length + 1, name, phone, password, username };
    users.push(newUser);
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
});


app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id == id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


app.put('/users/id', (req, res) => {
    const { id } = req.params;
    const { name, phone, password, username } = req.body;
    const user = users.find(u => u.id == id);
    if (user) {
        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.password = password || user.password;
        user.username = username || user.username;
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


app.patch('/users/id', (req, res) => {
    const { id } = req.params;
    const { name, phone, password, username } = req.body;
    const user = users.find(u => u.id == id);
    if (user) {
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (password) user.password = password;
        if (username) user.username = username;
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


app.delete('/users/id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id == id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
