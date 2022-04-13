const express = require("express");
const router = express.Router();
const process = require("process");

const authMiddleware = require("../middlewares/auth");
const requestValidator = require("../validators/requestValidator");
const scraperController = require("../controllers/scraperController");

router.use((req, res, next) => {
  if (!authMiddleware(req)) {
    return res.status(403).json({ error: "Access Forbidden" });
  }
  next();
});

router.post("/scrape", async (req, res) => {
  const body = req.body;
  const validationResponse = requestValidator(body);
  if (!validationResponse.isValid) {
    res.status(400).send(validationResponse.message);
  }

  const response = await scraperController(body.url);
  res.send(response);
});

module.exports = router;
