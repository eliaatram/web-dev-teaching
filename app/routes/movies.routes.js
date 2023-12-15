const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication.js");
const moviesService = require("../services/movies.service.js");

router.post("/add/movie", moviesService.addMovie);
router.get("/:id", moviesService.getMovieById);

module.exports = router;
