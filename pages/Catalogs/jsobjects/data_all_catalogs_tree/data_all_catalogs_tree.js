export default {
	__LOG_TAG__: "[data_all_catalogs_tree]",
	catalogs_menu_tree_roots: [],

	init() {
		var catalog_hash = data_all_catalogs_hash.catalog_hash;
		var menu_tree_hash_helper = {};
		this.catalogs_menu_tree_roots = [];

		Object.keys(catalog_hash).forEach(catalog_node_key => {
			var catalog_node = catalog_hash[catalog_node_key];
			var menu_tree_node = this.__create_tree_node_from_hash_node(catalog_node);
			menu_tree_hash_helper[catalog_node.uid] = menu_tree_node;
			if(catalog_node.puid == 0) {
				console.log(this.__LOG_TAG__, "Push into menu root: ", menu_tree_hash_helper[catalog_node.uid], catalog_node);
				this.catalogs_menu_tree_roots.push(menu_tree_hash_helper[catalog_node.uid]);
			}
		});

		Object.keys(catalog_hash).forEach(catalog_node_key => {
			var catalog_node = catalog_hash[catalog_node_key];
			var menu_tree_node = menu_tree_hash_helper[catalog_node.uid];
			if(catalog_node.puid > 0) {
				console.log(this.__LOG_TAG__, "Append child to: ", menu_tree_hash_helper[catalog_node.uid]);
				menu_tree_hash_helper[catalog_node.puid].children.push(menu_tree_node);
			}
		});

		return this.catalogs_menu_tree_roots;
	},

	__create_tree_node_from_hash_node(catalog_hash_node) {
		return {
			"label": catalog_hash_node.name,
			"value": this.__generate_tree_node_value(catalog_hash_node),
			"children": []
		};
	},

	__generate_tree_node_value(catalog_hash_node) {
		//return catalog_hash_node.name + "_" + catalog_hash_node.uid;
		return catalog_hash_node.uid;
	},
}