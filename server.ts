import { config } from "dotenv";
import app from "./src/app";
import { connect } from "./config/mongodb";
import logger from "./lib/utils/logger";
import http from "http";

// Load environment variables
config();

/*
  ===============================================================
 Importing the port set on the .env, if the port number is not set on .env or the port is being used by another server
running on the local macchine we are asking the app to use 3000 as the port number 
  ===============================================================
*/
const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);
  await connect();
});