export const post = async (request)=>{
	const body = request.body;

	switch (body.type){

		case "ADD_SUBSCRIBER":
			let bodyRequest = {
				email : body.email,
				metadata : {
					name : body.name,
					date_joined: new Date().toDateString(),
					time_joined: new Date().toTimeString()
				}
			}

			const request = await fetch("https://api.buttondown.email/v1/subscribers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Token ${import.meta.env.VITE_BUTTONDOWN_API}`
				},
				body: JSON.stringify(bodyRequest)	
			});
			let response = await request.json();
			let responseText = response[0];
			console.log(responseText)
			if (/has not confirmed their email/gmi.test(responseText)){
				
			}

			else if (/is already subscribed/gmi.test(responseText)){
				let responseToClient = "IS_ALREADY_SUBSCRIBED";

				return {
					body: JSON.stringify(responseToClient)
				}
			}
	}
}