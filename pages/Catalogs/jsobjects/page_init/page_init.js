export default {
	__LOG_TAG__: "[page_init]",
	use_cache: true,

	init_all () {
		if(data_cache_manager.is_cache_valid() && this.use_cache) {
			console.log(this.__LOG_TAG__, "Load controller layer from cache...");
			data_cache_manager.load_cache();
			console.log(this.__LOG_TAG__, "Cache loaded.");
			this.init_ui();
			return "[NONE]";
		}

		console.log(this.__LOG_TAG__, "Load model data from remote DB...");

		var loading_counter = 0;
		var retry_attempt = 15;
		data_catalogs_level_1.run().then(ff => {
			loading_counter ++;
		});
		data_catalogs_level_2.run().then(ff => {
			loading_counter ++;
		});
		data_catalogs_level_3.run().then(ff => {
			loading_counter ++;
		});
		data_catalogs_level_4.run().then(ff => {
			loading_counter ++;
		});
		data_catalogs_details_level_1.run().then(ff => {
			loading_counter ++;
		});
		data_catalogs_details_level_2.run().then(ff => {
			loading_counter ++;
		});
		data_catalogs_details_level_3.run().then(ff => {
			loading_counter ++;
		});
		var interval = setInterval(function() {
			if(loading_counter >= 7) {
				try {
					this.init_js_controller();
					this.init_ui();
					data_cache_manager.save_cache();
					console.log(this.__LOG_TAG__, "[SUCESS] All data inited successfully... Cache updated.");
					clearInterval(interval);
					return;
				}
				catch (e) {
					console.error(e);
					retry_attempt --;
				}
				if(retry_attempt <= 0) {
					clearInterval(interval);
				}
			}
		}, 200);
		return "[NONE]";
	},
	init_js_controller() {
		console.log(this.__LOG_TAG__, "[Loading] data_all_catalogs_hash models...");
		data_all_catalogs_hash.init();
		console.log(this.__LOG_TAG__, "[OK] data_all_catalogs_hash");

		console.log(this.__LOG_TAG__, "[Loading] data_all_catalogs_tree models...");
		data_all_catalogs_tree.init();
		console.log(this.__LOG_TAG__, "[OK] data_all_catalogs_tree");
		console.debug(this.__LOG_TAG__, data_all_catalogs_tree.catalogs_menu_tree_roots);

		console.log(this.__LOG_TAG__, "[Loading] data_catalog_details models...");
		data_catalog_details.init();
		console.log(this.__LOG_TAG__, "[OK] data_catalog_details");
	},
	init_ui() {
		console.log(this.__LOG_TAG__, "[Loading] ui_breadcrumbs models...");
		ui_breadcrumbs.fetch();
		console.log(this.__LOG_TAG__, "[OK] ui_breadcrumbs inited...");

		console.log(this.__LOG_TAG__, "[Loading] ui_left_catalogs models...");
		ui_left_catalogs.refresh();
		console.log(this.__LOG_TAG__, "[OK] ui_left_catalogs inited...");

		console.log(this.__LOG_TAG__, "[Loading] ui_catalog_gridview models...");
		ui_catalog_gridview.create();
		console.log(this.__LOG_TAG__, "[OK] ui_catalog_gridview inited...");
	}
}