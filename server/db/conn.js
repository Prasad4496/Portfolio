const mongoose = require("mongoose");
const DB = process.env.DATABASE;
try {
  mongoose.connect(
    DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}
