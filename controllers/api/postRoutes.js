const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// this is a reusable error handling middleware
const handleErrorResponse = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "An error occurred" });
};

// we get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

// we get a post by ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "There are no posts with that id" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

// we create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

// update a post by ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "There are no posts with that id" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

// delete a post by ID and everything related to it
router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Comment.destroy({
      where: { post_id: req.params.id },
    });

    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "There are no posts with that id" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

module.exports = router;
