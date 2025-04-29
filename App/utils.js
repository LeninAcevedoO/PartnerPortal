const crypto = require("crypto");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const { exec } = require("child_process");
const { promisify } = require("util");
const { randomUUID } = require("crypto");

function generateToken() {
  return btoa(uuidv4());
}

function encryptAES(plainText) {
  const key = Buffer.from("1f8b8d4c72b42f08f4ad5a9e2b2a3c12", "utf-8");
  const iv = Buffer.from("8a1b2c3d4e5f6g7h", "utf-8");

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

function decryptAES(cipherText) {
  const key = Buffer.from("1f8b8d4c72b42f08f4ad5a9e2b2a3c12", "utf-8");
  const iv = Buffer.from("8a1b2c3d4e5f6g7h", "utf-8");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(cipherText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function extractValidString(input) {
  const match = input.match(/==\x00/);
  if (match) return input.substring(0, match.index + 2);
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
  keyFilename: process.env.GCP_JSON,
});

const bucketName = "partner_portal_bucket";

async function uploadBase64File(base64Data, fileName, mimeType) {
  try {
    const buffer = Buffer.from(base64Data, "base64");
    const file = storage.bucket(bucketName).file(fileName);

    await file.save(buffer, {
      metadata: { contentType: mimeType },
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error("Error al subir archivo:", error);
    throw error;
  }
}

const execAsync = promisify(exec);

async function convertBase64ToMp4(base64Video, inputExt = "webm") {
  // Limpiar encabezado, si lo hay
  const cleanedBase64 = base64Video.replace(/^data:video\/\w+;base64,/, "");

  // Rutas temporales
  const inputPath = path.join(__dirname, `temp_input.${inputExt}`);
  const outputPath = path.join(__dirname, "temp_output.mp4");

  // Guardar archivo temporal de entrada
  fs.writeFileSync(inputPath, Buffer.from(cleanedBase64, "base64"));

  // Comando FFmpeg para convertir a MP4
  const ffmpegCmd = `ffmpeg -y -i "${inputPath}" -c:v libx264 -c:a aac -movflags +faststart "${outputPath}"`;

  try {
    await execAsync(ffmpegCmd);

    // Leer archivo convertido y codificar a base64
    const convertedBuffer = fs.readFileSync(outputPath);
    const base64Converted = convertedBuffer.toString("base64");

    return `data:video/mp4;base64,${base64Converted}`;
  } catch (err) {
    console.error("Error al convertir video con FFmpeg:", err);
    throw new Error("Conversión fallida");
  } finally {
    // Limpieza de archivos temporales
    if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  }
}

async function getPosterFromVideo(videoBase64, second = 1) {
  const tmpId = randomUUID();
  const videoPath = path.join(__dirname, `temp_${tmpId}.mp4`);
  const posterPath = path.join(__dirname, `poster_${tmpId}.jpg`);

  // Quitar encabezado si existe
  const base64Data = videoBase64.replace(/^data:video\/\w+;base64,/, "");

  try {
    // Guardar temporalmente el video
    fs.writeFileSync(videoPath, base64Data, "base64");

    // Extraer miniatura del segundo especificado
    const ssTime = `00:00:${second.toString().padStart(2, "0")}`;
    const cmd = `ffmpeg -y -ss ${ssTime} -i "${videoPath}" -frames:v 1 -q:v 2 "${posterPath}"`;
    await execAsync(cmd);

    // Leer y convertir a base64
    const posterBuffer = fs.readFileSync(posterPath);
    const posterBase64 = `data:image/jpeg;base64,${posterBuffer.toString(
      "base64"
    )}`;

    return posterBase64;
  } catch (error) {
    console.error("Error al extraer poster:", error);
    throw new Error("No se pudo extraer la miniatura del video.");
  } finally {
    // Limpieza
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);
  }
}

module.exports = {
  encryptAES,
  decryptAES,
  generateToken,
  extractValidString,
  logErrorToFile,
  uploadBase64File,
  convertBase64ToMp4,
  getPosterFromVideo,
};
