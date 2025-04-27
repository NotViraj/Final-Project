// Cd4.js — Dynamic Matrix Cipher (Completely Different from Cd3.js)

class DynamicMatrixCipher {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.matrixSize = this.getMatrixSize();
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~ ';
    }

    getMatrixSize() {
        let hash = 0;
        for (let char of this.secretKey) {
            hash += char.charCodeAt(0);
        }
        let size = (hash % 10) + 5; // Matrix size between 5x5 and 14x14
        return size;
    }

    generateMatrix(text) {
        const paddedText = this.padText(text);
        let matrix = [];
        for (let i = 0; i < paddedText.length; i += this.matrixSize) {
            matrix.push(paddedText.slice(i, i + this.matrixSize).split(''));
        }
        return matrix;
    }

    padText(text) {
        const padLength = (this.matrixSize - (text.length % this.matrixSize)) % this.matrixSize;
        const padding = Array.from({ length: padLength }, () => this.randomChar()).join('');
        return text + padding;
    }

    randomChar() {
        return this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    }

    shiftMatrix(matrix) {
        // Row-wise shift based on row index
        for (let i = 0; i < matrix.length; i++) {
            const shift = (i + this.secretKey.length) % this.matrixSize;
            matrix[i] = this.shiftArray(matrix[i], shift);
        }
        return matrix;
    }

    shiftArray(arr, shift) {
        return arr.slice(shift).concat(arr.slice(0, shift));
    }

    flattenMatrix(matrix) {
        return matrix.flat().join('');
    }

    encrypt(plainText) {
        let matrix = this.generateMatrix(plainText);
        matrix = this.shiftMatrix(matrix);
        return this.flattenMatrix(matrix);
    }

    decrypt(cipherText) {
        let matrix = [];
        for (let i = 0; i < cipherText.length; i += this.matrixSize) {
            matrix.push(cipherText.slice(i, i + this.matrixSize).split(''));
        }

        // Reverse shift
        for (let i = 0; i < matrix.length; i++) {
            const shift = (i + this.secretKey.length) % this.matrixSize;
            matrix[i] = this.shiftArray(matrix[i], matrix[i].length - shift);
        }

        return this.flattenMatrix(matrix).trim();
    }
}

// ----- Hook up the page to the cipher -----

const cipher = new DynamicMatrixCipher("AnotherSuperSecret456!");

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