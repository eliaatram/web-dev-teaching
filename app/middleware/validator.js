const { badGateway } = require("../constants/statusCodes");
const logger = require("./winston");

const validator = (req, res, next) => {
  // No creation date is allowed to pass through
  req.body.creation_date && delete req.body.creation_date;

  // Create creation date
  let creationDate = new Date().toJSON().slice(0, 10);
  req.body.creation_date = creationDate;

  try {
    for (let [key, value] of Object.entries(req.body)) {
      if (typeof value === "string" || value instanceof String) {
        if (value === "") {
          value = null;
          req.body[key] = value;
          continue;
        }
      }
    }

    // continue request
    next();
  } catch (error) {
    logger.error(error);
    res.status(badGateway).json({
      error: "Bad request",
    });
  }
};

module.exports = validator;
