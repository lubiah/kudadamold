import mysql from "mysql";

export const initDB = ()=>{
	const db = mysql.createConnection({
		host: "localhost",
		user: import.meta.env.VITE_DB_USER,
		password: import.meta.env.VITE_DB_PASSWORD,
		database: "eakloeor_kudadam"
	});
	db.connect(err=>{
		if (err)
			return false;
	});
	return { db };
}

