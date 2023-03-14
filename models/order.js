const mongoose = require('mongoose')

const order_schema = mongoose.Schema({
    user_name : {
        type : String
    },
    order_status:{
        type: String,
    },
    symbol: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    buy_price: {
        type: Number,
    },
    sell_price: {
        type: Number,
    },
    amount_delta:{
        type: Number
    },
    total_taxes:{
        type: Number
    }
})

module.exports = mongoose.model("order", order_schema)
