const app = require("express")();

app.use(require("../table/true_table"));
app.use(require('../convertion/conversor'));

module.exports = app;