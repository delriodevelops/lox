import art from "../../utils/ascii.js";
let i = 0;

export default async function logger(req, res, next) {
	const { method, path, mode, credentials, ip, ips } =
		req;

	i++;
	// console.log(art[Math.round(Math.random()*(art.length-1))])

	console.log(`*-*-*-*-*`);
	console.log(`REQUEST ${i}`);
	console.log(`*-*-*-*-*`);

	console.log(method, path, mode, credentials);

	console.log("IPS", ips);
	console.log("IP ADDRESS", ip);

	next();
}
