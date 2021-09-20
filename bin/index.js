#! /usr/bin/env node
const fs = require('fs'),
    CryptManager = require('../lib/crypt-manager'),
    argv = require('minimist')(process.argv.slice(2));

let key = argv['key'],
    action = argv['_'][0],
    sourceFile = argv['in'],
    destinationFile = argv['out'],
    privateKeyFile = argv['key-file'],
    onlyShow = argv['only-show'],
    plain,
    manager;

if (privateKeyFile) {
    try {
        key = fs.readFileSync(privateKeyFile, 'utf-8');
        key = key.split(/\r?\n/)[0];
    } catch (e) {
        console.log('error: ' + e);
        return;
    }
}

if (!action || action === 'help' || argv['help'] || !argv['in']) {
    console.log('Usage: crypt-file <command>');
    console.log('where <command> is one of:\n\tencrypt, decrypt\n\nhow to use:');
    console.log('encrypt\n\tcrypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --key-file yourprivatekey.txt\n\t or\n\tcrypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --key yourkeywritedhere\n');
    console.log('decrypt\n\tcrypt-file decrypt --in filetobedecrypted --out filedecrypted --key-file yourprivatekey.txt\n\t or\n\tcrypt-file decrypt --in filetobedecrypted --out filedecrypted --key yourkeywritedhere\n\t or\n\tcrypt-file decrypt --in filetobedecrypted --key yourkeywritedhere --only-show\n');
    return;
}

if (!key) {
    console.log('error: private key is required!');
    return;
}

manager = new CryptManager(key);

switch (action) {
    case 'encrypt':
        destinationFile = destinationFile ? destinationFile : 'e_outputfile';
        plain = fs.readFileSync(sourceFile, 'utf8');
        const encrypted = manager.encrypt(plain);
        try {
            fs.writeFileSync(destinationFile, encrypted, 'utf-8');
            console.log(`File encrypted (name: ${destinationFile}) with success!`);
        } catch (err) {
            // An error occurred
            console.log('error!');
            console.error(err);
        }
        break;

    case 'decrypt':
        destinationFile = destinationFile ? destinationFile : 'd_outputfile.txt';
        plain = fs.readFileSync(sourceFile);
        const decrypted = manager.decrypt(plain);

        if (onlyShow) {
            console.log('DECRYPTED:')
            console.log('----------')
            console.log(decrypted.toString());
            return;
        }

        try {
            fs.writeFileSync(destinationFile, decrypted, 'utf-8');
            console.log(`File decrypted (name: ${destinationFile}) with success!`);
        } catch (err) {
            // An error occurred
            console.log('error!');
            console.error(err);
        }
        break;

}
