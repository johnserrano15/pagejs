const express = require('express');

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
  // res.status(200).send('Hola mundo todo bien')
})

app.listen(port, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log(`Server listening on port ${port}`);
})
