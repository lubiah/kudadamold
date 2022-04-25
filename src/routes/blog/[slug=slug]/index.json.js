import sqlite from "sqlite3";

const db = new sqlite.Database("./database.db", err=>{}); //This command will create the database for us if it does not exist 

db.serialize(()=>{
	db.run(`
	CREATE TABLE IF NOT EXISTS blog	 (
		slug VARCHAR(255) UNIQUE NOT NULL,
		hits INT DEFAULT 1 NOT NULL
	)
`, (err)=>{})
});
//Then over here we create our table which will store the hit counts

const getHitsCount = async slug => {
	return new Promise((resolve, reject)=>{
		db.serialize(()=>{
			db.get("SELECT * FROM blog WHERE slug = ?", slug, (err,data)=>{
				if (err)
					reject(err)
				else
					resolve(data)
			})
		})
	})
}

const increaseHitsCount = async (slug, hits)=>{
	return new Promise((resolve, reject)=>{
		db.serialize(()=>{
			if (hits === undefined){
					db.run("INSERT INTO blog (slug, hits) VALUES (?,?) ",[slug,1], (err,data)=>{
						if (err)
							reject(err)
						else
							resolve(data)
					})
			}
			else {
				db.run("UPDATE blog SET hits = ? WHERE slug = ?",hits +1, slug, (err, data)=>{
					if (err)
						resolve(err)
					else
						resolve(data)
				})
			}
		})
	})
}

export const get = async ( { params })=>{
	let results = new Object();
	let { slug } = params;
	let hits = await getHitsCount(slug);
	let hits_data = (hits === undefined ? 1: hits.hits);
	results["slug"] = slug;
	results["hits"] = hits_data;
	return {
		body: results
	}
}

export const post = async ( { request, params })=>{
	const body = await request.json();
	const slug =  params.slug;

	if (body.hits){
		let hits = await getHitsCount(slug);
		let hits_data = hits === undefined ? undefined : hits.hits;
		let increment = increaseHitsCount(slug, hits_data);
	}
	return {
		body: {"success":true}
	}
}