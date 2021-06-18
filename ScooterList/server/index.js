const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { showAvailableScooters } = require("./scootersList");

app.use(cors());
app.use(express.json());

app.get("/scooters", async (req, res) => { showAvailableScooters(pool,req,res) });


const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));