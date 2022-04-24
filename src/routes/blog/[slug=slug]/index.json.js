import sqlite from "better-sqlite3"; //we import the sqlite module

const db = new sqlite("./database.db"); //This command will create the database for us if it does not exist 
let statement = db.prepare(`
CREATE TABLE IF NOT EXISTS blog	 (
	slug VARCHAR(255) UNIQUE NOT NULL,
	hits INT DEFAULT 1 NOT NULL
)
`);
let transaction = db.transaction(()=>{return statement.run()});
transaction();

const increseHitCounts = async (slug,hits)=>{
	return new Promise((resolve, reject)=>{
		try {
			let statement = db.prepare("UPDATE blog SET hits = ? WHERE slug = ?");
			const transaction = db.transaction(slug => {
				return statement.run(hits+1,slug);
			});
			let info = transaction(slug);
			resolve(info)
			
		} catch (error) {
			reject(error)
		}

	
	})
}

const getHitCounts = async (slug)=>{
	return new Promise((resolve, reject)=>{
		let statement = db.prepare("SELECT * FROM blog WHERE slug = ?");
		let transaction = db.transaction(slug=>{
			return statement.get(slug)
		});
		let { hits } = transaction(slug);
		
		if (!hits){
			let statement = db.prepare("INSERT INTO blog (slug) VALUES (?)");
			let transaction = db.transaction(slug=>{
				return statement.run(slug,1);
			let info = transaction(slug);
			if (info.changes > 1){
				resolve({slug:slug, hits: 1})
			}
			})
		}
		resolve(transaction(slug));
	})
}



export const get = async ({ params })=>{
	const slug = params.slug;
	const results = new Object();
	let hitsCount = await getHitCounts(slug);

	results["hits"] = hitsCount.hits;
	results["slug"] = hitsCount.slug;

		
	return {
		body: results
	}
}

export const post = async ({ params, request })=>{
	const body = await request.json();
	const slug = params.slug;

	if (body.hits){
		const { hits } = await getHitCounts(slug);
		let increment = await increseHitCounts(slug, hits);
		return {
			body: {"success": "true"}
		}
	
	}
}