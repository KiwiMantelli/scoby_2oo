var express = require("express");
var router = express.Router();
const User = require ("../models/User")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.patch("/profile/settings", (req, res, next) => {
  const updateValue = req.body;
  console.log("req.body", req.body)

  User.findByIdAndUpdate(req.session.currentUser._id, updateValue, { new: true })
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/profile/settings/", (req, res, next) => {
  const updateValue = req.body;
  console.log("req.body", req.body)

  User.findById(req.session.currentUser._id)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
