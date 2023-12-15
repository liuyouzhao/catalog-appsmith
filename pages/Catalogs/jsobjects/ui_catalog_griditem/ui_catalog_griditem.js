export default {
	create_grid_item (catalog, catalog_detail) {
		return "<div style='max-width: 33%; vertical-align: top; position: relative;display: inline-block;'>" + 
			this.create_catalog_img_link(catalog, catalog_detail) +
			"<p style='font-size: 0.85rem;display: block; max-width: 100%;overflow: hidden;text-overflow: hidden;  margin: 24px 8px 0px 8px;'>" +
			catalog_detail['description'] + 
			"</p>" + 
			this.create_child_catalog_link(catalog) +
			"</div>";
	},
	create_catalog_img_link(catalog, catalog_detail) {
		var template = "<a href='{{__link__}}'>" +
				"<img style='display: block; max-width: 100%; height: auto; margin-left: auto; margin-right: auto; padding: 16px 8px 0px 8px' src='{{__image_url__}}' />" +
				"<h1 style='font-size: 1rem; margin: 8px 8px 0px 8px;'>" +
				catalog_detail['name'] +
				"</h1>" +
				"</a>";
		var response = template
		.replace("{{__link__}}", utils.get_current_url_with_c_uid(catalog.uid, catalog.uid))
		.replace("{{__image_url__}}", catalog_detail['image_url']);
		return response;
	},
	create_child_catalog_link(catalog) {
		var template = "<a style='display: block;margin: 5px 5px 0px 8px;text-align: left;' href='{{__link__}}'>{{__name__}}</a>";
		var response = "";

		catalog.children.forEach(child_uid => {
			var child = data_all_catalogs_hash.find(child_uid);
			var name = child.name;
			var uid = child.uid;
			response += template
				.replace("{{__name__}}", name)
				.replace("{{__link__}}", utils.get_current_url_with_c_uid(uid, uid));

		});
		return response;
	}
}