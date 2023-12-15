export default {
	__LOG_TAG__: "[data_cache_manager]",
	__cache_expiry_ms: 30 * 1000,
	load_cache () {
		data_all_catalogs_hash.catalog_hash = appsmith.store.data_all_catalogs_catalog_hash;
		data_all_catalogs_tree.catalogs_menu_tree_roots = appsmith.store.data_all_catalogs_tree_catalogs_menu_tree_roots;
		data_catalog_details.details_list = appsmith.store.data_catalog_details_details_list;
	},
	save_cache() {
		storeValue("data_all_catalogs_catalog_hash", data_all_catalogs_hash.catalog_hash);
		storeValue("data_catalog_details_details_list", data_catalog_details.details_list);
		storeValue("data_all_catalogs_tree_catalogs_menu_tree_roots", data_all_catalogs_tree.catalogs_menu_tree_roots);
		storeValue("data_cache_manager_last_saved", Date.now());
	},
	is_cache_valid() {
		console.log(this.__LOG_TAG__, Date.now(), appsmith.store.data_cache_manager_last_saved, Date.now() - appsmith.store.data_cache_manager_last_saved);
		return appsmith.store.data_cache_manager_last_saved && 
			(Date.now() - appsmith.store.data_cache_manager_last_saved) < this.__cache_expiry_ms;
	}
}