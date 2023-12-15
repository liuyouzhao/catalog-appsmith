export default {
	getAllCatalogs () {
		var treeRootsPromises = [];
		var uniqueHash = {};
		Api_Fetch_Catalog_Root_Names.run();
		Api_Fetch_Catalog_Root_Names.data.sheets.forEach(sheet => {
			var currentCats = Js_Catalog_All_By_Root_Name.run({sheet_index:sheet["index"]});
			var rootPromise = currentCats.then(value => {
				var root = null;
				value.forEach(row => {
					console.log(row);
					if(uniqueHash[row.Name + row.Uid]) {
						throw new Error(row.Name + row.Uid + " is not unique!");
					}
					uniqueHash[row.Name + row.Uid] =  {
						"label": row.Name,
						"value": row.Name + row.Uid,
						"children": []
					};
				});
				value.forEach(row => {
					if(row.Parent.toLowerCase() == "root") {
						root = uniqueHash[row.Name + row.Uid];
					}
					else if(uniqueHash[row.Parent + row.Puid]) {
						uniqueHash[row.Parent + row.Puid].children.push(uniqueHash[row.Name + row.Uid]);
					}
					else {
						throw new Error('Parent Catalog Not Exist. ' + row.Name + row.Id + "  " + row.Parent + row.Puid);
					}
				});
				console.log("root", root);
				return root;
			});
			treeRootsPromises.push(rootPromise);
		});
		return Promise.all(treeRootsPromises);
	}
}