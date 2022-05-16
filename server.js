const path = require('path');
const express = require('express');

const session = require('express-session');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const exphs = require('express-handlebars');
const hbs = exphs.create({ helpers });

// const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001

const SequelizeStore = require('connect-session-sequelize')(session.Store); // do i need this?

// is this necessary?
const sess = {
  secret: 'A Secret', //does what is entered here matter?
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //is this needed?

// turn on routes
app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

