const {binaryToDecimal} = require("../convertion/binary_to_decimal");
const findTableindices = require("../helpers/table_index_equation");

/**
 * Esto recibira una ecuacion y el numero de variables con las que se
 * esta trabajando, y devolvera una tabla de verdad con los indices
 * en enteros, por ejemplo, si se tiene la siguiente ecuacion:
 *        AB'
 * La tabla correspondiente es esta:
 * +-+-++-+
 * |A|B||R|
 * +-+-++-+
 * |0|0||0|
 * |0|1||0|
 * |1|0||1|
 * |1|1||0|
 * +-+-++-+
 * Pero la funcion devolvera un JSON como el siguiente
 * {
 *  0: 0,
 *  1: 0,
 *  2: 1,
 *  3: 0
 * }
 * @param {number} nVariables 
 * @param {string} equation 
 */
const buildTable = (nVariables, equation)=>{
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

    return values;
}

module.exports = buildTable;