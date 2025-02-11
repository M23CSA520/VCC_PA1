const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// MySQL Connection (Change to VM2's IP)
const db = mysql.createConnection({
    host: "192.168.1.102",  // VM2 IP Address
    user: "user",
    password: "password",
    database: "microservice_db"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL on VM2");
});

// API Route to Insert User Data
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User added successfully", userId: result.insertId });
    });
});

// API Route to Fetch Users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.listen(3000, () => console.log("Microservice running on port 3000"));
