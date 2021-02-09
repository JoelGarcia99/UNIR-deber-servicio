const app = require("express")();
const buildTable = require("./buildTable");

// Esto es una ruta, la explicacion de como funciona esta en el README

// If you change it you should change the binary_to_decimal.js file
// located in the convertion folder
const MAX_VARIABLES = 8;

app.post("/trueTable", (req, res)=>{

    const VALIDATE_EQUATION = /^([A-Z]'?\+?)+[A-Z]'?$/g;
    let equation = (req.body.equation || "").replace(' ', '').toUpperCase();

    // Validating the equation
    if(!VALIDATE_EQUATION.test(equation)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `La ecuación ingresada no es válida.`,
                equation
            }
        });
    }

    // This will search for how many variables user is working with
    let rawVariables = new Set(equation.replace(/['|\+| ]*/g, ''));
    let nVariables = 0;

    // This will calculate the number of variables
    rawVariables.forEach(i=>{
        if(i.charCodeAt(0) - 64 > nVariables) {
            nVariables = i.charCodeAt(0) - 64; 
        }
    });

    if(nVariables <= 1 || nVariables > MAX_VARIABLES){
        return res.status(400).json({
            ok: false,
            error: {
                message: `Estás usando ${nVariables} [A-${String.fromCharCode(64 + nVariables)}] variables. Esta API trabaja con mínimo dos variables, máximo ${MAX_VARIABLES}.`,
                equation
            }
        });
    }

    const values = buildTable(nVariables, equation);

    return res.json({
        ok: true,
        message: "Tabla de verdad creada correctamente",
        equation,
        variables: nVariables,
        output: values
    });
});


module.exports = app;