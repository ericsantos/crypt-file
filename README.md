# crypt-file
#### Encrypt and decrypt files using AES-256.

**Usage:** crypt-file <command>
where <command> is one of:
        encrypt, decrypt

##### Examples how to use:

**encrypt**


        crypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --keyFile yourprivatekey.txt

        
        
        crypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --key yourkeywritedhere


**decrypt**

        crypt-file decrypt --in filetobedecrypted --out filedecrypted --keyFile yourprivatekey.txt


        crypt-file decrypt --in filetobedecrypted --out filedecrypted --key yourkeywritedhere
        
        
        crypt-file decrypt --in filetobedecrypted --show-only --key yourkeywritedhere
