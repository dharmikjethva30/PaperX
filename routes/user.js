const express = require('express')
const signup = require("../controllers/signup")
const route = express.Router();

route.get("/", signup)

module.exports = route