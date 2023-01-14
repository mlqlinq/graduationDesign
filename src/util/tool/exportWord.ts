import Docxtemplater, { type DXT } from "docxtemplater"; // 这个插件可以通过预先写好的word，excel等文件模板生成对应带数据的文件
import PizZip from "pizzip"; // 这个插件用来创建，读取或编辑.zip的文件（同步的，还有一个插件是jszip，异步的）
import JSZip from "jszip";
import { saveAs } from "file-saver"; // 适合在客户端生成文件的工具，它提供的接口saveAs(blob, "1.docx")将会使用到，方便我们保存文件。
import JSZipUtils from "jszip-utils"; // 与jszip/pizzip一起使用，jszip-utils 提供个一getBinaryContent(path, data)接口，path即是文件的路径，支持AJAX get请求，data为读取的文件内容。
import ImageModule from "docxtemplater-image-module-free"; // 需要导出图片的话需要这个插件

export const dataURLToBase64 = async (url: any) => {
	// const urlData = await new Promise<void>((resolve, reject) => {
	// 判断下传入的地址是不是已经是base64
	const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
	if (base64Regex.test(url)) {
		return url;
	}

	const Img = new Image();
	let dataURL: any = "";
	Img.setAttribute("crossOrigin", "Anonymous");
	// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
	Img.src = url + "?v=" + Math.random();
	Img.onload = () => {
		// 要先确保图片完整获取到，这是个异步事件
		const canvas: any = document.createElement("canvas"); // 创建canvas元素
		const width = Img.width; // 确保canvas的尺寸和图片一样
		const height = Img.height;
		canvas.width = width;
		canvas.height = height;

		canvas.getContext("2d").drawImage(Img, 0, 0, width, height); // 将图片绘制到canvas中
		dataURL = canvas.toDataURL("image/jpeg"); // 转换图片为dataURL
		console.log("🚀 ~ file: exportWord.ts:31 ~ //urlData ~ dataURL", dataURL);
		// 		resolve(dataURL);
	};
	// });

	return dataURL;
};
export const blob: any = ref(null);

export const exportWord = (configData: { file: string; filename: string; fileType: string; folder: string; data: {} }) => {
	// 批量下载生成压缩包
	const Zip = new JSZip();

	if (Array.isArray(configData.data)) {
		// eslint-disable-next-line array-callback-return
		configData.data.map((item, index) => {
			// 读取并获得模板文件的二进制内容
			JSZipUtils.getBinaryContent(configData.file, async (error: any, content: PizZip.LoadData) => {
				// input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
				// 抛出异常
				if (error) {
					throw error;
				}

				// 图片处理
				let opts: any = {};
				opts.centered = true; // 图片居中
				opts.getImage = async (tagValue: any, tagName: any) => {
					return await new Promise<void>((resolve, reject) => {
						JSZipUtils.getBinaryContent(tagValue, (error: any, content: void | PromiseLike<void>) => {
							if (error) {
								return reject(error);
							}
							return resolve(content);
						});
					});
				};

				opts.getSize = () => {
					return [400, 200];
				};

				let imageModule = new ImageModule(opts);
				// 创建一个JSZip实例，内容为模板的内容
				const zip = new PizZip(content);

				// 创建并加载docxtemplater实例对象
				let doc = new Docxtemplater().loadZip(zip).attachModule(imageModule).compile();
				let word: any = Zip.folder(configData.folder);
				// 设置模板变量的值，对象的键需要和模板上的变量名一致，值就是你要放在模板上的值
				doc.setData({
					...configData.data
				});
				doc.resolveData(item).then(() => {
					doc.render();
					const out = doc.getZip().generate({
						type: "blob",
						mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
					});
					// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
					word.file(`${item.filename ? item.filename : configData.filename + index}.${configData.fileType}`, out);
				});
				console.log("🚀 ~ file: exportWord.ts:84 ~ doc.resolveData ~ word", word);
			});
		});

		setTimeout(() => {
			Zip.generateAsync({ type: "blob" }) // zip下载
				.then((content) => {
					saveAs(content, `${configData.folder}.zip`); // zip下载后的名字
				});
		}, 1000);
	} else {
		// 读取并获得模板文件的二进制内容
		JSZipUtils.getBinaryContent(configData.file, (error: any, content: PizZip.LoadData) => {
			// 抛出异常
			if (error) {
				throw error;
			}

			// 图片处理
			let opts: any = {};
			opts.centered = true; // 图片居中，在word模板中定义方式为{%image}
			opts.getImage = async (tagValue: any, tagName: any) => {
				return await new Promise((resolve, reject) => {
					JSZipUtils.getBinaryContent(tagValue, (error: any, content: unknown) => {
						if (error) {
							return reject(error);
						}
						return resolve(content);
					});
				});
			};
			// 图片宽高
			opts.getSize = () => {
				return [100, 140];
			};

			let imageModule = new ImageModule(opts);

			// 解决数据里出现空值或未定义到的变量为 undifend
			function nullGetter(part: DXT.Part) {
				return "";
			}

			// 创建一个PizZip实例，内容为模板的内容
			const zip = new PizZip(content);
			// 创建并加载docxtemplater实例对象
			let doc = new Docxtemplater()
				.setOptions({
					nullGetter
				})
				.loadZip(zip)
				.attachModule(imageModule)
				.compile();

			// 设置模板变量的值，对象的键需要和模板上的变量名一致，值就是你要放在模板上的值
			doc.setData({
				...configData.data
			});

			// 如果包含异步数据，用resolveData，在回调之后再处理，如果都是同步数据，直接用setData就可以
			doc.resolveData(configData.data).then(() => {
				try {
					// 用模板变量的值替换所有模板变量
					doc.render();

					// 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
					const out = doc.getZip().generate({
						type: "blob",
						mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						// mimeType: "application/octet-stream"
						// mimeType: "text/plain"
					});

					// 将目标文件对象保存为目标类型的文件，并命名
					saveAs(out, `${configData.filename}.${configData.fileType}`); // 导出文件下载
					blob.value = out;
				} catch (error: any) {
					// 抛出异常
					const e = {
						message: error.message,
						name: error.name,
						stack: error.stack,
						properties: error.properties
					};
					console.log(JSON.stringify({ error: e }));
					throw error;
				}
			});
		});
	}
};
