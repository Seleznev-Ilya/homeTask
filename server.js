const express = require('express')
const port = process.env.PORT || 5000
const mysql = require('mysql')
const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_market',
    password: '',
    port: port,
});

app.get('/test', (req, res) => {
    db.query('SELECT * FROM `customers`', (err, result, f)=>{
        if (err) {
            throw err
        }
        console.log(result);
    })
})

app.listen(port, () => {
    console.log(`App listen on ${port}...`);
})