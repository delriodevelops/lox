"use client";
import {
	createContext,
	useState,
	useContext,
	useEffect
} from "react";
import * as io from "socket.io-client";
import { local } from "../services/local.controller";
const socket = io.connect("http://localhost:3001");

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	useEffect(() => {
		const localUser = local.get("user_id");
		setUser_id(localUser ? localUser : "set");
	}, []);

	const [user_id, setUser_id] = useState();
	const [roomIdConnect, setRoomIdConnect] = useState();

	socket.on("joined_room", string => console.log(string));

	const value = {
		user_id,
		setUser_id,
		roomIdConnect,
		setRoomIdConnect,
		socket
	};
	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	);
};

export function useGlobalContext() {
	const context = useContext(GlobalContext);

	if (!context) {
		console.error("Error deploying App Context!!!");
	}

	return context;
}
