const crypto = require('crypto');

function encryptAES(plainText, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptAES(cipherText, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
  let decrypted = decipher.update(cipherText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encryptAES, decryptAES };
