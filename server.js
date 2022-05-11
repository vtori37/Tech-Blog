const { Console } = require('console');
const express = require('express');
const app = express();
const hbs = create({ /*stufff from config iguess */})
const PORT = process.env.PORT || 3001

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});