let BINARY_POWER = [];

// Esto es una variable de entorno
process.env.MAX_BITS = 16;

// Esto es para rellenar los valores potencia de dos. Solo se hace una vez
for(let i=0; i<process.env.MAX_BITS; ++i) {
    BINARY_POWER.push(2**i);
}


 /**
  * 
  * @param {Int8Array} vector
  * 
  * Recibe un vector de caracteres de 0s y 1s y lo transforma a un
  * valor entero
  */
const binaryToDecimal = (vector)=>{

    if(vector.length > process.env.MAX_BITS) throw new Error("Binary number is too big");

    let result = 0;

    for(let i = vector.length - 1; i>=0; --i) {
        if(vector[i] == 1) {
            result += BINARY_POWER[vector.length - 1 - i];
        }
    }

    return result;
}

/**
 * 
 * @param {number} decimal 
 * 
 * Este metodo recibe un valor entero y lo transforma a binario.
 * El retorno sera un string con la secuencia de 1s y 0s correspondientes
 */
const decimalToBinary = (decimal)=>{

    let binary = "";

    for(let i=process.env.MAX_BITS-1; i>=0; --i) {
        if(BINARY_POWER[i] <= decimal) {
            binary += "1";
            decimal -= BINARY_POWER[i];
        }
        else {
            binary += "0";
        }
    }

    return binary;
}

module.exports = {binaryToDecimal, decimalToBinary};