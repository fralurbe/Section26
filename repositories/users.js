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
      //console.log(contents);
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

   async getOneBy (filters) {
      const records = await this.getAll();
      for (let record of records) {
         let found = true;      
         for (let key in filters) {            
            if (record[key] != filters[key]) {
               found = false;
            }
         }
         if (found) {
            console.log(record);
            return record;
         }      
      // return records.find(record => record.id === id);
      }
   }

   async update(id, attrs){
      const records = await this.getAll();
      console.log('records ', records);
      const record = records.find(record => record.id === id);
      console.log('record ', record);
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

module.exports = new UsersRepository('./users.json');

const test = async () => {
   const repo = new UsersRepository('users.json');
   const user = await repo.getOneBy({id: '5af9c242'});

   //await repo.create({email : 'test@test.com', password: 'password'});
   // await repo.update('2199ea3esdlkjaslk', { password : "contenidoCampo" });
   // console.log(user);
}
//const repo = test();

/*
   //Bad way
   module.exports = UsersRepository;
   //On Another file....
   const UsersRepository = require('./UsersRepository');
   const mirepo = new UsersRepository('users.json');

   //Another way (better)
   module.exports = new UsersRepository('./users.json');
   //On Another file....
   const repo = require('./users');
   repo.getAll()
   repo.getOne('g2j4h4');
*/