"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import * as io from "socket.io-client";
import { useEffect } from "react";
const socket = io.connect("http://localhost:3001");
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	useEffect(() => {
		console.log("aaaaa");
	}, []);
	function clickHandler() {
		socket.emit("hoal", {
			creator_id: "yoooop"
		});
		console.log("click");
	}
	return (
		<main className={styles.main}>
			<h1>Hoal</h1>
			<button onClick={clickHandler}>HOa</button>
		</main>
	);
}
