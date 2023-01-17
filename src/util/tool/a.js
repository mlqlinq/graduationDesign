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
	console.log("🚀 ~ file: a.js:12 ~ OldJson ~ OldJson", OldJson);
};

sge();
