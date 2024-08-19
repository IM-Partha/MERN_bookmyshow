
require('dotenv').config()
const mongoose = require('mongoose',)
mongoose.connect(process.env.MONGO_DB).then(() => { console.log("connection established with mongodb server online"); })
.catch(err => {
    console.log("error while connection", err)
});









