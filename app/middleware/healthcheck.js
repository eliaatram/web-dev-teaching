// this file is for the load balancer to check the health of the API
const express = require("express");

// Router
const router = express.Router();

router.get("/api/health", (req, res) => {
  res.status(200).json({
    msg: "All up and running!!",
  });
});

module.exports = router;
