const express = require("express");
const Post = require("./models/Post");
const db = require("./db");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await db.sync();
})();

const port = 3000;

app.post("/", async (req, res) => {
  const { title, body, imgUrl } = req.body;

  const post = {
    title: title,
    body: body,
    imgUrl: imgUrl
  };

  if (!title) {
    res.status(422).json({ message: "Insira um título!" });
    return;
  } else if (!body) {
    res.status(422).json({ message: "Insira um corpo para o post!" });
    return;
  }

  try {
    await Post.create(post);
    res.status(201).json({ message: "Dados criados com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
