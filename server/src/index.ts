import dotenv from "dotenv";
import express from "express";
import doSearch from "./mongo";
import cors from "cors";

// initialize configurationnpm
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT ?? 3000;

const app = express();
app.use(cors());

// Configure Express to parse JSON
app.use(express.json());

interface SearchRequest {
  query: string;
}

app.post<SearchRequest>("/api/search", (req, res) => {
  doSearch(req.body.query).then((result) => {
    res.send(result);
  });
});

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
