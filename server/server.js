require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.send('Hello World');
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    res.json(body);
});

app.put('/usuario', function(req, res) {
    res.send('Got a PUT request at /user')
});

app.delete('/usuario', function(req, res) {
    res.send('Got a DELETE request at /user')
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));