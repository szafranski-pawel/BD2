const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/scooters", async (req, res) => {
    try {
        const allScooters = await pool.query('SELECT * FROM "SCOOTER"');
        res.json(allScooters.rows);
    } catch (err) {
        console.error(err.message);
    }
});

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));