const fs = require('fs');
class UsersRepository {
   constructor(filename) {
      if(!filename) {
         throw new Error('Error! Creating a  repository needs a filename.');
      }

      this.filename = filename;
      try{
         fs.accessSync(this.filename);
      }
      catch(err) {
         fs.writeFileSync(this.filename, '[]');
      }
   }

   async checkForFile(){

   }

   async getAll(){

   
   }
}



const repo = new UsersRepository('Users.json');