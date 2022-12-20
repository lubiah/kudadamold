import mysql from "mysql2/promise";
import { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } from "$env/static/private";

export const initDB = async () => {
	const DB = mysql.createPool({
		host: "localhost",
		user: MYSQL_USERNAME,
		password: MYSQL_PASSWORD,
		database: MYSQL_DATABASE
	});
	await DB.getConnection();
	return DB;
};
