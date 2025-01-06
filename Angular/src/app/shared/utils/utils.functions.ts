export function validarNumeros(event: KeyboardEvent, value: any): boolean {
    const valorActual = value;

    if (event.key === 'Backspace')
        return true;
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

    if (event.key === 'Backspace')
        return true;
    const nuevoValor = valorActual + event.key;
    const patronRegex: RegExp = /^[a-zA-Z\s]+$/;
    if (!patronRegex.test(nuevoValor)) {
        event.preventDefault();
        return false;
    }
    return true;
}

export function CurrentMethodName() {
    // const e = new Error('dummy');
    // let stack = e.stack.split('\n')[2].replace(/^\s+at\s+(.+?)\s.+/g, '$1');
    // stack = stack.slice(stack.indexOf('.') + 1, length-1)
    // return (new Error()).stack.match(/at (\S+)/g)[1].slice(3);
}

export function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function convertBase64toBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
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
