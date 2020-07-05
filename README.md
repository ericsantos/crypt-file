# crypt-file
**Encrypt and decrypt files using AES-256.**

Usage: crypt-file <command>
where <command> is one of:
        encrypt, decrypt

how to use:

encrypt
`        crypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --keyFile yourprivatekey.txt`
        
        or
        
`        crypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --key yourkeywritedhere`


decrypt
`        crypt-file decrypt --in filetobedecrypted --out filedecrypted --keyFile yourprivatekey.txt`

        or

`       crypt-file decrypt --in filetobedecrypted --out filedecrypted --key yourkeywritedhere`
