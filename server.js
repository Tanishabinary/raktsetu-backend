const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Temporary user storage
let users = [];

// 1. Test endpoint
app.get('/api/bloodrequests', (req, res) => {
    res.json({ message: "Connected to Node.js backend!" });
});

// 2. Register Route
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already registered!" });
    }

    users.push({ name, email, password });
    console.log("New user registered:", email);
    res.json({ success: true, message: "Account created successfully!" });
});

// 3. Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ success: true, message: "Login successful!", name: user.name });
    } else {
        res.status(401).json({ success: false, message: "Invalid email or password." });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});