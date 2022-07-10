const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const usersSchema = require("./Schema/users-schema");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://NextWorld:KRT176LHL@nextworldcluster.i7wjs.mongodb.net/NextWorldDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/register/insert", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new usersSchema({ Username: username, Password: password });
  try {
    await user.save();
    res.send("inserted into users");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});
