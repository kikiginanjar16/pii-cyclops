import * as CryptoJS from 'crypto-js';
import * as md5 from 'md5';

interface EncryptTextProps {
    encrypted: string;
    terms: string[];
}

export function encryptText(text: string, key: string): EncryptTextProps {
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

export function decryptText(encryptedText: string, key: string): string {
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
    } catch (error) {
        throw new Error(`Decryption error: ${error.message}`);
    }
}

export function searchTerm(text: string): string {
    if (typeof text !== 'string') {
        return '';
    }
    return md5(text);
}

export function generateMd5Terms(input: string): string[] {
    if (typeof input !== 'string') {
        return [];
    }
    const words = input.split(' ').filter(word => word.trim() !== '');
    return words.map(word => md5(word.toLowerCase()));
}

export function hashText(word: string): string {
    if (typeof word !== 'string') {
        return '';
    }
    return md5(word);
}

export function maskingText(word: string): string {
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

export function maskSensitiveData(text: string): string {
    if (typeof text !== 'string') {
        return '';
    }
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