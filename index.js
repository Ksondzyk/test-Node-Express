const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const cursesRoutes = require("./routes/cities");
const arrRoutes = require("./routes/addCity");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("wiews", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/cities", cursesRoutes);
app.use("/addcity", arrRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is rinning ${PORT}`);
});
