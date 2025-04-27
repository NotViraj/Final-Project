// Cd3.js — Encrypt and Decrypt Engine

class AdvancedCipher {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.alphabet = this.generateAlphabet();
        this.substitutionTable = this.generateSubstitutionTable();
    }

    generateAlphabet() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~ ';
        let arr = chars.split('');
        let seed = this.hash(this.secretKey);
        for (let i = arr.length - 1; i > 0; i--) {
            let j = seed % (i + 1);
            [arr[i], arr[j]] = [arr[j], arr[i]];
            seed = (seed * 9301 + 49297) % 233280;
        }
        return arr.join('');
    }

    generateSubstitutionTable() {
        const table = {};
        const originalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~ ';
        for (let i = 0; i < originalChars.length; i++) {
            table[originalChars[i]] = this.alphabet[i];
        }
        return table;
    }

    hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    substitute(text) {
        let result = '';
        for (let char of text) {
            result += this.substitutionTable[char] || char;
        }
        return result;
    }

    transpose(text) {
        return text.split('').reverse().join('');
    }

    encrypt(plainText) {
        let step1 = this.substitute(plainText);
        let step2 = this.transpose(step1);
        let step3 = this.substitute(step2);
        return step3;
    }

    decrypt(cipherText) {
        let step1 = this.inverseSubstitute(cipherText);
        let step2 = this.transpose(step1);
        let step3 = this.inverseSubstitute(step2);
        return step3;
    }

    inverseSubstitute(text) {
        const inverseTable = {};
        for (let key in this.substitutionTable) {
            inverseTable[this.substitutionTable[key]] = key;
        }
        let result = '';
        for (let char of text) {
            result += inverseTable[char] || char;
        }
        return result;
    }
}

// ----- Hook up the page to the cipher -----

// Initialize cipher with a SECRET key
const cipher = new AdvancedCipher("MySuperSecretKey123!");

const encodeInput = document.getElementById("encodeInput");
const encodedOutput = document.getElementById("encodedOutput");
const decodeInput = document.getElementById("decodeInput");
const decodedOutput = document.getElementById("decodedOutput");

// Auto-encode when typing
encodeInput.addEventListener('input', () => {
    const plainText = encodeInput.value;
    const cipherText = cipher.encrypt(plainText);
    encodedOutput.value = cipherText;
});

// Auto-decode when typing
decodeInput.addEventListener('input', () => {
    const cipherText = decodeInput.value;
    const plainText = cipher.decrypt(cipherText);
    decodedOutput.value = plainText;
});