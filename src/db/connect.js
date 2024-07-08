const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rishi:Mumbaiindians@cluster0.a9b9xll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('db Connected');
}).catch((e) => {
    console.log(e);
})