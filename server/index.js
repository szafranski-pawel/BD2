const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { add_customer, add_employee, login, roles } = require('./accounts');
const { showAvailableScooters } = require("./scootersList");

/*
 * APP INITIALIZATION
 */
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/scooters", async (req, res) => { showAvailableScooters(pool,req,res) });

app.get('/api/roles',           (req, res) => { roles(pool, req, res) });
app.post('/api/login',          (req, res) => { login(pool, req, res) });
app.post('/api/add_employee',   (req, res) => { add_employee(pool, req, res) });
app.post('/api/add_customer',   (req, res) => { add_customer(pool, req, res) });

app.listen(port, () => console.log(`Listening on port ${port}`));