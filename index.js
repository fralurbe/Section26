const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => {   
   res.send(`
   <div>
      <form method="POST">
      <input name="email" placeholder="email" />
      <input name = "password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="password confirmation" />
      <button>Submit</button>
      </form>
   </div>
   `);
});

app.post('/', (req, res) => {
   const {email, password, passwordConfirmation} = req.body;   
   const existingUser = usersRepo.getOneBy({email: email});
   if (existingUser)
      return res.send('Email in use');
   if (password !== passwordConfirmation)
      return res.send('Passwords don\'t match!');

   res.send('Cuenta creada!');
});

app.listen(3000, () => {
   console.log("Listening on 3000.")
});
