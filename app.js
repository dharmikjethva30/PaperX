const mongoose = require('mongoose');
const express = require('express');
const dotenv = require("dotenv")
const user = require("./routes/user");
const order = require("./routes/order");
const PORT = process.env.PORT || 3000;

dotenv.config()

const app = express();

const connect = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log(err);
            throw new Error
        })
}

app.use(express.json())
app.use("/user", user)
app.use("/order", order)

app.listen(PORT, () => {
    connect()
    console.log("Server Started!");
})