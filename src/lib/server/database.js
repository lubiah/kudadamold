import { open } from "sqlite";
import sqlite from "sqlite3";

/**
 * Initializes the sqlite database
 * @returns {Promise<import("sqlite").Database>}}
 */
export const initDB = async () => {
	const driver = sqlite.cached.Database;
	const database = open({
		filename: "database.db",
		driver
	});
	return database;
};
