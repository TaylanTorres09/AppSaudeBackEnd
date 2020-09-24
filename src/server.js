const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

// Initialize DB
require('./database/initDB')();

//const port =  3000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);




app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// catch all
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message})
})

console.log(process.env.PORT)

app.listen(process.env.PORT || 3030, () =>  console.log('Server is running'))