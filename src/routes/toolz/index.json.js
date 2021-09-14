import _ from 'lodash';
import tools_list from './_tools.json';

let id = 1;
let tools = tools_list.map((tool) => {
	tool['id'] = id;
	tool['url'] = `/toolz/${_.kebabCase(tool.name)}`;
	id++;
	return tool;
});

const get_info = (tool_name) => {
	let tool = tools.filter((tool) => tool.url === `/toolz/${tool_name}`);
	return tool[0];
};

export async function get(request) {
	let result = new Object();
	let query = request.query;
	result['tools'] = _.orderBy(tools, 'name', 'asc');
	if (query.has('info')) {
		result['info'] = get_info(query.get('info'));
		delete result['tools'];
	}

	return {
		body: {
			...result
		}
	};
}
