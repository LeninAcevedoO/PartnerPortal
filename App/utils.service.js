const crypto = require('crypto');
require('dotenv').config();

function encryptAES(plainText) {
  const key = Buffer.from(process.env.AES_KEY, 'utf-8');
  const iv = Buffer.from(process.env.AES_IV, 'utf-8');

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptAES(cipherText) {
  const key = Buffer.from(process.env.AES_KEY, 'utf-8');
  const iv = Buffer.from(process.env.AES_IV, 'utf-8');

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(cipherText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function generarSessionToken() {
  const uuid = uuidv4();
  const hash = crypto.createHash('sha256').update(uuid).digest('hex');
  return hash;
}

module.exports = { encryptAES, decryptAES, generarSessionToken };
