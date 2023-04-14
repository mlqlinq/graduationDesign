import CryptoJS from "crypto-js";
// 此处key为16进制
let key: any = "385f33cb91484b04a177828829081ab7";
// key格式化处理
key = CryptoJS.enc.Utf8.parse(key);

// 解密
export const decrypt = function (data) {
	// 解密方法
	const decryptedContent = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(data), key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decryptedContent);
};

// 加密
export const encryptData = function (data) {
	if (typeof data === "object") {
		try {
			data = JSON.stringify(data);
		} catch (error) {
			console.log("encrypt error:", error);
		}
	}
	// // key格式化处理
	// key = CryptoJS.enc.Utf8.parse(key);
	// 加密方法
	const encryptedContent = CryptoJS.AES.encrypt(data, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encryptedContent.ciphertext.toString();
};
