const express = require(`express`);
const exphb = require(`express-handlebars`);
const path = require(`path`);
const routes = require(`./controllers`);

const sequelize = require(`./config/connection`);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphb.create({});

app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});
