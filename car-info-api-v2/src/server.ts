import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT ?? "31002";

app.get("/status", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});