async function isEmailRegistered(pool, email) {
    const resp = await pool.query(`SELECT "email" FROM "employee" WHERE "email"=$1 UNION SELECT "email" FROM "customer" WHERE "email"=$1`, [email]);

    return resp.rowCount !== 0;
}

module.exports.add_customer = async function(pool, req, res) {
    const customer = req.body;

    // const isRegistered = isEmailRegistered(pool, customer.email);

    isEmailRegistered(pool, customer.email).then(async (isRegistered) => {
        console.log(`Enter add customer ${isRegistered}, ${customer.email}`);
        if (!isRegistered) {
            console.log(`Enter add customer 2`);
            var resp = await pool.query(`INSERT INTO "address" ("address") VALUES($1) RETURNING "id_address";`, [customer.address]);
            const addressID = resp.rows[0]["id_address"];
            resp = await pool.query(`INSERT INTO "password" ("password") VALUES($1) RETURNING "id_password";`, [customer.password]);
            const passID = resp.rows[0]["id_password"];
            await pool.query(
                `INSERT INTO "customer" ("name", "surname", "email", "id_address", "id_password") VALUES ($1, $2, $3, $4, $5);`, 
                [customer.name, customer.surname, customer.email, addressID, passID]);
            res.send({message: 'Success'});
        } else {
            res.send({message: 'Error'});
        }
    });
};

module.exports.add_employee = async function(pool, req, res) {
    const employee = req.body;

    isEmailRegistered(pool, employee.email).then(async (isRegistered) => {
        console.log(`Enter add employee`);
        if (!isRegistered) {
            var resp = await pool.query(`SELECT "position_name" FROM "position" WHERE "position_name" = $1;`, [employee.position_name]);
            if (resp.rows.length !== 1) {
                res.send({message: 'Error'});
                console.log(`Enter add customer 2 ${isRegistered}, ${resp.rows.length}, ${employee.position_name}`);
            }
            else {
                console.log(`Enter add customer 3 ${isRegistered}, ${employee.position_name}`);
                resp = await pool.query(`INSERT INTO "address" ("address") VALUES($1) RETURNING "id_address";`, [employee.address]);
                const addressID = resp.rows[0]["id_address"];
                resp = await pool.query(`INSERT INTO "password" ("password") VALUES($1) RETURNING "id_password";`, [employee.password]);
                const passID = resp.rows[0]["id_password"];
                await pool.query(
                    `INSERT INTO "employee" ("name", "surname", "email", "id_address", "id_password", "position_name") VALUES ($1, $2, $3, $4, $5, $6);`, 
                    [employee.name, employee.surname, employee.email, addressID, passID, employee.position_name]);
                res.send({message: 'Success'});
            }
        } else {
            res.send({message: 'Error'});
        }
    });
};

module.exports.login = async function(pool, req, res) {
    const info = req.body;

    console.log(`Enter login`);

    var resp = await pool.query('SELECT "id_password" FROM "customer" WHERE "email" = $1;', [info.email])
    if (resp.rows.length === 1) {
        console.log(`Customer login`);
        resp = await pool.query('SELECT "password" FROM "password" WHERE "id_password" = $1;', [resp.rows[0]["id_password"]])
        if (resp.rows[0]["password"] === info.password) {
            res.send({message: {
                email: info.email,
                type: 'customer',
                message: 'Success',
            }});
        } else {
            res.send({message: 'Wrong password'});
        }
    } else {
        console.log(`Not customer login`);
        resp = await pool.query('SELECT "id_password", "position_name" FROM "employee" WHERE "email" = $1;', [info.email])
        if (resp.rows.length === 1) {
            const employeePos = resp.rows[0]["position_name"]
            resp = await pool.query('SELECT "password" FROM "password" WHERE "id_password" = $1;', [resp.rows[0]["id_password"]])
            if (resp.rows[0]["password"] === info.password) {
                res.send({message: {
                    email: info.email,
                    type: employeePos,
                    message: 'Success',
                }});
            } else {
                res.send({message: 'Wrong password'});
            }
        } else {
            console.log(`no user`);
            res.send({message: 'No such user'});
        }
    }
};

module.exports.roles = async function(pool, req, res) {
    const resp = await pool.query('SELECT "position_name" FROM "position";')
    let roles = new Array();
    if (resp.rows.length !== 0) {
        for (let i = 0; i < resp.rows.length; ++i) {
            roles.push(resp.rows[i]["position_name"]);
        }
        res.send({message: roles});
    }
    res.send({message: 'Error'});
};