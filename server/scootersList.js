module.exports.showAvailableScooters = async function(pool, req, res) {
    try {
        const allScooters = await pool.query("SELECT s.serial_numeric,t.conditiontype,s.age,s.latitude,s.longitude FROM scooter s,scooterstatus t WHERE s.id_status=t.id_status AND t.conditiontype='FREE'");
        console.log(`Return scooters`);
        res.json(allScooters.rows);
    } catch (err) {
        console.error(err.message);
    }
};