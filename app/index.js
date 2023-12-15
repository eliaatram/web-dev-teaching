require('dotenv').config()
const logger = require("./middleware/winston");

const startApp = require("./boot/setup").startApp;

(async () => {
  try {
    await startApp();
  } catch (error) {
    logger.error("Error in index.js ==> startApp");
    logger.error(`Error: ${JSON.stringify(error, undefined, 2)}`);
    throw error;
  }
})();