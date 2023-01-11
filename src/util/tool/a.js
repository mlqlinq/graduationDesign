// json生成

const a = "理工学院,体育与健康科学学院,管理学院,法学院,艺术与设计学院,文化与传媒学院,外国语言文学学院,商学院";
const sge = () => {
	const aa = a.split(",");

	let OldJson = aa.map((item, index) => {
		var newJson = {
			id: index.toString(),
			value: item
		};
		return newJson;
	});
	console.log("🚀 ~ file: a.js:12 ~ OldJson ~ OldJson", OldJson);
};

sge();
