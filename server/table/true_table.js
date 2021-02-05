const app = require("express")();
const binaryToDecimal = require("../convertion/binary_to_decimal");
const findTableindices = require("../helpers/table_index_equation");

const VALIDATE_EQUATION = /^([A-Z][A-Z]*'?\+?)+[A-Z]'?$/g;

// If you change it you should change the binary_to_decimal.js file
// located in the convertion folder
const MAX_VARIABLES = 5;

app.post("/trueTable", (req, res)=>{

    let equation = (req.body.equation || "").replace(' ', '').toUpperCase();

    // Validating the equation
    if(!VALIDATE_EQUATION.test(equation)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `La ecuación ingresada no es válida.`
            }
        });
    }

    
    // This will search for how many variables user is working with
    let nVariables = equation.replace(/['|\+| ]*/g, '').length;
    if(nVariables <= 1 || nVariables > MAX_VARIABLES){
        return res.status(400).json({
            ok: false,
            error: {
                message: `Estás usando ${nVariables}. Esta API trabaja con mínimo dos variables, máximo ${MAX_VARIABLES}.`
            }
        });
    }

    // This is the true table (just the true values, not the positions)
    let values = new Int8Array(2 ** nVariables); // The number of rows in table
    let position = ""; // the variables (columns) in table

    const splittedEquation = equation.split('+');

    for(let temp, j, i = 0; i < splittedEquation.length; ++i) {

        position = "";

        for(j=0; j<nVariables; ++j) {
            position +="X";
        }

        for(j=0; j<splittedEquation[i].length; ++j) {

            temp = position.split("");

            if((splittedEquation[i][j+1] || "") === '\'') {
                temp[splittedEquation[i].charCodeAt(j) - 65] = '0';
                ++j;
            }
            else {
                temp[splittedEquation[i].charCodeAt(j) - 65] = '1';
            }
            position = temp.join("");
        }

        findTableindices(position).forEach(i=>{
            values[binaryToDecimal(i)] = 1;
        });
    }

    return res.json({
        ok: true,
        message: "Tabla de verdad creada correctamente",
        equation,
        output: values
    });
});


module.exports = app;