import crypto from "crypto";

/**
 * Initalizes the database and creates the necessary tables
 * @param {import("sqlite").Database} db
 */
const init = async (db) => {
	await db.exec(
		`CREATE TABLE IF NOT EXISTS blog_hits (
            ip_hash VARCHAR(100) NOT NULL,
            slug VARCHAR(150) NOT NULL,
            date DATETIME NOT NULL)`
	);
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
	const current_hits = await DB.get("SELECT * FROM blog_hits WHERE slug = (?) AND ip_hash = (?)", [
		slug,
		ip_hash
	]);
	if (!current_hits)
		await DB.run("INSERT INTO blog_hits (ip_hash,slug,date) VALUES(?,?,DATE('now'))", [
			ip_hash,
			slug
		]);

	const hits = await DB.get("SELECT COUNT(*) AS hits FROM blog_hits WHERE slug = ?", [slug]);
	return {
		...hits
	};
};

export default hits;
