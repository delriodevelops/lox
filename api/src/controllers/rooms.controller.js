import { pool } from "../database/db.js";
import error from "../messages/errors.js";
import { io } from "../index.js";
const chars = [...Array(10).keys()].concat(
	Array.from(Array(26))
		.map((e, i) => i + 65)
		.map(x => String.fromCharCode(x))
);
export const rooms = {
	create: async (req, res) => {
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
			const { rowCount } = await pool.query(
				`INSERT INTO rooms (room_id,creator_id) SELECT '${room_id}','${creator_id}' WHERE NOT EXISTS (SELECT room_id,creator_id FROM rooms WHERE room_id='${room_id}' OR  creator_id='${creator_id}')`
			);
			if (rowCount > 0)
				return res
					.status(201)
					.json("Sala creada exitosamente");
			else {
				return res
					.status(409)
					.json(
						"Ya existe una sala con ese código o con el mismo creador"
					);
			}
		} catch (e) {
			console.error(error.insert(e));
			return res.status(500).json(error.insert(e));
		}
	},
	join: async (req, res) => {
		const { room_id } = req.body;
		try {
			const { rowCount } = await pool.query(
				`SELECT * FROM rooms WHERE room_id = '${room_id}'`
			);
			if (rowCount === 1) {
			}
		} catch (e) {}
	}
};
