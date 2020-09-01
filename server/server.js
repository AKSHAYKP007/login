
const express = require('express')
const bodyparser =require('body-parser');
const cors = require('cors');
const {loginValidation,registerValidation} = require('./validation')

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
	const {error} = loginValidation(req.body)
	if(error)
		return res.status(400).send(error.details[0].message)
	const {email, password} =req.body;
	db('register').where({
    email: email,
    password:  password
    }).select('user_id')
    .then(data=>{ 
    	if(data.length){
	    	db('signin').insert({
			email: email,
			password: password
		    }).then(res.json('ok'))
      }
      else{
      	return res.status(200).send("no such user")
      }
    })
})

app.post('/register',(req, res) =>{
	const {error} = registerValidation(req.body)
	if(error)
		return res.status(400).send(error.details[0].message)
	const {email, password,name} =req.body;
	db('register').insert({
		username: name,
		email: email,
		password: password

	})
	.then(()=>res.json('ok'))
	.catch(() => res.json('Already'))
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))