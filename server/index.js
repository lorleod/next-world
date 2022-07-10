const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");

app.use(express.json());
app.use(cors());

app.use("/user/register", usersRoute);
app.use("/user/login", loginRoute);

mongoose.connect(
  "mongodb+srv://NextWorld:KRT176LHL@nextworldcluster.i7wjs.mongodb.net/NextWorldDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// app.post("/register/insert", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = new usersSchema({ Username: username, Password: password });
//   try {
//     await user.save();
//     res.send("inserted into users");
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});
