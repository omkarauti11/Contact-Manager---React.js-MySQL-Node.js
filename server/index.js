
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Define the database schema creation queries
const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS crud_contact";

const useDatabaseQuery = "USE crud_contact";

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contact_db (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        contact varchar(45) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
`;


// Use the callback provided by createPool to check for connection errors
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1); // Exit the application if there's an error connecting to the database
    } else {
        console.log('Connected to the MySQL database');
        console.log('Connection ID:', connection.threadId);
        
        // Execute database schema creation queries
        connection.query(createDatabaseQuery, (err) => {
            if (err) {
                console.error('Error creating database:', err);
            } else {
                console.log('Database created successfully or already exists');
                
                // Switch to the 'crud_contact' database
                connection.query(useDatabaseQuery, (err) => {
                    if (err) {
                        console.error('Error selecting database:', err);
                    } else {
                        console.log('Using database: crud_contact');
                        
                        // Create the 'contact_db' table
                        connection.query(createTableQuery, (err) => {
                            if (err) {
                                console.error('Error creating table:', err);
                            } else {
                                console.log('Table created successfully or already exists');
                            }
                        });
                    }
                });
            }
        });

        connection.release(); // Release the connection when done
    }
});




// Define your API routes below this point


app.get("/", (req, res) => {
    // Handle your default route
    res.send("Hello, Express!");
});



app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";

    db.query(sqlGet, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // console.log(result);
            res.send(result);
        }
    });
});



app.get("/api/get/:id", (req, res) => {
    const { id } = req.params; 

    const sqlGet = "SELECT * FROM contact_db WHERE id=?";

    db.query(sqlGet, id, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // console.log(result);
            res.send(result);
        }
    });
});



app.put("/api/update/:id", (req, res) => {
    const { id } = req.params; 
    
    const { name, email, contact } = req.body;

    const sqlUpdate = "UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";

    db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            // console.log(result);
            res.send(result);
        }
    });
});



app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;

    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";

    db.query(sqlInsert, [name, email, contact], (err, result) => {
        if(err) {
            console.log(err);
        }
    });
});



app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;

    const sqlRemove = "DELETE FROM contact_db WHERE id=?";

    db.query(sqlRemove, id , (err, result) => {
        if(err) {
            console.log(err);
        }
    });
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


