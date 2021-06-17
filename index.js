const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { add_customer, add_employee, login } = require('./accounts');



/*
 * APP INITIALIZATION
 */
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/scooters", async (req, res) => {
    try {
        const allScooters = await pool.query('SELECT * FROM "scooter"');
        res.json(allScooters.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/login',          (req, res) => { login(pool, req, res) });
app.get('/api/add_employee',   (req, res) => { add_employee(pool, req, res) });
app.get('/api/add_customer',   (req, res) => { add_customer(pool, req, res) });

app.listen(port, () => console.log(`Listening on port ${port}`));