export const rooms = {
	create: async creator_id => {
		const send = await fetch(
			"http://localhost:3001/api/v1/rooms",
			{
				method: "POST",
				body: JSON.stringify(creator_id),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		const response = await send.json();
		return response;
	},
	get: async room_id => {
		const send = await fetch(
			`http://localhost:3001/api/v1/rooms/${room_id}`
		);
		const response = await send.json();
		return response;
	}
};
