const express = require('express');
const app = express();
const port = 3000;

const routes = require('./routes');
app.use('/api/walks', routes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
