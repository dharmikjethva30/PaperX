const express = require('express');
const order = require('../controllers/order');
const route = express.Router();

route.get("/buy",order.buy_order)
route.get("/sell",order.sell_order)

module.exports = route;