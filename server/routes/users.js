const express = require("express");
const router = express.Router();
const User = require ("../models/User")

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch("/:id", (req, res, next) => {
  const updateValue = req.body;

  User.findOneAndUpdate(req.params.id, updateValue, { new: true })
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
