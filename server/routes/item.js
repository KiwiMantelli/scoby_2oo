const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary");
const Item = require("../models/Item");

router.get("/", (req, res, next) => {
  Item.find()
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res, next) => {
  Item.findById(req.params.id)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", uploader.single("image"), (req, res, next) => {
  const newItem = req.body;
  if (req.file) {
    newItem.image = req.file.path;
  }

  Item.create(newItem)
    .then((dbRes) => {
      res.status(201).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/:id", (req, res, next) => {
  const updateValue = req.body;

  Item.findOneAndUpdate(req.params.id, updateValue, { new: true })
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Item.findOneAndDelete(req.params.id)
    .then((dbRes) => {
      res.status(204).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
