const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const os = require('os')
const readline = require('readline')

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

prompt._writeToOutput = function _writeToOutput(str) {
  if (prompt.muted) {
    const passVisual = (prompt.line.length) ? prompt.line.split('').map(i => '*').join('') : ''
    prompt.output.write("\x1B[2K\x1B[200D"+prompt.query+passVisual)
  } else {
    prompt.output.write(str)
  }
}

const [nodeExecutable, commandPath, alias] = process.argv;

// const secret = secretParts.join(' ')

const { parse, stringify } = JSON

const dotSecretsPath = path.resolve(os.homedir(), '.secrets')

let secretsObject = {}

// we're going to hash our aliases so that we aren't just exposing them
// to anyone who can see the ~/.secrets file
const hash = (str, salt) => crypto.pbkdf2Sync(str, salt, 100, 64, 'sha512')

// mostly stolen from: https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/
const encrypt = (str, pass, salt) => {
  const key = crypto.scryptSync(pass, salt, 32)

  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

  let encrypted = cipher.update(str)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return { txt: encrypted.toString('hex'), iv }
}

// mostly stolen from: https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/
const decrypt = (msg, pass, salt) => {
  try {
    let iv = Buffer.from(msg.iv, 'hex')

    const key = crypto.scryptSync(pass, salt, 32)

    let encryptedText = Buffer.from(msg.txt, 'hex')

    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch(e) {
    process.exitCode = 1

    console.error(`Could not find ${alias}`)

    process.exit()
  }
}

// check to see if we have stored secrets already
fs.readFile(dotSecretsPath, async (error, file) => {
  if (!error) {
    // if the ~/.secrets file exists, use it to populate our secretsObject
    secretsObject = parse(file)
  }

  prompt.muted = true;
  prompt.query = `Password for ${alias}: `

  // hash the provided alias so that we can compare it to our stored hashes
  const secretName = hash(alias, `${(process.env.SECRETS_SALT) ? process.env.SECRETS_SALT : `${alias}/secretsSalt` }`)

  prompt.question(prompt.query, function(pass) {
    password = pass

    prompt.history = prompt.history.slice(1)

    prompt.query = `(1) Retrieve or (2) Store? `

    prompt.muted = false;

    prompt.question(prompt.query, function(action) {
      if (action === '2') {
        prompt.query = `Secret message for ${alias}: `

        prompt.question(prompt.query, function(secret) {
          secretsObject[secretName] = encrypt(secret, password, secretName)

          prompt.history = prompt.history.slice(1)

          fs.writeFile(dotSecretsPath, stringify(secretsObject), (error) => {
            if (error) {
              console.error(`Could not store secret ${alias}...`);
            } else {
              console.log(`Stored secret ${alias}...`)
            }

            prompt.close()
          })
        })
      } else {
        prompt.close()

        console.log(`${alias}: ${decrypt(secretsObject[secretName], password, secretName)}`)
      }
    })
  })
})
