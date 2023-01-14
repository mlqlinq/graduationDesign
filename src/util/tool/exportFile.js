import PizZip from "pizzip";
import docxtemplater from "docxtemplater";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

/**
 * 将base64格式的数据转为ArrayBuffer
 * @param {Object} dataURL base64格式的数据
 */
function base64DataURLToArrayBuffer(dataURL) {
	const base64Regex = /^data:image\/(png|jpg|jpeg|svg|svg\+xml);base64,/;
	if (!base64Regex.test(dataURL)) {
		return false;
	}
	const stringBase64 = dataURL.replace(base64Regex, "");
	let binaryString;
	if (typeof window !== "undefined") {
		binaryString = window.atob(stringBase64);
	} else {
		binaryString = new Buffer.from(stringBase64, "base64").toString("binary");
	}
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		const ascii = binaryString.charCodeAt(i);
		bytes[i] = ascii;
	}
	return bytes.buffer;
}

/**
 * 导出word,支持图片
 * @param {Object} tempDocxPath 模板文件路径
 * @param {Object} wordData 导出数据
 * @param {Object} fileName 导出文件名
 * @param {Object} imgSize 自定义图片尺寸
 */
export const exportWord = (tempDocxPath, wordData, fileName, imgSize) => {
	// 这里要引入处理图片的插件
	var ImageModule = require("docxtemplater-image-module-free");

	const expressions = require("angular-expressions");

	// 读取并获得模板文件的二进制内容
	JSZipUtils.getBinaryContent("test.docx", function (error, content) {
		if (error) {
			throw error;
		}

		expressions.filters.size = function (input, width, height) {
			return {
				data: input,
				size: [width, height]
			};
		};

		// function angularParser (tag) {
		//   const expr = expressions.compile(tag.replace(/’/g, "'"));
		//   return {
		//     get (scope) {
		//       return expr(scope);
		//     },
		//   };
		// }

		// 图片处理
		let opts = {};

		opts = {
			// 图像是否居中
			centered: false
		};

		opts.getImage = (chartId) => {
			// console.log(chartId);//base64数据
			// 将base64的数据转为ArrayBuffer
			return base64DataURLToArrayBuffer(chartId);
		};

		opts.getSize = function (img, tagValue, tagName) {
			// console.log(img);//ArrayBuffer数据
			// console.log(tagValue);//base64数据
			// console.log(tagName);//wordData对象的图像属性名
			// 自定义指定图像大小
			if (imgSize.hasOwnProperty(tagName)) {
				return imgSize[tagName];
			} else {
				return [600, 350];
			}
		};

		// 创建一个PizZip实例，内容为模板的内容
		let zip = new PizZip(content);
		// 创建并加载docxtemplater实例对象
		let doc = new docxtemplater();
		doc.attachModule(new ImageModule(opts));
		doc.loadZip(zip);

		doc.setData(wordData);

		try {
			// 用模板变量的值替换所有模板变量
			doc.render();
		} catch (error) {
			// 抛出异常
			let e = {
				message: error.message,
				name: error.name,
				stack: error.stack,
				properties: error.properties
			};
			console.log(
				JSON.stringify({
					error: e
				})
			);
			throw error;
		}

		// 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
		let out = doc.getZip().generate({
			type: "blob",
			mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		});
		// 将目标文件对象保存为目标类型的文件，并命名
		saveAs(out, fileName);
	});
};
