import sqlite from "sqlite3";

const db = new sqlite.Database("./database.db", err=>{});

db.serialize(()=>{
	db.run(`
	CREATE TABLE IF NOT EXISTS blog	 (
		slug VARCHAR(255) UNIQUE NOT NULL,
		read_times INT DEFAULT 1 NOT NULL,
		shares INT DEFAULT 0
	)
`, (err)=>{})
});


const getData = async (slug)=>{
	return new Promise((resolve, reject)=>{
	db.serialize(()=>{
		db.get('SELECT * FROM blog WHERE slug = ?',slug, async (err, rows)=>{
			if (err){
				reject(err)
			}
			else{
				if (rows === undefined){
					let insert =  new Promise((resolve,reject)=>{
						db.run("INSERT INTO blog (slug) VALUES (?)",slug, (err,data)=>{
							if (err) reject(err)
							else resolve({read_times: 1, likes: 0,shares: 0});
						})
					});
					try{
						let data = await insert;
						resolve(data);	
					}
					catch(err){
						reject(err)
					}
					
				}
				else{
					let times_read = rows.read_times;
					db.run("UPDATE blog SET read_times = ? WHERE slug = ?",times_read+1,slug,(err,data)=>{})
					resolve(rows);
				}
			}
			
		})
	});
	})
}

export const get = async ({ params, query})=>{
	try {
	let results = new Object();
	let { slug } = params;
	let data = await getData(slug);
	results['data'] = data;
	return {
		headers: {
			"Cache-Control": "no-cache"
		},
		body: JSON.stringify(results)
	}
	}
	catch(err){
		console.log(err);
		return {
			body: JSON.stringify(false)
		}
	}
}