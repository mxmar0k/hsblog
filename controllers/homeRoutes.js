//this code defines the routes for the web app
//renders the views and manages the user sessions

//first we import the dependencies
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// we added a common function to fetch and render data
//to avoid code duplication
const renderData = async (req, res, viewName, options = {}) => {
  try {
    const postData = await Post.findAll({
      ...options,
      include: [{ model: User, attributes: ["username"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render(viewName, {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//we use this to render the homepage with render data
router.get("/", async (req, res) => {
  await renderData(req, res, "homepage");
});

//we use this to render a specific post
router.get("/post/:id", async (req, res) => {
  const postId = req.params.id;
  await renderData(req, res, "post", {
    where: { id: postId },
    include: [
      { model: Comment, include: [{ model: User, attributes: ["username"] }] },
    ],
  });
});

//we use this to access the dashb for the au users using withauth
router.get("/dashboard", withAuth, async (req, res) => {
  await renderData(req, res, "dashboard", {
    where: { user_id: req.session.user_id },
  });
});

//renders the login routes
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});

//renders the signup routes
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("signup");
  }
});

//renders the newpost routes
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost");
  } else {
    res.redirect("/login");
  }
});

//renders the edit routes
router.get("/editpost/:id", async (req, res) => {
  const postId = req.params.id;
  await renderData(req, res, "editpost", {
    where: { id: postId },
    include: [
      { model: Comment, include: [{ model: User, attributes: ["username"] }] },
    ],
  });
});

//exports to main app
module.exports = router;
