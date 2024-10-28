// db.js
const knex = require('knex');
const config = {
  client: 'mysql2',
  connection: {
    host: '208.68.38.173', // Substitua pelo host do seu banco de dados
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '20IDEbrasil@20M', // Substitua pela sua senha do MySQL
    database: 'studioRafaelaMiranda' // Substitua pelo nome do seu banco de dados
  }
};

const db = knex(config);

module.exports = db;
