const fs = require('fs');
const crypto = require ('crypto');

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

   async create (attrs) {
      attrs = this.randomId();
      const records = await this.getAll();
      records.push(attrs);
      await this.writeAll(records);
   }

   async writeAll(records) {
      await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
   }

   async checkForFile () {

   }

   async getAll(){
      const contents = await fs.promises.readFile(this.filename, {
         encoding: 'utf8'
      });
      console.log(contents);
      const data = JSON.parse(contents)
      return data;
   }

   randomId () {      
      return (crypto.randomBytes(4).toString('hex'));
   }
}

const test = async () => {
   const repo = new UsersRepository('users.json');
   await repo.create({email : 'test@test.com', password: 'password'});
   const users = await repo.getAll();
}

const repo = test();