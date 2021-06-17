async function isEmailRegistered(pool, email) {
    const resp = await pool.query(
        `SELECT "EMAIL" FROM "EMPLOYEE" WHERE "EMAIL"=$1 UNION SELECT "EMAIL" FROM "customer" WHERE "EMAIL"=$1`, 
        [email]
    );

    return resp.rowCount !== 0;
}

module.exports.add_customer = async function(pool, req, res) {
    const customer = req.body;

    const isRegistered = isEmailRegistered(pool, customer.email);

    if (!isRegistered) {
        var resp = await pool.query(`INSERT INTO "address" ("address") VALUES($1) RETURNING "id_address";`, [customer.address]);
        const addressID = resp.rows[0]["ID_ADDRESS"];
        resp = await pool.query(`INSERT INTO "password" ("password") VALUES($1) RETURNING "id_password";`, [customer.password]);
        const passID = resp.rows[0]["id_password"];
        await pool.query(
            `INSERT INTO "customer" ("name", "surname", "email", "id_address", "id_password") 
            VALUES ($1, $2, $3, $4, $5);`, 
            [customer.name, customer.surname, customer.email, addressID, passID]);
        res.send({message: 'Success'});
    } else {
        res.send({message: 'Error'});
    }
};

module.exports.add_employee = async function(pool, req, res) {
    const employee = req.body;

    const isRegistered = isEmailRegistered(pool, employee.email);

    if (!isRegistered) {
        var resp = await pool.query(`SELECT "position_name" FROM "position" WHERE "position_name" = $1;`, [employee.position]);
        if (resp.rows.length !== 1) {
            res.send({message: 'Error'});
        }
        resp = await pool.query(`INSERT INTO "address" ("address") VALUES($1) RETURNING "id_address";`, [employee.address]);
        const addressID = resp.rows[0]["ID_ADDRESS"];
        resp = await pool.query(`INSERT INTO "password" ("password") VALUES($1) RETURNING "id_password";`, [employee.password]);
        const passID = resp.rows[0]["id_password"];
        await pool.query(
            `INSERT INTO "employee" ("name", "surname", "email", "id_address", "id_password", "position_name",) 
            VALUES ($1, $2, $3, $4, $5, $6);`, 
            [employee.name, employee.surname, employee.email, addressID, passID, employee.position]);
        res.send({message: 'Success'});
    } else {
        res.send({message: 'Error'});
    }
};

module.exports.login = async function(pool, req, res) {
    const info = req.body;

    var resp = await pool.query('SELECT "id_password" FROM "customer" WHERE "email" = $1;', [info.email])
    if (resp.rows.length === 1) {
        resp = await pool.query('SELECT "password" FROM "password" WHERE "id_password" = $1;', [resp.rows[0]["id_password"]])
        if (resp.rows[0]["password"] === info.password) {
            res.send({message: {
                email: info.email,
                type: 'customer',
            }});
        } else {
            res.send({message: 'Wrong password'});
        }
    } else {
        resp = await pool.query('SELECT "id_password", "position_name" FROM "employee" WHERE "email" = $1;', [info.email])
        if (resp.rows.length === 1) {
            const employeePos = resp.rows[0]["POSITION_NAME"]
            resp = await pool.query('SELECT "password" FROM "password" WHERE "id_password" = $1;', [resp.rows[0]["id_password"]])
            if (resp.rows[0]["password"] === info.password) {
                res.send({message: {
                    email: info.email,
                    type: employeePos,
                }});
            } else {
                res.send({message: 'Wrong password'});
            }
        } else {
            res.send({message: 'No such user'});
        }
    }
};

module.exports.roles = async function(pool, req, res) {
    const resp = pool.query('SELECT "position_name" FROM "position";')
    let roles = new Array();
    for (let i = 0; i < resp.rows.length; ++i) {
        roles.push(resp.rows[i]["position_name"]);
    }
    res.send({message: roles});
};