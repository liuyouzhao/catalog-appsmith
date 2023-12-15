export default {
	refresh () {
		return data_all_catalogs_tree.catalogs_menu_tree_roots;
	},
	on_option_change(selected_value) {
		var selected_catalog_uid = selected_value;
		var url_selected_catalog = utils.get_current_url_with_c_uid(selected_catalog_uid, selected_catalog_uid);
		navigateTo(url_selected_catalog);
	}
}