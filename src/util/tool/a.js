// json生成

const a = "城市房改房或商品房1套,城市房改房或商品房2套及以上,农村住房,城市房改房或商品房和农村自建房均有,农村、城市均无自有住房";
const sge = () => {
	const aa = a.split(",");

	let OldJson = aa.map((item, index) => {
		var newJson = {
			id: index.toString(),
			value: item
		};
		return newJson;
	});
};

sge();
const collegeList = [
	{ id: "0", value: "理工学院" },
	{ id: "1", value: "体育与健康科学学院" },
	{ id: "2", value: "管理学院" },
	{ id: "3", value: "法学院" },
	{ id: "4", value: "艺术与设计学院" },
	{ id: "5", value: "文化与传媒学院" },
	{ id: "6", value: "外国语言文学学院" },
	{ id: "7", value: "商学院" }
];
