const crypto = require('crypto');

/**
 * 
 * Used to create a single unique id from 2 user id strings, this is needed for storing private messages
 * in the db
 */
export default function combineUniqueIds(id1: string, id2: string) {

    function hashString(inputString: string) {
        const hash = crypto.createHash('sha256');
        hash.update(inputString, 'utf-8');
        return hash.digest('hex');
    }

    // Hash the input strings
    const hashedId1 = hashString(id1);
    const hashedId2 = hashString(id2);

    // Convert the hashed strings to numbers
    const num1 = parseInt(hashedId1.substring(0, 15), 16);
    const num2 = parseInt(hashedId2.substring(0, 15), 16);

    // Check if the conversion is successful
    if (isNaN(num1) || isNaN(num2)) {
        console.error("Invalid input. Unable to convert to numbers.");
        return null;
    }

    // Perform addition on the converted numbers
    return num1 + num2;
}