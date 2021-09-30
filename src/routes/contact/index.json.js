import nodemailer from 'nodemailer';
import sib_api from "sib-api-v3-sdk";
import dotenv from "dotenv";



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
	let name = request.body.name.trim();
	let user = new Object();
	user.date_joined = new Date();
	user.email = request.body.email;
	if (name.split(" ").length > 1){
		user.first_name = name.split(" ")[0];
		user.last_name = name.split(" ")[name.split(" ").length - 1];
	}
	console.log(process.env.VITE_SIB_API_KEY);
	let client  =sib_api.ApiClient.instance;
	let apiKey = client.authentications["api-key"];
	apiKey.apiKey = import.meta.env.VITE_SIB_API_KEY || process.env.VITE_SIB_API_KEY;
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
	return apiInstance.createDoiContact(contact).then(()=>{
		return true;
	
	})
	.catch(err=>{
		return false;
	})
}

export async function post(request) {

	if (request.body.type === "subscribe_user"){
		const result = await addSubscriber(request);
		return {
			body: {"message":result}
	}
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
	
}
