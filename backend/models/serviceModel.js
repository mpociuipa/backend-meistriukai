const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text:{
        type:String,
        required:[true,'Please add a text']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Service', serviceSchema);