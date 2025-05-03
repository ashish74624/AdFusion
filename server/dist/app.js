"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require("./../config.json");

var _config2 = _interopRequireDefault(_config);

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

var _init = require("./init");

var _init2 = _interopRequireDefault(_init);

var _handlebars = require("./handlebars");

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3001;
(0, _handlebars2.default)();

// Connect to Database
var databaseUri = _config2.default.database.uri;
var databaseOptions = _config2.default.database.options;
_mongoose2.default.connect(databaseUri, databaseOptions, async function (error) {
  if (error) {
    console.error(error);
    return;
  }
  console.log("MongoDB connected");

  // Creates Default Data
  (0, _init2.default)();
});

// Set Template Engine
app.engine("handlebars", (0, _expressHandlebars2.default)({
  layoutsDir: __dirname + "/../views/layouts/",
  partialsDir: __dirname + "/../views"
}));
app.set("view engine", "handlebars");

// Set Middlewares
app.use(_bodyParser2.default.json({ limit: "50mb" }));
app.use(_bodyParser2.default.urlencoded({ limit: "50mb", extended: true }));
app.use(_express2.default.static("public"));
app.use(_router2.default);

// Error Handling 404, 500
app.use(function (req, res, next) {
  console.warn("404 Page Not Found", req.url);
  res.sendStatus(404);
  return;
});

app.use(function (error, req, res, next) {
  console.error(error);
  res.sendStatus(500);
  return;
});

app.listen(port, function () {
  console.log("Server is running on port", port);
});
//# sourceMappingURL=app.js.map