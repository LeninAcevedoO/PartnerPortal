export function validarNumeros(event: KeyboardEvent, value: any): boolean {
  const valorActual = value;

  if (event.key === "Backspace") return true;
  const nuevoValor = valorActual + event.key;
  const patronRegex: RegExp = /^[0-9]\d*$/;
  if (!patronRegex.test(nuevoValor)) {
    event.preventDefault();
    return false;
  }
  return true;
}

export function validarSoloTexto(event: KeyboardEvent, value: any): boolean {
  const valorActual = value;

  if (event.key === "Backspace" || event.key === "tab") return true;
  const nuevoValor = valorActual + event.key;
  const patronRegex: RegExp = /^[a-zA-Z\s]+$/;
  if (!patronRegex.test(nuevoValor)) {
    event.preventDefault();
    return false;
  }
  return true;
}

export function compare(
  a: number | string,
  b: number | string,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function convertBase64toBlob(dataURI: any) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: "image/png" });
  return blob;
}

export function convertFileToDataUri(field: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
}

export function invertHexColor(hex: string): string {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
}

export function getWhiteBlackColor(hex: string): string {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (r > 122 || g > 122 || b > 122) return "black";
  else return "white";
}

export function getMimeTypeFromBase64(base64: string): string | null {
  const match = base64.match(/^data:([a-zA-Z0-9-+/]+);base64,/);
  return match ? match[1] : null;
}

export function getMultimediaType(mimeType: string): number {
  switch (mimeType.split("/")[0]) {
    case "image":
      return 1;
    case "video":
      return 2;
    case "audio":
      return 3;
    default:
      return 4;
  }
}

export function convertBase64ToWebP(base64: string, quality: number = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject('No se pudo obtener el contexto del canvas');
        return;
      }

      ctx.drawImage(img, 0, 0);
      const webpBase64 = canvas.toDataURL('image/webp', quality);
      resolve(webpBase64);
    };
    img.onerror = () => reject('Error cargando la imagen');
    img.src = base64;
  });
}
