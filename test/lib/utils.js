// test/utils.js
let t = require('tap'),
    utils = require('../../lib/utils'),
    keyTxtBufferExpected = Buffer.from([109, 121, 32, 107, 101, 121, 10, 115, 101, 99, 111, 110, 100, 32, 108, 105, 110, 101, 10]),
    firstLineExpected = 'my key';
t.test('readfile() reading the key file', (t) => {
    const keyBuffer = utils.readFile(__dirname + '/../mock/key.txt'),
        result = Buffer.compare(keyBuffer, keyTxtBufferExpected);
    t.equal(result, 0);
    t.end();
});
t.test('readUTF8File() reading the first line of the key file', (t) => {
    const keyBuffer = utils.readUTF8File(__dirname + '/../mock/key.txt', true),
        result = keyBuffer.toString() === firstLineExpected;
    t.equal(result, true);
    t.end();
});
t.test('readUTF8File() reading the key file', (t) => {
    const keyBuffer = utils.readUTF8File(__dirname + '/../mock/key.txt'),
        result = Buffer.compare(Buffer.from(keyBuffer), keyTxtBufferExpected);
    t.equal(result, 0);
    t.end();
});
t.test('readUTF8File() reading non-exist file', (t) => {
    t.throws(utils.readUTF8File(__dirname + '/../mock/key2.txt', true))
    t.end();
});


