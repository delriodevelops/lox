import { pool } from "../database/db.js";
import error from "../messages/errors.js";

export const getPreguntas = async (req, res) => {
	const { tabla } = req.params;
	try {
		const { rows: preguntas } = await pool.query(
			`SELECT * FROM ${tabla} ORDER BY id`
		);
		return await res.status(200).json(preguntas);
	} catch (e) {
		console.log(error.insert(e));
		return res.status(500).json(error.insert(e));
	}
};
export const postPregunta = async (req, res) => {
	const { tabla } = await req.params;
	const { body } = req;
	try {
		//primer loop que recorre el array de la peticion compuesto este por objetos que posteriormente seran recorridos en otro forEach
		await body.forEach(async element => {
			//Traemos el valor key del body del objeto equivalente al nombre de la columna en la base de datos
			let keys = Object.keys(element);
			//Inicialización de los strings a los que se van a ir añadiendo la query
			let cols = "";
			let values = "";
			//Segundo loop: recorre cada objeto que viene en el array de la petición.
			//loop para hacer inserciones en cualquier tipo de tabla sin importar el orden de las columnas ni la cantidad
			keys.forEach((key, i) => {
				//string de las columnas que se insertan
				//Evalua la longitud para añadir o no la coma para que no de error en la query de la inserción
				cols =
					cols +
					`${key} ${
						i !== keys.length - 1 ? "," : ""
					}`;
				//string de los valores que se insertan
				//Evalua la longitud para añadir o no la coma para que no de error en la query de la inserción
				values =
					values +
					`'${element[key]}' ${
						i !== keys.length - 1 ? "," : ""
					}`;
			});
			//una vez construida la petición, ejecutamos un try catch para devolver algo siempre y que no pete
			try {
				//inserción
				const { rows } = await pool.query(
					`INSERT INTO ${tabla} (${cols}) VALUES (${values})`
				);
				//hacemos un log para poder recibir algo de feedback de la inserción
				console.log("INSERCION", rows);
			} catch (e) {
				//en caso de fallo, hacemos un log del error
				console.error(error.insert(e));
			}
		});
		//Una vez se han insertado todas las preguntas traemos un mensaje informando de que se han insertado todas exitosamente
		return await res
			.status(200)
			.json("Pregunta/s insertada/s con exito");
	} catch (e) {
		console.error(e);
		return res.status(500).json(error.insert(e));
	}
};
