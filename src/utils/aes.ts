import CryptoJS from 'crypto-js'


export default {

    encrypt(str:string, keyString?:string) {
        if(!keyString) {
            return str
        }
        var key = CryptoJS.enc.Utf8.parse(keyString)
        var strs = CryptoJS.enc.Utf8.parse(str)
        var encrypted = CryptoJS.AES.encrypt(strs, key, 
            { 
                mode: CryptoJS.mode.OFB, 
                padding: CryptoJS.pad.Pkcs7, 
                iv: CryptoJS.enc.Utf8.parse('pikpak'),
                blockSize: 8
            })
        return encrypted.toString()
    },

    decrypt(encrypted:string, keyString?:string) {
        if(!keyString) {
            return encrypted
        }
        var key = CryptoJS.enc.Utf8.parse(keyString)
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, 
            { 
                mode: CryptoJS.mode.OFB, 
                padding: CryptoJS.pad.Pkcs7, 
                iv: CryptoJS.enc.Utf8.parse('pikpak'),
                blockSize: 8
            })
        return CryptoJS.enc.Utf8.stringify(decrypted).toString()
    }
}