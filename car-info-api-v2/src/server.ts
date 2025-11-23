import express, { Request, Response } from "express";
import { healthStatus } from "./utils/default-statuses.js";

const app = express();
const port = parseInt(process.env.PORT?? "31002", 10) ?? 31002;

//middleware

//routes
app.get("/status", (req: Request, res: Response) => {
  res.status(healthStatus()).send("OK");
});

//middleware



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});