// Cd5.js — GOD TIER Multi-Phase Recursive Encryption System

class GodTierCipher {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~ ';
        this.rounds = this.getRounds();
    }

    getRounds() {
        // Number of rounds = (sum of char codes % 5) + 5 => 5 to 9 rounds
        let sum = 0;
        for (let char of this.secretKey) {
            sum += char.charCodeAt(0);
        }
        return (sum % 5) + 5;
    }

    simpleShift(text, amount) {
        return text.split('').map(c => {
            const idx = this.alphabet.indexOf(c);
            if (idx === -1) return c;
            return this.alphabet[(idx + amount) % this.alphabet.length];
        }).join('');
    }

    complexScramble(text) {
        const arr = text.split('');
        const seed = this.hash(this.secretKey);
        for (let i = 0; i < arr.length; i++) {
            const j = (i * seed) % arr.length;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    complexUnscramble(text) {
        const arr = text.split('');
        const seed = this.hash(this.secretKey);
        // reverse the scrambling
        for (let i = arr.length - 1; i >= 0; i--) {
            const j = (i * seed) % arr.length;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    transpose(text) {
        return text.split('').reverse().join('');
    }

    encrypt(plainText) {
        let output = plainText;
        for (let i = 0; i < this.rounds; i++) {
            output = this.simpleShift(output, 3 + (i % 5)); // Simple Caesar shift with variation
            output = this.complexScramble(output);
            output = this.transpose(output);
        }
        return output;
    }

    decrypt(cipherText) {
        let output = cipherText;
        for (let i = this.rounds - 1; i >= 0; i--) {
            output = this.transpose(output);
            output = this.complexUnscramble(output);
            output = this.simpleShift(output, this.alphabet.length - (3 + (i % 5))); // Reverse Caesar shift
        }
        return output;
    }
}

// ----- Hook up the page to the cipher -----

const cipher = new GodTierCipher("UNBREAKABLEKey789!");

const encodeInput = document.getElementById("encodeInput");
const encodedOutput = document.getElementById("encodedOutput");
const decodeInput = document.getElementById("decodeInput");
const decodedOutput = document.getElementById("decodedOutput");

// Auto-encode
encodeInput.addEventListener('input', () => {
    const plainText = encodeInput.value;
    const cipherText = cipher.encrypt(plainText);
    encodedOutput.value = cipherText;
});

// Auto-decode
decodeInput.addEventListener('input', () => {
    const cipherText = decodeInput.value;
    const plainText = cipher.decrypt(cipherText);
    decodedOutput.value = plainText;
});