const Sequelize = require('sequelize');

const conexao = new Sequelize(
    'estacionamento',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);
module.exports = conexao;