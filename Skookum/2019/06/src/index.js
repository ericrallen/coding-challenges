const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const os = require('os')

const [nodeExecutable, commandPath, alias, password, ...secretParts] = process.argv;

const secret = secretParts.join(' ')

const { parse, stringify } = JSON

const dotSecretsPath = path.resolve(os.homedir(), '.secrets')

let secretsObject = {}

const hash = (str, salt) => crypto.pbkdf2Sync(str, salt, 100, 64, 'sha512')

const encrypt = (str, pass, salt) => {
  const key = crypto.scryptSync(pass, salt, 32)
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

  let encrypted = cipher.update(str)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return { txt: encrypted.toString('hex'), iv }
}

const decrypt = (msg, pass, salt) => {
  let iv = Buffer.from(msg.iv, 'hex')
  const key = crypto.scryptSync(pass, salt, 32)
  let encryptedText = Buffer.from(msg.txt, 'hex')

  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)

  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

fs.readFile(dotSecretsPath, (error, file) => {
  if (!error) {
    secretsObject = parse(file)
  }

  if (alias && password) {
    const secretName = hash(alias, password)

    if (secretsObject[secretName]) {
      if (secret) {
        secretsObject[secretName] = encrypt(secret, password, secretName)

        fs.writeFile(dotSecretsPath, stringify(secretsObject), (error) => {
          if (error) {
            console.error(`Could not store secret ${alias}...`);
          } else {
            console.log(`Updated secret ${alias}...`)
          }
        });
      } else {
        console.log(decrypt(secretsObject[secretName], password, secretName))
      }
    } else {
      if (secret) {
        secretsObject[secretName] = encrypt(secret, password, secretName)

        fs.writeFile(dotSecretsPath, stringify(secretsObject), (error) => {
          if (error) {
            console.error(`Could not store secret ${alias}...`);
          } else {
            console.log(`Stored secret ${alias}...`)
          }
        })
      } else {
        process.exitCode = 1

        console.error(`Could not store secret ${alias}...`);
      }
    }
  } else {
    process.exitCode = 1

    console.log('usage: secret "alias" "password" "message"')
  }
})
