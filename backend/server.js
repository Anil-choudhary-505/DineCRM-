const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL Database ✅");
});

// API to Handle Form Submissions
app.post("/submit-form", (req, res) => {
    const { fullname, contact, email, gender, diet, birthday, visitTime, feedback } = req.body;

    const visitTimeString = visitTime.join(","); // Convert array to comma-separated string

    const sql = `INSERT INTO users (fullname, contact, email, gender, diet, birthday, visitTime, feedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [fullname, contact, email, gender, diet, birthday, visitTimeString, feedback], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Form submitted successfully!", id: result.insertId });
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
