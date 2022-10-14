const layoutTemplate = require('../layout');

const getError = (errors, prop) => { 
   //prop=== 'email | password | passwordConfirmtion
   if (errors) {
      return errors.mapped()[prop].msg;
   }
}

module.exports = ({ req, errors }) => {
   return layoutTemplate({content : `   
      <div>
         Your id is: ${req.session.userId}
         <form method="POST"> 
         <input name="email" placeholder="email" />
         <input name="password" placeholder="password" />
         <input name="passwordConfirmation" placeholder="password confirmation" />
         <button>Sign Up</button>
         </form>
      </div>
   `});
};