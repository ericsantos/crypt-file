// test/crypt-manager.js
let t = require('tap'),
    CryptManager = require('../../lib/crypt-manager'),
    key = 'my key',
    text = 'hello world',
    encryptedText,
    encryptedHelloWorldTextBufferExpected = Buffer.from([131, 111, 186, 35, 95, 44, 69, 99, 159, 153, 132, 212, 144, 250, 74, 69, 130, 178, 238, 107, 72, 66, 145, 233, 190, 193, 217]);

t.test('encrypt() simple text using the word key', (t) => {
    const manager = new CryptManager(key),
        helloWordTextAsBuffer = Buffer.from(text);
    encryptedText = manager.encrypt(helloWordTextAsBuffer);
    t.equal(encryptedText.length, encryptedHelloWorldTextBufferExpected.length)
    t.end();
});

t.test('decrypt() simple text using the word key', (t) => {
    const manager = new CryptManager(key),
        decryptedText = manager.decrypt(encryptedText);
    t.equal(decryptedText.toString(), text)
    t.end();
});



