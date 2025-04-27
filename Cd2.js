function shiftText(text, shift) {
      return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
          return String.fromCharCode((char.charCodeAt(0) - 97 + shift + 26) % 26 + 97);
        } else if (char >= 'A' && char <= 'Z') {
          return String.fromCharCode((char.charCodeAt(0) - 65 + shift + 26) % 26 + 65);
        } else {
          return char;
        }
      }).join('');
    }

    document.getElementById('encodeInput').addEventListener('input', function() {
      const input = this.value;
      const encoded = shiftText(input, 7);
      document.getElementById('encodedOutput').value = encoded;
    });

    document.getElementById('decodeInput').addEventListener('input', function() {
      const input = this.value;
      const decoded = shiftText(input, -7);
      document.getElementById('decodedOutput').value = decoded;
    });