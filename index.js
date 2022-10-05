const express = require('express');
const bodyParser = require('body-parser');

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

app.post('/', bodyParser.urlencoded({extended : true}), (req, res) => {
   const user =  {
      email: string,
      password : string
   }
   
   console.log(req.body);
   res.send('Cuenta creada!');
});

app.listen(3000, () => {
   console.log("Listening on 3000.")
});
