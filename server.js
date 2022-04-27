const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 3306;
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);



sequelize.sync().then(function(){
  console.log('DB connection sucessful.');
}, 
function(err) {
  // catch error here
  console.log(err);

const sess = {
  secret: "Secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
});

const helpers = require('./utils/')
const hbs = exphbs.create({helpers});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => { 
   app.listen(PORT, () => 
console.log(`App listening on port ${PORT}!`));
  
})
