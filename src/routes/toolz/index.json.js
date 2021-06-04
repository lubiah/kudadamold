import _ from "lodash";
import tools_list from "./_tools.js";


let result;
let id = 1;
let tools = tools_list.map((tool)=> {
	tool['id'] = id;
	tool['url'] = `/toolz/${tool.name.toLowerCase().replace(/\s+/g,'-')}`;
	id++;
	return tool;
});

const get_info = (url)=>{
	let tool = tools.filter((tool)=> tool.url === `/toolz/${url}`);
	return tool[0];	
}

export function get(req, res, next){
	let query = req.query
	if (! _.isEmpty(query)){

		if (query['info'])
			result = get_info(query['info']);
	}
	else{
		result = _.orderBy(tools, 'name', 'asc');
	}
	res.writeHead(200, {
		"Context-Type" : "application/json"
	});
	res.end(JSON.stringify(result));
}
