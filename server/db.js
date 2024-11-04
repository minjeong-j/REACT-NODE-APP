const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '%',
  user: 'nodejs',
  password: 'ReactNode1!',
  database: 'my_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;