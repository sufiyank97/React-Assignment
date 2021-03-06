const express = require('express')
const cors = require('cors')
const configureDB = require('./config/database')
const router = require('./config/routes')

const app = express()
const port = process.env.PORT || 3005;
const path = require("path");

app.use(express.json())
app.use(cors())
configureDB()
app.use('/', router)
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});


app.listen(port, () => {
    console.log('listening on port', port);
})