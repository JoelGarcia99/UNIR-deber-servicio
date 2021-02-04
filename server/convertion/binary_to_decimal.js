let BINARY_POWER = [];
 
process.env.MAX_BITS = 16;

for(let i=0; i<process.env.MAX_BITS; ++i) {
    BINARY_POWER.push(2**i);
}


 /**
  * 
  * @param {Int8Array} vector
  * 
  * This will convert a binary number into a decimal one
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

module.exports = binaryToDecimal;