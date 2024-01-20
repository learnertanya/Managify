import express from "express";
import { App } from "./app";
import { CronJobService } from "./services/cronjob.service";

// import { logger } from "./config/logger.config";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const appInstance: App = new App();

// Setting up the port for the server
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
// Firing up the server
appInstance
  .setupDatabase()
  /**
   * *Starts the server and listens for incoming requests on the specified port.
   * *Initializes a cron job service to run scheduled tasks.
   * @param {number} port - The port number to listen on.
   * @returns None
   */
  .then((_) => {
    const app: express.Application = appInstance.app;
    app.listen(port, async () => {
      //setup cron job service
      const cronJobService = new CronJobService();
      cronJobService.cronJob();

      console.info(`Server is running ❤️ at localhost :${port}`);
    });
  })
  .catch((error) => {
    console.error({ error });
    process.exit(1);
  });
