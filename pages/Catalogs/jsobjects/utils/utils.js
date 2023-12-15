export default {
	__LOG_TAG__: "[utils]",
	get_url_without_params(url) {
		return url.split('?')[0];
	},
	get_current_url_without_params() {
		return this.get_url_without_params(appsmith.URL.fullPath);
	},
	get_current_url_with_c_uid(c_uid, s_uid) {
		return this.get_url_without_params(appsmith.URL.fullPath) + "?c_uid=" + c_uid + "";
	}
}