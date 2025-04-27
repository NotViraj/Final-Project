function shiftText(text, shift) {
    return text.replace(/[a-zA-Z]/g, function(char) {
      const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
    });
  }

  document.getElementById('encodeInput').addEventListener('input', function() {
    const input = this.value;
    const encoded = shiftText(input, 4);
    document.getElementById('encodedOutput').value = encoded;
  });

  document.getElementById('decodeInput').addEventListener('input', function() {
    const input = this.value;
    const decoded = shiftText(input, -4);
    document.getElementById('decodedOutput').value = decoded;
  });