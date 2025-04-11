import * as CryptoJS from 'crypto-js';
import * as md5 from 'md5';

interface EncryptTextProps {
    encrypted: string;
    terms: string[];
}


export function encryptText(text: string, key: string): EncryptTextProps {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    const terms = generateMd5Terms(text);
    return {
        encrypted: encrypted,
        terms: terms
    };
}

export function decryptText(encryptedText: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

// Fungsi untuk mencari teks berdasarkan MD5 hash
export function searchTerm(text: string): string {
    return md5(text);
}

export function generateMd5Terms(input: string): string[] {
    const words = input.split(' '); // Split input by spaces
    return words.map(word =>
        md5(word.toLowerCase()) // Generate MD5 hash for each word
    );
}

export function hashText(word: string): string {
    return md5(word);
}

export function maskingText(word: string): string {
    if (word.length <= 2) {
        return '*'.repeat(word.length);
    }

    const firstChar = word[0];
    const lastChar = word[word.length - 1];
    const middleChars = '*'.repeat(word.length - 2);

    return firstChar + middleChars + lastChar;
}

export function maskSensitiveData(text: string): string {
    const nameRegex = /\b[A-Z][a-z]*\b/g;
    const addressRegex = /\b\d{1,3}\s[A-Za-z]+\s[A-Za-z]+\b/g;
    const phoneRegex = /\b\d{3}[-.\s]??\d{3}[-.\s]??\d{4}\b/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

    const maskWithRandomStars = (match: string) => {
        return match.split('').map(char => (Math.random() > 0.5 ? '*' : char)).join('');
    };

    return text
        .replace(nameRegex, maskWithRandomStars)
        .replace(addressRegex, maskWithRandomStars)
        .replace(phoneRegex, maskWithRandomStars)
        .replace(emailRegex, maskWithRandomStars);
}