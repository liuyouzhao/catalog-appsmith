export default {
	details_list: {},
	init () {
		this.details_list['level_1'] = {};
		this.details_list['level_2'] = {};
		this.details_list['level_3'] = {};
		data_catalogs_details_level_1.data.forEach(dt => {
			this.details_list['level_1']['uid_' + dt.uid] = dt;
		});
		data_catalogs_details_level_2.data.forEach(dt => {
			this.details_list['level_2']['uid_' + dt.uid] = dt;
		});
		data_catalogs_details_level_3.data.forEach(dt => {
			this.details_list['level_3']['uid_' + dt.uid] = dt;
		});
	}
}