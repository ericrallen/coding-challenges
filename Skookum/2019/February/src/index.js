// This represents the initial pass at this task
// it is unoptimized

// skip node
process.argv.shift()

// skip script path
process.argv.shift()

// take all other arugments as single string
const stringToConvert = process.argv.join("").toUpperCase()

// we'll start with the phonetic alphabet
const phoneticAlphabet = 'AlphaBravoCharlieDeltaEchoFoxtrotGolfHotelIndiaJulietKiloLimaMikeNovemberOscarPapaQuebecRomeoSierraTangoUniformVictorWhiskeyXrayYankeeZulu'

// separate the alphabet into it's component words
const phoneticArray = phoneticAlphabet.split(/(?=[A-Z])/)

// separate the alphabet into an Array of letters so we can
const phoneticIndexArray = phoneticAlphabet.match(/[A-Z](?=.+)/g)

// return the
console.log(stringToConvert.split('').map(char => phoneticArray[phoneticIndexArray.indexOf(char)]))
