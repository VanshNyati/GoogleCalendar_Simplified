const express = require("express");
const passport = require("passport");
const router = express.Router();
const { fetchEvents } = require("../controllers/calendarController");
const { protect } = require("../middlewares/authMiddleware");

// Google Login Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/events",protect, fetchEvents);
// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
