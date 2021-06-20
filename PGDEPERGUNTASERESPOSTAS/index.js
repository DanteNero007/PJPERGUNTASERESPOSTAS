// importa e instancia o express
const express = require('express');
const app = express();
//body=parser nos fornece a req.body
//para buscar dados de name no html 
//que foram enviados pelo POST action='caminhoParaOndeVaiAInformação'
const bodyParser = require('body-parser');
const connection = require('./database/database');

//o model que vem do banco mysql sempre sera um promise
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');


connection.authenticate()
    .then(() => {
        console.log('conexao do banco feita com sucesso')
    })
    .catch((error) => {
        console.log(error);
    })

//renderizar html atraves do ejs
app.set('view engine', 'ejs');

//usar css e imagens no projeto express
app.use(express.static('public'));

//tradutor os posts do formulario para linguagem javascript
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//busca a rota raiz e res responde a requisição

app.get("/perguntar", (req, res) => {
    res.render('perguntar')
})

app.get("/", (req, res) => {
    //findAll busca os dados e coloque em um array
    //raw:true devolve os dados 'cru' somente os dados salvo que vc precisa e nada mais
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC'] //ASC == CRESCENTE TITULO POR ORDERM ALFABETICA
    ] }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })

})

app.get('/pergunta/:id', (req, res) =>{
    //req.params.id busca valor do campo de busca do navegador
    let id = req.params.id;
    
    //findOne busque um dado
    Pergunta.findOne({ 
        //where: {id: id} onde id == ao id do campo do navegador
        where: {id: id}
    }).then((perguntas) =>{
        // se este dado existir
        if(perguntas != undefined){
            Resposta.findAll({ 
                where:{perguntaId: perguntas.id},
                order:[['id', 'DESC']] 
            }).then((respostas) =>{
                res.render('pergunta', {
                    perguntas: perguntas,
                    respostas: respostas
                })
            })
            //res.render('pergunta') renderize a pagina de pergunta
           
        }else{
            //se nao redirecione para a pagina raiz
            res.redirect('/')
        }
    })
    //res.render('pergunta');
    //console.log(id);
});



app.post("/dados", (req, res) => {

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    //Pergunta.create({}) cria uma tabela 
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        //res.redirect('/'); redireciona para a rota estipulada
        res.redirect('/');
    })

})

app.post('/responder',(req, res) =>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{ 
        res.redirect('/pergunta/'+perguntaId);
    })

})

//rodando o servidor com nodemon e node
app.listen(3000, () => {
    console.log('meu primeiro servidor')
})


