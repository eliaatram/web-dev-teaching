const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

const PORT = 8080;

try {
  mongoose.connect("mongodb://127.0.0.1:27017/epita");
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error connecting to db" + error);
}

// Custom middleware
const cors = require("cors");
const session = require("express-session");
const healthCheck = require("../middleware/healthcheck");
const notFound = require("../middleware/notfound");
const logger = require("../middleware/winston");

// ROUTES
const todosRouter = require("../routes/todos.routes");
const testRouter = require("../routes/test.routes");
const messageRouter = require("../routes/messages.routes");
const authRouter = require("../routes/authRoutes.routes");
const userRouter = require("../routes/user.routes");
const moviesRouter = require("../routes/movies.routes");

// This function is to add all required middleware to the express app
const registerCoreMiddleWare = async () => {
  try {
    // using session
    app.use(
      session({
        secret: "1234",
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
        },
      })
    );

    app.use(morgan("combined", { stream: logger.stream }));
    app.use(express.json());
    app.use(cors());

    app.use(healthCheck);

    // Route registration
    app.use("/todo", todosRouter);
    app.use("/test", testRouter);
    app.use("/message", messageRouter);
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/movies", moviesRouter);

    // 404 handling
    app.use(notFound);

    logger.info("Done registering all middlewares");
  } catch (error) {
    logger.error(
      "\nError thrown while executing registerCoreMiddleware()\nError:" +
        JSON.stringify(error, undefined, 2)
    );
  }
};

// handling error
const handleError = () => {
  //* process is a built in object in node.js
  // if uncaught exception the execute, note that we can catch uncaught exceptions from the process object
  process.on("uncaughtException", (err) => {
    logger.error(`UNCAUGHT_EXCEPTION OCCURRED : ${JSON.stringify(err.stack)}`);
    process.exit(1);
  });
};

// start application
const startApp = async () => {
  try {
    // register core application level middleware
    await registerCoreMiddleWare();

    app.listen(PORT, () => {
      logger.info("Server running on http://127.0.0.1:" + PORT);
    });

    // exit on uncaught exception
    handleError();
  } catch (err) {
    logger.error(
      `startup :: Error while booting the application : ${JSON.stringify(err)}`
    );
    throw err;
  }
};

module.exports = { startApp };
