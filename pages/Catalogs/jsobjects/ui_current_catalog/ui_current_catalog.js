export default {
	get () {
		var c_uid = appsmith.URL.queryParams['c_uid'];
		if(!c_uid) {
			return "All";
		}
		var name = data_all_catalogs_hash.find(appsmith.URL.queryParams['c_uid']).name;
		return name;
	}
}