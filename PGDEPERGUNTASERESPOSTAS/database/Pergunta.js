const Sequelize = require('sequelize');
const connection = require('./database');
//conexão defina nomeDaTabela, 
// pergunta e o nome da tabela no mysql
const Pergunta = connection.define('pergunta', {
    titulo:
    {
        //texto curto string
        type: Sequelize.STRING,
        //impede que o campo receba valores vazios
        allowNull: false
    },
    descricao:
    {
        //texto longo text
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//se nao existir tabela == pergunta criar tabela force:false para nao criar outra tabela
Pergunta.sync({ force: false }).then(() => { console.log('tabela criada') });

//acima criando tabela usando javascript e sequelize

module.exports = Pergunta;