#!/usr/bin/env node
p=process.argv
p.splice(0,2)
A='AlphaBravoCharlieDeltaEchoFoxtrotGolfHotelIndiaJulietKiloLimaMikeNovemberOscarPapaQuebecRomeoSierraTangoUniformVictorWhiskeyXrayYankeeZulu'
s=p.join('').toUpperCase()
a=A.split(/(?=[A-Z])/)
i=a.map(w=>w[0])
console.log(s.split('').map(c=>a[i.indexOf(c)]))
