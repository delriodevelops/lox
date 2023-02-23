import { pool } from "../database/db.js";
import error from "../messages/errors.js";

const chars = [...Array(10).keys()].concat(
	Array.from(Array(26))
		.map((e, i) => i + 65)
		.map(x => String.fromCharCode(x))
);
export const rooms = {
	create: async (req, res) => {
		console.log("body", req.body);
		const { creator_id } = req.body;
		let room_id = "";
		for (let i = 0; i < 6; i++) {
			room_id =
				room_id +
				chars[
					Math.floor(
						Math.random() * (chars.length - 1)
					)
				];
		}
		try {
			await pool.query(
				`DELETE FROM rooms WHERE creator_id = '${creator_id}'; INSERT INTO rooms (room_id,creator_id) SELECT '${room_id}','${creator_id}' WHERE NOT EXISTS (SELECT room_id,creator_id FROM rooms WHERE room_id='${room_id}' OR  creator_id='${creator_id}')`
			);
			return res.status(201).json({ room_id });
		} catch (e) {
			console.error(error.insert(e));
			return res.status(500).json(error.insert(e));
		}
	},
	get: async (req, res) => {
		const { room_id } = req.params;
		try {
			const { rowCount } = await pool.query(
				`SELECT * FROM rooms WHERE room_id = '${room_id}'`
			);

			!!rowCount
				? res.status(200).json(true)
				: res.status(404).json(false);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
};
