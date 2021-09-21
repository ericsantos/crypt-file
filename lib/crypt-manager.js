const crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

module.exports = (function (plainTextKey) {
    let key;
    const _encrypt = (buffer) => {
            let iv, cipher, result;
            // Create an initialization vector
            iv = crypto.randomBytes(16);
            // Create a new cipher using the algorithm, key, and iv
            cipher = crypto.createCipheriv(algorithm, key, iv);
            // Create the new (encrypted) buffer
            result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
            return result;
        },
        _decrypt = (encrypted) => {
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
        },
        _getKey = (key) => {
            return crypto
                .createHash('sha256')
                .update(String(key))
                .digest('base64')
                .substr(0, 32);
        }

    key = _getKey(plainTextKey);

    return {encrypt: _encrypt, decrypt: _decrypt}
});
