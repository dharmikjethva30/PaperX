const order = require("../models/order")
const User = require("../models/user")
const fetch_data = require("../utils/fetch-data")
const charge = require("../utils/charges")
const bcrypt = require('bcrypt')

const buy_order = async (req, res) => {
    try {
        const { username, key, symbol, quantity } = req.query
        const user =  await User.findOne({user_name: username})
        const verified = bcrypt.compare(key, user.key)
        if (verified) {
            
            const curr_order = await order.findOne({ user_name: username, symbol: symbol, order_status: "hold" })
            
            if (curr_order) {
                res.send("you already hold this stock!");
                return
            }
    
            const buy_price = await fetch_data(symbol)
            const total_taxes = await charge(1, buy_price, quantity)
            const new_order = new order({
                user_name: username,
                symbol: symbol,
                quantity: quantity,
                buy_price: buy_price,
                total_taxes: total_taxes,
                order_status: "hold"
            })
            await new_order.save()
            res.status(200).json({
                message: "Order Placed Successfully"
            })
        }
        else{
            res.status(200).send("Not a valid key")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
}

const sell_order = async (req, res) => {
    try {
        const { username, key, symbol, quantity } = req.query
        const user =  await User.findOne({user_name: username})
        const verified = bcrypt.compare(key, user.key)
        if (verified) {
            const curr_order = await order.findOne({ user_name: username, symbol: symbol, order_status: "hold" })
            if (!curr_order) {
                res.send("stock is not bought")
                return
            }
            const sell_price = await fetch_data(symbol)
            const taxes = await charge(0, sell_price, quantity)
            const total_taxes = curr_order.total_taxes + taxes
            const amount_delta = (sell_price - curr_order.buy_price) * quantity - total_taxes
    
            let out = await order.findOneAndUpdate({ _id: curr_order._id }, {
                sell_price: sell_price,
                amount_delta: amount_delta,
                total_taxes: total_taxes,
                order_status: "completed"
            })
            res.status(200).json({
                amount_delta : amount_delta,
                message: "Order Placed Successfully"
            })
            
        } else {
            res.status(200).send("Not a valid key")
        }

    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = { buy_order, sell_order }
