const crypto = require('crypto');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid'); 


function generateToken() {
  return btoa(uuidv4());
}

function encryptAES(plainText) {
  const key = Buffer.from(process.env.AES_KEY, 'utf-8');
  const iv = Buffer.from(process.env.AES_IV, 'utf-8');

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'base64'); 
  encrypted += cipher.final('base64'); 
  return encrypted;
}

function decryptAES(cipherText) {
  const key = Buffer.from(process.env.AES_KEY, 'utf-8');
  const iv = Buffer.from(process.env.AES_IV, 'utf-8');

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(cipherText, 'base64', 'utf8'); 
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encryptAES, decryptAES, generateToken };
