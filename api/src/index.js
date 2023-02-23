import express from "express";
import logger from "./middlewares/logger.js";
import router from "./router/router.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
export const io = new Server(server, { cors: "*" });

app.set("trust proxy", true);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

let conection = 0;
let ola = 0;
io.on("connection", socket => {
	//aqui van todos los sockets
	console.log("connected de locos", ++conection);
	socket.on("join_room", ({ user_id, room_id }) => {
		socket.join(room_id);
		socket.broadcast.emit(
			"joined_room",
			`user ${user_id} joined the room ${room_id}`
		);
		console.log("user", user_id);
		console.log("room", room_id);
	});
});

server.listen(PORT, () => {
	return console.log(
		`Server running in port http://localhost:${PORT}`
	);
});
