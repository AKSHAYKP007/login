
const express = require('express')
const bodyparser =require('body-parser');
const cors = require('cors');

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'new'
  }
});



const app = express()
const port = 3000


app.use(bodyparser.json());
app.use(cors());


app.post('/signin',(req, res) =>{
	const {email, password} =req.body;
	db('signin').insert({
		email: email,
		password: password
	}).then(res.json('hello'))
	db.select().table('signin').then(data =>{
	console.log(data)
})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))