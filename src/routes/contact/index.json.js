import nodemailer from "nodemailer";

let dotenv = require("dotenv").config();
if (dotenv.error){
}
let transporter = nodemailer.createTransport({
	host : "smtp.gmail.com",
	secure: true,
	service: 'gmail', 
	ignoreTLS: true,
	auth: {
		user: `${process.env.GMAIL_ACCOUNT}`,
		pass: `${process.env.GMAIL_PASSWORD}`
	}
});


export function post(req, res, next){
	let sent = true;
	let data = req.body; //Response from the client;
	let mailOptions = {
		from : `"${data.name}" <${data.email}>`,
		to : `lucretiusbiah@protonmail.com`,
		subject: data.subject,
		text: data.message
	};
	transporter.sendMail(mailOptions, (err, info)=>{
		if (err){
			sent = false;
			console.log(err);
		}
	});
	res.writeHead(200, {
		'Content-Type' : 'application/json'
	});
	res.end(JSON.stringify(sent));
}	