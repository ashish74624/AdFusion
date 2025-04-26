// --- app.js (ES‑module) ---
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// … your existing imports …
import express from "express";
import expressHandlebars from "express-handlebars";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import config from "../config.json" assert { type: "json" };
import router from "./router.js";
import init from "./init.js";
import handlebars from "./handlebars.js";

const app  = express();
const port = 3001;
handlebars();

// ────────────────────────────────────────
// DB connection
const { uri: databaseUri, options: databaseOptions } = config.database;
mongoose.connect(databaseUri, databaseOptions, (err) => {
  if (err) return console.error(err);
  console.log("MongoDB connected");
  init();             // create default data
});

app.use(cors({
  origin: "*",
  methods :['GET','PUT','POST','DELETE'],

}));
// ────────────────────────────────────────
// View engine
app.engine(
  "handlebars",
  expressHandlebars({
    layoutsDir : path.join(__dirname, "..", "views", "layouts"),
    partialsDir: path.join(__dirname, "..", "views"),
  }),
);
app.set("view engine", "handlebars");

// ────────────────────────────────────────
// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(router);

// ────────────────────────────────────────
// Error handlers
app.use((req, res) => {
  console.warn("404 Page Not Found", req.url);
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

// ────────────────────────────────────────
app.listen(port, () => console.log("Server running on port", port));
