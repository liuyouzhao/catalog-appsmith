export default {
	create() {
		var c_uid = appsmith.URL.queryParams['c_uid'];
		if(!c_uid) {
			c_uid = 0;
		}
		var catalog = null;
		if(c_uid > 0) {
			catalog = data_all_catalogs.catalog_hash[c_uid];
		}
		else {
			catalog = data_all_catalogs.find(c_uid);
		}

		return "<div style='display: flex; flex-wrap: wrap;'>" + 
			this.create_all_griditems(catalog) + 
			"</div>";
	},
	create_all_griditems(catalog) {
		var response = "";
		catalog.children.forEach(child_uid => {
			var child = data_all_catalogs.find(child_uid);
			var map = data_catalog_details.details_list['level_' + child.level];
			response += ui_catalog_griditem.create_grid_item(child, map['uid_' + child.uid]);
		});
		return response;
	}
}