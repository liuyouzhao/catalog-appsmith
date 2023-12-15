export default {
	load_cache () {
		data_all_catalogs.catalog_hash = appsmith.store.data_all_catalogs_catalog_hash;
		data_catalog_details.details_list = appsmith.store.data_catalog_details_details_list;
	},
	save_cache() {
		storeValue("data_all_catalogs_catalog_hash", data_all_catalogs.catalog_hash);
		storeValue("data_catalog_details_details_list", data_catalog_details.details_list);
		storeValue("page_catalog__cache_valid", true);
		setTimeout(() => {
			storeValue("page_catalog__cache_valid", false);
		}, 60 * 1000);
	},
	is_cache_valid() {
		return appsmith.store.page_catalog__cache_valid;
	}
}