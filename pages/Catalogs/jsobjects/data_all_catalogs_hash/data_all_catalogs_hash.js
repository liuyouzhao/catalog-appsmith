export default {
	catalog_hash: {},
	init () {
		this.catalog_hash = {};
		/// Add root
		this.catalog_hash[0] = this.__create_catalog_hash_node("All", null, 0, 0);

		/// Hash catalogs
		data_catalogs_level_1.data.forEach(r => {
			if(this.catalog_hash[r.uid]) {
				throw new Error("Duplicate catalog: " + r.name + r.uid);
			}
			this.catalog_hash[r.uid] = this.__create_catalog_hash_node(r.name, r.puid, r.uid, r.level);
		});
		data_catalogs_level_2.data.forEach(r => {
			if(this.catalog_hash[r.uid]) {
				throw new Error("Duplicate catalog: " + r.name + r.uid);
			}
			this.catalog_hash[r.uid] = this.__create_catalog_hash_node(r.name, r.puid, r.uid, r.level);
		});
		data_catalogs_level_3.data.forEach(r => {
			if(this.catalog_hash[r.uid]) {
				throw new Error("Duplicate catalog: " + r.name + r.uid);
			}
			this.catalog_hash[r.uid] = this.__create_catalog_hash_node(r.name, r.puid, r.uid, r.level);
		});
		data_catalogs_level_4.data.forEach(r => {
			if(this.catalog_hash[r.uid]) {
				throw new Error("Duplicate catalog: " + r.name + r.uid);
			}
			this.catalog_hash[r.uid] = this.__create_catalog_hash_node(r.name, r.puid, r.uid, r.level);
		});
		data_catalogs_level_4.data.forEach(r => {
			this.catalog_hash[r.puid].children.push(r.uid);
		});
		data_catalogs_level_3.data.forEach(r => {
			this.catalog_hash[r.puid].children.push(r.uid);
		});
		data_catalogs_level_2.data.forEach(r => {
			this.catalog_hash[r.puid].children.push(r.uid);
		});

		data_catalogs_level_1.data.forEach(r => {
			this.catalog_hash[0].children.push(r.uid);
		})

		//this.refresh_cache();
		return this.catalog_hash;
	},
	find(uid) {
		if(!uid) {
			uid = 0;
		}
		return this.catalog_hash[uid];
	},
	get_root() {
		return this.find(0);
	},

	/**
	 * Private methods ********************
	*/
	__create_catalog_hash_node(name, puid, uid, level) {
		return {
			name: name,
			uid: uid,
			puid: puid,
			level: level,
			children: []
		};
	},
}