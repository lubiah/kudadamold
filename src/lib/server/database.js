import mysql from "mysql2/promise";
import { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } from "$env/static/private";
import { dev } from "$app/environment";

export const initDB = async () => {
	try {
		const DB = mysql.createPool({
			host: dev ? "localhost" : "kudadam.com",
			user: MYSQL_USERNAME,
			password: MYSQL_PASSWORD,
			database: MYSQL_DATABASE
		});
		await DB.getConnection();
		return DB;
	} catch (error) {
		return error;
	}
};
