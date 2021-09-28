import nodemailer from 'nodemailer';
import sib_api from "sib-api-v3-sdk";

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

const addSubscriber = async request =>{
	name = request.body.name.trim();
	user = new Object();
	user.date_joined = new Date();
	user.email = request.body.email;
	if (name.split(" ").length > 1){
		user.first_name = name.split(" ")[0];
		user.last_name = name.split(" ")[name.split(" ").length - 1];
	}

	let client  =sib_api.ApiClient.instance;
	let apiKey = client.authentications["api-key"];
	apiKey.apiKey = import.meta.env.VITE_SIB_API_KEY;
	let apiInstance = new sib_api.ContactsApi();
	let contact = new sib_api.CreateDoiContact();
	contact.email = user.email;
	if (user.first_name) {
		contact.attributes = {
			"FIRSTNAME": user.first_name,
			"LASTNAME" : user.last_name,
			"DATE_JOINED" : user.date_joined,
		}
	}
	else {
	contact.attributes = {
		"FIRSTNAME": name,
		"DATE_JOINED": user.date_joined
	}
	}
	contact.includeListIds = [3];
	contact.redirectionUrl = "https://www.kudadam.com/newsletter/thanks";
	contact.templateId = 7;
	apiInstance.createDoiContact(contact).then(()=>{
		return {
			body: {
				"message":"success"
			}
		}
	
	})
	.catch(err=>{
		console.log(err);
		return {
			body:{
				"message":"error"
			}
		}
	})
}

export async function post(request) {
	switch (request.body.type){
		case "subscribe_user":
			await console.log(await addSubscriber(request));
		break;
	}
	
	// let sent = true;
	// let data = request.body; //Response from the client;
	// let mailOptions = {
	// 	from: `"${data.name}" <${data.email}>`,
	// 	to: `lucretiusbiah@protonmail.com`,
	// 	subject: data.subject,
	// 	text: data.message
	// };
	// transporter.sendMail(mailOptions, (err, info) => {
	// 	if (err) {
	// 		sent = false;
	// 		console.log(err);
	// 	}
	// });
	// return {
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: {
	// 		sent: sent
	// 	}
	// };
	return {
		body: {"a":1}
	}
}
