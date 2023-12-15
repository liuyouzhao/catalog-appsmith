export default {
	refresh () {
		var c_uid = appsmith.URL.queryParams['c_uid'];
		var current_url = utils.get_current_url_without_params();
		var selected_parent = data_all_catalogs_hash.find(c_uid);
		var html = "";

		selected_parent.children.forEach(child_uid => {
			var child = data_all_catalogs_hash.find(child_uid);
			if(child.children.length > 0) {
				html += "<div style='color:black;font-size:20px'>" + child.name + "</div>";
				child.children.forEach(child_child_uid => {
					var child_child = data_all_catalogs_hash.find(child_child_uid);
					html += 
						"<a style='color:#3f3f3f;font-size:14px' href='" + 
						this.generate_nav_link(current_url, child_child.uid) + 
						"'>" + 
						child_child.name + 
						"</a><br>"
				})
			}
			else {
				html += "<a style='color:#3f3f3f;font-size:14px' href='" + 
					this.generate_select_link(current_url, child.uid, child.uid) + "'>" + child.name + "</a><br>";
			}
		});
		return html;
	},
	generate_nav_link(url, c_uid) {
		return encodeURI(url + "?c_uid=" + c_uid);
	},
	generate_select_link(url, c_uid, s_uid) {
		return encodeURI(url + "?c_uid=" + c_uid + "&s_uid=" + s_uid);
	}
}