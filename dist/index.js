"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskSensitiveData = exports.generateMd5Terms = exports.searchTerm = exports.decryptText = exports.encryptText = void 0;
const CryptoJS = require("crypto-js");
const md5 = require("md5");
function encryptText(text, key) {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    const terms = generateMd5Terms(text);
    return {
        encrypted: encrypted,
        terms: terms
    };
}
exports.encryptText = encryptText;
function decryptText(encryptedText, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}
exports.decryptText = decryptText;
function searchTerm(text) {
    return md5(text);
}
exports.searchTerm = searchTerm;
function generateMd5Terms(input) {
    const words = input.split(' ');
    return words.map(word => md5(word.toLowerCase()));
}
exports.generateMd5Terms = generateMd5Terms;
function maskSensitiveData(text) {
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
exports.maskSensitiveData = maskSensitiveData;
//# sourceMappingURL=index.js.map