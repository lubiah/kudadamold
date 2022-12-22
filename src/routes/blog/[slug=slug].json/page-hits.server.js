import crypto from "crypto";

/**
 * Initalizes the database and creates the necessary tables
 * @param {import("mysql2/promise").Pool} db
 */
const init = (db) => {
	return new Promise((resolve, reject) => {
		db.execute(
			`CREATE TABLE IF NOT EXISTS blog_hits (
            id INT PRIMARY KEY AUTO_INCREMENT,
            ip_hash VARCHAR(100) NOT NULL,
            slug VARCHAR(150) NOT NULL,
            date DATETIME NOT NULL
        );`
		)
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

/**
 * Takes an I.P address and returns the
 * hash of it
 * @param {string} ip
 * @returns {string} hex of the hash
 */
const hashIP = (ip) => {
	const hash = crypto.createHash("md5");
	hash.update(ip);
	return hash.digest("hex");
};

/** Takes an ip address and checks whether the user has read the page or not
 * @param {string} ip_address
 * @param {string} slug
 */
const hits = async (ip_address, slug) => {
	const DB = await (await import("$lib/server/database")).initDB();
	const ip_hash = hashIP(ip_address);

	await init(DB);
	const [results] = await DB.query("SELECT * FROM blog_hits WHERE slug = ? AND ip_hash = ?", [
		slug,
		ip_hash
	]);
	const results_length = Object.keys(results).length;

	if (results_length === 0) {
		DB.execute("INSERT INTO blog_hits (ip_hash,slug,date) VALUES(?,?,NOW())", [ip_hash, slug]);
	}

	const [rows] = await DB.query("SELECT COUNT(*) AS hits FROM blog_hits WHERE slug = ?", [slug]);
	// @ts-ignore
	const { hits } = rows[0];
	const connection = await DB.getConnection();
	connection.release();
	return {
		hits
	};
};

export default hits;
