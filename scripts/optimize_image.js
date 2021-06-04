let domain = /(https?:\/\/)?kudadam.sirv.com.+/;
let quality_check = /\?q=([\d]+)|&q=([\d]+)/;

const check_url = (url)=>{
	if (domain.test(url)){
		if (quality_check.test(url)) {
			let match = url.match(quality_check);
			let value = (match[1] === undefined) ? match[2] : match[1];
			if (parseInt(value) > 15)
				return url.replace(quality_check, "?q=5");
		}
		else {
			if (url.lastIndexOf("?") === -1){
				return `${url}?q=5`;
			}
			else {
				return `${url}&q=5`
			}
		}
	}
	else {
		return url;
	}
}



export default check_url;