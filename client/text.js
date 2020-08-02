var email=document.getElementsByClassName('email');
var password=document.getElementsByClassName('password')

const handleclick= () =>{
      fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:email.value,
        password:password.value
      })
    })
     .then(response => response.json())
     .then(dat =>{console.log(dat) })
}
const handleChangeEmail = (event) =>{
   email.value=event.target.value;
}
 
const handleChangePassword =(event) =>{
	password.value=event.target.value;
}
