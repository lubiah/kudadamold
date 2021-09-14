import nodemailer from 'nodemailer';

const GMAIL_ACCOUNT = import.meta.env.VITE_GMAIL_ACCOUNT;
const GMAIL_PASSWORD = import.meta.env.VITE_GMAIL_PASSWORD;

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	secure: true,
	service: 'gmail',
	ignoreTLS: true,
	auth: {
		user: `${GMAIL_ACCOUNT}`,
		pass: `${GMAIL_PASSWORD}`
	}
});

export async function post(request) {
	let sent = true;
	let data = request.body; //Response from the client;
	let mailOptions = {
		from: `"${data.name}" <${data.email}>`,
		to: `lucretiusbiah@protonmail.com`,
		subject: data.subject,
		text: data.message
	};
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			sent = false;
			console.log(err);
		}
	});
	return {
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			sent: sent
		}
	};
}
