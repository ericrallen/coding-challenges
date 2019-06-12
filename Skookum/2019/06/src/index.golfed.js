let R=require,
P=process,
O=R('os'),
F=R('fs'),
X=R('path'),
C=R('crypto'),
L=console,
B=Buffer,
r=R('readline'),
p=r.createInterface({input:P.stdin,output:P.stdout}),
q=(a,b)=>(a)?a:b,
[_,__,a]=P.argv,
h=(t,s)=>C.pbkdf2Sync(t,s,100,64,'sha512'),
o=X.resolve(O.homedir(),'.secrets'),
s={},
i='hex'
H=t=>t.S(i)
E=(m,p,s)=>{
  let k=C.scryptSync(p,s,32),
  v=C.randomBytes(16),
  c=C.createCipheriv('aes-256-cbc',k,v),
  y=c.update(m)
  y=B.concat([y,c.final()])
  return {t:y.toString(i),v:v.toString(i)}
},
D=(m,p,s)=>{
  try {
    let v=B.from(m.v,i),
    k=C.scryptSync(p,s,32),
    y=B.from(m.t,i),
    x=C.createDecipheriv('aes-256-cbc',B.from(k),v),
    z=x.update(y)
    z=B.concat([z,x.final()])
    return z.toString()
  } catch(e) {
    P.exitCode=1
    L.error(`NO:${a}`)
    P.exit()
  }
}
p._writeToOutput=str=>p.output.write(`${(p.m)?`\x1B[2K\x1B[200D${p.query}${p.line.split('').map(_=>'*').join('')}`:str}`)
F.readFile(o,(e,f)=>{
  let n=h(a,q(P.env.SECRETS_SALT,a))
  if(!e){
    s=JSON.parse(f)
  }
  p.m=true
  p.query=`Pass:${a} `
  p.question(p.query,p1=>{
    p.history=p.history.slice(1)
    p.query=`(1)Get/(2)Set `
    p.m=false
    p.question(p.query,p2=>{
      if(p2==='2'){
        p.query = `Text:${a} `
        p.question(p.query,function(p3) {
          s[n] = E(p3,p1,n)
          p.history = p.history.slice(1)
          F.writeFile(o, JSON.stringify(s),e=>{
            if (e) {
              L.error(`NO:${a}`);
            } else {
              L.log(`OK:${a}`)
            }
            p.close()
          })
        })
      } else {
        p.close()
        L.log(`${a}:${D(s[n],p1,n)}`)
      }
    })
  })
})
