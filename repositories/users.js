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
      attrs.id = this.randomId();
      const records = await this.getAll();
      records.push(attrs);
      await this.writeAll(records);
   }

   async writeAll(records) {
      await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
   }
   
   async getAll(){
      const contents = await fs.promises.readFile(this.filename, {
         encoding: 'utf8'
      });
      console.log(contents);
      const data = JSON.parse(contents)
      return data;
   }

   async getOne (id) {
      const records = await this.getAll();
      return records.find(record => record.id ===id);
   }

   async delete(id) {
      console.log("id ", id)
      const records = await this.getAll();
      const filteredRecords =  records.filter( record => record.id != id)
      console.log("filteredRecords ", filteredRecords)
      await this.writeAll(filteredRecords);
   }

   async update(id, attrs){
      const records = await this.getAll();
      const record = records.find(record => {record.id === id});

      if(!record){
         throw new Error(`Record with id ${id} not found`)
      }
      Object.assign(record, attrs);
      await this.writeAll(records);
   }

   randomId () {      
      return (crypto.randomBytes(4).toString('hex'));
   }
}

const test = async () => {
   const repo = new UsersRepository('users.json');
   await repo.create({email : 'test@test.com', password: 'password'});
   await repo.delete("5c923fa0");
   //console.log(user);
}

const repo = test();