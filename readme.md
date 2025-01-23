# pii-encryptor

`pii-encryptor` is a TypeScript library that helps you handle Personally Identifiable Information (PII) with encryption, decryption, and MD5 hashing for searching terms. It provides simple functions to protect sensitive data and securely handle it.

## Features

- **Encrypt and Decrypt Data**: Use AES encryption to encrypt and decrypt text securely.
- **Search Term with MD5**: Generate an MD5 hash of any text to help search or identify terms.

## Installation

You can install the library via npm:

```bash
npm install pii-encryptor


#Import the Library
import { encryptText, decryptText, searchTerm } from 'pii-encryptor';

const secretKey = 'your-secret-key'; // You should keep this secret!
const textToEncrypt = 'Sensitive Data';

##  Encrypting Text

const encryptedText = encryptText(textToEncrypt, secretKey);
console.log('Encrypted Text:', encryptedText);

##  Decrypting Text
const decryptedText = decryptText(encryptedText, secretKey);
console.log('Decrypted Text:', decryptedText); // Should log: 'Sensitive Data'

## API
encryptText(text: string, key: string): string
Encrypts the given text using the AES algorithm and the provided key.

Parameters:

text (string): The text to be encrypted.
key (string): The encryption key.
Returns: The encrypted text (string).

decryptText(encryptedText: string, key: string): string
Decrypts the given encryptedText using the AES algorithm and the provided key.

Parameters:

encryptedText (string): The text to be decrypted.
key (string): The decryption key.
Returns: The decrypted text (string).

searchTerm(text: string): string
Generates an MD5 hash of the given text.

Parameters:

text (string): The text to be hashed.
Returns: The MD5 hash of the input text (string).
