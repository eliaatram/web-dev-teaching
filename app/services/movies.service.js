const statusCodes = require("../constants/statusCodes");
const pool = require("../boot/database/db_connect");
const logger = require("../middleware/winston");

const addMovie = async (req, res) => {
  const { title } = req.body;
  const { release_date } = req.body;
  const { author } = req.body;
  const { type } = req.body;
  const { poster } = req.body;
  const { backdrop_poster } = req.body;
  const { overview } = req.body;

  if (
    !title ||
    !release_date ||
    !author ||
    !type ||
    !poster ||
    !backdrop_poster ||
    !overview
  ) {
    res
      .status(statusCodes.missingParameters)
      .json({ message: "Missing parameters" });
  } else {
    pool.query(
      `INSERT INTO movies(title, release_date, author, type, poster, backdrop_poster, overview)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [title, release_date, author, type, poster, backdrop_poster, overview],
      (err, rows) => {
        if (err) {
          logger.error(err.stack);
          res.status(statusCodes.queryError).json({
            error: "Exception occurred while adding movie",
          });
        } else {
          res
            .status(statusCodes.success)
            .json({ message: "Media added successfully" });
        }
      }
    );
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  pool.query(`SELECT * FROM movies WHERE movie_id = $1;`, [id], (err, rows) => {
    if (err) {
      logger.error(err.stack);
      res.status(statusCodes.queryError).json({
        error: "Exception occurred while fetching movie",
      });
    } else {
      res.status(statusCodes.success).json({ data: rows.rows });
    }
  });
};

module.exports = {
  addMovie,
  getMovieById,
};
