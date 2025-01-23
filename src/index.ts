import * as CryptoJS from 'crypto-js';
import * as md5 from 'md5';

interface EncryptTextProps {
    encrypted: string;
    terms: string[];
}

// Fungsi untuk mengenkripsi teks dengan key tertentu
export function encryptText(text: string, key: string): EncryptTextProps {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    const terms = generateMd5Terms(text);
    return {
        encrypted: encrypted,
        terms: terms
    };
}

// Fungsi untuk mendekripsi teks yang sudah terenkripsi
export function decryptText(encryptedText: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

// Fungsi untuk mencari teks berdasarkan MD5 hash
export function searchTerm(text: string): string {
    return md5(text);
}

/**
 * Generate MD5 hashes for each term in the input string (lowercase).
 * @param input - Input string.
 * @returns Array of lowercase MD5 hashes.
 */
export function generateMd5Terms(input: string): string[] {
    const words = input.split(' '); // Split input by spaces
    return words.map(word =>
        md5(word.toLowerCase()) // Generate MD5 hash for each word
    );
}


/**
 * Mask sensitive data in the input text with random '*'.
 * @param text - Input text containing sensitive data.
 * @returns Text with sensitive data masked.
 */
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