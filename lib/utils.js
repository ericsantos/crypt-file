const fs = require('fs');

module.exports = {
    readUTF8File: (filename, readJustFirstLine) => {
        let content;
        try {
            content = fs.readFileSync(filename, 'utf-8');
            if (readJustFirstLine)
                content = content.split(/\r?\n/)[0];
        } catch (e) {
            console.log('error: ' + e);
        }
        return content || null;
    },
    readFile: (filename) => {
        return fs.readFileSync(filename);
    }
};
