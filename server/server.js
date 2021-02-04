require('dotenv').config() // add environment variables

const app = require("express")();
const bodyParser = require('body-parser')

// x-www-form-urlencoded parse support
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require("./routes/routes"));

const host = process.env.PORT;

app.listen(host, (error)=>{
    if(error) {
        throw new Error("Server has crashed")
    }

    console.log("Server is live");
});