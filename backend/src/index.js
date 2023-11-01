"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var ImageRouter_1 = require("./Router/ImageRouter");
var app = (0, express_1.default)();
var port = 8000;
app.use((0, cors_1.default)());
app.get('/', function (_req, res) {
    res.send('Hello, World!');
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
app.use('/', ImageRouter_1.default);
