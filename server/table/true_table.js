const app = require("express")();
const binaryToDecimal = require("../convertion/binary_to_decimal");

const VALIDATE_ECUATION = /^([A-Z][A-Z]*'?\+?)+[A-Z]'?$/g;

// If you change it you should change the binary_to_decimal.js file
// located in the convertion folder
const MAX_VARIABLES = 5;

app.get("/trueTable", (req, res)=>{

    let ecuation = (req.query.ecuation || "").replace(' ', '').toUpper();

    // Validating the ecuation
    if(!VALIDATE_ECUATION.test(ecuation)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `La ecuación ingresada no es válida.`
            }
        });
    }

    
    // This will search for how many variables user is working with
    let nVariables = ecuation.replace(/['|\+| ]*/g, '').length;
    if(nVariables <= 1 || nVariables > MAX_VARIABLES){
        return res.status(400).json({
            ok: false,
            error: {
                message: `Estás usando ${nVariables}. Esta API trabaja con mínimo dos variables, máximo ${MAX_VARIABLES}.`
            }
        });
    }

    // This is the true table (just the true values, not the positions)
    let values = new Int8Array(2 ** nVariables - 1); // The number of rows in table
    let position = new Int8Array(nVariables); // the variables (columns) in table

    for(let logicValue, j, i = 0; i < ecuation.length; ++i) {
        for(j=0; j<ecuation[i]; ++j) {
            
            logicValue = 1;

            if((ecuation[i][j+1] || "") === '\'') {
                ++j;
                logicValue = 0;
            }
            
            position[ecuation[i].charCodeAt(j) - 65] = logicValue;
        }

        values[binaryToDecimal(position)] = 1;
    }    
});


module.exports = app;