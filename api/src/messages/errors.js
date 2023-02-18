const f = "No error provided";
const error = {
	insert: (error = f) => {
		return {
			msg: "Error: No se pudo inertar el recurso",
			error
		};
	},
	get: (error = f) => {
		return {
			msg: "Error: No se pudo encontrar o acceder al recurso",
			error
		};
	}
};

export default error;
