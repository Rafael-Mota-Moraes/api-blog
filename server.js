const express = require("express");
const Post = require("./models/Post");
const db = require("./db");
const cors = require("cors");
const app = express();
const postRoutes = require("./routes/postRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/posts", postRoutes);

(async () => {
  await db.sync();
})();

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
