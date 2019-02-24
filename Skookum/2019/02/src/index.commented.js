// NOTE: This is the ungolfed code before any optimization by hand

// skip node path and script path
const args = process.argv;

args.splice(0, 2);

// take all other arugments as single string
const stringToConvert = args.join("").toUpperCase();

// we'll start with the phonetic alphabet
const phoneticAlphabet = 'AlphaBravoCharlieDeltaEchoFoxtrotGolfHotelIndiaJulietKiloLimaMikeNovemberOscarPapaQuebecRomeoSierraTangoUniformVictorWhiskeyXrayYankeeZulu';

// separate the alphabet into it's component words
const phoneticArray = phoneticAlphabet.split(/(?=[A-Z])/);

// separate the alphabet into an Array of letters so we can
const phoneticIndexArray = phoneticArray.map(word => word[0]);

// return the phonetic representation of our string as an Array
console.log(stringToConvert.split('').map(char => phoneticArray[phoneticIndexArray.indexOf(char)]));
