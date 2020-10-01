const mysql = require('mysql');
/*
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'qlinks',
    password : 'sknils',
    database : 'qlinks'
});
*/
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: '3306',
    user: 'qlinks',
    password: 'sknils',
    database: 'qlinks'
});

// this one is sufficient..
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});


function addRow(data) {
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mysql.format(insertQuery, ["todo", "user", "notes", data.user, data.value]);
    pool.query(query, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

function queryRow(userName) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery, ["todo", "user", userName]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
    pool.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });
}

// Multiple

let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
let values = [["shahid", "hello"], ["Rohit", "Hi"]]; // each array is one row
let query = mysql.format(insertQuery, ["todo", "user", "notes", values]);

function updateRow(data) {
    let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    let query = mysql.format(updateQuery, ["todo", "notes", data.value, "user", data.user]);
    // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
    pool.query(query, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows updated
        console.log(response.affectedRows);
    });
}

function deleteRow(userName) {
    let deleteQuery = "DELETE from ?? where ?? = ?";
    let query = mysql.format(deleteQuery, ["todo", "user", userName]);
    // query = DELETE from `todo` where `user`='shahid';
    pool.query(query, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows);
    });
}

/*
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

connection.query('SELECT * from users LIMIT 1', (err, rows) => {
    if(err) throw err;
    console.log('The data from users table are: \n', rows);
    connection.end();
});
 */