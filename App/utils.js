const crypto = require('crypto');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid'); 
const fs = require("fs");
const path = require("path");
const { Storage } = require('@google-cloud/storage');

function generateToken() {
  return btoa(uuidv4());
}

function encryptAES(plainText) {
  const key = Buffer.from('1f8b8d4c72b42f08f4ad5a9e2b2a3c12', 'utf-8');
  const iv = Buffer.from('8a1b2c3d4e5f6g7h', 'utf-8');

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'base64'); 
  encrypted += cipher.final('base64'); 
  return encrypted;
}

function decryptAES(cipherText) {
  const key = Buffer.from('1f8b8d4c72b42f08f4ad5a9e2b2a3c12', 'utf-8');
  const iv = Buffer.from('8a1b2c3d4e5f6g7h', 'utf-8');

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(cipherText, 'base64', 'utf8'); 
  decrypted += decipher.final('utf8');
  return decrypted;
}

function extractValidString(input) {
  const match = input.match(/==\x00/);
  if (match)
      return input.substring(0, match.index + 2);
  return input; 
}

function logErrorToFile(error) {
  const logFilePath = path.join(__dirname, "error-log.txt");
  const errorMessage = `[${new Date().toISOString()}] ${error}\n\n`;

  fs.appendFile(logFilePath, errorMessage, (err) => {
    if (err) console.error("Error al escribir en el archivo:", err);
  });
}

const storage = new Storage({
    keyFilename: path.join(__dirname, process.env.GCP_JSON), // GCP JSON Credentials route
});

const bucketName = 'partner_portal_bucket';

async function uploadBase64File(base64Data, fileName, mimeType) {
    try {
        const buffer = Buffer.from(base64Data, 'base64');
        const file = storage.bucket(bucketName).file(fileName);
        
        await file.save(buffer, {
            metadata: { contentType: mimeType },
        });

        await file.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        return publicUrl;
    } catch (error) {
        console.error('Error al subir archivo:', error);
        throw error;
    }
}

module.exports = { encryptAES, decryptAES, generateToken, extractValidString, logErrorToFile, uploadBase64File };
