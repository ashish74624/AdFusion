// --- app.js (ES‑module) ---
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// … your existing imports …
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import router from "./router.js";
import init from "./init.js";
import dotenv from "dotenv";
dotenv.config();

const app  = express();
const port = 3001;

// ────────────────────────────────────────

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.error(err);
  console.log("MongoDB connected");
  init();             // create default data
});


app.use(cors({
  origin: "*",
  methods :['GET','PUT','POST','DELETE'],

}));
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

// app.get('/',(req,res)=>{
//   return res.
// })

// ────────────────────────────────────────
app.listen(port, () => console.log("Server running on port", port));