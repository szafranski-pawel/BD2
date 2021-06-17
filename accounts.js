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
        res.send({mesage: 'Error'});
    }
};

// module.exports.add_employee = function(pool, req, res) {
//     const employee = req.body;

//     isEmailRegistered(pool, employee.email).then((isRegistered) => {
//         if (!isRegistered) {
//             pool.query(`INSERT INTO "address" ("ADDRESS1", "ADDRESS2", "POSTAL_CODE", "CITY") VALUES($1, $2, $3, $4);`,
//                         [employee.address1, employee.address2, employee.postalCode,employee.city]
//             ).then(() => {
//                 return pool.query('SELECT "ID" FROM "address" WHERE "ID"=(SELECT MAX("ID") FROM "address");');
//             }).then((resp) => {
//                 const addressID = resp.rows[0]["ID"];
//                 return pool.query(
//                     `INSERT INTO "EMPLOYEE" ("ID", "password", "FIRST_NAME", "LAST_NAME", 
//                                             "PESEL", "SALARY", "ACCOUNT_NO", "ADDRESS_ID") 
//                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, 
//                     [employee.email, employee.password, employee.firstName, employee.lastName, 
//                     employee.PESEL, employee.salary, employee.accountNumber, addressID]);
//             }).then(() => {
//                 return pool.query(`INSERT INTO "EMPLOYEE_ROLE" ("ROLE_ID", "EMPLOYEE_ID") VALUES($1, $2)`, 
//                     [employee.role.id, employee.email]);
//             }).then(() => {
//                 res.send({message: 'Success'});
//             });
//         } else {
//             res.send({mesage: 'Error'});
//         }
//     });
// };

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

// module.exports.roles = function(pool, req, res) {
//     pool.query(
//         'SELECT "ID", "NAME" FROM "ROLE";'
//     ).then((qres) => {
//         let roles = new Array();
//         for (let i = 0; i < qres.rows.length; ++i) {
//             roles.push({
//                 id: qres.rows[i]["ID"],
//                 name: qres.rows[i]["NAME"],
//             });
//         }
//         res.send({message: roles});
//     });
// };
