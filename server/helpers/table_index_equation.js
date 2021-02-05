/**
 * 
 * @param {String} value 
 */
const findIndices = (value) => {

    let indices = [];

    const accessRecursive = (value) => {
                
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