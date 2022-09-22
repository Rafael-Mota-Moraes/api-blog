const { Router } = require("express");
const Post = require("../models/Post");

const router = Router();

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.destroy({ where: { id: id } });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: `Erro: ${error}` });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body, imgUrl } = req.body;

  try {
    const post = await Post.findByPk(id);
    const newPost = await post.update({ title, body, imgUrl });

    return res.json({ newPost });
  } catch (error) {
    res.status(500).json({ error: `Erro: ${error}` });
  }
});

module.exports = router;
