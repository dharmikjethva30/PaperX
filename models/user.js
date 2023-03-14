const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },

    user_name : {
        type : String
    },
    key : {
        type : String
    }
})

module.exports = mongoose.model("user", user_schema)
