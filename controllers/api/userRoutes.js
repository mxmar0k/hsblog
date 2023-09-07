const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// Reusable error handling middleware
const handleErrorResponse = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "An error occurred" });
};

// we first get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      handleErrorResponse(res, err);
    });
});

// next we create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    // we create a session for the new user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

// to login a user
router.post("/login", async (req, res) => {
  try {
    // we find the user by email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email or password, check credentials" });
      return;
    }

    // we check if the password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, check credentials" });
      return;
    }

    // Create a session for the logged-in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: "You have successfully logged in!" });
    });
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

// then we logout a user with destroy session
router.post("/logout", withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
