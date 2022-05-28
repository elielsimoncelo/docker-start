const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const config = {
    host: 'db',
    user: 'nodeuser',
    password: 'nodeuser',
    database: 'nodedb',
    insecureAuth : true
};

app.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/people/:name', (req, res) => { 
    const connection = mysql.createConnection(config);
    connection.connect();
    const sql = `insert into people (name) values ('${req.params.name}')`;
    connection.query(sql);
    connection.end();
    res.send(`<h1>Pessoa ${req.params.name} inserida com sucesso!</h1>`);
});

app.listen(port, () => {
    console.log('Listening on port 3000!');
});
