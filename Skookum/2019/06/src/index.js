#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const os = require('os')

// TODO: stop passing the password into this like an argument; prompt the user
// and don't expose the password. It is currently viewable in the `.bash_history`
// when using this utility.
const [nodeExecutable, commandPath, alias, password, ...secretParts] = process.argv;

const secret = secretParts.join(' ')

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
  let iv = Buffer.from(msg.iv, 'hex')

  const key = crypto.scryptSync(pass, salt, 32)

  let encryptedText = Buffer.from(msg.txt, 'hex')

  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)

  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

// check to see if we have stored secrets already
fs.readFile(dotSecretsPath, (error, file) => {
  if (!error) {
    // if the ~/.secrets file exists, use it to populate our secretsObject
    secretsObject = parse(file)
  }

  // if the user provided an alias and a password
  if (alias && password) {
    // hash the provided alias so that we can compare it to our stored hashes
    const secretName = hash(alias, `${(process.env.SECRETS_SALT) ? process.env.SECRETS_SALT : `${alias}/secretsSalt` }`)

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
        console.log(`${alias}: ${decrypt(secretsObject[secretName], password, secretName)}`)
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
