import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  encryptMod: any;

  constructor(private http: HttpClient) {
    this.encryptMod = new JsEncryptModule.JSEncrypt();
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  getLocalIPv4() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        window.RTCPeerConnection = window.RTCPeerConnection;
        let pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
        pc.createDataChannel(''); // create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
        pc.onicecandidate = function (ice) {
          if (ice && ice.candidate && ice.candidate.candidate) {
            const candidate = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate);
            if (candidate) {
              let myIP = candidate[1];
              pc.onicecandidate = noop;
              resolve({ IPv4: myIP });
            }
          }
        };
        
      },
        err => {
          reject(err);
        });
    });
  }

  encryptRSA(plainText: string) {
    let publicKey = '';
    let cypherText = '';
    this.encryptMod.setPublicKey(publicKey);
    cypherText = this.encryptMod.encrypt(plainText);
    return cypherText;
  }

  decryptRSA(cypherText: string) {
    let plainText = '';
    let privateKey = '';
    this.encryptMod.setPrivateKey(privateKey);
    plainText = this.encryptMod.decrypt(cypherText);
    return plainText;
  }

  encryptAES(plainText: string, key: string, iv: string): string {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Utf8.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(plainText, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  decryptAES(cipher: string, key: string, iv: string): string {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Utf8.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(cipher, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
