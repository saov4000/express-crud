const express = require('express')
const app = express()
const body = require('body-parser')
const bodyParser = require('body-parser')
const connection = require('./database/database')

connection.connect((erro)=>{
    if (erro) throw erro
    console.log('conectou')
})

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    connection.query("SELECT * FROM aluno", function (err, result, fields) {
        if (err) throw err
        //console.log(result)
        res.render('home',{resultado:result})
      }); 
})

app.get('/cadastro',(req,res)=>{
        
    res.render('cadastro')
})

app.post('/salvar',(req,res)=>{
    var nome = req.body.nome
    var sexo = req.body.sexo
    var cidade = req.body.cidade
    var sql = "INSERT INTO aluno VALUES (0,'"+nome+"','"+sexo+"','"+cidade+"')"
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted")
    res.redirect('/')
    })
})

app.get('/detalhes/:id',(req,res)=>{
    var id = req.params.id
    connection.query("SELECT * FROM aluno WHERE id="+id, function (err, result, fields) {
        if (err) throw err
        console.log(result[0].id)
        res.render('detalhes',{resultado:result})
      }); 
})

app.put('/atualizar',(req,res)=>{
    res.render('atualiza')
})

app.delete('/delete',(req,res)=>{
    res.render('deleta')
})

app.listen(4000,()=>{
   console.log('logou')
})



