const layoutTemplate = require('../layout');

module.exports = () => {
   const content = `
      <div>
         <form method="POST">
         <input name="email" placeholder="email" />
         <input name="password" placeholder="password" />     
         <button>Sign In</button>
         </form>
      </div>   
   `;
   return layoutTemplate({content});   
}