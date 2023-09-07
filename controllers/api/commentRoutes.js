//this code defines an express js route for creating comments
//it checks if the user is auth, extracts the text from the request body
//creates a new comment in the database 
//we are using middleware to ensure that only auth users can create comments

const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");


function handleErrorResponse(res, err) {
  console.error(err);
  res.status(400).json({ error: err.message });
}

router.post("/", withAuth, async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = await Comment.create({
      text,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

module.exports = router;
