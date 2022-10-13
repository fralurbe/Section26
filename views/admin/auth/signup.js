const layoutTemplate = require('../layout');

module.exports = ({ req }) => {
   const content = `   
      <div>
         Your id is: ${req.session.userId}
         <form method="POST">
         <input name="email" placeholder="email" />
         <input name="password" placeholder="password" />
         <input name="passwordConfirmation" placeholder="password confirmation" />
         <button>Sign Up</button>
         </form>
      </div>   
   `;
   return layoutTemplate({content});
}