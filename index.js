const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['lkasld235j']
  })
);

app.get('/signup', (req, res) => {
   console.log('app.get /signup');
   res.send(`
   <div>    
      Your id is: ${req.session.userId}
      <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="password confirmation" />
      <button>Sign Up</button>
      </form>
   </div>
   `);
});

app.post('/signup', async (req, res) => {
  console.log('app.post /signup');
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }

  // Create a user in our user repo to represent this person
  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie
  req.session.userId = user.id;

  res.send('Account created!!!');
});

app.get('/signout', (req, res) => {
   console.log(app.get('/signout'));
   req.session = null;
   res.send('You are logged out.')
});

app.get('/signin', (req,res) => {
   console.log('/signin');
   res.send(`
   <div>       
   <form method="POST">
     <input name="email" placeholder="email" />
     <input name="password" placeholder="password" />     
     <button>Sign In</button>
   </form>
 </div>
   `)
});

app.post('/signin', async (req, res) => {
   console.log('post/signin');
   const { email, password } = req.body;
   const user = await usersRepo.getOneBy({email});
   console.log('user ', user );

   if(!user) {
      return res.send('Email not found');
   }

   const validPassword = await usersRepo.comparePasswords(user.password, password);   
   if (!validPassword){
      return res.send('invalid password');
   }

   req.session.userId = user.id;
   res.send('You are signed in');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
