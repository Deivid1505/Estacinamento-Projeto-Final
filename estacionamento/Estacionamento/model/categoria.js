const Sequelize = require('sequelize');

const conexao = require('../database/database');

const categoria = conexao.define(
'tb_carros',
{
    cod_carro:{
    type: Sequelize.INTEGER,
    allowNull:false
    },
    cor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ano:{
        type: Sequelize.STRING,
        allowNull: false
    },
    placa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    marca:{
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false
    },  
}
);

//categoria.sync({force:true});

module.exports = categoria;