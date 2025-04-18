import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  encryptMod: any;

  constructor(private http: HttpClient) {}

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
        pc.createDataChannel('');
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);
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

  encryptAES(plainText: string): string {
    const key = CryptoJS.enc.Utf8.parse(environment.aesKey);
    const iv = CryptoJS.enc.Utf8.parse(environment.aesIv);

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  decryptAES(cipherText: string): string {
    const key = CryptoJS.enc.Utf8.parse(environment.aesKey);
    const iv = CryptoJS.enc.Utf8.parse(environment.aesIv);

    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
