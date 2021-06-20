// sequelize conecta o node ao banco de dados mysql
const Sequelize = require('sequelize');
// nomeDoBanco, usuario, senha
const connection = new Sequelize('guiaperguntas2', 'root', 'digite sua senha do sql server aqui', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;