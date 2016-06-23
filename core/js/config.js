class Config {
	constructor(url = 'core/json/properties/default.json') {
		$.get(url, data => { this.toolbox = JSON.parse(data).toolbox; });
	}
}