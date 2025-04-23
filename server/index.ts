import express from "express";
import { fileURLToPath } from "url";
import path from "path";

/* __dirname/filename equivalents in ESM */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

/* simple JSON body parser */
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hello from Express + TypeScript (ESM)!");
});

/* example POST route */
app.post("/echo", (req, res) => {
    res.json({ youSent: req.body });
});

app.listen(PORT, () =>
    console.log(`🚀  Server running at http://localhost:${PORT}`)
);
