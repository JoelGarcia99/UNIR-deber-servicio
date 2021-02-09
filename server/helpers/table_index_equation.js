/**
 * 
 * Cuando se desea transformar una ecuacion booleana a
 * tabla de verdad, por ejemplo, A+BC', es necesario hallar
 * los indices en los que ese valor es 1. En este caso, 
 * todas las posiciones que empiecen por 1  llevaran el valor
 * de verdad 1, es decir las posiciones 1XX; ademas,
 * los indices que terminan en 10 también llevan 1, que en este 
 * caso son X10, en donde X puede ser 0 o 1. 
 * 
 * Este metodo se encarga de hallar los indices mencionados.
 * 
 * @param {String} value 
 * 
 */
const findIndices = (value) => {

    // Los indices que llevaran 1
    let indices = [];

    // Esta funcion recibe un string con 0s, 1s, y Xs, 
    // y luego se encarga de hacer todas las combinacinoes
    // posibles de 0s y 1s para hallar los indices, esto
    // de forma recursiva. Esta funcion no puede ser llamada
    // desde ningun otro punto del programa.
    const accessRecursive = (value) => {
        
        // Si hay X la reemplaza con 0 y 1. Si ya no hay la 
        // agrega al vector de indices
        if(/X/i.test(value)) {
            accessRecursive(value.replace(/X/i, '0'));
            accessRecursive(value.replace(/X/i, '1'));
        }
        else {
            indices.push(value);
        }
    }

    accessRecursive(value);
    return indices;
}

module.exports = findIndices;