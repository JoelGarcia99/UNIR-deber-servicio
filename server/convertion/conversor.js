const app = require("express")();
const {binaryToDecimal, decimalToBinary} = require("./binary_to_decimal");

app.get('/conversor/decimalToBinary', (req, res)=>{
    const value = req.query.value || 0;

    // Validating the number is binary
    if(!/^[0-9]*[0-9]$/g.test(value)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "El valor ingresado no es un número entero"
            }
        })
    }

    if(value > 2**process.env.MAX_BITS) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `Solo se aceptan valores de 0 a ${2**process.env.MAX_BITS}`
            }
        })
    }

    return res.json({
        ok: true,
        message: "Conversión realizada con éxito",
        input: value,
        length: `${process.env.MAX_BITS} bits`,
        output: decimalToBinary(value)
    })
})

app.get('/conversor/binaryToDecimal', (req, res)=>{

    const _value = req.query.value || "";

    // Validating the number is binary
    if(!/^[0|1]*[0|1]$/g.test(_value)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "El valor ingresado no es un binario"
            }
        })
    }

    // The value in a vector shape
    const value = _value.split("");

    if(value.length > process.env.MAX_BITS) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `Solo se aceptan valores de máximo ${process.env.MAX_BITS} bits`
            }
        })
    }

    return res.json({
        ok: true,
        message: "Conversión realizada con éxito",
        input: _value,
        output: binaryToDecimal(value)
    })

});


module.exports = app;