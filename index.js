const express = require('express');
const app = express();

app.get('/', (req, res) => {   
   res.send(`
   <div>
      <form>
      <input placeholder="email" />
      <input placeholder="password" />
      <input placeholder="password confirmation" />
      <button>Submit</button>
      </form>
   </div>
   `);
});

app.listen(3000, () => {
   console.log("Listening on 3000.")
});
