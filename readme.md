```markdown
# Text Encryption and Masking Utility

This module provides a collection of utility functions for encrypting, decrypting, hashing, and masking sensitive text data. It uses the `crypto-js` library for AES encryption/decryption and the `md5` library for generating MD5 hashes.

## Table of Contents
- [Installation](#installation)
- [Functions](#functions)
  - [encryptText](#encrypttext)
  - [decryptText](#decrypttext)
  - [searchTerm](#searchterm)
  - [generateMd5Terms](#generatemd5terms)
  - [hashText](#hashtext)
  - [maskingText](#maskingtext)
  - [maskSensitiveData](#masksensitivedata)
- [Usage Examples](#usage-examples)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

Install the required dependencies using npm:

```bash
npm install crypto-js md5
```

## Functions

### `encryptText(text: string, key: string): EncryptTextProps`

Encrypts a given text using AES encryption and generates MD5 hashes for individual words.

- **Parameters**:
  - `text`: The input text to encrypt.
  - `key`: The encryption key for AES.
- **Returns**: An object of type `EncryptTextProps` containing:
  - `encrypted`: The AES-encrypted text.
  - `terms`: An array of MD5 hashes for each word in the input text.

### `decryptText(encryptedText: string, key: string): string`

Decrypts an AES-encrypted text using the provided key.

- **Parameters**:
  - `encryptedText`: The encrypted text to decrypt.
  - `key`: The decryption key.
- **Returns**: The decrypted plain text.
- **Note**: Ensure the correct key is used; otherwise, decryption will fail.

### `searchTerm(text: string): string`

Generates an MD5 hash for a given text.

- **Parameters**:
  - `text`: The input text to hash.
- **Returns**: The MD5 hash of the input text.

### `generateMd5Terms(input: string): string[]`

Splits the input text into words and generates an MD5 hash for each word.

- **Parameters**:
  - `input`: The input text to process.
- **Returns**: An array of MD5 hashes, one for each word (converted to lowercase).

### `hashText(word: string): string`

Generates an MD5 hash for a single word.

- **Parameters**:
  - `word`: The word to hash.
- **Returns**: The MD5 hash of the word.

### `maskingText(word: string): string`

Masks a word by keeping the first and last characters and replacing the middle with asterisks (`*`).

- **Parameters**:
  - `word`: The word to mask.
- **Returns**: The masked word.
- **Behavior**:
  - If the word is 2 or fewer characters, it is fully replaced with asterisks.
  - Otherwise, only the middle characters are masked.

### `maskSensitiveData(text: string): string`

Masks sensitive data in the text, such as names, addresses, phone numbers, and emails, by randomly replacing characters with asterisks.

- **Parameters**:
  - `text`: The input text containing sensitive data.
- **Returns**: The text with sensitive data masked.
- **Patterns Matched**:
  - Names: Words starting with a capital letter followed by lowercase letters.
  - Addresses: Patterns like "123 Street Name".
  - Phone numbers: Formats like "123-456-7890" or "123 456 7890".
  - Emails: Standard email formats like "example@domain.com".

## Usage Examples

```typescript
import { encryptText, decryptText, maskSensitiveData, maskingText } from './textUtils';

// Encrypt and decrypt text
const { encrypted, terms } = encryptText("Hello world", "my-secret-key");
console.log("Encrypted:", encrypted);
console.log("MD5 Terms:", terms);

const decrypted = decryptText(encrypted, "my-secret-key");
console.log("Decrypted:", decrypted); // Output: Hello world

// Mask a single word
console.log(maskingText("hello")); // Output: h***o
console.log(maskingText("hi")); // Output: **

// Mask sensitive data
const sensitiveText = "Contact John Doe at 123-456-7890 or john.doe@example.com";
console.log(maskSensitiveData(sensitiveText));
// Possible Output: Contact J**n D*e at 1*3-4*6-7*90 or j**n.d*e@e****le.c*m
```

## Dependencies

- [crypto-js](https://www.npmjs.com/package/crypto-js): For AES encryption and decryption.
- [md5](https://www.npmjs.com/package/md5): For generating MD5 hashes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
```

File ini siap digunakan sebagai dokumentasi untuk modul Anda. Jika Anda ingin saya menyimpan atau memodifikasi bagian tertentu, beri tahu saya!