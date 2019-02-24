// NOTE: This is the hand-golfed code
// it doesn't yet apply things like using the comma operator to remove line breaks
p=process.argv
p.splice(0,2)
A='AlphaBravoCharlieDeltaEchoFoxtrotGolfHotelIndiaJulietKiloLimaMikeNovemberOscarPapaQuebecRomeoSierraTangoUniformVictorWhiskeyXrayYankeeZulu'
s=p.join('').toUpperCase()
a=A.split(/(?=[A-Z])/)
i=a.map(w=>w[0])
console.log(s.split('').map(c=>a[i.indexOf(c)]))
