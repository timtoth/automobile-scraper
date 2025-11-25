import express, { Request, Response } from "express";
import { healthStatus } from "./utils/default-statuses.js";
import requestLogger from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./middleware/cors.js";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const port = parseInt(process.env.PORT?? "31002", 10) ?? 31002;

//middleware
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(express.json());

//routes
app.get("/status", (req: Request, res: Response) => {
  res.status(healthStatus()).send("OK");
});

app.use("/api", router);

//middleware
app.use(notFoundHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});