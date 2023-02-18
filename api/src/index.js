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
app.use("/", router);
app.use(cors());

io.on("connection", socket => {
	//aqui van todos los sockets
	console.log("connected de locos");
	socket.on("hoal", creator_id => {});
});

server.listen(PORT, () => {
	return console.log(
		`Server running in port http://localhost:${PORT}`
	);
});
