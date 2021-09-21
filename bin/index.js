#! /usr/bin/env node
const fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2)),
    CryptManager = require('../lib/crypt-manager'),
    utils = require('../lib/utils');

let key = argv['key'],
    action = argv['_'][0],
    sourceFile = argv['in'],
    destinationFile = argv['out'],
    keyFile = argv['key-file'],
    onlyShow = argv['only-show'],
    manager;

if (keyFile) {
    key = utils.readUTF8File(keyFile, true);
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

const encrypt = (sourceFile, destinationFile) => {
        const plain = utils.readUTF8File(sourceFile),
            encrypted = manager.encrypt(plain);
        destinationFile = destinationFile ? destinationFile : 'e_outputfile';
        try {
            fs.writeFileSync(destinationFile, encrypted, 'utf-8');
            console.log(`File encrypted (name: ${destinationFile}) with success!`);
        } catch (err) {
            // An error occurred
            console.log('error!');
            console.error(err);
        }
    },
    decrypt = (sourceFile, destinationFile, onlyShow) => {
        const plain = utils.readFile(sourceFile),
            decrypted = manager.decrypt(plain);
        destinationFile = destinationFile ? destinationFile : 'd_outputfile.txt';

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
    };

switch (action) {
    case 'encrypt':
    case 'e':
        encrypt(sourceFile, destinationFile);
        break;

    case 'decrypt':
    case 'd':
        decrypt(sourceFile, destinationFile, onlyShow);
        break;

    default:
        console.log('no command');
        break;

}
