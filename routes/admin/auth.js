
const express = require('express');
const {check, validationResult } = require('express-validator');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const router = express.Router();

router.get('/signup', (req, res) => {
   console.log('app.get /signup');
   res.send(signupTemplate({req}));
});

router.post(
   '/signup', 
   [
      check('email')
         .trim()
         .normalizeEmail()
         .isEmail()
         .withMessage('Must be a valid message')
         .custom((email) => {
            
         }),
      check('password')
         .trim()
         .isLength({min:4, max:16}),
      check('passwordConfirmation')
      .trim()
      .isLength({min:4, max:16}),
   ],
   async (req, res) => {      
      console.log('app.post /signup');
      const errors = validationResult(req);
      console.log(errors);
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
   }
);

router.get('/signout', (req, res) => {
   console.log(app.get('/signout'));
   req.session = null;
   res.send('You are logged out.')
});

router.get('/signin', (req, res) => {
   console.log('/signin');
   res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
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

module.exports = router;