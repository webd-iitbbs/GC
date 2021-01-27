const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ejs = require("ejs");
const indexRouter = require("./routes/index");
const finalRouter = require('./routes/leaderboard');

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", ".ejs");
app.set("views", "./views/");
app.use(express.static(path.join(__dirname, "public")));
app.get('/', function(req, res) {
  console.log('hi')
	res.sendFile(path.join(__dirname, 'react/public/index.html'));
});
app.use(indexRouter);
app.use(finalRouter);

const PORT = process.env.PORT || 3001;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`)
);
