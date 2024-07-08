const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const registrationRoutes = require('./routes/registrations');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

require("./src/db/connect");
app.use('/api/registrations', registrationRoutes);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/view-registrations', (req, res) => {
    res.sendFile(__dirname + '/views/view-registrations.html');
});


app.listen(port,()=>{
    console.log("Server Started");
}) 