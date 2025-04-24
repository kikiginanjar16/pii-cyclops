"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptText = encryptText;
exports.decryptText = decryptText;
exports.searchTerm = searchTerm;
exports.generateMd5Terms = generateMd5Terms;
exports.hashText = hashText;
exports.maskingText = maskingText;
exports.maskSensitiveData = maskSensitiveData;
const CryptoJS = require("crypto-js");
const md5 = require("md5");
function encryptText(text, key) {
    if (typeof text !== 'string' || !text) {
        throw new Error('Invalid text: Must be a non-empty string');
    }
    if (typeof key !== 'string' || !key) {
        throw new Error('Invalid key: Must be a non-empty string');
    }
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    const terms = generateMd5Terms(text);
    return {
        encrypted,
        terms
    };
}
function decryptText(encryptedText, key) {
    if (typeof encryptedText !== 'string' || !encryptedText) {
        throw new Error('Invalid encrypted text: Must be a non-empty string');
    }
    if (typeof key !== 'string' || !key) {
        throw new Error('Invalid key: Must be a non-empty string');
    }
    if (!/^[A-Za-z0-9+/=]+$/.test(encryptedText)) {
        throw new Error('Invalid encrypted text: Malformed ciphertext');
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error('Decryption failed: Invalid key or corrupted ciphertext');
        }
        return decrypted;
    }
    catch (error) {
        throw new Error(`Decryption error: ${error.message}`);
    }
}
function searchTerm(text) {
    if (typeof text !== 'string') {
        return '';
    }
    return md5(text);
}
function generateMd5Terms(input) {
    if (typeof input !== 'string') {
        return [];
    }
    const words = input.split(' ').filter(word => word.trim() !== '');
    return words.map(word => md5(word.toLowerCase()));
}
function hashText(word) {
    if (typeof word !== 'string') {
        return '';
    }
    return md5(word);
}
function maskingText(word) {
    if (typeof word !== 'string' || word.length === 0) {
        return '';
    }
    if (word.length <= 2) {
        return '*'.repeat(word.length);
    }
    const firstChar = word[0];
    const lastChar = word[word.length - 1];
    const middleChars = '*'.repeat(word.length - 2);
    return firstChar + middleChars + lastChar;
}
function maskSensitiveData(text) {
    if (typeof text !== 'string') {
        return '';
    }
    const nameRegex = /\b[A-Z][a-z]*\b/g;
    const addressRegex = /\b\d{1,3}\s[A-Za-z]+\s[A-Za-z]+\b/g;
    const phoneRegex = /\b\d{3}[-.\s]??\d{3}[-.\s]??\d{4}\b/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const maskWithRandomStars = (match) => {
        return match.split('').map(char => (Math.random() > 0.5 ? '*' : char)).join('');
    };
    return text
        .replace(nameRegex, maskWithRandomStars)
        .replace(addressRegex, maskWithRandomStars)
        .replace(phoneRegex, maskWithRandomStars)
        .replace(emailRegex, maskWithRandomStars);
}
const key = 'my-secret-key-123';
const text = 'Hello, World!';
try {
    const { encrypted } = encryptText(text, key);
    console.log('Encrypted:', encrypted);
    const decrypted = decryptText(encrypted, key);
    console.log('Decrypted:', decrypted);
}
catch (error) {
    console.error('Error:', error.message);
}
//# sourceMappingURL=index.js.map