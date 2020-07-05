# crypt-file

## Description
###### Encrypt and decrypt files using AES-256.

## Installation

`
npm install -g @ericsantos/crypt-file
`


## Usage

**Usage:** `crypt-file <command>`

where <command> is one of:

        encrypt, decrypt

## How to use

###### Examples how to use commands.

#### encrypt


        crypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --keyFile yourprivatekey.txt

or

        crypt-file encrypt --in filetobeencrypted.txt --out fileencrypted --key yourkeywritedhere


#### decrypt

        crypt-file decrypt --in filetobedecrypted --out filedecrypted --keyFile yourprivatekey.txt

or

        crypt-file decrypt --in filetobedecrypted --out filedecrypted --key yourkeywritedhere

or
        
        crypt-file decrypt --in filetobedecrypted --show-only --key yourkeywritedhere
