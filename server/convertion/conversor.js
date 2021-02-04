const app = require("express")();
const binaryToDecimal = require("./binary_to_decimal");

app.get('/conversor/binaryToDecimal', (req, res)=>{

    const _value = req.query.value || "";

    // Validating the number is binary
    if(!/^[0|1]+/g.test(_value)) {
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
        message: "Conversión realizado con éxito",
        output: binaryToDecimal(value)
    })

});


module.exports = app;