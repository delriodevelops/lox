"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { rooms } from "../services/rooms";
import { useGlobalContext } from "@/context/globalContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	//CONTEXTS
	const {
		user_id,
		roomIdConnect,
		setRoomIdConnect,
		socket
	} = useGlobalContext();

	//STATES
	const [joinRoomId, setJoinRoomId] = useState("");
	const [loading, setLoading] = useState(false);

	//VARIABLES

	//USEEFFECT
	useEffect(() => {}, []);

	//FUNCIONES
	const createRoom = async () => {
		setLoading(true);
		const body = { creator_id: user_id };
		const { room_id } = await rooms.create(body);
		room_id && setRoomIdConnect(room_id);
		emitJoin(room_id);
		//navigate
		//
		setLoading(false);
	};
	const joinRoom = async e => {
		setLoading(true);
		e.preventDefault();
		const roomExists = await rooms.get(joinRoomId);
		if (roomExists) {
			setRoomIdConnect(joinRoomId);
			emitJoin(joinRoomId);
		}
		//navigate
		//
		setLoading(false);
	};

	const emitJoin = room_id => {
		socket.emit("join_room", {
			user_id,
			room_id
		});
	};

	//RETURN
	return (
		<main className={styles.main}>
			<h1>{user_id}</h1>
			<div>
				<h1>{roomIdConnect}</h1>
				<button
					onClick={createRoom}
					disabled={!!loading}>
					Crear una sala
				</button>
			</div>
			<form onSubmit={joinRoom}>
				<input
					type="text"
					onChange={e => {
						setJoinRoomId(e.target.value);
					}}
					value={joinRoomId}
					maxLength={6}
					minLength={6}
					disabled={!!loading}
				/>
				<br />
				<input
					type="submit"
					value="Conectarse"
					disabled={
						!!loading || joinRoomId.length !== 6
					}
				/>
			</form>
		</main>
	);
}
