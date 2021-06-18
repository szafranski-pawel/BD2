module.exports.showAvailableScooters = async function(pool, req, res) {
    try {
        const allScooters = await pool.query("SELECT s.serial_numeric,t.conditiontype,s.age,s.latitude,s.longitude FROM scooter s,scooterstatus t WHERE s.id_status=t.id_status AND t.conditiontype='FREE'");
        console.log(`Return scooters`);
        res.json(allScooters.rows);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports.showRentedScooters = async function(pool, req, res) {
    try {
        const allScooters = await pool.query("SELECT s.serial_numeric,t.conditiontype,s.age,s.latitude,s.longitude FROM scooter s,scooterstatus t WHERE s.id_status=t.id_status AND t.conditiontype='TAKEN'");
        console.log(`Return scooters 2`);
        res.json(allScooters.rows);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports.rentScooter = async function(pool, req, res) {
    const info = req.body;
    const resp = await pool.query('UPDATE "scooter" SET "id_status" = $2 WHERE "serial_numeric" = $1;', [info.serial, 2])
    console.log(`Rent scooters`);
    res.send({message: 'Rented'});
};

module.exports.returnScooter = async function(pool, req, res) {
    const info = req.body;
    const resp = await pool.query('UPDATE "scooter" SET "id_status" = $2 WHERE "serial_numeric" = $1;', [info.serial, 1])
    console.log(`Return scooters`);
    res.send({message: 'Returned'});
};