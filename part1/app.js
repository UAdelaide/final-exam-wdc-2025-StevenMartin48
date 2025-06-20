const express = require('express');
const app = express();
const port = 3000;

const walkRoutes = require('./routes/routes');
app.use('/api/walks', walkRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
