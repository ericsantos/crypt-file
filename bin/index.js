#! /usr/bin/env node
const crypto = require('crypto'),
    fs = require('fs'),
    algorithm = 'aes-256-ctr',
    argv = require('minimist')(process.argv.slice(2));

let key = argv['key'],
    action = argv['_'][0],
    sourceFile = argv['in'],
    destinationFile = argv['out'],
    plain;

if (!action || action === 'help' || argv['help']) {
    console.log('crypt-file encrypt|decrypt --key here-is-your-key --in textfile.txt [--out encryptfile]');
    return;
}

if (!key) {
    console.log('error: private key is required!');
    return;
}

key = crypto
    .createHash('sha256')
    .update(String(key))
    .digest('base64')
    .substr(0, 32);

const encrypt = (buffer) => {
        let iv, cipher, result;
        // Create an initialization vector
        iv = crypto.randomBytes(16);
        // Create a new cipher using the algorithm, key, and iv
        cipher = crypto.createCipheriv(algorithm, key, iv);
        // Create the new (encrypted) buffer
        result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
        return result;
    },
    decrypt = (encrypted) => {
        let iv, decipher, result;
        // Get the iv: the first 16 bytes
        iv = encrypted.slice(0, 16);
        // Get the rest
        encrypted = encrypted.slice(16);
        // Create a decipher
        decipher = crypto.createDecipheriv(algorithm, key, iv);
        // Actually decrypt it
        result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return result;
    };

switch (action) {
    case 'encrypt':
        destinationFile = destinationFile ? destinationFile : 'e_outputfile';
        plain = fs.readFileSync(sourceFile, 'utf8');
        const encrypted = encrypt(plain);
        try {
            fs.writeFileSync(destinationFile, encrypted, 'utf-8');
            console.log(`File encrypted (name: ${destinationFile}) with success!`);
        } catch (err) {
            // An error occurred
            console.error(err);
        }
        break;

    case 'decrypt':
        destinationFile = destinationFile ? destinationFile : 'd_outputfile.txt';
        plain = fs.readFileSync(sourceFile);
        const decrypted = decrypt(plain);
        try {
            fs.writeFileSync(destinationFile, decrypted, 'utf-8');
            console.log(`File decrypted (name: ${destinationFile}) with success!`);
        } catch (err) {
            // An error occurred
            console.error(err);
        }
        break;

    default:
        console.log('Try something like...');
        console.log('crypt-file encrypt|decrypt --key here-is-your-key --in ./source_file [--out ./destination_file]');
        break;
}
