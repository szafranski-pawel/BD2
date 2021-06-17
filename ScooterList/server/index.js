const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/scooters", async (req, res) => {
    try {
        const allScooters = await pool.query("SELECT \"SCOOTER\".\"SERIAL_NUMERIC\",\"SCOOTERSTATUS\".\"CONDITIONTYPE\",\"SCOOTER\".\"AGE\",\"SCOOTER\".\"LATITUDE\",\"SCOOTER\".\"LONGITUDE\" FROM \"SCOOTER\", \"SCOOTERSTATUS\" WHERE \"SCOOTER\".\"ID_STATUS\"=\"SCOOTERSTATUS\".\"ID_STATUS\" AND \"SCOOTERSTATUS\".\"CONDITIONTYPE\"='FREE'");
        res.json(allScooters.rows);
    } catch (err) {
        console.error(err.message);
    }
});

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));