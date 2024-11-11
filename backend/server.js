import "dotenv/config.js";
import {
  SERVER_RUNNING,
  UNCAUGHT_ERROR,
  UNCAUGHT_EXCEPTION,
  UNHANDLED_EXCEPTION,
  UNHANDLED_REJECTION,
} from "./constants/index.js";
import { configCloudinary, connectDB } from "./config/index.js";
import { app } from "./app.js";

process.on(UNCAUGHT_EXCEPTION, (error) => {
  console.log(UNCAUGHT_ERROR);
  console.log(`Error: ${error.message}`);
  process.exit(1);
});

connectDB();
configCloudinary();

const server = app.listen(process.env.PORT || 7000, () =>
  console.log(SERVER_RUNNING)
);

process.on(UNHANDLED_EXCEPTION, (error) => {
  console.log(`Error: ${error.message}`);
  console.log(UNHANDLED_REJECTION);
  server.close(() => {
    process.exit(1);
  });
});
