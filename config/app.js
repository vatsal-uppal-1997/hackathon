const userRoutes = require("../views/userRoutes").userRoutes;
const corporateRoutes = require("../views/corporateRoutes").corporateRoutes;
const postRoutes = require("../views/postRoutes").postRoutes;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/company", corporateRoutes);
app.use("/api/posts", postRoutes);

exports.app = app;