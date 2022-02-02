import sqlite from "sqlite3";

const db = new sqlite.Database("temp.db");
let res = new Promise((resolve, reject)=>{
			db.serialize(()=>{
				db.all("SELECT * FROM blog ORDER BY read_times DESC LIMIT 6", async (err,data)=>{
					if (err) reject(err);
					else
						resolve(data);
				})
			})
		});
console.log(res)
