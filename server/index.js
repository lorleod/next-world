const express = require("express");
const app = express();
const port = 3001;
const mongo = require("./mongo");

const UsersSchema = require("./models/Users");

app.use(express.json());

const connectToMongo = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log("connecting to mongodb");
      const user = {
        Username: "Kevin",
        Password: "password",
      };

      await new UsersSchema(user).save();
    } finally {
      mongoose.connection.close();
    }
  });
};

connectToMongo();

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});
