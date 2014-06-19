
Ext.define("App.store.MenuStore", {
    extend: "Ext.data.TreeStore",    
    config: {
        model: 'App.model.MenuModel',
        /*sorters: [{ property: 'name', direction: 'ASC'}],
		defaultRootProperty: 'items',
	    root: data*/
        defaultRootProperty: 'items',
        proxy: {
            type: 'ajax',
            url : 'http://www.toyinrestaurant.com/himrest/index.php/json/getMenu',
            reader: {
                type: 'json',                
            }
       },
    }
});

