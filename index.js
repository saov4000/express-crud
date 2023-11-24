const express = require('express')
const app = express()
const body = require('body-parser')
const bodyParser = require('body-parser')
const connection = require('./database/database')

connection.connect((erro)=>{
    console.log('conectou')
})

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.post('/salvar',(req,res)=>{
    var nome = req.body.nome
    var sexo = req.body.sexo
    var cidade = req.body.cidade
    var sql = "INSERT INTO aluno VALUES (0,'"+nome+"','"+sexo+"','"+cidade+"')";
    connection.query(sql, function (err, result) {
    if (err) throw err;
        console.log("1 record inserted");
  });
})


app.listen(3000,()=>{
   console.log('logou')
})



