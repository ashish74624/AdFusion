import express, { Request, Response, NextFunction } from "express";
import expressHandlebars from "express-handlebars";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

import config from "../server/config.json"
import router from "./router"
import init from "./init";
import handlebars from "./handlebars";

const app = express();
const port = 3000;

handlebars();

// Connect to Database
const databaseUri: string = config.database.uri;
const databaseOptions = config.database.options;

mongoose.connect(databaseUri, databaseOptions as mongoose.ConnectOptions, async (error) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log("MongoDB connected");
    init();
});

// Set Template Engine
app.engine("handlebars", expressHandlebars({
    layoutsDir: path.join(__dirname, "../views/layouts/"),
    partialsDir: path.join(__dirname, "../views")
}));
app.set("view engine", "handlebars");

// Set Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(router);

// Error Handling 404, 500
app.use((req: Request, res: Response) => {
    console.warn("404 Page Not Found", req.url);
    res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
