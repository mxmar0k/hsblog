//this are the modules we need, i think haha
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const expressHandlebars = require("express-handlebars");
const handlebars = require("handlebars");
const mysql2 = require("mysql2");

//express app and port
const app = express();
const PORT = process.env.PORT || 3001;

//session with a cookie and store in sequelizestore
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//these are the middlewares that we need... i think
//for seesion to pase json, to parse url-encoded data, to place public folders 
//accesible directly by clients
//to set up handlebars engine for the express app, and to render dynamic content with 
//handlebar templates
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//we use this to manage user sessions, stores in database and specifies
//the options for the session
app.use(
    session({
        secret: process.env.SECRET,
        store: new SequelizeStore({db: sequelize}),
        resave: false,
        saveUninitialized: false,
    })
)

//this starts the code and sets express.js app to use the defined routes for the http requests
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
