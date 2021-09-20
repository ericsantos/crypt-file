const fs = require('fs');
module.exports.readUTF8File = (filename) => {
    let content;
    try {
        content = fs.readFileSync(filename, 'utf-8');
        content = content.split(/\r?\n/)[0];
    } catch (e) {
        console.log('error: ' + e);
    }
    return content || null;
}
