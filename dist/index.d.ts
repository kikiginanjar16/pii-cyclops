interface EncryptTextProps {
    encrypted: string;
    terms: string[];
}
export declare function encryptText(text: string, key: string): EncryptTextProps;
export declare function decryptText(encryptedText: string, key: string): string;
export declare function searchTerm(text: string): string;
export declare function generateMd5Terms(input: string): string[];
export declare function hashText(word: string): string;
export declare function maskingText(word: string): string;
export declare function maskSensitiveData(text: string): string;
export {};
