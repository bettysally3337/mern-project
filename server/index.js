const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//連結mongoDB
mongoose
  .connect("mongodb://localhost:27017/mernDB")
  .then(() => {
    console.log("連結到 mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewawre
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
//courseRoute應該被jwt保護
//如果request header內部沒有jwt，則request就會被視為unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

//只有登入系統的人，才能夠去新增或註冊課程
//jwt

//因為react預設是3000，這裡錯開
app.listen(8080, () => {
  console.log("後端伺服器在port 8080...");
});
