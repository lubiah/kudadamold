/**
 * Initializes the sqlite database
 * @returns {Promise<import("sqlite").Database>}}
 */
export const initDB = async () => {
	const driver = (await import("sqlite3")).cached.Database;
	const open = (await import("sqlite")).open;
	const database = open({
		filename: "database.db",
		driver
	});
	return database;
};
