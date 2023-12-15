export default {
	__LOG_TAG__: "[ui_breadcrumbs]",
	fetch () {
		var breadcrumbs = "<a style='color:#454545' href='http://ec2-3-98-116-152.ca-central-1.compute.amazonaws.com/app/catlog-page/home-6577356807297c1b13d7f785'>Home</a>";
		var c_uid = appsmith.URL.queryParams['c_uid'];
		var catalogs_path = "";
		var current_url = utils.get_current_url_without_params();

		console.debug(this.__LOG_TAG__, "current_url = ", current_url);

		while(c_uid && c_uid > 0) {
			var cat = data_all_catalogs_hash.find(c_uid);
			if(!cat) {
				throw new Error("Fatal error, the c_uid does not exist! " + c_uid);
			}
			var name = cat.name;
			catalogs_path = " / <a style='color:#5f5f5f' href='"+this.generate_nav_link(current_url, c_uid)+"'>"+name+"</a>" + catalogs_path;
			c_uid = cat.puid;
		}

		catalogs_path = " / <a style='color:#5f5f5f' href='"+current_url+"'>All</a>" + catalogs_path;

		return breadcrumbs + catalogs_path;
	},
	generate_nav_link(url, c_uid) {
		return encodeURI(url + "?c_uid=" + c_uid);
	},
}